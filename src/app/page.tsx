import type { Metadata } from "next";
import Link from "next/link";
import { clients } from "@/data/clients";
import { publishedCaseStudies, caseStudies } from "@/data/case-studies";
import { articles } from "@/data/insights";
import { testimonials } from "@/data/people";
import { featuredServices } from "@/data/services";
import { formattedAddress, mapsUrl, siteConfig } from "@/config/site";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { Hero } from "@/components/home/Hero";
import { BrandLaunchShowcase } from "@/components/home/BrandLaunchShowcase";
import { Process } from "@/components/home/Process";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Statement } from "@/components/home/Statement";
import { Reveal, RevealText } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ResultsBand } from "@/components/sections/ResultsBand";
import { SectorIndex } from "@/components/sections/SectorIndex";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { ArrowLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "InsideEdge — Creative & Performance Marketing Agency in Guwahati",
  description:
    "Creative that performs. InsideEdge is a Guwahati-based agency for social media, Meta & Google ads, branding, websites, video and SEO — for brands across Assam, North East India and beyond.",
  path: "/",
});

export default function Home() {
  // Prefer real case studies; the sector roster stands in until they're published.
  const work = caseStudies.slice(0, 3);
  const hasWork = work.length > 0;

  return (
    <>
      <Hero />
      <BrandLaunchShowcase />

      {/* Client proof */}
      <section aria-labelledby="clients-heading" className="border-y border-line bg-paper py-12">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="clients-heading" className="label text-muted">
              Trusted by ambitious brands, institutions and public bodies
            </h2>
            <ArrowLink href="/work" className="text-sm">
              See who we work with
            </ArrowLink>
          </div>
          <ClientMarquee clients={clients} />
        </div>
      </section>

      {siteConfig.links.showreel && (
        <section aria-label="Showreel" className="bg-paper pb-section-sm">
          <div className="container-site pt-section-sm">
            <VideoPlayer src={siteConfig.links.showreel} poster={siteConfig.links.showreelPoster || undefined} title="InsideEdge showreel" />
          </div>
        </section>
      )}

      <Statement />

      {/* Services */}
      <section id="services" className="bg-edge py-section text-ink">
        <div className="container-site">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:mb-20">
            <div>
              <SectionLabel>What we do</SectionLabel>
              <RevealText text="Seven capabilities. One team." className="mt-6 max-w-4xl text-display-lg" />
            </div>
            <ArrowLink href="/services">All services</ArrowLink>
          </div>
          <ServicesIndex services={featuredServices} />
        </div>
      </section>

      {/* Selected work */}
      <section className="bg-paper py-section">
        <div className="container-site">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Selected work</SectionLabel>
              <RevealText
                text={hasWork ? "Work that moved something." : "Trusted where it matters."}
                className="mt-6 max-w-4xl text-display-lg"
              />
              {!hasWork && (
                <p className="mt-6 max-w-2xl text-lead text-muted">
                  From national brands to Assam’s public institutions, healthcare providers and home-grown businesses —
                  the sectors we’ve worked across.
                </p>
              )}
            </div>
            <ArrowLink href="/work">View all work</ArrowLink>
          </div>
          {hasWork ? (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
              {work.map((s, i) => (
                <Reveal key={s.slug} className={i === 0 ? "md:col-span-2" : undefined}>
                  <ProjectCard study={s} large={i === 0} />
                </Reveal>
              ))}
            </div>
          ) : (
            <SectorIndex limit={6} />
          )}
        </div>
      </section>

      <WhyUs />
      <Process />

      <ResultsBand studies={publishedCaseStudies} />

      <Testimonials items={testimonials} />

      {/* Studio */}
      <section className="bg-paper-2 py-section">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>The studio</SectionLabel>
            <RevealText text="Built in Guwahati. Thinking beyond borders." className="mt-6 text-display-lg" />
          </div>
          <div className="space-y-6 lg:col-span-5">
            <p className="text-lead text-muted">
              We know this market from the inside — the languages, festivals, media habits and what it takes to win
              trust here. And we build work that holds its own anywhere in India.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <ArrowLink href="/about">About InsideEdge</ArrowLink>
              <ArrowLink href={mapsUrl} external>
                Visit the studio
              </ArrowLink>
            </div>
            <p className="text-sm text-muted">{formattedAddress}</p>
          </div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="bg-paper py-section">
          <div className="container-site">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <SectionLabel>Insights</SectionLabel>
                <h2 className="mt-6 text-display-lg">Notes from the edge.</h2>
              </div>
              <Link href="/insights" className="font-semibold underline underline-offset-4">
                All insights
              </Link>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {articles.slice(0, 3).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
