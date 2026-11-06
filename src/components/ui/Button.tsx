import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ink" | "outline" | "outline-light" | "paper";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold tracking-tight whitespace-nowrap transition-[color,background-color,border-color,transform] duration-(--duration-base) ease-edge active:scale-[0.98] select-none";

const variants: Record<Variant, string> = {
  primary: "bg-edge text-ink hover:bg-ink hover:text-paper",
  ink: "bg-ink text-paper hover:bg-edge hover:text-ink",
  paper: "bg-paper text-ink hover:bg-edge",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-paper/40 text-paper hover:border-edge hover:bg-edge hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: React.ReactNode | false;
  /** Opens in a new tab (external links such as WhatsApp). */
  external?: boolean;
  "data-track"?: string;
  "aria-label"?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className, icon, external, ...rest }: Props) {
  const content = (
    <>
      <span className="relative">{children}</span>
      {icon !== false && (
        <span aria-hidden className="relative inline-flex h-4 w-4 overflow-hidden">
          {icon ?? (
            <>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-(--duration-base) ease-edge group-hover/btn:translate-x-full group-hover/btn:-translate-y-full" />
              <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-full translate-y-full transition-transform duration-(--duration-base) ease-edge group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </>
          )}
        </span>
      )}
    </>
  );
  const cls = cn(base, variants[variant], sizes[size], className);

  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

/** Text link with the arrow + underline micro-interaction. */
export function ArrowLink({ href, children, className, external }: { href: string; children: React.ReactNode; className?: string; external?: boolean }) {
  const cls = cn("group/al inline-flex items-center gap-1.5 font-semibold", className);
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-(--duration-base) group-hover/al:translate-x-0.5 group-hover/al:-translate-y-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
