"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/data/case-studies";
import type { Client } from "@/data/clients";
import type { Service } from "@/data/services";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Props = { studies: CaseStudy[]; clients: Client[]; services: Pick<Service, "slug" | "short">[] };

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {["All", ...options].map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn(
            "h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
            value === o ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** Portfolio with service/industry filters, plus the full client roster filterable by sector. */
export function WorkExplorer({ studies, clients, services }: Props) {
  const [service, setService] = useState("All");
  const [sector, setSector] = useState("All");

  const serviceOptions = useMemo(
    () => services.filter((s) => studies.some((c) => c.services.includes(s.slug))),
    [services, studies],
  );
  const sectors = useMemo(() => Array.from(new Set(clients.map((c) => c.sector))).sort(), [clients]);

  const filteredStudies = studies.filter(
    (s) =>
      (service === "All" || s.services.includes(services.find((x) => x.short === service)?.slug ?? "")) &&
      (sector === "All" || s.industry === sector),
  );
  const filteredClients = clients.filter((c) => sector === "All" || c.sector === sector);

  const pickService = (v: string) => {
    setService(v);
    track("portfolio_filter", { filter: "service", value: v });
  };
  const pickSector = (v: string) => {
    setSector(v);
    track("portfolio_filter", { filter: "industry", value: v });
  };

  return (
    <div>
      <div className="space-y-4">
        {serviceOptions.length > 0 && <Chips label="Filter by service" options={serviceOptions.map((s) => s.short)} value={service} onChange={pickService} />}
        <Chips label="Filter by industry" options={sectors} value={sector} onChange={pickSector} />
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {filteredStudies.length} projects and {filteredClients.length} clients
      </p>

      {studies.length > 0 && (
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {filteredStudies.map((s, i) => (
            <div key={s.slug} className={i % 3 === 0 ? "md:col-span-2" : undefined}>
              <ProjectCard study={s} large={i % 3 === 0} />
            </div>
          ))}
          {filteredStudies.length === 0 && <p className="text-muted">No case studies match this filter yet.</p>}
        </div>
      )}

      <div className="mt-20">
        <h2 className="text-display-md">Clients</h2>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence initial={false} mode="popLayout">
            {filteredClients.map((c) => (
              <m.li
                key={c.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="bg-paper"
              >
                {(() => {
                  const inner = (
                    <div className="group flex h-full flex-col items-center gap-4 p-6 text-center sm:p-8">
                      <Image
                        src={c.logo}
                        alt=""
                        width={96}
                        height={96}
                        sizes="96px"
                        className="h-20 w-20 rounded-full transition-transform duration-500 ease-edge group-hover:scale-105 sm:h-24 sm:w-24"
                      />
                      <div>
                        <p className="font-semibold leading-snug">{c.name}</p>
                        <p className="mt-1 text-sm text-muted">{c.sector}</p>
                      </div>
                    </div>
                  );
                  return c.caseStudy ? <Link href={`/work/${c.caseStudy}`}>{inner}</Link> : inner;
                })()}
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
