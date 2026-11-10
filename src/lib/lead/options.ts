/** Form option lists. Kept free of Zod so client components can import them cheaply. */
export const budgetOptions = [
  "Under ₹25,000 / month",
  "₹25,000 – ₹75,000 / month",
  "₹75,000 – ₹2,00,000 / month",
  "Above ₹2,00,000 / month",
  "One-off project",
  "Not sure yet",
] as const;

export const timelineOptions = ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"] as const;

export const serviceInterestOptions = [
  "Complete Brand Creation & Launch",
  "Manufacturer Discovery & Sourcing Coordination",
  "Brand Strategy & Identity",
  "Packaging & Label Design",
  "Website & E-commerce Development",
  "Social Media Marketing",
  "Performance Marketing",
  "SEO",
  "Influencer Marketing",
  "Creative Production",
  "Other / Not Sure Yet",
] as const;

export const leadSources = ["contact", "free-audit", "service", "links"] as const;

export type LeadSource = (typeof leadSources)[number];
