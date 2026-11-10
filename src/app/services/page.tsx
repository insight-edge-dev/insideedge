import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { processSteps } from "@/data/company";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { SectionLabel } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — Brand Creation, Sourcing, Packaging & Marketing",
  description:
    "Brand creation and launch services in Guwahati: manufacturer discovery, sourcing coordination, strategy, packaging, websites, content, SEO and performance marketing.",
  path: "/services",
});

export default function ServicesPage() {
  const primary = services.filter((s) => !s.parent);
  return (
    <>
      <PageHero
        label="Services"
        title="From first idea to market-ready brand."
        breadcrumbs={[{ name: "Services", path: "/services" }]}
        intro={
          <p>
            InsideEdge connects manufacturer discovery, brand strategy, packaging, websites, social media and marketing
            into one coordinated journey. Each engagement includes only the stages agreed in its proposal.
          </p>
        }
      />

      <section className="bg-paper pb-section">
        <div className="container-site">
          <ul className="border-t border-ink">
            {primary.map((s) => {
              const children = services.filter((c) => c.parent === s.slug);
              return (
                <Reveal as="li" key={s.slug} className="border-b border-ink">
                  <div className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                    <span className="label tabular text-muted lg:col-span-1">{s.index}</span>
                    <div className="lg:col-span-5">
                      <h2 className="text-display-md">
                        <Link href={`/services/${s.slug}`} className="group inline-flex items-start gap-3">
                          <span className="link-underline">{s.name}</span>
                          <ArrowUpRight aria-hidden className="mt-2 h-6 w-6 shrink-0 transition-transform group-hover:rotate-45" />
                        </Link>
                      </h2>
                      <p className="mt-4 max-w-md text-lead text-muted">{s.summary}</p>
                      {children.length > 0 && (
                        <p className="mt-4 flex flex-wrap gap-2">
                          {children.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/services/${c.slug}`}
                              className="rounded-full border border-ink/30 px-4 py-1.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </p>
                      )}
                    </div>
                    <ul className="grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2 lg:col-span-6">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span aria-hidden className="mt-2.5 h-[3px] w-3 shrink-0 bg-edge-deep" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="theme-ink bg-ink py-section text-paper">
        <div className="container-site">
          <SectionLabel className="text-muted-dark">The integrated model</SectionLabel>
          <h2 className="mt-6 max-w-4xl text-display-lg">Why one team beats three agencies.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              ["No lost briefs", "Strategy, creative and media sit together, so the idea that was pitched is the idea that runs."],
              ["Faster learning", "When an ad underperforms, the people who made it see the numbers the same day and fix it."],
              ["One owner", "One point of contact accountable for the outcome — not three suppliers pointing at each other."],
            ].map(([t, b]) => (
              <div key={t} className="border-t-[3px] border-edge pt-6">
                <h3 className="text-display-sm">{t}</h3>
                <p className="mt-3 text-muted-dark">{b}</p>
              </div>
            ))}
          </div>
          <ol className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((p) => (
              <li key={p.index}>
                <span className="label tabular text-edge">{p.index}</span>
                <p className="mt-2 font-display text-xl font-semibold">{p.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta title="Not sure what you need?" subtitle="Tell us the goal. We’ll recommend the smallest plan that gets you there." />
    </>
  );
}
