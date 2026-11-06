"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/data/company";
import { SectionLabel } from "@/components/ui/Section";

/** Sticky heading with a yellow edge line that fills as the steps scroll past. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="bg-paper py-section">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionLabel>How we work</SectionLabel>
            <h2 className="mt-6 text-display-lg">From first call to compounding growth.</h2>
            <p className="mt-6 max-w-md text-lead text-muted">
              Six stages, run the same way on every account — so you always know what’s happening and why.
            </p>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-7 lg:pl-16">
          <span aria-hidden className="absolute top-0 bottom-0 left-0 hidden w-[3px] bg-paper-3 lg:block" />
          <m.span aria-hidden style={{ scaleY }} className="absolute top-0 bottom-0 left-0 hidden w-[3px] origin-top bg-edge lg:block" />
          {processSteps.map((step) => (
            <li key={step.index} className="border-b border-line py-10 first:pt-0 last:border-0">
              <div className="flex items-baseline gap-6">
                <span className="label tabular text-muted">{step.index}</span>
                <h3 className="text-display-md">{step.title}</h3>
              </div>
              <p className="mt-4 max-w-xl pl-[calc(1.5rem+2ch)] text-lead text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
