# InsideEdge — www.insideedge.in.net

Production website for InsideEdge, a creative and performance marketing agency in Guwahati, Assam.
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · Zod.

## Commands

```bash
npm install
cp .env.example .env.local        # fill in what you have; everything is optional in dev
npm run dev                       # http://localhost:3000
npm run lint                      # ESLint
npm run typecheck                 # route typegen + tsc
npm run build                     # production build
PW_CHANNEL=chrome npm run test:e2e  # Playwright against the production build (run build first)
npm run check                     # all of the above
```

In development, leads without a delivery channel configured are logged to the terminal, and draft content is visible.

## Where things live

```
src/
├── config/        site.ts (NAP, links, env) · analytics.ts (tracking IDs)
├── data/          services · clients · case-studies · insights · people · company   ← edit content here
├── app/           routes (one folder per URL), sitemap, robots, OG images, /api/lead
├── components/
│   ├── layout/    Header, MobileMenu, Footer, StickyWhatsApp, Logo
│   ├── home/      Hero, HeroFrame, ClientMarquee, Statement, ServicesIndex, Process
│   ├── sections/  PageHero, FinalCta, SectorIndex, ProjectCard, ArticleCard, WhyUs, ResultsBand, Testimonials
│   ├── ui/        Button/ArrowLink, Section, Faq, Breadcrumbs, Highlight, BookingLink, VideoPlayer, icons
│   ├── motion/    SmoothScroll (Lenis), MotionProvider, Reveal/RevealText/EdgeLine, Magnetic, ScrollEdge
│   ├── forms/     LeadForm
│   ├── analytics/ Analytics, ConsentManager, AnalyticsListener
│   └── seo/       JsonLd
└── lib/           seo (metadata + schema) · analytics (track) · attribution (UTMs) · lead/* (schema, delivery, rate limit) · og
```

## Content rules

- **Never publish unverified proof.** Stats, testimonials and case-study results need a named source. Components that depend on proof (`ResultsBand`, `Testimonials`, team) render nothing when their data is empty.
- Case studies and articles have `status: "draft" | "published"`. Drafts are visible only in dev or with `NEXT_PUBLIC_SHOW_DRAFTS=true`, and are excluded from the sitemap.
- Contact details exist only in `src/config/site.ts`.
- Outstanding content: see **[CONTENT_REQUIRED.md](CONTENT_REQUIRED.md)**. Audit mapping: **[REDESIGN_AUDIT_CHECKLIST.md](REDESIGN_AUDIT_CHECKLIST.md)**. Deploy and domains: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## Design system

Tokens live in `src/app/globals.css` (`@theme`): `ink` #0a0a0a · `paper` #fafaf7 · `edge` #f0bf25 (sampled from the logo), display type scale (`text-display-*`), spacing (`py-section`), `rounded-card`, easing `ease-edge`, z-index scale.

The signature motif is the **edge**: a yellow line or bar that draws in from the left. It appears as the scroll-progress rail, heading underlines, word highlights, card hover rules and the page-transition sweep. The hero "E" frame echoes the logo's inward arrow.

Motion principles: transforms and opacity only; the hero reveal is pure CSS so it never waits for hydration; everything respects `prefers-reduced-motion`; Lenis is off for touch and reduced motion.

## Tracking

`track(event, params)` in `src/lib/analytics.ts` pushes to GTM (or gtag) and mirrors key actions to the Meta Pixel. WhatsApp, phone, email and booking clicks are captured site-wide by one delegated listener; mark a placement with `data-track-location="…"` on any ancestor.
