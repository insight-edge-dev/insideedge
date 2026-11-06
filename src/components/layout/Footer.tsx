import Link from "next/link";
import { formattedAddress, mapsUrl, primaryNav, siteConfig, socialLinks } from "@/config/site";
import { featuredServices } from "@/data/services";
import { whatsappUrl } from "@/lib/utils";
import { CookieSettingsButton } from "./CookieSettingsButton";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-track-location="footer" className="theme-ink bg-ink text-paper">
      <div className="container-site pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-xs text-muted-dark">
              Creative and performance marketing from Guwahati, for ambitious brands across the North East and beyond.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-edge px-6 font-semibold text-ink transition-colors hover:bg-paper"
            >
              Chat on WhatsApp
            </a>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <p className="label text-muted-dark">Services</p>
            <ul className="mt-5 space-y-2.5">
              {featuredServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link-underline">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <p className="label text-muted-dark">Company</p>
            <ul className="mt-5 space-y-2.5">
              {[...primaryNav, { href: "/free-audit", label: "Free Audit" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="label text-muted-dark">Contact</p>
            <address className="mt-5 space-y-2.5 not-italic">
              {siteConfig.contact.numbers.map((number) => (
                <a key={number.e164} href={`tel:${number.e164}`} className="link-underline block">
                  {number.display}
                </a>
              ))}
              {siteConfig.contact.email && (
                <a href={`mailto:${siteConfig.contact.email}`} className="link-underline block">
                  {siteConfig.contact.email}
                </a>
              )}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block text-muted-dark hover:text-paper">
                {formattedAddress}
              </a>
              <p className="text-muted-dark">{siteConfig.contact.officeHours}</p>
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-24 font-display text-[clamp(3.5rem,15.5vw,15rem)] leading-[0.8] font-semibold tracking-[-0.05em] text-paper select-none"
        >
          Inside<span className="text-edge">Edge</span>
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-line-dark pt-6 text-sm text-muted-dark sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. Guwahati, Assam, India.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-paper">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-paper">
                Terms
              </Link>
            </li>
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
