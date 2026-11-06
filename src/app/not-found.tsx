import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[90svh] items-end bg-paper pt-(--header-h) pb-section-sm">
      <div className="container-site">
        <p className="label text-muted">Error 404</p>
        <h1 className="mt-6 max-w-5xl text-display-xl">
          You’ve gone <Highlight>off strategy</Highlight>.
        </h1>
        <p className="mt-8 max-w-xl text-lead text-muted">
          The page you’re looking for doesn’t exist or has moved. Here’s where most people are headed:
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="ink" size="lg">
            Back to InsideEdge
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            Our services
          </ButtonLink>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-semibold">
          {[
            ["/work", "Work"],
            ["/free-audit", "Free growth audit"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="link-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
