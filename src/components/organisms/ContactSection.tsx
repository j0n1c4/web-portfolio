import { ContactForm, type ContactFormData } from "@/components/molecules/ContactForm";
import { Doodle, DoodleLayer } from "@/components/molecules/Doodles";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  showScrollIndicator?: boolean;
  showCTA?: boolean;
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  className?: string;
  accentColor?: string;
}

/**
 * Organism — CTA de contact (design `blue-portfolio` : bordure haute cyan,
 * `lineBreak.svg`, titre centré `tracking-tighter` et pilule contour) avec le
 * formulaire conservé.
 */
export function ContactSection({
  title,
  subtitle,
  ctaText,
  showCTA = true,
  onSubmit,
  className,
  accentColor = "#00C7FF",
}: ContactSectionProps) {
  const { t } = useI18n()

  return (
    <section
      id="contact"
      className={cn(
        "relative isolate w-full overflow-hidden border-t border-[#192742] bg-[#000A1F] py-16 md:py-32",
        className,
      )}
    >
      <DoodleLayer>
        <Doodle
          src="/static/doodles/lineBreak.svg"
          position="left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          width={220}
          opacity={0.7}
          delay={0.5}
        />
        <Doodle
          src="/static/doodles/testimonials/yay.svg"
          position="left-[8%] top-[16%]"
          width={84}
          opacity={0.6}
          delay={1.1}
        />
        <Doodle
          src="/static/doodles/skills/fillStar.svg"
          position="left-[6%] top-[30%]"
          width={56}
          opacity={0.5}
          delay={1.6}
        />
        <Doodle
          src="/static/doodles/projects/pop.svg"
          position="right-[7%] top-[22%]"
          width={66}
          opacity={0.55}
          delay={2.4}
        />
        <Doodle
          src="/static/doodles/hero/dino.svg"
          position="right-[4%] bottom-[8%]"
          width={120}
          opacity={0.35}
          delay={3.3}
        />
      </DoodleLayer>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5">
        {/* Titre centré */}
        <div data-reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white md:text-5xl">
            {title ?? t("contact.title")}
          </h2>
          <p className="text-base text-gray-300">
            {subtitle ?? t("contact.subtitle")}
          </p>
        </div>

        {/* Pilule «Écrivez-moi » (scroll vers le formulaire) */}
        {showCTA && (
          <button
            data-reveal
            type="button"
            onClick={() =>
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full border-2 px-8 py-3 text-base font-bold transition-colors duration-300 hover:bg-[#00C7FF] hover:text-[#000A1F]"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {ctaText ?? t("contact.cta")}
          </button>
        )}

        {/* Formulaire */}
        <div id="contact-form" data-reveal className="w-full max-w-3xl pt-6">
          <ContactForm onSubmit={onSubmit} accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}