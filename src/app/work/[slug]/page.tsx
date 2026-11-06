import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { getServices } from "@/data/services";
import { TrackOnMount } from "@/components/analytics/AnalyticsListener";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { SectionLabel } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.client} — ${study.title}`,
    description: study.summary,
    path: `/work/${study.slug}`,
    noindex: study.status !== "published",
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const services = getServices(study.services);
  const related = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 2);

  return (
    <>
      <TrackOnMount event="case_study_view" params={{ case_study: study.slug }} />
      <PageHero
        label={`${study.client} · ${study.industry}`}
        title={study.title}
        breadcrumbs={[
          { name: "Work", path: "/work" },
          { name: study.client, path: `/work/${study.slug}` },
        ]}
        intro={<p>{study.summary}</p>}
      >
        <dl className="grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
          {[
            ["Client", study.client],
            ["Industry", study.industry],
            ["Year", study.year],
            ["Services", services.map((s) => s.short).join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label text-muted">{k}</dt>
              <dd className="mt-2 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {study.cover && (
        <Reveal variant="edge" className="container-site">
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            width={study.cover.width}
            height={study.cover.height}
            sizes="(min-width: 1408px) 1296px, 100vw"
            priority
            className="w-full rounded-card"
          />
        </Reveal>
      )}

      <section className="bg-paper py-section">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-7 lg:col-start-6">
            {[
              ["The challenge", study.challenge],
              ["The objective", study.objective],
              ["The strategy", study.strategy],
            ].map(([title, body]) => (
              <Reveal key={title}>
                <SectionLabel>{title}</SectionLabel>
                <p className="mt-5 font-display text-display-sm">{body}</p>
              </Reveal>
            ))}
            <Reveal>
              <SectionLabel>Execution</SectionLabel>
              <ol className="mt-5 space-y-4">
                {study.execution.map((e, i) => (
                  <li key={e} className="flex gap-5 text-lead">
                    <span className="label tabular mt-1.5 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {e}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {study.metrics.length > 0 && (
        <section className="theme-ink bg-ink py-section text-paper">
          <div className="container-site">
            <SectionLabel className="text-muted-dark">Results</SectionLabel>
            <ul className="mt-12 grid gap-12 md:grid-cols-3">
              {study.metrics.map((m) => (
                <li key={m.label} className="border-t-[3px] border-edge pt-6">
                  <p className="font-display text-display-lg font-semibold tabular">{m.value}</p>
                  <p className="mt-3 text-lead">{m.label}</p>
                  <p className="mt-2 text-sm text-muted-dark">Source: {m.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {study.quote && (
        <section className="bg-paper-2 py-section">
          <figure className="container-site max-w-5xl">
            <blockquote className="font-display text-display-md">“{study.quote.text}”</blockquote>
            <figcaption className="mt-8">
              <span className="font-semibold">{study.quote.name}</span>
              <span className="text-muted"> — {study.quote.role}, {study.client}</span>
            </figcaption>
          </figure>
        </section>
      )}

      {study.gallery.length > 0 && (
        <section className="bg-paper py-section-sm">
          <div className="container-site grid gap-6 md:grid-cols-2">
            {study.gallery.map((g, i) => (
              <Reveal key={g.src} variant="edge" className={i % 3 === 0 ? "md:col-span-2" : undefined}>
                <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 768px) 50vw, 100vw" className="w-full rounded-card" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-paper py-section-sm">
          <div className="container-site">
            <div className="flex items-end justify-between">
              <SectionLabel>More work</SectionLabel>
              <Link href="/work" className="font-semibold underline underline-offset-4">
                All work
              </Link>
            </div>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((r) => (
                <ProjectCard key={r.slug} study={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta
        title="Want results like this?"
        whatsappMessage={`Hi InsideEdge, I saw your work for ${study.client} and would like to discuss something similar.`}
      />
    </>
  );
}
