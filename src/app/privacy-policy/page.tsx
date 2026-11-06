import type { Metadata } from "next";
import { formattedAddress, siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How InsideEdge collects, uses and protects personal data submitted through this website, and how we use cookies.",
  path: "/privacy-policy",
});

/* LEGAL REVIEW REQUIRED: this policy is a good-faith plain-language draft aligned
   with the Digital Personal Data Protection Act, 2023. It must be reviewed by a
   qualified professional before being relied upon. */
const LAST_UPDATED = "28 September 2026";

export default function PrivacyPage() {
  const phoneList = siteConfig.contact.numbers.map((number) => number.display).join(" or ");
  const contactLine = siteConfig.contact.email
    ? `email ${siteConfig.contact.email} or call ${phoneList}`
    : `call or WhatsApp ${phoneList}`;
  return (
    <>
      <PageHero label="Legal" title="Privacy Policy" breadcrumbs={[{ name: "Privacy Policy", path: "/privacy-policy" }]} intro={<p>Last updated {LAST_UPDATED}</p>} />
      <section className="bg-paper pb-section">
        <div className="container-site">
          <div className="prose-ie">
            <p>
              This policy explains how {siteConfig.legalName} (“InsideEdge”, “we”) handles personal data collected through{" "}
              {siteConfig.url.replace("https://", "")}. We collect as little as we need and never sell your data.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li><strong>Enquiry details</strong> you submit through our forms: name, phone/WhatsApp number, email, company, website or social handle, project details, budget and timeline.</li>
              <li><strong>Attribution data</strong> attached to enquiries: the page you submitted from, the page you first landed on, the referring website and campaign (UTM) parameters.</li>
              <li><strong>Usage data</strong>, only if you allow analytics cookies: pages viewed, device and browser type, approximate location and interactions, via Google Analytics and Microsoft Clarity.</li>
              <li><strong>Advertising measurement</strong>, only if you allow marketing cookies: Meta Pixel and Google Ads measurement events.</li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To respond to your enquiry and discuss a potential project.</li>
              <li>To understand which pages and campaigns bring enquiries, so we can improve our marketing.</li>
              <li>To keep the website secure and prevent spam.</li>
            </ul>
            <p>Our legal basis is your consent, which you give when you submit a form or accept cookies. You can withdraw it at any time.</p>

            <h2>Who we share it with</h2>
            <p>
              We use trusted service providers to operate the site and deliver enquiries — for example our hosting
              provider, email delivery service, and (with consent) Google, Meta and Microsoft for analytics and ad
              measurement. They process data on our behalf. We do not sell or rent personal data.
            </p>

            <h2>How long we keep it</h2>
            <p>
              Enquiry details are kept for as long as needed to respond and, if we work together, for the duration of the
              relationship and any legal record-keeping period. Analytics data is retained according to each provider’s
              settings (we use the shortest practical period).
            </p>

            <h2 id="cookies">Cookies</h2>
            <p>
              Essential storage keeps the site working (for example, remembering your cookie choice). Analytics and
              marketing cookies are only set after you opt in. You can change your choice at any time:
            </p>
            <p>
              <CookieSettingsButton className="font-semibold underline underline-offset-4" />
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask to access, correct or erase your personal data, withdraw consent, or nominate someone to act on
              your behalf. To make a request, {contactLine}. We will respond within a reasonable time.
            </p>

            <h2>Contact</h2>
            <p>
              {siteConfig.legalName}, {formattedAddress}. Phone: {phoneList}.
            </p>
            <p>We may update this policy; the date above shows the latest version.</p>
          </div>
        </div>
      </section>
    </>
  );
}
