"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["Brands", "Reels", "Ads", "Websites", "Campaigns", "Growth"];

/**
 * The InsideEdge "E": a yellow frame open on one side with an arrow pointing
 * inward — echoing the logo — cycling through what we make.
 */
export function HeroFrame() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 1800);
    return () => window.clearInterval(t);
  }, [reduced]);

  return (
    <div aria-hidden className="fade-up relative aspect-[4/5] w-full" style={{ animationDelay: "400ms" }}>
      <div className="absolute inset-0 border-y-[14px] border-l-[14px] border-edge" />
      <div className="absolute top-1/2 right-0 flex h-[14px] w-1/2 -translate-y-1/2 items-center bg-edge">
        <span className="absolute -left-4 h-0 w-0 border-y-[16px] border-r-[18px] border-y-transparent border-r-edge" />
      </div>
      <div className="absolute inset-x-8 top-8 flex items-center justify-between">
        <span className="label text-muted">We make</span>
        <span className="label tabular text-muted">
          {String(i + 1).padStart(2, "0")}/{String(WORDS.length).padStart(2, "0")}
        </span>
      </div>
      <div className="absolute inset-x-8 bottom-10 h-[1.15em] overflow-hidden font-display text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.1] font-semibold tracking-tight">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={WORDS[i]}
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {WORDS[i]}.
          </m.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
