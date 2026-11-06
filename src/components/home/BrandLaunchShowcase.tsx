"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { brandLaunchCategories as categories } from "@/data/brand-launch";
import { track } from "@/lib/analytics";
import styles from "./BrandLaunchShowcase.module.css";

const DURATION = 7000;
const count = categories.length;
const number = (index: number) => String(index + 1).padStart(2, "0");
type SlideState = {
  index: number;
  visual: number;
  cycle: number;
  visited: number[];
  ready: number[];
  failed: number[];
  announcement: string;
};

function selectSlide(state: SlideState, target: number, manual: boolean): SlideState {
  const index = (target + count) % count;
  return {
    ...state,
    index,
    visual: state.ready.includes(index) ? index : state.visual,
    cycle: state.cycle + 1,
    visited: [...new Set([...state.visited, index])],
    announcement: manual ? `${categories[index].category}, ${index + 1} of ${count}` : "",
  };
}

export function BrandLaunchShowcase() {
  const root = useRef<HTMLElement>(null);
  const remaining = useRef(DURATION);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [state, setState] = useState<SlideState>({
    index: 0, visual: 0, cycle: 0, visited: [0], ready: [], failed: [], announcement: "",
  });
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const current = categories[state.index];
  const ready = state.ready.includes(state.index) || state.failed.includes(state.index);
  const running = inView && ready && !hidden && !reduced && !hovered && !focused;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    motion();
    visibility();
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.15), { threshold: 0.15 });
    if (root.current) observer.observe(root.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => { remaining.current = DURATION; }, [state.cycle]);
  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    const timer = window.setTimeout(() => {
      setState((previous) => selectSlide(previous, previous.index + 1, false));
    }, remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - start));
    };
  }, [running, state.cycle]);

  const navigate = (target: number) => setState((previous) => selectSlide(previous, target, true));
  const next = (state.index + 1) % count;

  return (
    <section
      ref={root}
      id="brand-launch"
      className={styles.showcase}
      aria-labelledby="brand-launch-title"
      aria-roledescription="carousel"
      data-track-location="brand_launch_showcase"
      data-category={current.id}
      data-motion={reduced ? "reduced" : "enabled"}
      data-autoplay={running ? "running" : "paused"}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onTouchStart={(event) => {
        if (event.touches.length !== 1 || (event.target as Element).closest("button, a")) {
          touch.current = null;
          return;
        }
        touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={(event) => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(state.index + (dx < 0 ? 1 : -1));
      }}
      onTouchCancel={() => { touch.current = null; }}
    >
      <header className={styles.intro}>
        <p className={styles.eyebrow}><span aria-hidden />From idea to market</p>
        <h2 id="brand-launch-title" className="sr-only">Your idea deserves a brand people remember.</h2>
        <span className={styles.signature}>InsideEdge <span aria-hidden>/</span> Creative that performs.</span>
      </header>

      <div className={styles.stage}>
        <div className={styles.copy}>
          <div className={styles.textStack}>
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={styles.text}
                data-active={index === state.index}
                aria-hidden={index !== state.index}
                inert={index !== state.index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}: ${category.category}`}
              >
                <p className={styles.category}><span>{number(index)}</span>{category.category}</p>
                <h3>{category.headline}</h3>
                <p className={styles.description}>{category.description}</p>
              </div>
            ))}
          </div>
          <Link
            href={`/contact?interest=${current.id}`}
            prefetch={false}
            className={styles.cta}
            onClick={() => track("brand_launch_cta_click", {
              category: current.id, slide_index: state.index + 1,
              cta_location: "brand_launch_showcase", contact_method: "contact_form",
            })}
          >
            <span>{current.ctaLabel}</span><ArrowUpRight size={20} aria-hidden />
          </Link>
        </div>

        <div
          className={styles.photography}
        >
          {categories.map((category, index) => {
            // Only mount viewed images and the next image, once the section is visible.
            if (!state.visited.includes(index) && !(inView && index === next && ready)) return null;
            const mobile = getImageProps({
              src: `/images/brand-launch/${category.id}-mobile.webp`,
              alt: category.imageAlt, fill: true, sizes: "100vw",
            }).props;
            return (
              <div
                key={category.id}
                className={styles.image}
                data-art={category.id}
                data-active={state.visual === index && !state.failed.includes(state.index)}
                aria-hidden={index !== state.index}
              >
                <picture>
                <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes="100vw" />
                <Image
                  src={`/images/brand-launch/${category.id}.webp`}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 767px) 100vw, 82vw"
                  loading={inView ? "eager" : "lazy"}
                  onLoad={() => setState((previous) => ({
                    ...previous,
                    ready: [...new Set([...previous.ready, index])],
                    visual: previous.index === index ? index : previous.visual,
                  }))}
                  onError={() => setState((previous) => ({ ...previous, failed: [...new Set([...previous.failed, index])] }))}
                />
                </picture>
              </div>
            );
          })}
          {state.failed.includes(state.index) && <p className={styles.imageError}>Concept photograph unavailable.</p>}
        </div>
      </div>

      <footer className={styles.navigation}>
        <div className={styles.categories} role="group" aria-label="Choose a brand category">
          {categories.map((category, index) => (
            <button
              type="button"
              key={category.id}
              aria-label={`Show ${category.category}`}
              aria-pressed={index === state.index}
              title={category.category}
              onClick={() => navigate(index)}
            >
              <span className={styles.navLabel}>{category.category}</span>
              <span className={styles.progressTrack} aria-hidden>
                {index === state.index && <span key={state.cycle} className={styles.progress} style={{ animationPlayState: running ? "running" : "paused" }} />}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.controls}>
          <button type="button" aria-label="Previous category" title="Previous category" onClick={() => navigate(state.index - 1)}><ArrowLeft size={18} aria-hidden /></button>
          <button type="button" aria-label="Next category" title="Next category" onClick={() => navigate(state.index + 1)}><ArrowRight size={18} aria-hidden /></button>
        </div>
      </footer>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{state.announcement}</p>
    </section>
  );
}
