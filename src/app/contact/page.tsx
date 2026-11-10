import type { Metadata } from "next";
import { formattedAddress, mapsUrl, siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/sections/PageHero";
import { BookingLink } from "@/components/ui/BookingLink";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SectionLabel } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/utils";
import { brandLaunchInquiry } from "@/data/brand-launch";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Start a Project",
  description:
    "Tell InsideEdge about your business idea, brand launch or growth project. Discuss sourcing coordination, branding, packaging, websites and marketing.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: {
  searchParams: Promise<{ interest?: string | string[] }>;
}) {
  const defaultMessage = brandLaunchInquiry((await searchParams).interest);
  return (
    <>
      <PageHero
        label="Contact"
        title="Bring us the idea. We’ll map the journey."
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
        intro={<p>From first concept to launch and growth, tell us where you are and what support you need. {siteConfig.contact.responseTime}</p>}
      />

      <section className="bg-paper pb-section">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="sr-only">Project enquiry form</h2>
            <LeadForm source="contact" variant="full" submitLabel="Send project brief" defaultMessage={defaultMessage} />
          </div>

          <aside data-track-location="contact_sidebar" className="space-y-10 lg:col-span-4 lg:col-start-9">
            <a
              href={whatsappUrl("Hi InsideEdge, I'm on your contact page and would like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-card bg-whatsapp p-6 text-ink transition-transform hover:-translate-y-0.5"
            >
              <span>
                <span className="block font-display text-xl font-semibold">Chat on WhatsApp</span>
                <span className="text-sm">Usually the fastest reply</span>
              </span>
              <WhatsAppIcon className="h-9 w-9" />
            </a>

            <BookingLink />

            <dl className="space-y-6">
              <div>
                <dt className="label text-muted">Phone / WhatsApp</dt>
                <dd className="mt-2 space-y-2 text-lead">
                  {siteConfig.contact.numbers.map((number) => (
                    <div key={number.e164} className="flex flex-wrap gap-x-3 gap-y-1">
                      <a href={`tel:${number.e164}`} className="link-underline">
                        {number.display}
                      </a>
                      <a
                        href={whatsappUrl("Hi InsideEdge, I'm on your contact page and would like to discuss a project.", number.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-muted underline underline-offset-4"
                      >
                        WhatsApp
                      </a>
                    </div>
                  ))}
                </dd>
              </div>
              {siteConfig.contact.email && (
                <div>
                  <dt className="label text-muted">Email</dt>
                  <dd className="mt-2 text-lead">
                    <a href={`mailto:${siteConfig.contact.email}`} className="link-underline">
                      {siteConfig.contact.email}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="label text-muted">Studio</dt>
                <dd className="mt-2">
                  <address className="not-italic">{formattedAddress}</address>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold underline underline-offset-4">
                    Get directions
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label text-muted">Hours</dt>
                <dd className="mt-2">{siteConfig.contact.officeHours}</dd>
              </div>
              <div>
                <dt className="label text-muted">Instagram</dt>
                <dd className="mt-2">
                  <a href={siteConfig.links.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {siteConfig.links.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section aria-label="Map" className="bg-paper-2">
        <div className="container-site py-section-sm">
          <SectionLabel>Find us</SectionLabel>
          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-card bg-paper-3 sm:aspect-[21/9]">
            <iframe
              title="InsideEdge studio location on Google Maps"
              src={`https://www.google.com/maps?q=${encodeURIComponent(formattedAddress)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale"
            />
          </div>
        </div>
      </section>
    </>
  );
}
