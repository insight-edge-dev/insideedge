"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** Access the active Lenis instance (null when disabled, e.g. reduced motion or touch). */
export function getLenis() {
  return instance;
}

/**
 * Inertial smooth scrolling for pointer devices. Touch devices keep native
 * scrolling (Lenis leaves touch alone by default) and reduced-motion users get
 * no smoothing at all. Anchors, keyboard and back/forward keep working.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = () => {
      if (reduced.matches || instance) return;
      instance = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -80 }, allowNestedScroll: true });
    };
    const stop = () => {
      instance?.destroy();
      instance = null;
    };
    start();
    const onChange = () => (reduced.matches ? stop() : start());
    reduced.addEventListener("change", onChange);
    return () => {
      reduced.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  // New page → start at the top without easing through the old one.
  useEffect(() => {
    if (!window.location.hash) instance?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
