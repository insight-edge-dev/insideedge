import type { Metadata } from "next";
import { auditOutcomes, auditScope } from "@/data/company";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { BookingLink } from "@/components/ui/BookingLink";
import { Faq } from "@/components/ui/Faq";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/Section";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Free Growth Audit — 30 Minutes, No Obligation",
  description:
    "Book a free 30-minute growth audit with InsideEdge. We review your website, Instagram, ads, funnel and local search, and tell you what to fix first.",
  path: "/free-audit",
});

const WA = "Hi InsideEdge, I'd like to book the free growth audit for my business.";

const faqs = [
  { q: "Is it really free?", a: "Yes. There’s no cost and no obligation to work with us afterwards." },
  { q: "What do you need from me?", a: "Your website and social links, and a quick idea of your goals. If you want us to look at ad accounts, we can review them together on the call." },
  { q: "Who is it for?", a: "Businesses that are already marketing online — or about to start — and want an honest outside view of what’s working and what isn’t." },
  { q: "Will you try to sell to me?", a: "We’ll tell you what we’d do. If it makes sense to work together, we’ll say so. If it doesn’t, you still leave with a clear list of priorities." },
];

export default function FreeAuditPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero
        label="Free growth audit"
        title="Find out what’s holding your growth back."
        breadcrumbs={[{ name: "Free Audit", path: "/free-audit" }]}
        intro={
          <p>
            A focused 30-minute review of your brand’s digital presence with our team. You’ll leave knowing the few
            things most worth fixing — whether or not you work with us.
          </p>
        }
      >
        <div data-track-location="audit_hero" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#book" variant="ink" size="lg">
            Book My Free Audit
          </ButtonLink>
          <ButtonLink href={whatsappUrl(WA)} external variant="outline" size="lg" icon={<WhatsAppIcon className="h-4 w-4" />}>
            Chat on WhatsApp
          </ButtonLink>
        </div>
      </PageHero>

      <section className="bg-paper-2 py-section">
        <div className="container-site">
          <SectionLabel>What we review</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-display-lg">Six places growth usually leaks.</h2>
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {auditScope.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 3) * 0.06} className="border-t-[3px] border-ink pt-6">
                <span className="label tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-display-sm">{a.title}</h3>
                <p className="mt-3 text-muted">{a.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="theme-ink bg-ink py-section text-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="text-muted-dark">What you get</SectionLabel>
            <h2 className="mt-6 text-display-lg">Clear priorities. No fluff.</h2>
          </div>
          <ol className="lg:col-span-7">
            {auditOutcomes.map((o, i) => (
              <li key={o} className="flex items-baseline gap-6 border-b border-line-dark py-6 text-lead first:border-t">
                <span className="label tabular text-edge">{String(i + 1).padStart(2, "0")}</span>
                {o}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="book" className="scroll-mt-24 bg-paper py-section">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div>
              <SectionLabel>Book your audit</SectionLabel>
              <h2 className="mt-6 text-display-lg">Two minutes to request.</h2>
              <p className="mt-6 max-w-sm text-muted">
                Share your details and we’ll get in touch within one working day to schedule the call.
              </p>
            </div>
            <BookingLink label="Or pick a time directly" />
          </div>
          <div className="lg:col-span-7">
            <LeadForm source="free-audit" variant="compact" submitLabel="Book My Free Audit" />
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-section-sm">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Questions</SectionLabel>
          </div>
          <Faq items={faqs} className="lg:col-span-8" />
        </div>
      </section>
    </>
  );
}
