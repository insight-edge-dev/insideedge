# Launch Readiness — Owner Inputs Still Required

The application work is substantially complete. These external approvals and account actions cannot be safely invented or completed in code.

## Required before production launch

- [ ] Verify `insideedge.in.net` in Resend using the DNS records shown in the Resend dashboard.
- [ ] Create/approve a sender such as `InsideEdge Website <leads@insideedge.in.net>` and set `LEAD_FROM_EMAIL` in Vercel.
- [ ] Set `RESEND_API_KEY` and `LEAD_TO_EMAIL=insideedgellp@gmail.com` in Vercel Production (and Preview only if test delivery is wanted).
- [ ] Send one controlled test enquiry after deployment and confirm inbox delivery, reply-to behaviour and spam placement.
- [ ] Have the owner and qualified counsel review `PRIVACY_POLICY_DRAFT.md`, `TERMS_AND_CONDITIONS_DRAFT.md` and `LEGAL_REVIEW_CHECKLIST.md`; only then replace the public drafts.
- [ ] Confirm the exact legal entity, legal notice address, grievance contact, retention schedule and jurisdiction/dispute clause.
- [ ] Confirm ADC's full name and correct industry/category before changing its current `Unconfirmed` label.
- [ ] Supply an approved AFT Technotrade logo asset and written display approval before adding it. No matching approved repository asset was found.
- [ ] Confirm permission to display every remaining client logo and keep evidence of permission.
- [ ] Add official Facebook and LinkedIn URLs only after the owner supplies them; they remain intentionally hidden meanwhile.

## Domain and platform

- [ ] Add `www.insideedge.in.net` as the Vercel primary domain and redirect the apex to `www`.
- [ ] Follow the exact DNS values displayed by Vercel; do not copy stale generic records.
- [ ] Do not point or redirect `insideedge.info` without proof that InsideEdge controls it and expressly approves migration.
- [ ] Set production analytics/consent variables only for tools actually approved and configured.

## Post-launch checks

- [ ] Test at 1440, 1024, 768, 390 and 360 px on real browsers/devices where possible.
- [ ] Re-test form validation, successful delivery, WhatsApp/call/email links, cookie consent and reduced motion.
- [ ] Submit the sitemap in Google Search Console and request indexing of priority pages.
- [ ] Verify Google Business Profile name, address, phones, hours, website and map destination.
- [ ] Monitor form failures, Core Web Vitals, crawl errors and analytics consent for the first week.
