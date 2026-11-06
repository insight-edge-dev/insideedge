import type { Metadata } from "next";
import { articles } from "@/data/insights";
import { siteConfig } from "@/config/site";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights — Marketing Notes from Guwahati",
  description:
    "Practical guides on social media, performance marketing, branding, websites and SEO — with a focus on marketing in Assam and North East India.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        label="Insights"
        title="Notes from the edge."
        breadcrumbs={[{ name: "Insights", path: "/insights" }]}
        intro={<p>Practical, no-fluff thinking on content, advertising, brand and search — written from the North East for growing brands anywhere.</p>}
      />
      <section className="bg-paper pb-section">
        <div className="container-site">
          {articles.length > 0 ? (
            <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <div className="max-w-2xl border-t-[3px] border-ink pt-8">
              <p className="font-display text-display-sm">Our first articles are on the way.</p>
              <p className="mt-4 text-muted">
                In the meantime, we share campaign breakdowns and tips on Instagram.
              </p>
              <ArrowLink href={siteConfig.links.instagram} external className="mt-6">
                Follow {siteConfig.links.instagramHandle}
              </ArrowLink>
            </div>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
