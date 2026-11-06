import type { Metadata } from "next";
import { caseStudies } from "@/data/case-studies";
import { clients } from "@/data/clients";
import { services } from "@/data/services";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work & Clients",
  description:
    "Brands, institutions and businesses InsideEdge has worked with across Assam, North East India and nationally — from healthcare and education to building materials and FMCG.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Work"
        title="Work that moved something."
        breadcrumbs={[{ name: "Work", path: "/work" }]}
        intro={
          <p>
            National brands, public institutions, hospitals, schools and home-grown businesses. Filter by industry to see
            who we’ve worked with.{" "}
            {caseStudies.length === 0 && "Detailed case studies with verified results are being published soon."}
          </p>
        }
      />
      <section className="bg-paper pb-section">
        <div className="container-site">
          <WorkExplorer
            studies={caseStudies}
            clients={clients}
            services={services.map(({ slug, short }) => ({ slug, short }))}
          />
        </div>
      </section>
      <FinalCta
        title="Your brand could be next."
        whatsappMessage="Hi InsideEdge, I was looking at your work and would like to discuss a project."
      />
    </>
  );
}
