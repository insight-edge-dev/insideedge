import { showDrafts } from "@/config/site";

/**
 * Case studies. Only entries with `status: "published"` render in production
 * and appear in the sitemap. Every numeric result MUST carry a source and period.
 *
 * TODO_CONTENT: No verified case studies have been supplied yet. The draft
 * below exists only to preview the template in development — replace it with
 * real projects (see CONTENT_REQUIRED.md → Case studies).
 */

export type Metric = {
  value: string;
  label: string;
  /** e.g. "Meta Ads Manager · Jan–Mar 2026" */
  source: string;
};

export type CaseStudy = {
  slug: string;
  status: "draft" | "published";
  client: string;
  clientSlug?: string;
  title: string;
  industry: string;
  year: string;
  services: string[];
  /** One-line objective or result for cards. */
  summary: string;
  cover?: { src: string; alt: string; width: number; height: number };
  challenge: string;
  objective: string;
  strategy: string;
  execution: string[];
  metrics: Metric[];
  quote?: { text: string; name: string; role: string };
  gallery: { src: string; alt: string; width: number; height: number }[];
};

const allCaseStudies: CaseStudy[] = [
  {
    slug: "case-study-template",
    status: "draft",
    client: "TODO_CONTENT: Client name",
    title: "TODO_CONTENT: Project title",
    industry: "TODO_CONTENT: Industry",
    year: "2026",
    services: ["social-media-marketing", "performance-marketing"],
    summary: "TODO_CONTENT: One-line objective or verified result.",
    challenge: "TODO_CONTENT: What problem did the client come to us with?",
    objective: "TODO_CONTENT: What did success look like, in measurable terms?",
    strategy: "TODO_CONTENT: The core idea and why it was the right approach.",
    execution: [
      "TODO_CONTENT: What we produced or ran — step one",
      "TODO_CONTENT: Step two",
      "TODO_CONTENT: Step three",
    ],
    metrics: [
      { value: "TODO", label: "TODO_CONTENT: verified metric", source: "TODO_CONTENT: source · period" },
    ],
    gallery: [],
  },
];

export const caseStudies = allCaseStudies.filter((c) => c.status === "published" || showDrafts);

export const publishedCaseStudies = allCaseStudies.filter((c) => c.status === "published");

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function caseStudiesForService(slug: string) {
  return caseStudies.filter((c) => c.services.includes(slug));
}
