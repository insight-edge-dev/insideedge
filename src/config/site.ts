/**
 * Single source of truth for business identity and contact details.
 * Every component reads NAP (name, address, phone) data from here so that
 * the website, structured data and footer can never disagree.
 */

const env = (key: string | undefined, fallback = "") =>
  key && key.trim().length > 0 ? key.trim() : fallback;

const primaryPhone = {
  label: "Primary",
  e164: "+917577012300",
  display: "+91 75770 12300",
  whatsapp: "917577012300",
};

const secondaryPhone = {
  label: "Alternate",
  e164: "+917086047498",
  display: "+91 70860 47498",
  whatsapp: "917086047498",
};

export const siteConfig = {
  name: "InsideEdge",
  legalName: "INSIDE EDGE",
  alternateNames: ["InsideEdge", "InsideEdge Marketing", "InsideEdge Agency"],
  foundingYear: "2018",
  tagline: "Creative that performs.",
  description:
    "InsideEdge is a creative and performance agency in Guwahati helping entrepreneurs create, launch and grow brands through sourcing coordination, strategy, identity, packaging, websites and marketing.",

  /** Canonical origin. No trailing slash. */
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "https://www.insideedge.in.net").replace(/\/$/, ""),

  /** `production` enables indexing. Anything else sends noindex. */
  environment: env(
    process.env.NEXT_PUBLIC_SITE_ENV,
    process.env.VERCEL_ENV === "production" ? "production" : process.env.VERCEL_ENV ? "preview" : "production",
  ),

  contact: {
    numbers: [
      {
        ...primaryPhone,
        e164: env(process.env.NEXT_PUBLIC_PRIMARY_PHONE_E164, primaryPhone.e164),
        display: env(process.env.NEXT_PUBLIC_PRIMARY_PHONE_DISPLAY, primaryPhone.display),
        whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, primaryPhone.whatsapp),
      },
      {
        ...secondaryPhone,
        e164: env(process.env.NEXT_PUBLIC_SECONDARY_PHONE_E164, secondaryPhone.e164),
        display: env(process.env.NEXT_PUBLIC_SECONDARY_PHONE_DISPLAY, secondaryPhone.display),
        whatsapp: env(process.env.NEXT_PUBLIC_SECONDARY_WHATSAPP_NUMBER, secondaryPhone.whatsapp),
      },
    ],
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, primaryPhone.whatsapp),
    phoneE164: env(process.env.NEXT_PUBLIC_PRIMARY_PHONE_E164, primaryPhone.e164),
    phoneDisplay: env(process.env.NEXT_PUBLIC_PRIMARY_PHONE_DISPLAY, primaryPhone.display),
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "insideedgellp@gmail.com"),
    responseTime: "We reply to every enquiry within one working day.",
    officeHours: "Monday to Saturday, 10:00 AM to 7:00 PM",
  },

  address: {
    streetAddress: "Hno 84, Ground Floor, S Sarania Road, Lachit Nagar",
    locality: "Guwahati",
    region: "Assam",
    postalCode: "781007",
    country: "IN",
    countryName: "India",
  },

  geoAreaServed: ["Guwahati", "Assam", "North East India", "India"],

  links: {
    instagram: "https://www.instagram.com/insideedge.marketing/",
    instagramHandle: "@insideedge.marketing",
    linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN_URL, ""),
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL, ""),
    googleMaps: env(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL, "https://share.google/MZp6fsnmTQe8S8YZw"),
    booking: env(process.env.NEXT_PUBLIC_BOOKING_URL, ""),
    showreel: env(process.env.NEXT_PUBLIC_SHOWREEL_URL, ""),
    showreelPoster: env(process.env.NEXT_PUBLIC_SHOWREEL_POSTER, ""),
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const isProduction = siteConfig.environment === "production";

/** Drafts (unverified case studies, articles, offers) are visible only outside production or when explicitly enabled. */
export const showDrafts =
  process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true" || process.env.NODE_ENV === "development";

export const formattedAddress = [
  siteConfig.address.streetAddress,
  `${siteConfig.address.locality}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`,
  siteConfig.address.countryName,
].join(", ");

export const mapsUrl =
  siteConfig.links.googleMaps ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;

export const primaryNav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const socialLinks = [
  { label: "Instagram", href: siteConfig.links.instagram },
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "Facebook", href: siteConfig.links.facebook },
].filter((l) => l.href);
