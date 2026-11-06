import Link from "next/link";
import type { Testimonial } from "@/data/people";
import { SectionLabel } from "@/components/ui/Section";

/**
 * Attributed testimonials only (name, role, company). Renders nothing when the
 * list is empty — we never publish anonymous or placeholder quotes.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <section className="bg-paper-2 py-section">
      <div className="container-site">
        <SectionLabel>In their words</SectionLabel>
        <ul className="mt-12 grid gap-12 lg:grid-cols-2">
          {items.map((t) => (
            <li key={t.name}>
              <figure>
                <blockquote className="font-display text-display-sm">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-muted">
                    {" "}
                    — {t.role}, {t.company}
                  </span>
                  {t.caseStudy && (
                    <Link href={`/work/${t.caseStudy}`} className="ml-3 font-semibold underline underline-offset-2">
                      Read the case study
                    </Link>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
