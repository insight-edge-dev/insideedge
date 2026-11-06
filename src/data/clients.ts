/**
 * Client roster, sourced from the client-logo sheet previously published on
 * this site. TODO_CONTENT: management to confirm each name, the sector label,
 * the services delivered and permission to display every logo.
 */

export type Sector =
  | "Healthcare"
  | "Education"
  | "Government & Public Sector"
  | "Non-profit & Development"
  | "Building Materials"
  | "Consumer & FMCG"
  | "Food & Beverage"
  | "Retail & E-commerce"
  | "Technology"
  | "Travel & Hospitality"
  | "Wellness"
  | "Real Estate";

export type Client = {
  slug: string;
  name: string;
  sector: Sector;
  logo: string;
  /** Slug of a published case study, if one exists. */
  caseStudy?: string;
};

const logo = (slug: string) => `/clients/${slug}.webp`;

export const clients: Client[] = [
  { slug: "jio", name: "Jio", sector: "Technology" },
  { slug: "dabur", name: "Dabur", sector: "Consumer & FMCG" },
  { slug: "canon", name: "Canon", sector: "Technology" },
  { slug: "jica", name: "JICA", sector: "Non-profit & Development" },
  { slug: "dalmia-cement", name: "Dalmia Cement", sector: "Building Materials" },
  { slug: "iit-guwahati", name: "IIT Guwahati", sector: "Education" },
  { slug: "assam-cancer-care-foundation", name: "Assam Cancer Care Foundation", sector: "Healthcare" },
  { slug: "animal-husbandry-assam", name: "Animal Husbandry & Veterinary Department, Assam", sector: "Government & Public Sector" },
  { slug: "max-cement", name: "Max Cement", sector: "Building Materials" },
  { slug: "pittie-group", name: "Pittie Group", sector: "Building Materials" },
  { slug: "power-roof", name: "Power Roof", sector: "Building Materials" },
  { slug: "power-lite", name: "Power Lite", sector: "Building Materials" },
  { slug: "aahii", name: "Assam Advanced Healthcare Innovation Institute", sector: "Healthcare" },
  { slug: "nirala-poly-clinic", name: "Nirala Poly Clinic", sector: "Healthcare" },
  { slug: "neriwalm", name: "NERIWALM", sector: "Education" },
  { slug: "symbiosis-academy", name: "Symbiosis Academy", sector: "Education" },
  { slug: "rgvn", name: "RGVN", sector: "Non-profit & Development" },
  { slug: "neir-foundation", name: "NEIR Foundation", sector: "Non-profit & Development" },
  { slug: "jci-tezpur-rise-east", name: "JCI Tezpur Rise East", sector: "Non-profit & Development" },
  { slug: "assam-bocw-welfare-board", name: "Assam Building & Other Construction Workers’ Welfare Board", sector: "Government & Public Sector" },
  { slug: "siddhi-yoga-centre", name: "Siddhi — The Yoga Centre", sector: "Wellness" },
  { slug: "siddhi-greens", name: "Siddhi Greens", sector: "Real Estate" },
  { slug: "chakaa-chak", name: "Chakaa Chak", sector: "Food & Beverage" },
  { slug: "bee-tee-agro", name: "Bee Tee Agro F&B", sector: "Food & Beverage" },
  { slug: "shubh-kart", name: "Shubh Kart", sector: "Retail & E-commerce" },
  { slug: "travelidea", name: "Travelidea", sector: "Travel & Hospitality" },
  { slug: "qbohr", name: "QBohr", sector: "Technology" },
  { slug: "adc", name: "ADC", sector: "Consumer & FMCG" },
].map((c) => ({ ...c, logo: logo(c.slug) })) as Client[];

export const sectors = Array.from(new Set(clients.map((c) => c.sector))).sort();

export const sectorCounts = sectors
  .map((sector) => ({ sector, count: clients.filter((c) => c.sector === sector).length }))
  .sort((a, b) => b.count - a.count);
