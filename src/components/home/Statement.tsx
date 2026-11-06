"use client";

import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/Section";

const BODY =
  "Most brands hire one agency to make things look good and another to make the numbers work. Neither owns the result. At InsideEdge, the people who design your ads, film your reels and build your website work alongside the people running your campaigns — so every piece of creative is made to perform, and every rupee of spend has something worth showing.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // Starts at an accessible grey (5.6:1 on ink) and brightens to paper.
  const color = useTransform(progress, range, ["#8a8980", "#fafaf7"]);
  return <m.span style={{ color }}>{children} </m.span>;
}

/**
 * Core statement. Body copy lights up word by word as it scrolls through the
 * viewport (colour only — no movement, so it is safe for reduced-motion users).
 */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = BODY.split(" ");

  return (
    <section className="theme-ink bg-ink py-section text-paper">
      <div className="container-site">
        <SectionLabel className="text-muted-dark">Our philosophy</SectionLabel>
        <h2 className="mt-8 max-w-6xl text-display-xl">
          We don’t separate <span className="text-edge">creative</span> from <span className="text-edge">growth.</span>
        </h2>
        <p ref={ref} className="mt-14 ml-auto max-w-4xl font-display text-display-sm font-medium lg:mt-24">
          {words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
          ))}
        </p>
      </div>
    </section>
  );
}
