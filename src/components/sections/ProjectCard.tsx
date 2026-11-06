import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import { getServices } from "@/data/services";
import { cn } from "@/lib/utils";

/** Editorial project tile. Missing covers fall back to a typographic panel. */
export function ProjectCard({ study, large }: { study: CaseStudy; large?: boolean }) {
  const services = getServices(study.services).map((s) => s.short);
  return (
    <Link href={`/work/${study.slug}`} className="group block">
      <div className={cn("relative overflow-hidden rounded-card bg-ink", large ? "aspect-[16/10]" : "aspect-[4/5]")}>
        {study.cover ? (
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            fill
            sizes={large ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-edge group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-8">
            <span className="font-display text-display-md font-semibold text-paper">{study.client}</span>
          </div>
        )}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-edge transition-transform duration-500 ease-edge group-hover:scale-x-100" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="label text-muted">
            {study.client} · {study.industry} · {study.year}
          </p>
          <h3 className="mt-3 text-display-sm">{study.title}</h3>
          <p className="mt-2 text-muted">{study.summary}</p>
          <p className="mt-3 text-sm text-muted">{services.join(" / ")}</p>
        </div>
        <ArrowUpRight aria-hidden className="mt-1 h-6 w-6 shrink-0 transition-transform group-hover:rotate-45" />
      </div>
    </Link>
  );
}
