"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getService } from "@/data/services";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/utils";

/** Pre-filled message that reflects the page the visitor is on. */
function messageFor(pathname: string) {
  const service = pathname.startsWith("/services/") ? getService(pathname.split("/")[2]) : undefined;
  if (service) return service.whatsapp;
  if (pathname.startsWith("/free-audit")) return "Hi InsideEdge, I'd like to book the free growth audit for my business.";
  if (pathname.startsWith("/work")) return "Hi InsideEdge, I was looking at your work and would like to discuss a project.";
  return undefined;
}

/** Mobile-only floating WhatsApp button — the primary conversion channel for Instagram traffic. */
export function StickyWhatsApp() {
  const pathname = usePathname();
  const [showcaseVisible, setShowcaseVisible] = useState(false);

  useEffect(() => {
    const showcase = document.querySelector("#brand-launch");
    if (!showcase) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = showcase.getBoundingClientRect();
        setShowcaseVisible(bounds.bottom > 0 && bounds.top < window.innerHeight);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  if (pathname === "/links" || pathname === "/thank-you") return null;
  return (
    <a
      href={whatsappUrl(messageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      data-track-location="sticky_mobile"
      aria-label="Chat with InsideEdge on WhatsApp"
      aria-hidden={showcaseVisible}
      tabIndex={showcaseVisible ? -1 : undefined}
      className={`fixed right-4 bottom-4 z-(--z-sticky) flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-[opacity,transform] duration-200 active:scale-95 lg:hidden ${showcaseVisible ? "pointer-events-none translate-y-3 scale-90 opacity-0" : "opacity-100"}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
