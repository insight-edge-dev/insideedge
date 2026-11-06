# InsideEdge Website - Complete Project Context and Handoff

**Status date:** 4 November 2026
**Project root:** `C:\Users\ABHISHEK KUMAR\Desktop\InsideEdge\ie`
**Primary domain:** `https://www.insideedge.in.net`
**Legacy domain:** `insideedge.info`
**Business:** InsideEdge, a creative and performance marketing agency based in Guwahati, Assam

---

## 1. Purpose of this document

This is the current source-of-truth handoff for the InsideEdge website project. It is intended to be uploaded to a ChatGPT Project or given to another developer/AI so they can understand:

- what the website is and what it is trying to achieve;
- the current architecture and design direction;
- all confirmed business information;
- what has already been implemented;
- what is intentionally hidden or deferred;
- what is still required from management or external accounts;
- how close the project is to launch;
- the safest next steps.

When this file conflicts with older planning notes, prefer the actual code and the latest decisions recorded here.

---

## 2. Executive summary

The website has been substantially rebuilt as a production-ready, multi-page Next.js application. The engineering foundation, responsive interface, SEO structure, lead form, consent handling, analytics hooks, security headers, redirects, and automated tests are already implemented.

The project is no longer blocked by core web development. The remaining work is mainly business verification, proof/content collection, external account configuration, legal review, and final deployment/domain operations.

### Current completion estimate

| Area | Completion | Notes |
|---|---:|---|
| Core engineering and architecture | 95% | Production build, routes, API, SEO, security and responsive UI are implemented. |
| Design and responsive experience | 92% | Full redesign completed; mobile hero was recently improved and visually checked. |
| Confirmed business identity | 90% | Core identity is confirmed; LinkedIn and Facebook URLs are still pending. |
| Content structure | 90% | All content systems/templates exist and hide unverified data safely. |
| Verified proof content | 30% | No published case studies, verified metrics or attributed testimonials yet. |
| External integrations | 25% | Code is ready, but production IDs/secrets have not been supplied in this repo. |
| Legal and launch operations | 35% | Draft legal pages and deployment instructions exist; external review and DNS/account work remain. |

### Overall assessment

- **Technically deployable:** Yes.
- **Safe minimum launch readiness:** approximately **75%**.
- **Fully populated, proof-led marketing site readiness:** approximately **60-65%**.
- **Main blocker to a strong launch:** verified proof, especially case studies and client permissions.
- **Main blocker to a functional production launch:** lead-email configuration, legal review, and domain/account setup.

The site can launch without case studies, testimonials, pricing, a team section, a showreel, or published insights. Those features already fail gracefully by staying hidden or showing the client/sector roster instead. It should not launch with unreviewed legal pages, an unconfigured lead-delivery channel, or unresolved client-logo permissions.

---

## 3. Product and positioning

### Core positioning

InsideEdge is positioned as a Guwahati-based creative and performance marketing agency serving Assam, North East India, and beyond.

**Tagline:** `Creative that performs.`

The brand proposition combines:

- strategy;
- social media and content;
- performance advertising;
- branding and identity;
- websites and digital experiences;
- video production;
- SEO and search;
- influencer campaigns.

The website deliberately avoids fake ratings, anonymous proof, invented statistics, or unsupported claims. The guiding content principle is:

> Never publish proof that cannot be attributed and verified.

### Current hero direction

The homepage hero uses the InsideEdge black/paper/yellow identity and includes:

- the headline `Creative that performs.`;
- a mobile-specific black/yellow brand panel;
- factual trust signals: `Guwahati-built`, `Since 2018`, and `Creative x Performance`;
- `Start a Project`, `View Our Work`, free-audit, and WhatsApp paths;
- a desktop animated InsideEdge frame motif;
- a mobile layout refined using `brandimprint.in` only as a reference for punch and hierarchy, not as a copied design.

### Approved founding story

The About page now uses the approved story built around these ideas:

- InsideEdge began around a kitchen table;
- marketing should come from understanding what makes a business different;
- `Inside` means looking deeper into the brand, people, audience and story;
- `Edge` means turning that understanding into clarity, creativity and execution;
- strategy and creativity should work together;
- every brand should receive something genuinely its own.

