import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";
import { SectionLabel } from "@/components/ui/Section";

/**
 * Verified outcomes pulled from published case studies. Every figure shows its
 * source and period. Renders nothing until such metrics exist.
 */
export function ResultsBand({ studies }: { studies: CaseStudy[] }) {
  const results = studies.flatMap((s) => s.metrics.map((m) => ({ ...m, study: s })));
  if (!results.length) return null;
  return (
    <section className="theme-ink bg-ink py-section text-paper">
      <div className="container-site">
        <SectionLabel className="text-muted-dark">Results</SectionLabel>
        <ul className="mt-14 grid gap-12 md:grid-cols-3">
          {results.slice(0, 6).map((r) => (
            <li key={`${r.study.slug}-${r.label}`} className="border-t-[3px] border-edge pt-6">
              <p className="font-display text-display-lg font-semibold tabular">{r.value}</p>
              <p className="mt-3 text-lead">{r.label}</p>
              <p className="mt-3 text-sm text-muted-dark">
                <Link href={`/work/${r.study.slug}`} className="underline underline-offset-2">
                  {r.study.client}
                </Link>{" "}
                · {r.source}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
