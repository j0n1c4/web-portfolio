import { CodeIcon, ScrollIndicator, SectionTitle } from "@/components/atoms";
import { DividerLine } from "@/components/molecules/DividerLine";
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

/** Organism — skills section split into DEV / DEVOPS columns */
export function SkillsSection({
  title,
  subtitle,
  devCategories = [],
  devSkills = [],
  devopsCategories = [],
  devopsSkills = [],
  className,
  bgColor = "#292F36",
  accentColor = "#12F7D6",
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
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
      style={{ backgroundColor: bgColor }}
    >
      {/* Code Icon Decoration */}
      <div className="absolute top-20 right-10 opacity-20 md:right-20">
        <CodeIcon accentColor={accentColor} />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        {/* Scroll Indicator */}
        <div className="mb-16 flex justify-center">
          <ScrollIndicator accentColor={accentColor} />
        </div>

        {/* Section Title */}
        <div className="mb-20">
          <SectionTitle
            variant="centered"
            title={title ?? t("skills.title")}
            subtitle={subtitle ?? t("skills.subtitle")}
            accentColor={accentColor}
          />
        </div>

        {/* Skills Grid with Divider */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* DEV Column */}
          <SkillsColumn
            title={t("skills.dev")}
            categories={resolveCategories(devCategories)}
            skills={devSkills}
            showMoreLabel={t("skills.showMore")}
            showLessLabel={t("skills.showLess")}
            accentColor={accentColor}
          />

          {/* Vertical Divider */}
          <DividerLine accentColor={accentColor} className="hidden lg:flex" />

          {/* DEVOPS Column */}
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
