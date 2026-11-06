import Link from "next/link";
import { type Article, wordCount } from "@/data/insights";
import { formatDate, readingTime } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/insights/${article.slug}`} className="group flex h-full flex-col border-t-[3px] border-ink pt-6 transition-colors hover:border-edge">
      <p className="label text-muted">
        {article.category} · {readingTime(wordCount(article))}
      </p>
      <h3 className="mt-4 text-display-sm transition-transform duration-(--duration-base) ease-edge group-hover:translate-x-1">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-muted">{article.description}</p>
      <p className="mt-6 text-sm text-muted">
        <time dateTime={article.published}>{formatDate(article.published)}</time>
        {article.status === "draft" && <span className="ml-3 rounded-full bg-edge px-2 py-0.5 text-xs font-semibold text-ink">Draft</span>}
      </p>
    </Link>
  );
}
