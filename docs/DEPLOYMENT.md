# Production Deployment

## 1. Vercel project

1. Import the GitHub repository in Vercel and keep the detected Next.js settings.
2. Add the required variables from `.env.example` under **Settings → Environment Variables**.
3. Keep `NEXT_PUBLIC_SITE_ENV` unset on Vercel. `VERCEL_ENV` is used so Preview deployments remain `noindex`.
4. Deploy, then complete the controlled production checks below.

Do not commit `.env` or copy secret values into tickets, screenshots or documentation. `NEXT_PUBLIC_*` values are bundled into browser code; Resend and other secret keys must not use that prefix.

## 2. Lead delivery with Resend

Resend is the selected production channel. The API intentionally requires all three values and has no public test-sender fallback:

```env
RESEND_API_KEY=replace_me
LEAD_TO_EMAIL=insideedgellp@gmail.com
LEAD_FROM_EMAIL=InsideEdge Website <leads@insideedge.in.net>
```

Setup:

1. Add `insideedge.in.net` in Resend.
2. Add the exact DNS verification records supplied by Resend. Do not invent or reuse records from another account.
3. Wait for Resend to show the domain as verified.
4. Create an API key restricted appropriately for sending and add it to Vercel Production.
5. Add the approved sender and recipient values to Vercel Production.
6. Deploy and submit one controlled enquiry. Confirm receipt at `insideedgellp@gmail.com`, correct reply-to behaviour and reasonable spam placement.

Preview environments should use a dedicated test recipient/key or have delivery variables omitted. Never run automated tests against the real delivery endpoint; browser tests stub `/api/lead`.

EmailJS and webhook support remain optional compatibility channels. Do not configure them unless intentionally required.

## 3. Primary domain

In Vercel **Settings → Domains**:

1. Add `www.insideedge.in.net` and make it primary.
2. Add `insideedge.in.net` and redirect it to `www.insideedge.in.net` with a permanent redirect.
3. Add the exact DNS records Vercel displays for the project; provider-specific values may change.
4. Confirm both HTTP and apex requests end at `https://www.insideedge.in.net`.

The app also contains an apex-to-www redirect as a safety net. Canonicals and sitemap URLs use `https://www.insideedge.in.net`.

No redirect from `insideedge.info` is configured. Do not connect or migrate that domain without proof of control and explicit owner approval.

## 4. Production environment checklist

- `NEXT_PUBLIC_SITE_URL=https://www.insideedge.in.net`
- `NEXT_PUBLIC_CONTACT_EMAIL=insideedgellp@gmail.com`
- Both approved phone/WhatsApp numbers and the confirmed Maps URL.
- Resend variables from section 2.
- Turnstile site and secret keys if bot protection is enabled.
- GTM, Meta Pixel and Clarity IDs only for tools actually approved; consent controls must remain enabled.
- Facebook and LinkedIn values omitted until official URLs are supplied.

## 5. Release validation

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Then inspect the deployed site at 1440, 1024, 768, 390 and 360 px. Confirm there is no horizontal overflow, clipped content or layout shift and verify navigation, forms, cookie controls, phone, WhatsApp, email and Maps links.

## 6. Search and business listings

1. Create/verify a Google Search Console Domain property for `insideedge.in.net`.
2. Submit `https://www.insideedge.in.net/sitemap.xml`.
3. Request indexing for `/`, `/services`, `/services/brand-creation-launch`, `/work`, `/about`, `/contact` and `/free-audit`.
4. Keep the Google Business Profile name, address, phones, hours and website aligned with `src/config/site.ts`.

## 7. Analytics and security

- Use the existing consent-aware GTM/analytics integration; do not install duplicate tags.
- Mark only genuinely configured lead/contact events as key events.
- If a new vendor is added through GTM, review consent classification, the privacy notice and CSP hosts.
- The built-in limiter is per server instance. Turnstile and platform firewall rules are recommended for stronger production abuse control.
- Rotate any secret suspected of exposure and remove former-team access before launch.
