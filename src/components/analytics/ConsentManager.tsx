"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";
import { analyticsConfig, CONSENT_STORAGE_KEY } from "@/config/analytics";

type Consent = { analytics: boolean; marketing: boolean; ts: number };

export const OPEN_CONSENT_EVENT = "ie:open-consent";


/* Consent lives in localStorage, exposed to React as an external store. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function parse(raw: string): Consent | null {
  try {
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/** In-memory fallback when storage is blocked, so a choice still hides the banner. */
let memoryChoice = "";

function injectInline(id: string, code: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.text = code;
  document.head.appendChild(s);
}

/** Official Meta Pixel base code, loaded only after marketing consent. */
function loadMetaPixel(id: string) {
  if (!id || !/^\d+$/.test(id)) return;
  injectInline(
    "meta-pixel",
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","${id}");fbq("track","PageView");`,
  );
}

/** Official Microsoft Clarity snippet, loaded only after analytics consent. */
function loadClarity(id: string) {
  if (!id || !/^[a-z0-9]+$/i.test(id)) return;
  injectInline(
    "ms-clarity",
    `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`,
  );
}

function applyConsent(c: Consent) {
  const m = c.marketing ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
  });
  if (c.marketing) loadMetaPixel(analyticsConfig.metaPixelId);
  if (c.analytics) loadClarity(analyticsConfig.clarityId);
}

export function ConsentManager() {
  // Server renders the banner; an inline script in <head> hides it before first
  // paint for returning visitors (see CONSENT_HIDE_SCRIPT). This keeps the banner
  // out of the late-render path so it never becomes the LCP element.
  const stored = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const raw = stored || memoryChoice;
  const consent = parse(raw);
  const [reopened, setReopened] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const titleId = useId();

  useEffect(() => {
    if (consent) applyConsent(consent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  useEffect(() => {
    const reopen = () => {
      const current = parse(getSnapshot() || memoryChoice);
      if (current) {
        setAnalytics(current.analytics);
        setMarketing(current.marketing);
      }
      setReopened(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const save = useCallback((c: Omit<Consent, "ts">) => {
    const value = JSON.stringify({ ...c, ts: Date.now() } satisfies Consent);
    memoryChoice = value;
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      /* storage blocked — choice applies for this visit only */
    }
    setReopened(false);
    document.documentElement.dataset.consent = "1";
    listeners.forEach((l) => l());
  }, []);

  const details = reopened;
  const open = !consent || reopened;
  if (!open) return null;

  return (
    <div
      role="region"
      aria-labelledby={titleId}
      data-consent-banner={reopened ? "reopened" : "initial"}
      className="fixed inset-x-3 bottom-3 z-(--z-consent) mx-auto max-w-xl rounded-card border border-line-dark bg-ink p-5 text-paper shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <p id={titleId} className="font-display text-lg font-semibold">
        Cookies, honestly.
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-dark">
        We use analytics to see which pages help people and marketing cookies to measure our ads. Nothing loads
        until you choose. <Link href="/privacy-policy#cookies" className="text-paper underline underline-offset-2">Read our cookie policy</Link>
      </p>

      {details && (
        <fieldset className="mt-4 space-y-3 border-t border-line-dark pt-4 text-sm">
          <legend className="sr-only">Cookie preferences</legend>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 accent-[var(--color-edge)]" />
            <span><strong className="font-semibold">Essential</strong> — needed for the site and forms to work.</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 accent-[var(--color-edge)]" />
            <span><strong className="font-semibold">Analytics</strong> — Google Analytics, Microsoft Clarity.</span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 accent-[var(--color-edge)]" />
            <span><strong className="font-semibold">Marketing</strong> — Meta Pixel, Google Ads measurement.</span>
          </label>
        </fieldset>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save({ analytics: true, marketing: true })}
          className="h-10 rounded-full bg-edge px-5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => save({ analytics: false, marketing: false })}
          className="h-10 rounded-full border border-line-dark px-5 text-sm font-semibold transition-colors hover:border-paper"
        >
          Reject non-essential
        </button>
        {details ? (
          <button
            type="button"
            onClick={() => save({ analytics, marketing })}
            className="h-10 rounded-full px-4 text-sm font-semibold underline underline-offset-4"
          >
            Save choices
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setReopened(true)}
            className="h-10 rounded-full px-4 text-sm font-semibold underline underline-offset-4"
          >
            Preferences
          </button>
        )}
      </div>
    </div>
  );
}
