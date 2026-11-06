"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

/**
 * One delegated listener tracks every WhatsApp, phone, email and booking click
 * site-wide, so individual buttons don't need onClick handlers (and can stay
 * Server Components). `data-track-location` on an ancestor names the placement.
 */
export function AnalyticsListener() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    captureAttribution();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const location = a.closest<HTMLElement>("[data-track-location]")?.dataset.trackLocation ?? "unknown";
      if (href.startsWith("https://wa.me") || href.includes("api.whatsapp.com")) track("whatsapp_click", { location });
      else if (href.startsWith("tel:")) track("phone_click", { location });
      else if (href.startsWith("mailto:")) track("email_click", { location });
      else if (a.dataset.track === "booking") track("booking_click", { location });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Per-page: scroll depth + Meta PageView on client-side navigations.
  useEffect(() => {
    if (!firstRender.current) window.fbq?.("track", "PageView");
    firstRender.current = false;

    let fired = false;
    const onScroll = () => {
      if (fired) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.75) {
        fired = true;
        track("scroll_75");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}

/** Fires a single event when mounted, e.g. service_page_view. */
export function TrackOnMount({ event, params }: { event: Parameters<typeof track>[0]; params?: Record<string, string> }) {
  const key = JSON.stringify(params);
  useEffect(() => {
    track(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, key]);
  return null;
}
