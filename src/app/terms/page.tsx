import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the InsideEdge website.",
  path: "/terms",
});

/* LEGAL REVIEW REQUIRED: plain-language draft covering website use only. Client
   engagements are governed by individual proposals/contracts. */
export default function TermsPage() {
  const phoneList = siteConfig.contact.numbers.map((number) => number.display).join(" or ");
  return (
    <>
      <PageHero label="Legal" title="Terms of Use" breadcrumbs={[{ name: "Terms", path: "/terms" }]} intro={<p>Last updated 28 September 2026</p>} />
      <section className="bg-paper pb-section">
        <div className="container-site">
          <div className="prose-ie">
            <p>By using {siteConfig.url.replace("https://", "")} you agree to these terms.</p>
            <h2>Website content</h2>
            <p>
              Content on this site, including text, design, logos and work samples, belongs to {siteConfig.legalName} or
              to our clients and is shown with permission. Please don’t copy or reuse it without written consent. Client
              names and logos are trademarks of their respective owners.
            </p>
            <h2>Information only</h2>
            <p>
              Articles and guides are general information, not professional advice for your specific situation. Results
              from past work don’t guarantee future outcomes.
            </p>
            <h2>Enquiries and projects</h2>
            <p>
              Submitting an enquiry doesn’t create a contract. Any work we do is governed by a separate written proposal
              or agreement.
            </p>
            <h2>Third-party links</h2>
            <p>We link to other sites (such as WhatsApp and Instagram). We aren’t responsible for their content or policies.</p>
            <h2>Liability</h2>
            <p>
              We work to keep this site accurate and available but provide it “as is”. To the extent permitted by law, we
              aren’t liable for losses arising from its use.
            </p>
            <h2>Governing law</h2>
            <p>These terms are governed by the laws of India, with courts in Guwahati, Assam having jurisdiction.</p>
            <h2>Contact</h2>
            <p>Questions? Call or WhatsApp {phoneList}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
