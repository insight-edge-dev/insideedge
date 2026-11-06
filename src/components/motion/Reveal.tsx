"use client";

import { m, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

const variants: Record<"up" | "edge" | "fade", Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  /** Signature: content revealed from its left edge. */
  edge: { hidden: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)" } },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "span";
};

export function Reveal({ children, className, variant = "up", delay = 0, as = "div" }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants[variant]}
      transition={{ duration: variant === "edge" ? 1.1 : 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Masked word-by-word headline reveal. Text stays real, selectable and
 * readable by screen readers; only the transform animates.
 */
export function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const Tag = m[as];
  const words = text.split(" ");
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
          <m.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {word}
          </m.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** The yellow edge line drawing itself in from the left. */
export function EdgeLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <m.span
      aria-hidden
      className={cn("edge-rule", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  );
}
