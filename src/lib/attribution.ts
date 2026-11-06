"use client";

/**
 * Lead attribution. First touch is kept for 90 days in localStorage; the
 * session touch is kept in sessionStorage. Both are attached to form submissions.
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const FIRST_KEY = "ie_attr_first";
const SESSION_KEY = "ie_attr_session";
const FIRST_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const ls = () => window.localStorage;
const ss = () => window.sessionStorage;

export type Touch = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  ts?: number;
};

function read(storage: () => Storage, key: string): Touch | null {
  try {
    const raw = storage().getItem(key);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
}

function write(storage: () => Storage, key: string, value: Touch) {
  try {
    storage().setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — attribution is best effort */
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const touch: Touch = {
    landing_page: window.location.pathname + window.location.search,
    referrer: document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : undefined,
    ts: Date.now(),
  };
  let hasUtm = false;
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) {
      touch[key] = v.slice(0, 120);
      hasUtm = true;
    }
  }

  const session = read(ss, SESSION_KEY);
  if (!session || hasUtm) write(ss, SESSION_KEY, touch);

  const first = read(ls, FIRST_KEY);
  if (!first || (first.ts && Date.now() - first.ts > FIRST_TTL_MS)) write(ls, FIRST_KEY, touch);
}

export function getAttribution() {
  if (typeof window === "undefined") return {};
  const flat: Record<string, string> = {};
  const add = (prefix: string, t: Touch | null) => {
    if (!t) return;
    for (const [k, v] of Object.entries(t)) {
      if (k !== "ts" && v) flat[`${prefix}${k}`] = String(v);
    }
  };
  add("first_", read(ls, FIRST_KEY));
  add("", read(ss, SESSION_KEY));
  return flat;
}
