"use client";

import { OPEN_CONSENT_EVENT } from "@/components/analytics/ConsentManager";

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className ?? "hover:text-paper"}
    >
      Cookie settings
    </button>
  );
}
