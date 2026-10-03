import CONTACT_BG from "@/assets/background/contact.svg";
import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import {
  ContactForm,
  type ContactFormData,
} from "@/components/molecules/ContactForm";
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
  bgColor?: string;
  accentColor?: string;
}

/** Organism — contact section with "Send Me A Message" trigger + form */
export function ContactSection({
  title,
  subtitle,
  ctaText,
  showScrollIndicator = true,
  showCTA = true,
  onSubmit,
  className,
  bgColor = CONTACT_BG,
  accentColor = "#12F7D6",
}: ContactSectionProps) {
  const { t } = useI18n()

  return (
    <section
      id="contact"
      className={cn(
        "relative isolate overflow-hidden bg-[#1A1E23] py-24 md:py-32",
        className,
      )}
    >
      {/* Background layer — aplat sur mobile, image à partir de lg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-cover bg-center bg-no-repeat lg:block"
        style={{ backgroundImage: `url("${bgColor}")` }}
      />
      <div className="mx-auto max-w-4xl px-4">
        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div data-reveal className="mb-16 flex justify-center">
            <ScrollIndicator accentColor={accentColor} />
          </div>
        )}

        {/* Section Title */}
        <div data-reveal className="mb-12">
          <SectionTitle
            variant="centered"
            title={title ?? t("contact.title")}
            subtitle={subtitle ?? t("contact.subtitle")}
            accentColor={accentColor}
          />
        </div>

        {/* "Écrivez-moi" Button (scrolls to form) */}
        {showCTA && (
          <div className="mb-12 flex justify-center">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-lg border-2 px-10 py-4 font-mono text-lg transition-all duration-300 hover:bg-[#12F7D6]/10"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              {ctaText ?? t("contact.cta")}
            </button>
          </div>
        )}

        {/* Contact Form */}
        <div id="contact-form" data-reveal>
          <ContactForm onSubmit={onSubmit} accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}
