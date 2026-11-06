import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  children?: React.ReactNode;
  className?: string;
};

/** Hero for inner pages. Uses the same CSS-only line reveal as the homepage. */
export function PageHero({ label, title, intro, breadcrumbs, children, className }: Props) {
  return (
    <section className={cn("bg-paper pt-[calc(var(--header-h)+clamp(2rem,6vw,5rem))] pb-section-sm", className)}>
      <div className="container-site">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="fade-up mb-10" />}
        <p className="label fade-up flex items-center gap-3 text-muted">
          <span aria-hidden className="inline-block h-[3px] w-6 bg-edge" />
          {label}
        </p>
        <h1 className="mt-6 max-w-6xl text-display-xl">
          <span className="hero-line">
            <span>{title}</span>
          </span>
        </h1>
        {intro && (
          <div className="fade-up mt-8 max-w-2xl text-lead text-muted" style={{ animationDelay: "200ms" }}>
            {intro}
          </div>
        )}
        {children && (
          <div className="fade-up mt-10" style={{ animationDelay: "300ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
