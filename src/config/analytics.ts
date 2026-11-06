/**
 * Analytics IDs. All optional — a missing ID means that integration is not loaded.
 * If GTM is configured, GA4 should be configured inside GTM and NEXT_PUBLIC_GA_ID
 * left empty to avoid double-counting.
 */
export const analyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  /** Existing InsideEdge Pixel preserved as the default so tracking isn't lost during migration. */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "966296406185417",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
};

export const CONSENT_STORAGE_KEY = "ie_consent_v1";

/** Runs in <head> before paint: marks returning visitors so CSS hides the server-rendered consent banner. */
export const CONSENT_HIDE_SCRIPT = `try{if(localStorage.getItem("${CONSENT_STORAGE_KEY}"))document.documentElement.dataset.consent="1"}catch(e){}`;