The closing thought is:

> Your strongest edge is already inside you. We just know where to look.

### Explicit business decisions

- No team section is required. It has been removed from the About page.
- No public pricing page is required.
- `/pricing` redirects to `/contact`.
- The free audit scope is approved as written.
- Client confirmation and case studies have been deferred while management responds.
- No Paco Innovations relationship should be shown anywhere on this site.

---

## 4. Confirmed business information

| Field | Confirmed value |
|---|---|
| Public brand name | InsideEdge |
| Registered/legal name supplied | INSIDE EDGE |
| Founded | 2018 |
| Primary phone and WhatsApp | `+91 75770 12300` |
| Alternate phone and WhatsApp | `+91 70860 47498` |
| Official email | `contact@insideedgellp.com` |
| Address | Hno 84, Ground Floor, S Sarania Road, Lachit Nagar, Guwahati, Assam 781007, India |
| Office hours | Monday to Saturday, 10:00 AM to 7:00 PM |
| Google Maps/Business Profile | `https://share.google/MZp6fsnmTQe8S8YZw` |
| Instagram | `https://www.instagram.com/insideedge.marketing/` |
| Instagram handle | `@insideedge.marketing` |
| LinkedIn | Pending; must be set via environment variable |
| Facebook | Pending; must be set via environment variable |
| Primary website | `https://www.insideedge.in.net` |

Contact data is centralized in `src/config/site.ts` and consumed by the footer, contact page, structured data, phone links, WhatsApp links, and legal pages.

---

## 5. Technology stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.2, App Router, Turbopack |
| UI runtime | React 19.2.4 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 plus design tokens in `src/app/globals.css` |
| Motion | Framer Motion 12 and Lenis |
| Icons | Lucide React plus local branded icons |
| Validation | Zod 4 |
| Testing | Playwright |
| Intended hosting | Vercel |
| Lead delivery | Resend or EmailJS REST, with optional webhook |
| Analytics | GTM or GA4, Meta Pixel, optional Microsoft Clarity |
| Bot protection | Optional Cloudflare Turnstile |

### Repository rule

This project uses a version of Next.js with breaking changes relative to older conventions. Before changing Next.js APIs, routing, metadata, caching, or file conventions, read the relevant documentation in:

`node_modules/next/dist/docs/`

Do not rely only on general Next.js knowledge.

---

## 6. Architecture and important files

```text
src/
|-- app/                    Routes, metadata, sitemap, robots, API and OG images
|-- components/
|   |-- analytics/          Consent and analytics loaders/listeners
|   |-- forms/              Lead form
|   |-- home/               Homepage sections and hero
|   |-- layout/             Header, footer, mobile menu, sticky WhatsApp
|   |-- motion/             Lenis and Framer Motion helpers
|   |-- sections/           Shared marketing sections
|   |-- seo/                JSON-LD rendering
|   `-- ui/                 Buttons, FAQ, breadcrumbs and shared controls
|-- config/
|   |-- site.ts             Business identity, contacts, URLs and social links
|   `-- analytics.ts        Analytics IDs
|-- data/
|   |-- services.ts         Service catalogue
|   |-- clients.ts          28-client roster and inferred sectors
|   |-- case-studies.ts     Case-study template and publication control
|   |-- insights.ts         Two draft articles
|   |-- people.ts           Empty team and testimonial data
|   `-- company.ts          Process, differentiators, audit scope, hidden offers
`-- lib/
    |-- lead/               Validation, delivery, options and rate limiting
    |-- analytics.ts        Event tracking
    |-- attribution.ts      UTM and referrer attribution
    |-- seo.ts              Metadata and schema builders
    |-- og.tsx              Dynamic OG image helper
    `-- utils.ts            URL and WhatsApp helpers
