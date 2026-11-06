/** Company narrative content: process, differentiators, audit scope and reserved offers. */

export const processSteps = [
  { index: "01", title: "Discover", body: "We learn the business before the brief: your customers, margins, competitors and what has and hasn’t worked so far." },
  { index: "02", title: "Strategy", body: "A written plan with one clear objective, the channels that serve it, the budget it needs and how we’ll measure it." },
  { index: "03", title: "Create", body: "Design, copy, video and pages produced in-house, so the idea survives from concept to the final frame." },
  { index: "04", title: "Launch", body: "Tracking verified before anything goes live. Campaigns, content and sites released on an agreed schedule." },
  { index: "05", title: "Optimise", body: "Weekly reviews of what the numbers are saying. We cut what isn’t working and put more behind what is." },
  { index: "06", title: "Scale", body: "Once the unit economics hold, we grow budgets, channels and output — not before." },
];

export const differentiators = [
  {
    index: "01",
    title: "Creative and performance under one roof.",
    body: "The people making your ads sit next to the people buying the media. Creative gets judged on results, and results get better creative. No hand-offs between agencies.",
  },
  {
    index: "02",
    title: "Built for North Eastern markets.",
    body: "We’re based in Guwahati and work with brands across Assam. We understand the languages, festivals, media habits and buying behaviour here — and how to take a regional brand national.",
  },
  {
    index: "03",
    title: "Small enough to care. Built to scale.",
    body: "You work directly with the people doing the work. Senior attention on every account, with the production capacity to grow with you.",
  },
];

export const auditScope = [
  { title: "Website", body: "Speed, mobile experience, clarity of offer and the path to enquiry." },
  { title: "Instagram & social", body: "Profile, content mix, consistency and how well posts lead to action." },
  { title: "Paid advertising", body: "Account structure, tracking, creative and where budget is leaking." },
  { title: "Conversion funnel", body: "What happens between a click and a customer — forms, WhatsApp, follow-up." },
  { title: "Local search", body: "Google Business Profile, local rankings and consistency of your listings." },
  { title: "Brand consistency", body: "Whether your visuals and message are the same everywhere customers meet you." },
];

export const auditOutcomes = [
  "A 30-minute call with our team, on video or in person in Guwahati",
  "The three to five issues most likely holding growth back",
  "Recommended next actions you can take with or without us",
];

/**
 * Productised offers are reserved for a future pricing page. The current site
 * does not publish pricing packages.
 */
export type Offer = {
  name: string;
  summary: string;
  includes: string[];
  startingPrice?: string;
  approved: boolean;
};

export const offers: Offer[] = [
  {
    name: "Social Media Growth System",
    summary: "Monthly strategy, content production and community management.",
    includes: ["Content strategy & calendar", "Reels, carousels & statics", "Publishing & community", "Monthly report"],
    approved: false,
  },
  {
    name: "Performance Ads Sprint",
    summary: "A focused campaign build and optimisation cycle on Meta and/or Google.",
    includes: ["Tracking audit & fixes", "Campaign build", "Ad creative set", "Weekly optimisation"],
    approved: false,
  },
  {
    name: "Brand Launch System",
    summary: "Positioning, identity and launch assets for new or rebranding businesses.",
    includes: ["Discovery workshop", "Identity system", "Guidelines", "Launch templates"],
    approved: false,
  },
  {
    name: "Website Conversion Package",
    summary: "A fast, conversion-focused website or landing page set.",
    includes: ["UX & content plan", "Design", "Development", "Tracking & SEO setup"],
    approved: false,
  },
  {
    name: "Content Production Day",
    summary: "A planned shoot day producing a month of photo and video content.",
    includes: ["Pre-production & shot list", "Full-day shoot", "Edited reels & photos"],
    approved: false,
  },
];

export const engagementModels = [
  { title: "Monthly retainer", body: "Ongoing social, content and performance work with a fixed monthly scope. Best for brands that need consistent output and optimisation." },
  { title: "Project", body: "Fixed scope and timeline for brand identities, websites, campaigns and video productions." },
  { title: "Sprint", body: "A short, focused engagement to fix a specific problem — tracking, a launch, a campaign reset." },
];
