import type { Metadata } from "next";
import { differentiators, processSteps } from "@/data/company";
import { formattedAddress, mapsUrl, siteConfig } from "@/config/site";
import { EdgeLine, Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { SectorIndex } from "@/components/sections/SectorIndex";
import { ArrowLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About InsideEdge - Guwahati Creative & Performance Agency",
  description:
    "InsideEdge is a Guwahati creative and performance agency helping entrepreneurs create, launch and grow brands from concept and sourcing coordination to identity and marketing.",
  path: "/about",
});

/** Principles written as behaviours, not slogans. */
const principles = [
  {
    title: "Proof over promises",
    body: "We don't publish numbers we can't source, and we won't promise results nobody can guarantee. We show the work and report honestly.",
  },
  {
    title: "Creative has a job",
    body: "Every post, ad and page is made to move a specific person to a specific next step. If it doesn't, we change it.",
  },
  {
    title: "Local insight, national standard",
    body: "We know how Assam buys, speaks and celebrates - and we hold our craft to the standard of the best agencies anywhere in India.",
  },
  {
    title: "You own everything",
    body: "Your ad accounts, your pages, your files, your data. Always in your name, always accessible.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="An agency built on the inside edge."
        breadcrumbs={[{ name: "About", path: "/about" }]}
        intro={
          <p>
            InsideEdge helps entrepreneurs and established businesses move from an initial idea toward a market-ready
            brand, coordinating research and sourcing support with strategy, identity, packaging, websites and marketing.
          </p>
        }
      />

      <section className="theme-ink bg-ink py-section text-paper">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="text-muted-dark">Our story</SectionLabel>
            <h2 className="mt-6 text-display-lg">Why &quot;InsideEdge&quot;?</h2>
          </div>
          <div className="space-y-6 text-lead text-muted-dark lg:col-span-7">
            <p className="text-paper">
              Every brand has something inside it that can become its edge. We started InsideEdge to find it.
            </p>
            <p>
              InsideEdge began around a kitchen table, with ideas, conversations, coffee and one clear thought: marketing
              should not feel like something simply added to a business. It should come from understanding what makes
              that business different in the first place.
            </p>
            <p>
              That idea shaped our name. <strong className="text-paper">Inside</strong> is about looking deeper into the
              brand, the people behind it, the audience and the real story. <strong className="text-paper">Edge</strong>{" "}
              is what comes next: the clarity, creativity and execution that help that brand stand apart.
            </p>
            <p>
              When we started, we saw a gap. Too often, strategy and creativity lived in separate rooms. Some work looked
              impressive but lacked purpose. Other work had a plan but lacked personality. We wanted to bring both sides
              to the same table.
            </p>
            <p>
              Since then, InsideEdge has grown from an idea into a multidisciplinary marketing and creative agency
              working across concept development, sourcing coordination, strategy, branding, packaging, content,
              digital, campaigns and web experiences. Our capabilities have
              expanded, but our way of working has not become complicated.
            </p>
            <p>
              We listen. We ask the right questions. We understand before we create. And we do not believe in forcing
              different brands through the same agency formula.
            </p>
            <p className="text-paper">
              Because the best ideas rarely begin with &quot;What should we make?&quot; They begin with &quot;What makes this brand
              worth noticing?&quot;
            </p>
            <p>
              That is what we are continuing to build at InsideEdge: a team that thinks from the inside, creates with
              purpose and gives every brand something genuinely its own.
            </p>
            <p className="text-paper">
              Your strongest edge is already inside you. We just know where to look.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-section">
        <div className="container-site">
          <SectionLabel>How we think</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-display-lg">Four principles we actually work by.</h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.08}>
                <EdgeLine />
                <h3 className="mt-6 text-display-sm">{p.title}</h3>
                <p className="mt-3 max-w-lg text-muted">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-section">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>What makes us different</SectionLabel>
          </div>
          <ol className="space-y-12 lg:col-span-7">
            {differentiators.map((d) => (
              <li key={d.index} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="font-display text-2xl font-semibold text-edge-deep tabular">{d.index}</span>
                <div>
                  <h3 className="text-display-sm">{d.title}</h3>
                  <p className="mt-3 text-muted">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-section">
        <div className="container-site">
          <SectionLabel>Clients</SectionLabel>
          <h2 className="mt-6 max-w-3xl text-display-lg">Sectors we know well.</h2>
          <div className="mt-14">
            <SectorIndex />
          </div>
        </div>
      </section>

      <section className="theme-ink bg-ink py-section-sm text-paper">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel className="text-muted-dark">The studio</SectionLabel>
            <h2 className="mt-6 text-display-md">Come and see us in Guwahati.</h2>
          </div>
          <div className="space-y-3 lg:col-span-6">
            <p className="text-lead text-muted-dark">{formattedAddress}</p>
            <p className="text-muted-dark">{siteConfig.contact.officeHours} - by appointment</p>
            <ArrowLink href={mapsUrl} external className="text-edge">
              Open in Google Maps
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="bg-paper py-section-sm">
        <div className="container-site">
          <SectionLabel>Working together</SectionLabel>
          <ol className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {processSteps.map((p) => (
              <li key={p.index} className="border-t-[3px] border-ink pt-4">
                <span className="label tabular text-muted">{p.index}</span>
                <p className="mt-2 font-display text-xl font-semibold">{p.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FinalCta title="Let's work together." />
    </>
  );
}