```

Other important files:

- `.env.example` - all supported production and local environment variables.
- `next.config.ts` - security headers, image settings and redirects.
- `tests/site.spec.ts` - end-to-end behavior and SEO checks.
- `docs/DEPLOYMENT.md` - Vercel, DNS, Search Console and analytics setup.
- `CONTENT_REQUIRED.md` - management content checklist.
- `REDESIGN_AUDIT_CHECKLIST.md` - mapping from old-site issues to fixes.

---

## 7. Public routes and current behavior

### Main pages

- `/` - homepage
- `/about` - approved founding story, principles, differentiators and studio details
- `/services` - services index
- `/services/[slug]` - nine service pages
- `/work` - client roster, sector filters, and future case studies
- `/work/[slug]` - case-study template; only published case studies appear in production
- `/contact` - full lead form and all contact methods
- `/free-audit` - approved audit offer and lead form
- `/insights` - article index; empty in production until articles are published
- `/insights/[slug]` - article template
- `/links` - owned link-in-bio page
- `/privacy-policy` - draft requiring legal review
- `/terms` - draft requiring legal review
- `/thank-you` - form-conversion page; intentionally noindex
- custom branded 404
- `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest`

### Redirect behavior

- Apex `insideedge.in.net` redirects to `www.insideedge.in.net` when DNS points to this project.
- `insideedge.info/*` is configured to redirect to the equivalent new-domain path.
- Legacy `/blog/*` redirects to `/insights/*`.
- Legacy `/portfolio/*` redirects to `/work/*`.
- `/privacy`, `/contact-us`, `/about-us`, and `/audit` redirect to current routes.
- `/pricing` redirects temporarily to `/contact`.

---

## 8. What has been completed

### Business identity and contact system

- Confirmed legal/public identity, founding year, address, hours, email and two numbers.
- Added both phone numbers as callable and WhatsApp-capable contacts.
- Added founding date to structured data.
- Added confirmed Google Maps link.
- Kept LinkedIn and Facebook environment-driven until official URLs are supplied.
- Removed the old `+91 96781 53730` number from active configuration.
- Established that Paco Innovations must not be shown as related to InsideEdge.

### Brand, UI and responsive redesign

- Replaced the old mixed-color/gradient style with a restrained black, warm-white and yellow design system.
- Built shared typography, color, spacing, radius, motion and z-index tokens.
- Added a consistent yellow `edge` motif across the interface.
- Implemented responsive header, accessible full-screen mobile menu and footer.
- Implemented mobile sticky WhatsApp behavior.
- Improved the mobile homepage hero and visually tested it at `390x844`.
- Added a mobile-specific black/yellow brand panel and a factual signal strip.
- Added desktop motion and frame treatment while respecting reduced-motion settings.
- Removed hostile auto-opening lead popup and excessive CTA treatments.

### Content and information architecture

- Converted the site from a single-page presence into a multi-route agency website.
- Added nine service detail pages with deliverables, process, FAQs, SEO and contextual WhatsApp messages.
- Added About, Work, Contact, Free Audit, Insights, Links, legal and thank-you pages.
- Added approved founding story.
- Removed the team section by management decision.
- Removed the public pricing page by management decision.
- Approved the free-audit promise:
  - 30-minute call;
  - video or in person in Guwahati;
  - three to five priority issues;
  - recommended next actions.

### Lead generation and conversion

- Built `/api/lead` as a server-side lead endpoint.
- Added Zod validation and sanitization.
- Added honeypot, minimum-time trap, origin validation and in-memory rate limiting.
- Added optional Cloudflare Turnstile support.
- Added Resend and EmailJS server-side delivery options.
- Added optional webhook delivery for CRM/automation.
- Added field-level errors and accessible form states.
- Added WhatsApp fallback when delivery is unavailable.
- Added thank-you redirect for conversion measurement.
- Added first-touch and session UTM/referrer attribution.

### SEO and discoverability

- Centralized canonical URL generation.
- Added unique titles, descriptions, canonical links, Open Graph and Twitter metadata.
- Added dynamic branded OG images.
- Added sitemap and robots behavior.
- Added Organization, ProfessionalService, WebSite, Service, FAQ, Breadcrumb and Article schema.
- Excluded drafts and utility pages from indexing/sitemap where appropriate.
- Added host and legacy-path redirects.
- Added a custom 404 page.

### Analytics and privacy

- Added GTM or direct GA4 support.
- Preserved Meta Pixel support but gated it behind marketing consent.
- Added optional Clarity support behind analytics consent.
- Added Consent Mode v2 defaults.
- Added accept, reject and preference controls for cookies.
- Added tracked events for WhatsApp, phone, email, booking, forms, service views, case studies, portfolio filtering, scroll depth and video engagement.

### Security, performance and accessibility

- Added Content Security Policy, HSTS, frame protection, nosniff, referrer and permissions headers.
- Optimized images through `next/image` and modern image output.
- Uses Server Components by default with small client-side interaction islands.
- Added skip link, visible focus states, keyboard-accessible menu and reduced-motion support.
- Added accessible client marquee controls.
- Added production noindex protections for preview/non-production deployments.

### Automated verification

The test suite covers:

- homepage rendering and single H1;
- navigation;
- service schema and contextual WhatsApp links;
- custom 404 behavior;
- work/sector filtering;
- contact-form flow;
- invalid API input;
- honeypot handling;
- cross-origin rejection;
- robots and sitemap;
- consent persistence;
- keyboard skip-link behavior.

---

## 9. Current verification status

Verified on 4 November 2026:

- `npm run lint` - passed.
- `npm run typecheck` - passed.
- `npm run build` - passed.
- Production generation completed with **42 routes/assets**.

The audit records a previous full Playwright run with 23 passing checks. A fresh E2E run should still be performed immediately before final deployment because content and redirects have changed since the original audit.

There is currently no `.env.local` file in the repository. Only `.env.example` exists. This is correct for source control, but production values must be configured in Vercel.

---

## 10. What is still required

### A. Required before a responsible production launch

#### 1. Configure lead delivery

Choose one production delivery option:

**Recommended: Resend**

- verify the sending domain;
- set `RESEND_API_KEY`;
- set `LEAD_TO_EMAIL`;
- set `LEAD_FROM_EMAIL`.

**Alternative: EmailJS REST**

- set `EMAILJS_SERVICE_ID`;
- set `EMAILJS_TEMPLATE_ID`;
- set `EMAILJS_PUBLIC_KEY`;
- set `EMAILJS_PRIVATE_KEY`;
- rotate the old exposed EmailJS public key.

Without one of these options, the form falls back to WhatsApp and is not a complete production lead pipeline.

#### 2. Legal review

The privacy policy and terms are implementation drafts, not legal approval. A qualified professional must review:

- privacy and data-processing language;
- consent wording;
- retention claims;
- third-party processors;
- DPDP Act implications;
- governing-law and liability wording.

#### 3. Client-logo permission decision

The site currently contains 28 client logos taken from a previously published logo sheet. Management must either:

- confirm permission and accuracy for each logo; or
- remove/hide unconfirmed logos before launch.

This is especially important for Jio, Canon, Dabur, JICA, Dalmia Cement and IIT Guwahati.

Also confirm:

- sector labels;
- services delivered;
- what `ADC` means and its correct sector;
- whether higher-resolution assets are available.

#### 4. Production deployment and domains

- Import the repository into Vercel.
- Add `www.insideedge.in.net` as primary.
- Redirect apex `insideedge.in.net` to `www`.
- Point `insideedge.info` and `www.insideedge.info` to the project or configure path-preserving registrar redirects.
- Crawl the legacy domain before switching DNS and add any missing explicit redirects.
- Remove/unpublish the old legacy-site content after redirects are active.
- Verify HTTPS and host redirects.

#### 5. Search setup

- Create/verify a Google Search Console domain property for `insideedge.in.net`.
- Submit `https://www.insideedge.in.net/sitemap.xml`.
- Use Change of Address for the legacy `.info` property after redirects are live.
- Update Google Business Profile with the canonical website and confirmed NAP.
- Validate structured data after deployment.

### B. Strongly recommended for launch quality

#### 1. Publish three to six case studies

The case-study system is complete, but there are no real published entries. Management has been asked for the following per project:

- client name;
- project/campaign title;
- industry;
- year/period;
- services delivered;
- challenge;
- measurable objective;
- strategy;
- execution steps;
- verified results;
- source and period for every result;
- source screenshots for internal verification;
- cover image and gallery media;
- optional client quote with written permission;
- permission to publish client name, logo, work and results.

Until these arrive, the Work page shows the client/sector roster and all results-based sections stay hidden.

Case studies are not technically mandatory for launch, but they are the largest conversion and credibility gap.

#### 2. Validate services

Management still needs to confirm:

- SEO is actively sold;
- influencer marketing is actively sold;
- English, Assamese and Hindi are offered as described;
- Next.js, WordPress and Shopify are supported;
- shoots are available across Assam/North East India;
- all deliverables, process steps and FAQ answers are operationally accurate.

#### 3. Configure analytics

- Create GTM or GA4 property.
- Set `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_ID`, not both unless intentionally configured.
- Configure GA4 in GTM if GTM is used.
- Mark `form_submit` and `whatsapp_click` as key events.
- Verify Meta Pixel events and conversions.
- Optionally set `NEXT_PUBLIC_CLARITY_ID`.
- Test consent-aware firing in production.

#### 4. Add official social URLs

- Set `NEXT_PUBLIC_LINKEDIN_URL`.
- Set `NEXT_PUBLIC_FACEBOOK_URL`.
- Do not use Paco Innovations profiles.

#### 5. Run final E2E and manual QA

- Run a fresh production build.
- Run Playwright on desktop and mobile.
- Test real lead delivery.
- Test both WhatsApp numbers and phone links.
- Test consent choices and analytics firing.
- Test all domain redirects after DNS migration.
- Test mobile layouts on real iOS and Android devices.

### C. Optional after launch

- Attributed testimonials with written permission.
- Verified company statistics with documented sources.
- Showreel and poster image.
- Studio photography.
- Higher-resolution/SVG brand logo.
- Booking URL via Cal.com or Calendly.
- Turnstile and/or Vercel Firewall rules.
- Editorial review, named author and publication of the two draft insights.
- Industry landing pages after sufficient proof exists.
- Better client-logo source assets.

---

## 11. Environment-variable checklist

### Already represented with confirmed defaults

```env
NEXT_PUBLIC_SITE_URL=https://www.insideedge.in.net
NEXT_PUBLIC_WHATSAPP_NUMBER=917577012300
NEXT_PUBLIC_PRIMARY_PHONE_E164=+917577012300
NEXT_PUBLIC_PRIMARY_PHONE_DISPLAY="+91 75770 12300"
NEXT_PUBLIC_SECONDARY_WHATSAPP_NUMBER=917086047498
NEXT_PUBLIC_SECONDARY_PHONE_E164=+917086047498
NEXT_PUBLIC_SECONDARY_PHONE_DISPLAY="+91 70860 47498"
NEXT_PUBLIC_CONTACT_EMAIL=contact@insideedgellp.com
NEXT_PUBLIC_GOOGLE_MAPS_URL=https://share.google/MZp6fsnmTQe8S8YZw
NEXT_PUBLIC_SHOW_DRAFTS=false
```

### Still needs real production values

```env
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_FACEBOOK_URL=

# Choose GTM or direct GA4
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=

# Meta Pixel has an existing code fallback, but verify ownership/value
NEXT_PUBLIC_META_PIXEL_ID=

# Choose Resend or EmailJS
RESEND_API_KEY=
LEAD_TO_EMAIL=
LEAD_FROM_EMAIL=

EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=

# Optional
NEXT_PUBLIC_BOOKING_URL=
NEXT_PUBLIC_SHOWREEL_URL=
NEXT_PUBLIC_SHOWREEL_POSTER=
LEAD_WEBHOOK_URL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

Never place private keys in `NEXT_PUBLIC_*` variables. Public variables are embedded into the browser bundle at build time.

---

## 12. Content publication rules

These rules are intentional and must be preserved:

1. Do not invent results, stats, testimonials, client relationships or awards.
2. Every numeric case-study result must include a source and measurement period.
3. Draft case studies and insights must remain excluded from production and the sitemap.
4. Do not turn on `NEXT_PUBLIC_SHOW_DRAFTS=true` in production.
5. Do not add anonymous testimonials with performance claims.
6. Do not add ratings to schema unless they come from a legitimate, verifiable source and comply with search-engine policy.
7. Do not publish client logos or work without permission.
8. Contact details must remain centralized in `src/config/site.ts`.
9. New analytics vendors must be added to the CSP in `next.config.ts`.
10. Keep previews and non-production deployments noindex.

---

## 13. Recommended completion plan

### Phase 1 - make production functional

1. Configure Resend or EmailJS lead delivery.
2. Test a real form submission end to end.
3. Obtain legal review and apply required edits.
4. Decide which client logos are approved; hide any uncertain entries.
5. Add LinkedIn/Facebook URLs if official profiles exist.

### Phase 2 - deploy and migrate

1. Deploy to Vercel with production env variables.
2. Add primary/apex/legacy domains.
3. Verify redirects and HTTPS.
4. Update Google Business Profile.
5. Set up Search Console and submit sitemap.
6. Configure analytics and test consent-aware events.

### Phase 3 - add credibility

1. Receive case-study material from the owner.
2. Select the strongest three projects first.
3. Verify every claim and permission.
4. Prepare optimized cover/gallery media.
5. Publish case studies and link matching clients/services.
6. Add testimonials and verified stats only when documented.

### Phase 4 - post-launch growth

1. Publish reviewed insights.
2. Add showreel and studio photography.
3. Monitor Search Console, analytics and lead quality.
4. Improve pages using real conversion/search data.
5. Consider industry pages only after enough case-study proof exists.

---

## 14. Definition of done

The website should be considered fully launch-complete when all of the following are true:

- [ ] Production Vercel deployment is live.
- [ ] Primary and legacy domains redirect correctly.
- [ ] Production lead delivery has been tested successfully.
- [ ] Legal pages have professional approval.
- [ ] Client logos are confirmed or unapproved logos are hidden.
- [ ] Official social URLs are configured where available.
- [ ] GTM/GA4 and Meta conversions are verified under consent.
- [ ] Search Console is verified and sitemap submitted.
- [ ] Google Business Profile uses the confirmed NAP and canonical website.
- [ ] Fresh lint, typecheck, build and E2E checks pass.
- [ ] Mobile and desktop manual QA is complete.
- [ ] At least three verified case studies are published for the strongest version of the launch.

The final case-study item is recommended for a strong marketing launch, but it is not required for the application to function.

---

## 15. Guidance for a future ChatGPT or developer

When continuing this project:

1. Read this file first.
2. Read `AGENTS.md` before changing code.
3. Read relevant local Next.js 16 docs from `node_modules/next/dist/docs/` before using Next.js APIs.
4. Inspect actual source files before assuming an older checklist is current.
5. Preserve the black/paper/yellow design system and `edge` motif.
6. Keep operational UI quiet, focused and conversion-oriented.
7. Preserve accessibility, reduced-motion support, consent handling and security headers.
8. Do not reintroduce pricing unless management explicitly changes its decision.
9. Do not add a team section unless management explicitly changes its decision.
10. Do not show Paco Innovations as related to InsideEdge.
11. Do not replace confirmed phone/address/email details without management confirmation.
12. Do not publish proof without sources and permissions.
13. Use existing content/data structures instead of hardcoding page-specific copies where a central source exists.
14. After meaningful changes, run at least lint and typecheck; run build and relevant Playwright checks before handoff.

### Suggested initial prompt after uploading this file to ChatGPT Projects

```text
This file is the current source of truth for the InsideEdge website. Use it to understand the business, architecture, decisions, completed work and remaining launch tasks. Before proposing or making changes, preserve confirmed business information, the no-invented-proof rule, the no-team/no-pricing decisions, the Next.js 16 local-documentation requirement, and the existing black/paper/yellow design system. Ask only for information that is genuinely missing, and prioritize launch blockers over optional content.
```

---

## 16. Current bottom line

The project is close to launch from an engineering perspective. The codebase is coherent, production-buildable, responsive, SEO-ready and conversion-ready. Most remaining effort is outside the codebase:

- connect the lead inbox;
- complete legal review;
- verify client permissions;
- configure domains, analytics and search accounts;
- collect and publish real case studies.

If management moves quickly on those items, the minimum responsible launch can be completed without major new development. Case studies and richer media can then be added incrementally using systems that are already built.
