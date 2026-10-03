import IMG_ABOUT_ME from "@/assets/me/about-me.jpeg";
import { InfoRow, SectionTitle } from "@/components/atoms";
import { AboutContent } from "@/components/molecules/AboutContent";
import { AboutImage } from "@/components/molecules/AboutImage";
import { Doodle, DoodleLayer } from "@/components/molecules/Doodles";
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
  accentColor?: string;
}

/**
 * Organism — section « À propos » (design `blue-portfolio` : titre à gauche avec
 * barre cyan, contenu à droite, aucune carte, aucun fond illustré).
 */
export function AboutSection({
  title,
  greeting,
  info = [],
  paragraphs = [],
  highlights = [],
  imageSrc = IMG_ABOUT_ME,
  imageAlt = "About me coding",
  className,
  accentColor = "#00C7FF",
}: AboutSectionProps) {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className={cn(
        "relative isolate w-full overflow-hidden bg-[#000A1F] py-24 md:py-32",
        className,
      )}
    >
      <DoodleLayer>
        <Doodle
          src="/static/doodles/banner-right.svg"
          position="right-[-60px] top-[6%] hidden opacity-70 xl:block"
          width={420}
          opacity={0.28}
          delay={0.2}
        />
        <Doodle
          src="/static/doodles/projects/corner.svg"
          position="left-[46%] top-[18%] hidden lg:block"
          width={54}
          opacity={0.7}
          delay={0.6}
        />
        <Doodle
          src="/static/doodles/skills/star-outline.svg"
          position="right-[6%] top-[24%] hidden xl:block"
          width={40}
          opacity={0.6}
          delay={1.9}
        />
        <Doodle
          src="/static/doodles/projects/squiggle.svg"
          position="right-[12%] bottom-[12%] hidden lg:block"
          width={48}
          opacity={0.5}
          delay={2.7}
        />
      </DoodleLayer>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-16">
        {/* Titre + identité (colonne gauche) */}
        <div className="flex w-full flex-col lg:max-w-xs lg:shrink-0">
          <div data-reveal>
            <SectionTitle
              title={title ?? t("about.title")}
              accentColor={accentColor}
            />
          </div>

          {info.length > 0 && (
            <div
              data-reveal
              className="mt-8 flex flex-col gap-3 border-t border-[#192742] pt-6"
            >
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
        </div>

        {/* Contenu (colonne droite) : portrait à côté du texte dès xl */}
        <div className="flex w-full flex-1 flex-col gap-10 xl:flex-row xl:items-start xl:gap-12">
          <div data-reveal className="w-full shrink-0 xl:max-w-[280px]">
            <AboutImage src={imageSrc} alt={imageAlt} />
          </div>

          <div data-reveal className="min-w-0 flex-1">
            <AboutContent
              greeting={greeting ?? t("about.greeting")}
              paragraphs={paragraphs}
              highlights={highlights}
              accentColor={accentColor}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
