"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import type { Client } from "@/data/clients";
import { cn } from "@/lib/utils";

/**
 * Infinite logo strip. Pauses on hover/focus and has an explicit pause control
 * (WCAG 2.2.2). The list is duplicated for the loop; the copy is aria-hidden.
 */
export function ClientMarquee({ clients }: { clients: Client[] }) {
  const [paused, setPaused] = useState(false);
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
      {clients.map((c) => (
        <li key={c.slug} className="shrink-0">
          <Image
            src={c.logo}
            alt={hidden ? "" : c.name}
            width={96}
            height={96}
            sizes="(min-width: 640px) 80px, 64px"
            className="h-16 w-16 rounded-full grayscale-[0.85] transition-[filter] duration-300 hover:grayscale-0 sm:h-20 sm:w-20"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative">
      <div className="mask-fade-x overflow-hidden">
        <div
          className={cn(
            "flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none",
            paused && "[animation-play-state:paused]",
          )}
        >
          {row(false)}
          {row(true)}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink motion-reduce:hidden"
        aria-pressed={paused}
      >
        {paused ? <Play aria-hidden className="h-3.5 w-3.5" /> : <Pause aria-hidden className="h-3.5 w-3.5" />}
        {paused ? "Play" : "Pause"} logo animation
      </button>
    </div>
  );
}
