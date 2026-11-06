"use client";

import { m, useScroll, useSpring } from "framer-motion";

/** Signature motif: a thin yellow edge on the left of the viewport that fills as you read. */
export function ScrollEdge() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-(--z-sticky) hidden h-screen w-[3px] origin-top bg-edge lg:block"
      style={{ scaleY }}
    />
  );
}
