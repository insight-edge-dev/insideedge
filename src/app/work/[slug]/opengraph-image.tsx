import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  return renderOg({ title: study?.title ?? "InsideEdge Work", eyebrow: study ? `Case study · ${study.client}` : "Work" });
}
