import type { MetadataRoute } from "next";
import { publishedCaseStudies } from "@/data/case-studies";
import { publishedArticles } from "@/data/insights";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/utils";

/** Public, indexable pages only. Drafts, /thank-you and /links are excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/work", 0.9],
    ["/free-audit", 0.9],
    ["/contact", 0.8],
    ["/about", 0.7],
    ["/insights", 0.6],
    ["/privacy-policy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...staticRoutes.map(([path, priority]) => ({ url: absoluteUrl(path), lastModified: now, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: now, priority: 0.8 })),
    ...publishedCaseStudies.map((c) => ({ url: absoluteUrl(`/work/${c.slug}`), lastModified: now, priority: 0.7 })),
    ...publishedArticles.map((a) => ({
      url: absoluteUrl(`/insights/${a.slug}`),
      lastModified: new Date(a.updated ?? a.published),
      priority: 0.6,
    })),
  ];
}
