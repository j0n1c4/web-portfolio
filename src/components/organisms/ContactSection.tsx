import CONTACT_BG from "@/assets/background/contact.svg";
import { ScrollIndicator, SectionTitle } from "@/components/atoms";
import {
  ContactForm,
  type ContactFormData,
} from "@/components/molecules/ContactForm";
import { cn } from "@/lib/utils";

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  showScrollIndicator?: boolean;
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

/** Organism — contact section with "Send Me A Message" trigger + form */
export function ContactSection({
  title = "Contact",
  subtitle = "I'm currently available for freelance work",
  showScrollIndicator = true,
  onSubmit,
  className,
  bgColor = CONTACT_BG,
  accentColor = "#12F7D6",
}: ContactSectionProps) {
  return (
    <section
      id="contact"
      className={cn("relative py-24 md:py-32 bg-center bg-no-repeat bg-cover", className)}
      style={{ backgroundImage: `url("${bgColor}")` }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="mb-16 flex justify-center">
            <ScrollIndicator accentColor={accentColor} />
          </div>
        )}

        {/* Section Title */}
        <div className="mb-12">
          <SectionTitle
            variant="centered"
            title={title}
            subtitle={subtitle}
            accentColor={accentColor}
          />
        </div>

        {/* "Send Me A Message" Button (scrolls to form) */}
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
            Send Me A Message
          </button>
        </div>

        {/* Contact Form */}
        <div id="contact-form">
          <ContactForm onSubmit={onSubmit} accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}
