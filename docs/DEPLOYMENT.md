# Deployment and domain migration

## 1. Vercel project

1. Import the GitHub repo in Vercel (framework: Next.js, defaults are fine).
2. **Environment variables** (Settings → Environment Variables): copy the keys from `.env.example`.
   - Production **must** have a lead delivery channel (`RESEND_API_KEY` + `LEAD_TO_EMAIL`, or the `EMAILJS_*` set). Without one, the form shows a WhatsApp fallback message.
   - Leave `NEXT_PUBLIC_SITE_ENV` unset. Vercel's `VERCEL_ENV` makes previews `noindex` automatically.
3. Deploy. Previews get `X-Robots-Tag: noindex` and a disallow-all `robots.txt`.

Local check before every release:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
PW_CHANNEL=chrome npm run test:e2e   # omit PW_CHANNEL if Playwright's Chromium is installed
```

## 2. Primary domain: `www.insideedge.in.net`

In Vercel → Settings → Domains:

1. Add `www.insideedge.in.net` (primary).
2. Add `insideedge.in.net` and set it to **Redirect to `www.insideedge.in.net` (308)**.
3. At the DNS provider: `www` → CNAME `cname.vercel-dns.com`; apex → A `76.76.21.21` (or as Vercel instructs).
4. HTTPS is automatic. HTTP→HTTPS is enforced by Vercel, and HSTS is sent by `next.config.ts`.

`next.config.ts` also contains an apex→www redirect as a safety net.

## 3. Legacy domain: `insideedge.info` → primary

**Goal:** one website. Every .info URL permanently redirects to the matching in.net URL.

**Option A (preferred):** add `insideedge.info` and `www.insideedge.info` to *this* Vercel project. The host-based redirects in `next.config.ts` then apply:

| From | To |
|---|---|
| `insideedge.info/blog/<slug>` | `www.insideedge.in.net/insights/<slug>` |
| `insideedge.info/privacy-policy` | `www.insideedge.in.net/privacy-policy` |
| `insideedge.info/<anything>` | `www.insideedge.in.net/<anything>` (unknown paths show the branded 404 with navigation) |

Before switching DNS, crawl insideedge.info (Screaming Frog or `site:insideedge.info`) and add explicit redirects in `next.config.ts` for any URL with no same-path equivalent. Don't send everything blindly to `/`.

**Option B:** if .info must stay on Framer/another host, configure a path-preserving 301 at the registrar/host. Framer: unpublish the site, then use the domain provider's URL forwarding with "forward path" enabled.

After migration, **take down the Framer site's content**. It currently lists a different phone number and links to Paco Innovations' social profiles.

## 4. Google Search Console

1. Add a **Domain property** for `insideedge.in.net` (DNS TXT verification).
2. Submit `https://www.insideedge.in.net/sitemap.xml`.
3. If a property exists for `insideedge.info`, verify it, then use **Settings → Change of address** to point it to `insideedge.in.net` after the 301s are live.
4. URL Inspection → request indexing for `/`, `/services`, `/work`, `/free-audit` and each service page.
5. Monitor Pages → "Page with redirect" (expected for .info) and "Duplicate without canonical" (should be none).

## 5. Google Business Profile

- Website: `https://www.insideedge.in.net/?utm_source=google&utm_medium=organic&utm_campaign=gbp`
- Name, address and phone **exactly** as in `src/config/site.ts`
- Add the Maps URL to `NEXT_PUBLIC_GOOGLE_MAPS_URL`
- Ask real clients for reviews. Never add ratings to schema manually.

## 6. Analytics

- **GTM** (recommended): create a container, set `NEXT_PUBLIC_GTM_ID`. Inside GTM add the GA4 Configuration tag and custom-event triggers for: `whatsapp_click`, `phone_click`, `email_click`, `form_start`, `form_submit`, `form_error`, `booking_click`, `service_page_view`, `case_study_view`, `portfolio_filter`, `scroll_75`, `video_start`, `video_50`, `video_complete`.
- Mark `form_submit` and `whatsapp_click` as **key events** in GA4.
- Consent Mode v2 defaults are set before GTM loads. Keep GTM tags consent-aware.
- **Meta Pixel** loads after marketing consent (ID `966296406185417` unless overridden). In Events Manager, create custom conversions for `Lead` (form) and `Contact` (WhatsApp/phone).
- **Clarity**: set `NEXT_PUBLIC_CLARITY_ID`. It loads after analytics consent.
- If you add GTM tags from new vendors, add their hosts to the CSP in `next.config.ts`.

## 7. Email delivery

**Resend:** verify `insideedge.in.net` in Resend (SPF/DKIM DNS records), then set `LEAD_FROM_EMAIL=InsideEdge Website <leads@insideedge.in.net>`.

**EmailJS (existing account):** EmailJS → Account → Security → enable *"Allow EmailJS API for non-browser applications"*, generate a private key, and set the four `EMAILJS_*` vars. The template receives `name`, `email`, `phone`, `time` and a full `details` block.

Rotate the old EmailJS public key, since it was exposed in client JS.

## 8. Rate limiting note

The built-in limiter is in-memory per server instance. On Vercel, enable Cloudflare Turnstile (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`) for stronger bot protection. Vercel Firewall rate-limit rules on `/api/lead` are a further option.
