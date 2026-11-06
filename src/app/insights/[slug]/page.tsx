import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle, wordCount } from "@/data/insights";
import { getServices } from "@/data/services";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { articleSchema, pageMetadata } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated ?? article.published,
    noindex: article.status !== "published",
  });
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const toc = article.body.filter((b) => b.type === "h2");
  const services = getServices(article.relatedServices);

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <article>
        <header className="bg-paper pt-[calc(var(--header-h)+clamp(2rem,6vw,5rem))] pb-section-sm">
          <div className="container-site">
            <Breadcrumbs
              className="mb-10"
              items={[
                { name: "Insights", path: "/insights" },
                { name: article.title, path: `/insights/${article.slug}` },
              ]}
            />
            <p className="label text-muted">
              {article.category} · {readingTime(wordCount(article))}
            </p>
            <h1 className="mt-6 max-w-5xl text-display-lg">{article.title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-muted">{article.description}</p>
            <p className="mt-8 text-sm text-muted">
              By {article.author.name} · <time dateTime={article.published}>{formatDate(article.published)}</time>
              {article.updated && (
                <>
                  {" "}
                  · Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
                </>
              )}
            </p>
          </div>
        </header>

        <div className="container-site grid gap-14 pb-section lg:grid-cols-12">
          {toc.length > 2 && (
            <nav aria-label="On this page" className="lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <p className="label text-muted">On this page</p>
                <ol className="mt-4 space-y-2 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="link-underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          )}

          <div className="prose-ie lg:col-span-7 lg:col-start-5">
            {article.body.map((b, i) => {
              switch (b.type) {
                case "h2":
                  return (
                    <h2 key={i} id={b.id} className="scroll-mt-28">
                      {b.text}
                    </h2>
                  );
                case "p":
                  return <p key={i}>{b.text}</p>;
                case "ul":
                  return (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  );
                case "callout":
                  return (
                    <aside key={i} className="not-prose my-10 border-l-[3px] border-edge bg-paper-2 p-6">
                      <p className="!mb-4 font-display text-xl font-semibold !text-ink">{b.text}</p>
                      <ButtonLink href="/free-audit" variant="ink">
                        Book a free audit
                      </ButtonLink>
                    </aside>
                  );
              }
            })}

            {services.length > 0 && (
              <div className="mt-14 border-t border-line pt-8">
                <p className="label text-muted">Related services</p>
                <ul className="!mt-4 !list-none !pl-0">
                  {services.map((s) => (
                    <li key={s.slug} className="!pl-0">
                      <Link href={`/services/${s.slug}`}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>
      <FinalCta />
    </>
  );
}
