import Image from "next/image";
import { clients, sectorCounts } from "@/data/clients";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Proof by breadth: the real client roster grouped by sector. Used while
 * detailed case studies are being prepared. No invented results.
 */
export function SectorIndex({ limit }: { limit?: number }) {
  const rows = limit ? sectorCounts.slice(0, limit) : sectorCounts;
  return (
    <ul className="border-t border-ink/15">
      {rows.map(({ sector }) => {
        const list = clients.filter((c) => c.sector === sector);
        return (
          <Reveal as="li" key={sector} className="group border-b border-ink/15">
            <div className="grid gap-4 py-7 md:grid-cols-12 md:items-center md:gap-8">
              <h3 className="font-display text-display-sm font-semibold transition-transform duration-(--duration-base) ease-edge md:col-span-4 md:group-hover:translate-x-2">
                {sector}
              </h3>
              <p className="text-muted md:col-span-5">{list.map((c) => c.name).join(" · ")}</p>
              <div className="flex -space-x-3 md:col-span-3 md:justify-end">
                {list.slice(0, 4).map((c) => (
                  <Image
                    key={c.slug}
                    src={c.logo}
                    alt=""
                    width={96}
                    height={96}
                    sizes="48px"
                    className="h-12 w-12 rounded-full ring-2 ring-paper transition-transform duration-(--duration-base) ease-edge group-hover:-translate-y-1"
                  />
                ))}
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
