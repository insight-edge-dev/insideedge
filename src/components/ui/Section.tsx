import { cn } from "@/lib/utils";

type Theme = "paper" | "paper-2" | "ink" | "edge";

const themes: Record<Theme, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  ink: "theme-ink bg-ink text-paper",
  edge: "bg-edge text-ink",
};

/** Page section with a named colour theme. Themes alternate down a page to create rhythm. */
export function Section({
  theme = "paper",
  className,
  children,
  id,
  tight,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { theme?: Theme; tight?: boolean }) {
  return (
    <section
      id={id}
      className={cn(themes[theme], tight ? "py-section-sm" : "py-section", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

export function SectionLabel({ children, className, index }: { children: React.ReactNode; className?: string; index?: string }) {
  return (
    <p className={cn("label flex items-center gap-3", className)}>
      <span aria-hidden className="inline-block h-[3px] w-6 bg-edge" />
      {index && <span className="tabular opacity-60">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

export function SectionIntro({
  label,
  title,
  body,
  className,
  titleAs: TitleTag = "h2",
}: {
  label: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
  titleAs?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <SectionLabel>{label}</SectionLabel>
      <TitleTag className="mt-6 text-display-lg">{title}</TitleTag>
      {body && <div className="mt-6 max-w-2xl text-lead opacity-80">{body}</div>}
    </div>
  );
}
