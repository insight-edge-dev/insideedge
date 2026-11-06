import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Contextual WhatsApp link. Every placement passes its own opening line. */
export function whatsappUrl(message?: string, phone = siteConfig.contact.whatsapp) {
  const text =
    message ?? "Hi InsideEdge, I found you on your website and would like to discuss a project.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/** Appends UTM parameters, used for owned links such as /links (Instagram bio). */
export function withUtm(path: string, utm: { source: string; medium: string; campaign: string; content?: string }) {
  const [base, hash] = path.split("#");
  const url = new URL(base, siteConfig.url);
  url.searchParams.set("utm_source", utm.source);
  url.searchParams.set("utm_medium", utm.medium);
  url.searchParams.set("utm_campaign", utm.campaign);
  if (utm.content) url.searchParams.set("utm_content", utm.content);
  return `${url.pathname}${url.search}${hash ? `#${hash}` : ""}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function readingTime(words: number) {
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
