# Redesign audit checklist

**Source note:** the "360° Digital Presence, SEO, CRO & Sales Audit" document was **not present in the repository** when this work was done. This checklist covers (a) every audit issue the redesign brief references, (b) a full audit of this codebase, and (c) a review of the live legacy site insideedge.info. If the original audit contains items not listed here, append them and map them to a status.

**Status key:** ✅ Fixed · 🔁 Superseded · 📝 Needs business info · 🔑 Needs external account access

**Verification key:** `B` = `npm run build` · `L` = `npm run lint` · `T` = `tsc` · `E2E` = Playwright test · `LH` = Lighthouse · `M` = manual/visual check

| # | Issue | Implementation | Status | Files changed | External action | Verified by |
|---|---|---|---|---|---|---|
| 1 | Canonical/OG pointed to `insideedge.info`; site CTAs sent visitors to .info ("Visit Main Website") | All metadata built from `siteConfig.url` = `https://www.insideedge.in.net`; every .info link removed | ✅ | `src/config/site.ts`, `src/lib/seo.ts`, `src/app/layout.tsx`, all pages | — | E2E (no "insideedge.info" in HTML; canonical test) |
| 2 | Two competing company websites | Host-based 301s `insideedge.info/*` → `www.insideedge.in.net/*` (+ `/blog/:slug` → `/insights/:slug`) | ✅ code / 🔑 DNS | `next.config.ts`, `docs/DEPLOYMENT.md` | Point .info DNS at the Vercel project, or set registrar-level 301 | M (after DNS) |
| 3 | apex vs www not consolidated | 301 `insideedge.in.net` → `www.` in config; documented Vercel domain redirect | ✅ code / 🔑 | `next.config.ts` | Add both domains in Vercel, set apex to redirect | M |
| 4 | Conflicting NAP from legacy sources | `siteConfig` now publishes the confirmed primary number `+91 75770 12300`, alternate number `+91 70860 47498`, email, address, hours and Maps URL | ✅ | `src/config/site.ts`, contact surfaces | Add official LinkedIn/Facebook env vars; remove legacy .info/Paco references during domain migration | grep: no old 96781 number outside historical docs |
| 5 | Contact details duplicated in 5+ components | Centralised in `siteConfig`; `whatsappUrl()` helper | ✅ | `src/lib/utils.ts`, all components | — | grep |
| 6 | Single-page site; nothing to rank or link to | Multi-route site: services index + 9 service pages, work, case-study template, about, contact, free-audit, insights, links, legal, thank-you. Public pricing was removed by business choice. | ✅ | `src/app/**` | — | B |
| 7 | Fabricated/unverifiable stats (150+ brands, 5M+ views, 98% retention, 3×) | Removed. `ResultsBand` renders only from sourced case-study metrics | ✅ / 📝 | `src/app/page.tsx`, `ResultsBand.tsx` | Supply verified figures | M |
| 8 | Anonymous testimonials with specific performance claims | Removed. `Testimonials` renders only attributed quotes; empty = hidden | ✅ / 📝 | `src/data/people.ts`, `Testimonials.tsx` | Supply attributed quotes + permission | M |
| 9 | Client logos as one flattened image (`pic22.png`), weak alt text | 28 individual WebP logos with names as alt text, sector data, optional case-study link | ✅ / 📝 | `public/clients/*`, `src/data/clients.ts` | Confirm logo permissions / sectors | M, LH a11y 100 |
| 10 | EmailJS keys hard-coded in client JS; no server validation, no spam protection | Server route `/api/lead`: Zod validation, sanitisation, honeypot, time-trap, rate limit, origin check, optional Turnstile; Resend or EmailJS REST (server-side private key) + optional webhook. `@emailjs/browser` removed | ✅ / 🔑 | `src/app/api/lead/route.ts`, `src/lib/lead/*`, `LeadForm.tsx` | Add Resend or EmailJS private key in Vercel | E2E (422, honeypot, 403) |
| 11 | Form success/error unclear; no thank-you page for conversion tracking | Inline field errors (aria-invalid/describedby), network/server error with WhatsApp fallback, redirect to `/thank-you` | ✅ | `LeadForm.tsx`, `src/app/thank-you/page.tsx` | Create GA4/Meta conversion on `/thank-you` | E2E |
| 12 | Auto-opening lead popup after 2 s (hostile UX, scroll lock bug) | Removed | ✅ | deleted `lead-popup.tsx` | — | M |
| 13 | Clashing CTA bands (blue/green/red/yellow), pulsing gradient buttons | Replaced by the black/white/yellow design system | ✅ | deleted `cta.tsx`, `floating-cta.tsx`, `whatsapp-cta.tsx` | — | M |
| 14 | Generic WhatsApp message everywhere | Context-specific pre-filled messages per service/page; sticky mobile button adapts to route | ✅ | `services.ts`, `StickyWhatsApp.tsx` | — | E2E (Meta Ads message) |
| 15 | WhatsApp/phone/email clicks not tracked | Delegated listener → `whatsapp_click`, `phone_click`, `email_click`, `booking_click` with placement | ✅ | `AnalyticsListener.tsx`, `src/lib/analytics.ts` | — | M (dev console logs events) |
| 16 | Meta Pixel inline in layout, loaded without consent | Pixel preserved (same ID, env-overridable) but loaded only after marketing consent; route-change PageView | ✅ | `ConsentManager.tsx`, `config/analytics.ts` | Verify in Meta Events Manager | M |
| 17 | No GA4/GTM/Clarity | GTM or GA4 with Consent Mode v2; Clarity after consent | ✅ / 🔑 | `Analytics.tsx` | Create properties, add IDs | M |
| 18 | No UTM / attribution on leads | First-touch + session UTMs, landing page and referrer attached to every lead | ✅ | `src/lib/attribution.ts` | — | M |
| 19 | No consent mechanism | Server-rendered consent banner (accept / reject / preferences), footer "Cookie settings" | ✅ | `ConsentManager.tsx` | Legal review | E2E |
| 20 | No privacy policy / terms | Drafted (DPDP-aware), marked for legal review | ✅ / 📝 | `privacy-policy`, `terms` | Professional review | M |
| 21 | Whole homepage was a Client Component | Server Components by default; client only for interactive islands | ✅ | `src/app/page.tsx` and components | — | B |
| 22 | No sitemap / robots | `sitemap.ts` (published content only), `robots.ts` (noindex outside production + `X-Robots-Tag`) | ✅ | `src/app/sitemap.ts`, `robots.ts`, `next.config.ts` | Submit sitemap in Search Console | E2E |
| 23 | No structured data | Organization + ProfessionalService + WebSite graph; Service, FAQPage, BreadcrumbList, Article. No fake ratings | ✅ | `src/lib/seo.ts` | Validate in Rich Results Test after deploy | E2E |
| 24 | Generic keyword-stuffed metadata, no per-page titles | Unique title/description/canonical/OG/Twitter per page via `pageMetadata()` | ✅ | all pages | — | LH SEO 100 |
| 25 | No OG images | Branded dynamic OG images (root, key pages, each service/article/case study) | ✅ | `src/lib/og.tsx`, `**/opengraph-image.tsx` | — | B |
| 26 | No custom 404 | Branded "You've gone off strategy." with useful links | ✅ | `src/app/not-found.tsx` | — | E2E |
| 27 | `<img>` tags without optimisation; AVIF files named `.jpg` | `next/image` everywhere with `sizes`; mislabelled files removed; AVIF/WebP output | ✅ | components, `next.config.ts` | — | LH |
| 28 | Logo unreadable on dark backgrounds | Trimmed dark + light logo variants | ✅ | `public/brand/*` | Supply SVG logo | M |
| 29 | Missing security headers | CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy | ✅ | `next.config.ts` | Keep CSP host list in sync with GTM tags | LH Best Practices 100 |
| 30 | No skip link, weak focus states, marquee without pause | Skip link, visible focus, pause control, reduced-motion support, accessible mobile menu (focus trap, Esc) | ✅ | layout, `MobileMenu.tsx`, `ClientMarquee.tsx`, `globals.css` | — | LH a11y 100, E2E |
| 31 | No smooth scrolling / motion system | Lenis (pointer only, disabled for reduced motion) + Framer Motion via LazyMotion; CSS-only hero reveal for fast LCP | ✅ | `src/components/motion/*` | — | M, LH |
| 32 | Hard-coded "Accepting new projects · Q3 2026" badge (goes stale) | Removed | ✅ | `page.tsx` | — | M |
| 33 | No `/links` page (third-party link-in-bio) | Owned `/links` with UTM-tagged links | ✅ | `src/app/links/page.tsx` | Update Instagram bio to `https://www.insideedge.in.net/links` | M |
| 34 | No booking option | `BookingLink` shown when `NEXT_PUBLIC_BOOKING_URL` set | ✅ / 🔑 | `BookingLink.tsx` | Create Cal.com/Calendly | M |
| 35 | No case studies | Full case-study template + portfolio filters; drafts hidden in production | ✅ code / 📝 content | `work/*`, `case-studies.ts` | Supply case studies | B, E2E |
| 36 | No tests | Playwright: routes, nav, filters, form flow, API validation/spam, 404, consent, keyboard, SEO files | ✅ | `tests/site.spec.ts`, `playwright.config.ts` | — | 23 pass |
| 37 | Search Console / GBP not set up for primary domain | Instructions in `docs/DEPLOYMENT.md` | 🔑 | docs | See doc | — |
| 38 | Industry landing pages | **Not published**: no industry-specific proof yet, and thin doorway pages would hurt SEO. Work page filters by industry instead | 🔁 | — | Revisit once case studies exist | — |
| 39 | Stale boilerplate (README, starter SVGs, unused `Card`/`timeline-animation`) | Removed / rewritten | ✅ | README, `public/` | — | L |
