import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Server-rendered FAQ using native <details>. Fully accessible and crawlable,
 * works without JavaScript.
 */
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-current/15 border-y border-current/15", className)}>
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex items-start justify-between gap-6 py-6 text-left font-display text-xl font-medium sm:text-2xl">
            <span>{f.q}</span>
            <Plus
              aria-hidden
              className="mt-1 h-6 w-6 shrink-0 transition-transform duration-(--duration-base) group-open:rotate-45"
            />
          </summary>
          <p className="max-w-3xl pb-7 text-lead opacity-80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
