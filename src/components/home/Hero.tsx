import { ButtonLink, ArrowLink } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { whatsappUrl } from "@/lib/utils";
import { HeroFrame } from "./HeroFrame";

const signals = [
  { label: "Base", value: "Guwahati-built" },
  { label: "Since", value: "2018" },
  { label: "Model", value: "Creative x Performance" },
];

export function Hero() {
  return (
    <section
      data-track-location="hero"
      className="relative overflow-hidden bg-paper pt-[calc(var(--header-h)+2rem)] pb-14 sm:pt-[calc(var(--header-h)+3rem)] sm:pb-20 lg:pt-[calc(var(--header-h)+clamp(2.5rem,7vw,6rem))] lg:pb-[clamp(3rem,7vw,6rem)]"
    >
      <div className="container-site">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <h1 className="lg:col-span-9">
            <span className="label fade-up flex max-w-[18rem] items-center gap-3 text-muted sm:max-w-none">
              <span aria-hidden className="inline-block h-[3px] w-6 bg-edge" />
              <span className="leading-snug">Creative &amp; performance agency</span>
            </span>
            <span className="mt-7 block font-display text-[4rem] leading-[0.9] font-semibold tracking-[-0.045em] sm:text-[5.75rem] lg:text-display-2xl">
              <span className="hero-line">
                <span>Creative that</span>
              </span>
              <span className="hero-line">
                <span style={{ animationDelay: "90ms" }}>
                  <Highlight delay={650}>performs.</Highlight>
                </span>
              </span>
            </span>
          </h1>

          <div className="fade-up lg:hidden" style={{ animationDelay: "180ms" }}>
            <div className="mt-7 grid grid-cols-[1fr_auto] items-stretch overflow-hidden rounded-card bg-ink text-paper">
              <div className="border-l-[10px] border-edge px-5 py-4">
                <p className="label text-muted-dark">Guwahati / Since 2018</p>
                <p className="mt-3 font-display text-2xl leading-none font-semibold">Strategy, content, ads, websites.</p>
              </div>
              <div aria-hidden className="relative w-16 bg-edge">
                <span className="absolute top-1/2 left-0 h-[10px] w-full -translate-y-1/2 bg-ink" />
                <span className="absolute top-1/2 left-0 h-0 w-0 -translate-y-1/2 border-y-[13px] border-l-[15px] border-y-transparent border-l-edge" />
              </div>
            </div>
          </div>

          <div className="hidden lg:col-span-3 lg:block">
            <HeroFrame />
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:mt-10 lg:mt-14 lg:grid-cols-12 lg:gap-10 [&>*]:min-w-0">
          <p className="fade-up max-w-[34rem] text-base leading-7 text-muted sm:text-lead lg:col-span-6" style={{ animationDelay: "250ms" }}>
            Since 2018, InsideEdge has helped brands that need more than good-looking posts: strategy, content,
            advertising, branding and websites made by one team that answers for the result.
          </p>
          <div className="fade-up flex flex-col gap-5 lg:col-span-6 lg:items-end" style={{ animationDelay: "350ms" }}>
            <div className="grid gap-3 sm:flex sm:flex-row">
              <Magnetic className="w-full sm:w-auto">
                <ButtonLink href="/contact" variant="ink" size="lg" className="w-full sm:w-auto">
                  Start a Project
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/work" variant="outline" size="lg" className="w-full sm:w-auto">
                View Our Work
              </ButtonLink>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <ArrowLink href="/free-audit">Get a free growth audit</ArrowLink>
              <a
                href={whatsappUrl("Hi InsideEdge, I saw your website and would like to talk about growing my brand.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 font-semibold sm:inline-flex"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#128c4a]" />
                <span className="link-underline">WhatsApp us</span>
              </a>
            </div>
          </div>
        </div>

        <div className="fade-up mt-8 grid border-y border-line sm:grid-cols-3 lg:mt-14" style={{ animationDelay: "450ms" }}>
          {signals.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-5 border-line py-4 sm:block sm:border-l sm:px-5 sm:first:border-l-0">
              <p className="label text-muted">{item.label}</p>
              <p className="font-display text-xl font-semibold leading-tight sm:mt-3">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
