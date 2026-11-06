"use client";

import { analyticsConfig } from "@/config/analytics";

/**
 * The complete list of custom events. Keep it short: every event here should
 * answer a business question (what drives enquiries?).
 */
export type AnalyticsEvent =
  | "brand_launch_cta_click"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "form_start"
  | "form_submit"
  | "form_error"
  | "booking_click"
  | "booking_complete"
  | "service_page_view"
  | "case_study_view"
  | "portfolio_filter"
  | "video_start"
  | "video_50"
  | "video_complete"
  | "scroll_75"
  | "lead_magnet_download";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Meta standard events for the actions that matter to ad optimisation. */
const metaStandard: Partial<Record<AnalyticsEvent, string>> = {
  form_submit: "Lead",
  whatsapp_click: "Contact",
  phone_click: "Contact",
  email_click: "Contact",
  booking_click: "Schedule",
};

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const payload = { page_path: window.location.pathname, ...params };

  if (analyticsConfig.gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } else if (window.gtag) {
    window.gtag("event", event, payload);
  }

  const meta = metaStandard[event];
  if (window.fbq) {
    if (meta) window.fbq("track", meta, { content_name: event, ...params });
    else window.fbq("trackCustom", event, payload);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[track]", event, payload);
  }
}
