import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl, withUtm } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Links",
  description: "Quick links from InsideEdge on Instagram: work, free audit, services and WhatsApp.",
  path: "/links",
  noindex: true,
});

const utm = (content: string) => ({ source: "instagram", medium: "social", campaign: "bio_link", content });

const links = [
  { label: "Get a free growth audit", href: withUtm("/free-audit", utm("free_audit")), highlight: true },
  { label: "See our work", href: withUtm("/work", utm("work")) },
  { label: "Social media & content", href: withUtm("/services/social-media-marketing", utm("social")) },
  { label: "Performance ads (Meta & Google)", href: withUtm("/services/performance-marketing", utm("ads")) },
  { label: "Websites", href: withUtm("/services/website-design-development", utm("websites")) },
  { label: "Start a project", href: withUtm("/contact", utm("contact")) },
];

/** Owned Instagram bio destination — replaces third-party link-in-bio tools. */
export default function LinksPage() {
  return (
    <section data-track-location="links_page" className="min-h-svh bg-paper pt-[calc(var(--header-h)+2rem)] pb-16">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight">Creative that performs.</h1>
          <p className="mt-2 text-muted">Creative &amp; performance agency · Guwahati, Assam</p>
        </div>

        <a
          href={whatsappUrl("Hi InsideEdge, I found you on Instagram and would like to talk about my brand.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex h-16 items-center justify-center gap-3 rounded-full bg-whatsapp font-semibold text-ink"
        >
          <WhatsAppIcon className="h-6 w-6" /> Chat on WhatsApp
        </a>

        <ul className="mt-4 space-y-3">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={
                  l.highlight
                    ? "flex h-16 items-center justify-between rounded-full bg-edge px-7 font-semibold text-ink"
                    : "flex h-16 items-center justify-between rounded-full border border-ink/25 px-7 font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                }
              >
                {l.label}
                <ArrowUpRight aria-hidden className="h-5 w-5" />
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={siteConfig.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex items-center justify-center gap-2 text-sm text-muted hover:text-ink"
        >
          <InstagramIcon className="h-4 w-4" /> {siteConfig.links.instagramHandle}
        </a>
      </div>
    </section>
  );
}
