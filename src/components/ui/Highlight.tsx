import { cn } from "@/lib/utils";

/**
 * Signature "edge" highlight: a yellow bar drawn in from the left behind a word.
 * Pure CSS so it animates at first paint without waiting for hydration.
 */
export function Highlight({ children, className, delay = 500 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <span className={cn("relative isolate inline-block", className)}>
      {children}
      <span
        aria-hidden
        className="absolute inset-x-[-0.04em] bottom-[0.06em] -z-10 h-[0.32em] origin-left animate-edge-draw bg-edge"
        style={{ animationDelay: `${delay}ms` }}
      />
    </span>
  );
}
