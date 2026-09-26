import BG_ABOUT_ME from "@/assets/background/about-me.svg";
import IMG_ABOUT_ME from "@/assets/me/about-me.jpeg";
import { InfoRow, ScrollIndicator, SectionTitle } from "@/components/atoms";
import { AboutContent } from "@/components/molecules/AboutContent";
import { AboutImage } from "@/components/molecules/AboutImage";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/** Ligne d'identité affichée sous le titre (localisation, formation, objectif). */
export interface AboutInfoItem {
  icon: LucideIcon;
  text: string;
}

interface Highlight {
  text: string;
  words: string[];
}

interface AboutSectionProps {
  title?: string;
  greeting?: string;
  info?: AboutInfoItem[];
  paragraphs?: string[];
  highlights?: Highlight[];
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

/** Organism — about me section with scroll indicator, title, content & image */
export function AboutSection({
  title,
  greeting,
  info = [],
  paragraphs = [],
  highlights = [],
  imageSrc = IMG_ABOUT_ME,
  imageAlt = "About me coding",
  className,
  bgColor = BG_ABOUT_ME,
  accentColor = "#12F7D6",
}: AboutSectionProps) {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className={cn("relative w-full overflow-hidden py-24 md:py-28", className)}
    >
      {/* Blurred background layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-contain bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url("${bgColor}")` }}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Scroll Indicator */}
        <div className="mb-16 flex justify-center">
          <ScrollIndicator accentColor={accentColor} />
        </div>

        {/* Section Title */}
        <div className="mb-12">
          <SectionTitle
            title={title ?? t("about.title")}
            accentColor={accentColor}
          />
        </div>

        {/* Identity facts */}
        {info.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-x-10 gap-y-4">
            {info.map((item) => (
              <InfoRow
                key={item.text}
                icon={item.icon}
                text={item.text}
                accentColor={accentColor}
              />
            ))}
          </div>
        )}

        {/* Content Grid */}
        <div className="grid items-start gap-12 lg:grid-cols-3">
          {/* Left - About Content (2/3) */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <AboutContent
              greeting={greeting ?? t("about.greeting")}
              paragraphs={paragraphs}
              highlights={highlights}
              accentColor={accentColor}
            />
          </div>

          {/* Right - Image (1/3) */}
          <div className="order-1 lg:order-2 lg:col-span-1">
            <AboutImage src={imageSrc} alt={imageAlt} className="h-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
