import type { Metadata } from "next";
import { publishedCaseStudies } from "@/data/case-studies";
import { siteConfig } from "@/config/site";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { Highlight } from "@/components/ui/Highlight";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Thank you",
  description: "Your enquiry has reached InsideEdge.",
  path: "/thank-you",
  noindex: true,
});

/**
 * Post-submission page. Its page view doubles as the conversion signal
 * (configure a GA4 / Meta custom conversion on URL contains "/thank-you").
 */
export default function ThankYouPage() {
  const featured = publishedCaseStudies[0];
  return (
    <>
      <section className="bg-paper pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] pb-section">
        <div className="container-site">
          <p className="label text-muted">Message received</p>
          <h1 className="mt-6 max-w-5xl text-display-xl">
            Thank you. <Highlight>We’re on it.</Highlight>
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-muted">
            Your enquiry has reached our team. {siteConfig.contact.responseTime} If it’s urgent, WhatsApp is the fastest
            way to reach us.
          </p>
          <div data-track-location="thank_you" className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={whatsappUrl("Hi InsideEdge, I just submitted an enquiry on your website.")}
              external
              variant="ink"
              size="lg"
              icon={<WhatsAppIcon className="h-4 w-4" />}
            >
              Continue on WhatsApp
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="lg">
              See our work
            </ButtonLink>
          </div>
          <div className="mt-10 max-w-md">
            <BookingLink label="Want to lock in a time?" />
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-section-sm">
        <div className="container-site">
          <SectionLabel>While you wait</SectionLabel>
          {featured ? (
            <div className="mt-10 max-w-3xl">
              <ProjectCard study={featured} large />
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-lead">
              <ArrowLink href="/services">Explore our services</ArrowLink>
              <ArrowLink href={siteConfig.links.instagram} external>
                Follow {siteConfig.links.instagramHandle}
              </ArrowLink>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
