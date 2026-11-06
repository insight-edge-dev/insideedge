import type { Metadata } from "next";
import { isProduction, siteConfig, socialLinks } from "@/config/site";
import type { Faq, Service } from "@/data/services";
import type { Article } from "@/data/insights";
import { absoluteUrl } from "@/lib/utils";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Set true for utility pages (thank-you, links) and drafts. */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds consistent per-page metadata: canonical, Open Graph and Twitter.
 * OG images come from colocated opengraph-image files (inherited from the root when absent).
 */
export function pageMetadata({ title, description, path, noindex, type = "website", publishedTime, modifiedTime }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_IN",
      type,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex || !isProduction ? { index: false, follow: true } : undefined,
  };
}

const orgId = `${siteConfig.url}/#organization`;
const businessId = `${siteConfig.url}/#business`;
const websiteId = `${siteConfig.url}/#website`;

/** Site-wide graph: Organization + ProfessionalService + WebSite. No ratings or awards are declared. */
export function siteGraph() {
  const sameAs = socialLinks.map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.alternateNames,
        url: siteConfig.url,
        logo: absoluteUrl("/brand/logo-dark.png"),
        description: siteConfig.description,
        foundingDate: siteConfig.foundingYear,
        sameAs,
        contactPoint: siteConfig.contact.numbers.map((number) => ({
          "@type": "ContactPoint",
          telephone: number.e164,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Assamese"],
          ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
        })),
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl("/brand/logo-dark.png"),
        telephone: siteConfig.contact.numbers.map((number) => number.e164),
        ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
        parentOrganization: { "@id": orgId },
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.locality,
          addressRegion: siteConfig.address.region,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
        areaServed: siteConfig.geoAreaServed.map((name) => ({ "@type": "Place", name })),
        hasMap: siteConfig.links.googleMaps || undefined,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": businessId },
    areaServed: siteConfig.geoAreaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.updated ?? article.published,
    author: { "@type": "Organization", name: article.author.name, url: siteConfig.url },
    publisher: { "@id": orgId },
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
  };
}
