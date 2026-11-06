import { differentiators } from "@/data/company";
import { EdgeLine, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/Section";

export function WhyUs() {
  return (
    <section className="theme-ink bg-ink py-section text-paper">
      <div className="container-site">
        <SectionLabel className="text-muted-dark">Why InsideEdge</SectionLabel>
        <h2 className="mt-6 max-w-4xl text-display-lg">Three reasons brands stay.</h2>
        <ol className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-3 lg:gap-10">
          {differentiators.map((d, i) => (
            <Reveal as="li" key={d.index} delay={i * 0.08}>
              <EdgeLine delay={i * 0.12} />
              <p className="mt-6 font-display text-[clamp(4rem,8vw,7rem)] leading-none font-semibold text-edge tabular">{d.index}</p>
              <h3 className="mt-6 text-display-sm">{d.title}</h3>
              <p className="mt-4 text-muted-dark">{d.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
