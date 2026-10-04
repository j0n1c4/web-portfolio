import { SectionTitle } from "@/components/atoms";
import { Doodle, DoodleLayer } from "@/components/molecules/Doodles";
import { SkillsColumn } from "@/components/molecules/SkillsColumn";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface SkillCategory {
  icon: LucideIcon;
  /** Clé de dictionnaire i18n pour le titre. */
  titleKey: string;
  subtitle: string;
}

interface SkillItem {
  icon: LucideIcon;
  label: string;
  color: string;
}

interface SkillsSectionProps {
  title?: string;
  subtitle?: string;
  devCategories?: SkillCategory[];
  devSkills?: SkillItem[];
  devopsCategories?: SkillCategory[];
  devopsSkills?: SkillItem[];
  className?: string;
  bgColor?: string;
  accentColor?: string;
}

/**
 * Organism — section Expertise (design `blue-portfolio` : titre à gauche,
 * paragraphe à droite, grille d'icônes centrée).
 */
export function SkillsSection({
  title,
  subtitle,
  devCategories = [],
  devSkills = [],
  devopsCategories = [],
  devopsSkills = [],
  className,
  bgColor = "#000A1F",
  accentColor = "#00C7FF",
}: SkillsSectionProps) {
  const { t } = useI18n();

  // Les titres de catégories sont des clés i18n : on les résout une fois ici
  // pour que `SkillsColumn` reste un composant dumb.
  const resolveCategories = (categories: SkillCategory[]) =>
    categories.map((category) => ({
      ...category,
      title: t(category.titleKey),
    }));

  return (
    <section
      id="skills"
      className={cn("relative overflow-hidden py-16 md:py-32", className)}
      style={{ backgroundColor: bgColor }}
    >
      <DoodleLayer>
        <Doodle
          src="/static/doodles/skills/laptop.svg"
          position="left-[4%] top-[12%]"
          width={130}
          opacity={0.4}
          delay={0.3}
        />
        <Doodle
          src="/static/doodles/skills/coding.svg"
          position="left-1/2 top-[2%] hidden -translate-x-1/2 md:block"
          width={72}
          opacity={0.5}
          delay={1.4}
        />
        <Doodle
          src="/static/doodles/skills/youtube.svg"
          position="right-[5%] top-[16%]"
          width={74}
          opacity={0.5}
          delay={2.2}
        />
        <Doodle
          src="/static/doodles/skills/fillStar.svg"
          position="left-[12%] bottom-[8%]"
          width={52}
          opacity={0.5}
          delay={3}
        />
        <Doodle
          src="/static/doodles/skills/star-outline.svg"
          position="right-[10%] bottom-[10%]"
          width={44}
          opacity={0.45}
          delay={1.7}
        />
      </DoodleLayer>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 md:gap-12">
        {/* Titre à gauche, paragraphe à droite */}
        <div
          data-reveal
          className="flex flex-col justify-between gap-6 md:flex-row md:gap-20"
        >
          <SectionTitle
            title={title ?? t("skills.title")}
            className="shrink-0 md:max-w-lg"
            accentColor={accentColor}
          />
          <p className="max-w-md self-end pb-2 text-base text-gray-300">
            {subtitle ?? t("skills.subtitle")}
          </p>
        </div>

        {/* Colonnes DEV / DEVOPS */}
        <div data-reveal className="flex flex-col gap-8 md:gap-14">
          <SkillsColumn
            title={t("skills.dev")}
            categories={resolveCategories(devCategories)}
            skills={devSkills}
            showMoreLabel={t("skills.showMore")}
            showLessLabel={t("skills.showLess")}
            accentColor={accentColor}
          />

          <div className="border-t border-[#192742]" />

          <SkillsColumn
            title={t("skills.devops")}
            categories={resolveCategories(devopsCategories)}
            skills={devopsSkills}
            showMoreLabel={t("skills.showMore")}
            showLessLabel={t("skills.showLess")}
            accentColor={accentColor}
          />
        </div>
      </div>
    </section>
  );
}