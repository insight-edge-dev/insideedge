# Content required from management

The site is built and deployable, but it deliberately publishes no invented proof.
Everything below is either hidden until supplied or marked `TODO_CONTENT` in code.
Search the repo for `TODO_CONTENT` to find every placeholder.

**Priority key:** Red = needed before launch | Orange = needed soon after | Green = nice to have

---

## 1. Company identity - mostly complete

Confirmed and added:

| Item | Current state |
|---|---|
| Primary sales phone / WhatsApp | `+91 75770 12300` |
| Alternate calls / WhatsApp | `+91 70860 47498` |
| Official business email | `contact@insideedgellp.com` |
| Office address | `Hno 84, Ground Floor, S Sarania Road, Lachit Nagar, Guwahati, Assam 781007, India` |
| Registered legal name | `INSIDE EDGE` |
| Founding year | `2018` |
| Office hours | `Monday to Saturday, 10:00 AM to 7:00 PM` |
| Google Business Profile URL | `https://share.google/MZp6fsnmTQe8S8YZw` |

Still needed:

- [ ] Add the official InsideEdge LinkedIn URL to `NEXT_PUBLIC_LINKEDIN_URL`.
- [ ] Add the official InsideEdge Facebook URL to `NEXT_PUBLIC_FACEBOOK_URL`.
- [ ] No Paco Innovations relationship should be shown on this site.

## 2. Founding story - complete

- The approved "Our story" narrative has been added to `src/app/about/page.tsx`.
- No team section is required. It has been removed from the About page.

## 3. Clients - red

`src/data/clients.ts` holds the 28 organisations taken from the logo sheet that was already published on this site. For each one, confirm:

- [ ] We have permission to display the logo, especially national brands: Jio, Canon, Dabur, JICA, Dalmia, IIT Guwahati.
- [ ] The sector label is correct.
- [ ] What InsideEdge delivered.
- [ ] Higher-resolution logo files, preferably SVG or 512 px PNG.
- [ ] What "ADC" is, and its correct sector.

The two creator portraits on the old sheet were not carried over. Supply names and permission if they should be shown.

## 4. Case studies - red, biggest gap

The portfolio shows the client roster until real case studies exist. For each case study, aim for 3-6 total and supply:

- Client, project title, industry, year, services
- Challenge, objective, strategy
- Execution steps
- Results with source and period
- Screenshots of the source for internal verification
- Cover image and gallery media
- Optional client quote with written permission

Add them in `src/data/case-studies.ts` with `status: "published"`.

## 5. Testimonials - orange

To publish testimonials, supply: quote, full name, role, company, optional photo, and written permission. Add them to `src/data/people.ts` -> `testimonials`.

## 6. Numbers / stats - orange

Any figure can be published only with a source. Tell us the real numbers and how they are measured.

## 7. Services - orange

`src/data/services.ts`: validate every deliverables list, process and FAQ answer. Specifically confirm:

- [ ] SEO and Influencer marketing are actively sold.
- [ ] Languages offered: English / Assamese / Hindi.
- [ ] Platforms built on: Next.js / WordPress / Shopify.
- [ ] Travel for shoots across the North East.

## 8. Pricing and offers - not needed

No public pricing section is needed. `/pricing` redirects to `/contact`, and package offers remain unpublished.

## 9. Free audit scope - complete

Approved as-is: `/free-audit` promises a 30-minute call, 3-5 priority issues, and recommended next actions.

## 10. Media - orange

- Showreel: 6-12 s, 1920x1080, H.264 MP4 + WebM, under 4 MB, plus poster frame.
- Studio photography for About.
- Higher-resolution logo, SVG preferred, for the header and OG images.

## 11. Insights - green

Two draft articles exist (`src/data/insights.ts`). They need editorial review, a named author and approval before setting `status: "published"`.

## 12. Accounts and IDs - red

| Integration | Env var |
|---|---|
| Lead email via Resend or EmailJS | `RESEND_API_KEY` + `LEAD_TO_EMAIL` or `EMAILJS_*` |
| Google Tag Manager / GA4 | `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_ID` |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` |
| Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` |
| Booking | `NEXT_PUBLIC_BOOKING_URL` |
| Cloudflare Turnstile | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` |

## 13. Legal - red

`/privacy-policy` and `/terms` are plain-language drafts written with the DPDP Act 2023 in mind. They must be reviewed by a qualified professional before launch.
