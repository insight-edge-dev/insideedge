import { articles, getArticle } from "@/data/insights";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "InsideEdge insight";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  return renderOg({ title: article?.title ?? "InsideEdge Insights", eyebrow: article?.category ?? "Insights" });
}
