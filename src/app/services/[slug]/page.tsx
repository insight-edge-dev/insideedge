import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudiesForService } from "@/data/case-studies";
import { articles } from "@/data/insights";
import { getService, getServices, services } from "@/data/services";
import { TrackOnMount } from "@/components/analytics/AnalyticsListener";
import { LeadForm } from "@/components/forms/LeadForm";
import { EdgeLine, Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectorIndex } from "@/components/sections/SectorIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/Section";
import { faqSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ ...service.seo, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const parent = service.parent ? getService(service.parent) : undefined;
  const related = getServices(service.related);
  const work = caseStudiesForService(service.slug).slice(0, 2);
  const reading = articles.filter((a) => a.relatedServices.includes(service.slug)).slice(0, 3);
  const crumbs = [
    { name: "Services", path: "/services" },
    ...(parent ? [{ name: parent.name, path: `/services/${parent.slug}` }] : []),
    { name: service.name, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <TrackOnMount event="service_page_view" params={{ service: service.slug }} />
      <JsonLd data={[serviceSchema(service), faqSchema(service.faqs)]} />

      <PageHero
        label={`${service.name} · Guwahati`}
        title={service.headline}
        breadcrumbs={crumbs}
        intro={<p>{service.intro}</p>}
      >
        <div data-track-location="service_hero" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href="#enquire" variant="ink" size="lg">
            Get a proposal
          </ButtonLink>
          <ButtonLink href={whatsappUrl(service.whatsapp)} external variant="outline" size="lg" icon={<WhatsAppIcon className="h-4 w-4" />}>
            Chat on WhatsApp
          </ButtonLink>
        </div>
      </PageHero>

      {/* Who it's for + problems */}
      <section className="bg-paper-2 py-section">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Who it’s for</SectionLabel>
            <ul className="mt-8 space-y-5">
              {service.whoFor.map((w) => (
                <li key={w} className="flex gap-4 text-lead">
                  <span aria-hidden className="mt-3 h-[3px] w-4 shrink-0 bg-edge-deep" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8">
            <SectionLabel>The problems we solve</SectionLabel>
            <div className="mt-8 grid gap-10 md:grid-cols-3">
              {service.problems.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <EdgeLine delay={i * 0.1} />
                  <h2 className="mt-5 text-display-sm">{p.title}</h2>
                  <p className="mt-3 text-muted">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="theme-ink bg-ink py-section text-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="text-muted-dark">What’s included</SectionLabel>
            <h2 className="mt-6 text-display-lg">Deliverables</h2>
            <p className="mt-6 max-w-sm text-muted-dark">Scoped to your goals — every engagement starts with a written plan you approve.</p>
          </div>
          <ol className="lg:col-span-7">
            {service.deliverables.map((d, i) => (
              <li key={d} className="flex items-baseline gap-6 border-b border-line-dark py-5 text-lead first:border-t">
                <span className="label tabular text-edge">{String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper py-section">
        <div className="container-site">
          <SectionLabel>Process</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-display-lg">What happens after you hire us.</h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {service.process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.06} className="border-t-[3px] border-ink pt-6">
                <span className="label tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-display-sm">{step.title}</h3>
                <p className="mt-3 text-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Work */}
      <section className="bg-paper-2 py-section-sm">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Selected work</SectionLabel>
              <h2 className="mt-6 text-display-md">{work.length ? `${service.short} in practice.` : "See who we’ve worked with."}</h2>
            </div>
            <ArrowLink href="/work">All work</ArrowLink>
          </div>
          {work.length > 0 ? (
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {work.map((s) => (
                <ProjectCard key={s.slug} study={s} />
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <SectorIndex limit={3} />
            </div>
          )}
        </div>
      </section>

      {/* Proposal + FAQ */}
      <section className="bg-paper py-section">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Proposal</SectionLabel>
            <p className="mt-6 font-display text-display-sm">Priced to scope, not to a template.</p>
            <p className="mt-4 text-muted">
              Tell us what you need and we’ll send a clear proposal with fixed deliverables and costs. Ad spend, where
              relevant, is always paid directly by you.
            </p>
            <ArrowLink href="/contact" className="mt-6">
              Request a proposal
            </ArrowLink>
          </div>
          <div className="lg:col-span-8">
            <SectionLabel>FAQ</SectionLabel>
            <Faq items={service.faqs} className="mt-8" />
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquire" className="theme-ink scroll-mt-24 bg-ink py-section text-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="text-muted-dark">Get a proposal</SectionLabel>
            <h2 className="mt-6 text-display-lg">Let’s talk {service.short}.</h2>
            <p className="mt-6 max-w-sm text-muted-dark">
              Share a few details and we’ll come back within one working day with next steps — or message us on
              WhatsApp for a faster reply.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm source="service" defaultService={parent?.name ?? service.name} tone="ink" submitLabel="Request a proposal" />
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-paper py-section-sm">
        <div className="container-site">
          <SectionLabel>Works well with</SectionLabel>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`} className="group block border-t-[3px] border-ink pt-5 transition-colors hover:border-edge">
                  <p className="font-display text-display-sm font-semibold">{r.name}</p>
                  <p className="mt-2 text-muted">{r.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
          {reading.length > 0 && (
            <div className="mt-20">
              <SectionLabel>Further reading</SectionLabel>
              <div className="mt-8 grid gap-10 md:grid-cols-3">
                {reading.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FinalCta whatsappMessage={service.whatsapp} location="service_final_cta" />
    </>
  );
}
