"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Editorial service index. On desktop, hovering or focusing a row swaps the
 * sticky preview panel; on mobile each row shows its summary inline.
 */
export function ServicesIndex({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ol className="border-t border-ink lg:col-span-7">
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-ink">
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:py-7"
            >
              <span className="label tabular">{s.index}</span>
              <span>
                <span
                  className={cn(
                    "block font-display text-display-md font-semibold transition-transform duration-(--duration-base) ease-edge lg:group-hover:translate-x-3",
                    active === i && "lg:translate-x-3",
                  )}
                >
                  {s.name}
                </span>
                <span className="mt-2 block max-w-md text-[0.9375rem] leading-relaxed lg:hidden">{s.summary}</span>
              </span>
              <ArrowUpRight
                aria-hidden
                className={cn(
                  "h-7 w-7 self-center transition-transform duration-(--duration-base) ease-edge group-hover:rotate-45",
                  active === i && "lg:rotate-45",
                )}
              />
            </Link>
          </li>
        ))}
      </ol>

      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)] rounded-card bg-ink p-10 text-paper">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={current.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <p className="label text-edge">{current.index} — {current.short}</p>
              <p className="mt-6 font-display text-display-sm font-semibold">{current.headline}</p>
              <p className="mt-4 text-muted-dark">{current.summary}</p>
              <ul className="mt-8 space-y-2.5 border-t border-line-dark pt-6 text-sm">
                {current.deliverables.slice(0, 4).map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-[3px] w-3 shrink-0 bg-edge" />
                    {d}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${current.slug}`} className="mt-8 inline-flex items-center gap-1.5 font-semibold text-edge">
                <span className="link-underline">Explore {current.short}</span>
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
