"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { primaryNav, siteConfig, socialLinks } from "@/config/site";
import { getLenis } from "@/components/motion/SmoothScroll";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappUrl } from "@/lib/utils";
import { Logo } from "./Logo";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Full-screen menu. Modal dialog semantics, focus trap, Escape to close, scroll locked. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    trigger.current = document.activeElement;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("a,button")?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled])");
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      (trigger.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-track-location="mobile_menu"
          className="theme-ink fixed inset-0 z-(--z-menu) flex flex-col overflow-y-auto bg-ink text-paper"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="container-site flex h-(--header-h) shrink-0 items-center justify-between">
            <Logo light />
            <button type="button" onClick={onClose} className="-mr-2 flex h-11 items-center gap-2 px-2 text-sm font-semibold">
              Close <X aria-hidden className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-site flex-1 pt-6">
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...primaryNav, { href: "/free-audit", label: "Free Audit" }].map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <m.span
                    className="block"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.12 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="font-display text-[clamp(2.25rem,11vw,3.5rem)] leading-[1.1] font-semibold tracking-tight transition-colors hover:text-edge"
                    >
                      {item.label}
                    </Link>
                  </m.span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-site shrink-0 space-y-5 pt-10 pb-8">
            <a
              href={whatsappUrl("Hi InsideEdge, I'd like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-edge font-semibold text-ink"
            >
              <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-dark">
              {siteConfig.contact.numbers.map((number) => (
                <a key={number.e164} href={`tel:${number.e164}`} className="hover:text-paper">
                  {number.display}
                </a>
              ))}
              {siteConfig.contact.email && (
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-paper">
                  {siteConfig.contact.email}
                </a>
              )}
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
