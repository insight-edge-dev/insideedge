import { getService, services } from "@/data/services";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge service";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  return renderOg({ title: service?.headline ?? "InsideEdge", eyebrow: service?.name });
}
