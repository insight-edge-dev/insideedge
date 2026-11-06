import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Booking CTA. Uses NEXT_PUBLIC_BOOKING_URL (Cal.com, Calendly, etc.). Renders
 * nothing until a booking account is configured, so there are no dead links.
 */
export function BookingLink({ label = "Book a 30-minute call", tone = "paper" }: { label?: string; tone?: "paper" | "ink" }) {
  const url = siteConfig.links.booking;
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-track="booking"
      className={
        tone === "ink"
          ? "group flex items-center justify-between gap-4 rounded-card border border-line-dark p-6 transition-colors hover:border-edge"
          : "group flex items-center justify-between gap-4 rounded-card border border-ink/20 p-6 transition-colors hover:border-ink"
      }
    >
      <span>
        <span className="block font-display text-xl font-semibold">{label}</span>
        <span className="text-sm opacity-70">Pick a time that suits you</span>
      </span>
      <CalendarDays aria-hidden className="h-8 w-8" />
    </a>
  );
}
