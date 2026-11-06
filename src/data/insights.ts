import { showDrafts } from "@/config/site";

/**
 * Insights (articles). Content is stored as typed blocks so it renders as
 * server HTML with no MDX toolchain. Drafts never render in production.
 *
 * TODO_CONTENT: both articles below are drafts written as a starting point.
 * They need editorial review, a named author and publication approval.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  status: "draft" | "published";
  title: string;
  description: string;
  category: string;
  author: { name: string; role: string };
  published: string;
  updated?: string;
  relatedServices: string[];
  body: Block[];
};

export const categories = [
  "Social Media",
  "Performance Marketing",
  "Branding",
  "Websites",
  "SEO",
  "North East Marketing",
] as const;

const allArticles: Article[] = [
  {
    slug: "meta-ads-tracking-checklist",
    status: "draft",
    title: "Before you spend another rupee on Meta Ads, check these six things",
    description:
      "A practical tracking and setup checklist for businesses running Facebook and Instagram ads — so the algorithm can actually learn who your customers are.",
    category: "Performance Marketing",
    author: { name: "InsideEdge Team", role: "Performance Marketing" },
    published: "2026-09-28",
    relatedServices: ["meta-ads", "performance-marketing"],
    body: [
      { type: "p", text: "Most underperforming ad accounts we review don’t have a creative problem or a budget problem first. They have a measurement problem. If Meta can’t see which clicks turned into customers, it optimises for the wrong people — and your cost per lead climbs." },
      { type: "h2", id: "pixel", text: "1. Your Pixel fires on the right events" },
      { type: "p", text: "Open Events Manager and confirm that PageView, Lead and (if relevant) Purchase are firing — once each, on the right pages. Duplicate events inflate results; missing events starve the algorithm." },
      { type: "h2", id: "capi", text: "2. Conversions API is connected" },
      { type: "p", text: "Browser tracking loses data to ad blockers and privacy settings. Sending events server-side through the Conversions API recovers much of that signal. Check the event match quality score in Events Manager." },
      { type: "h2", id: "objective", text: "3. The campaign objective matches the goal" },
      { type: "p", text: "Boosted posts optimise for engagement. If you want enquiries, use a Leads or Sales objective and tell Meta which event counts as success." },
      { type: "h2", id: "whatsapp", text: "4. WhatsApp clicks are measured" },
      { type: "p", text: "In Assam and the wider North East, many customers would rather message than fill in a form. If you run click-to-WhatsApp ads, make sure conversations are tracked so you can compare them with form leads." },
      { type: "h2", id: "utm", text: "5. Every ad has UTM parameters" },
      { type: "p", text: "UTMs let Google Analytics attribute visits and enquiries to specific campaigns and creatives, giving you a second view that doesn’t depend on Meta’s own reporting." },
      { type: "h2", id: "landing", text: "6. The landing page finishes the job" },
      { type: "ul", items: ["Loads in under three seconds on mobile data", "Repeats the promise made in the ad", "Has one obvious next step", "Shows proof: real clients, real work"] },
      { type: "callout", text: "Want us to run this checklist on your account? Our free growth audit covers tracking, campaigns and landing pages." },
    ],
  },
  {
    slug: "instagram-content-plan-local-business",
    status: "draft",
    title: "A simple Instagram content plan for local businesses in Guwahati",
    description:
      "How to plan a month of Instagram content that answers customer questions and drives enquiries — without posting every day.",
    category: "Social Media",
    author: { name: "InsideEdge Team", role: "Social Media" },
    published: "2026-09-28",
    relatedServices: ["social-media-marketing", "video-production"],
    body: [
      { type: "p", text: "You don’t need to post every day. You need to post with a purpose. Here’s the framework we use to plan a month of content for local businesses." },
      { type: "h2", id: "pillars", text: "Start with four content pillars" },
      { type: "ul", items: ["Proof — results, reviews, before-and-afters", "Process — how you work and why it’s better", "People — the team and customers behind the brand", "Offer — what to buy, why now, and how"] },
      { type: "h2", id: "cadence", text: "Pick a cadence you can sustain" },
      { type: "p", text: "Three quality posts a week, every week, beats seven rushed posts followed by a month of silence. Batch-produce content so a busy week doesn’t break the schedule." },
      { type: "h2", id: "local", text: "Make it local" },
      { type: "p", text: "Customers in Guwahati respond to places, language and references they recognise. Shoot on location, feature local customers (with permission) and don’t be afraid of Assamese captions where they fit your audience." },
      { type: "h2", id: "cta", text: "End every post with a next step" },
      { type: "p", text: "Save, share, DM, WhatsApp, visit — every post should tell people what to do next." },
      { type: "callout", text: "Need help turning this into a real calendar? Book a free audit and we’ll review your current account." },
    ],
  },
];

export const articles = allArticles
  .filter((a) => a.status === "published" || showDrafts)
  .sort((a, b) => b.published.localeCompare(a.published));

export const publishedArticles = allArticles.filter((a) => a.status === "published");

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function wordCount(a: Article) {
  return a.body
    .map((b) => (b.type === "ul" ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
}
