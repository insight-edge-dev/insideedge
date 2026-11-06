import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Magnetic } from "@/components/motion/Magnetic";
import { RevealText } from "@/components/motion/Reveal";
import { whatsappUrl } from "@/lib/utils";

type Props = {
  title?: string;
  subtitle?: string;
  whatsappMessage?: string;
  location?: string;
};

/** Closing call to action used across pages. Yellow is saved for moments like this. */
export function FinalCta({
  title = "Have a project in mind?",
  subtitle = "Let’s make something that performs.",
  whatsappMessage,
  location = "final_cta",
}: Props) {
  return (
    <section data-track-location={location} className="bg-edge py-section text-ink">
      <div className="container-site">
        <RevealText text={title} className="max-w-5xl text-display-xl" />
        <p className="mt-6 max-w-2xl font-display text-display-sm">{subtitle}</p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Magnetic className="w-full sm:w-auto">
            <ButtonLink href="/contact" variant="ink" size="lg" className="w-full sm:w-auto">
              Start a Project
            </ButtonLink>
          </Magnetic>
          <ButtonLink
            href={whatsappUrl(whatsappMessage)}
            external
            variant="outline"
            size="lg"
            icon={<WhatsAppIcon className="h-4 w-4" />}
            className="w-full sm:w-auto"
          >
            WhatsApp Us
          </ButtonLink>
        </div>
        <ArrowLink href="/free-audit" className="mt-8">
          Or book a free growth audit
        </ArrowLink>
      </div>
    </section>
  );
}
