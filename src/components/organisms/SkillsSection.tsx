import {
  Atom,
  Braces,
  Cloud,
  Code2,
  Container,
  Database,
  GitBranch,
  Monitor,
  Palette,
  Server,
  Shield,
  Smartphone,
  type LucideIcon,
} from "lucide-react"
import { CodeIcon, ScrollIndicator, SectionTitle } from "@/components/atoms"
import { DividerLine } from "@/components/molecules/DividerLine"
import { SkillsColumn } from "@/components/molecules/SkillsColumn"
import { cn } from "@/lib/utils"

interface SkillCategory {
  icon: LucideIcon
  title: string
  subtitle: string
}

interface SkillItem {
  icon: LucideIcon
  label: string
  color: string
}

interface SkillsSectionProps {
  title?: string
  subtitle?: string
  devCategories?: SkillCategory[]
  devSkills?: SkillItem[]
  devopsCategories?: SkillCategory[]
  devopsSkills?: SkillItem[]
  className?: string
  bgColor?: string
  accentColor?: string
}

const DEFAULT_DEV_CATEGORIES: SkillCategory[] = [
  { icon: Monitor, title: "Web Development", subtitle: "HTML · CSS · JS · REACT" },
  { icon: Smartphone, title: "App Development", subtitle: "iOS · Android" },
]

const DEFAULT_DEV_SKILLS: SkillItem[] = [
  { icon: Code2, label: "HTML", color: "#E34F26" },
  { icon: Palette, label: "CSS", color: "#1572B6" },
  { icon: Braces, label: "JS", color: "#F7DF1E" },
  { icon: Atom, label: "REACT", color: "#61DAFB" },
]

const DEFAULT_DEVOPS_CATEGORIES: SkillCategory[] = [
  { icon: Server, title: "CI/CD Pipeline", subtitle: "GitHub Actions · Jenkins" },
  { icon: Cloud, title: "Cloud Services", subtitle: "AWS · Azure · GCP" },
]

const DEFAULT_DEVOPS_SKILLS: SkillItem[] = [
  { icon: Container, label: "DOCKER", color: "#2496ED" },
  { icon: Database, label: "K8S", color: "#326CE5" },
  { icon: GitBranch, label: "GIT", color: "#F05032" },
  { icon: Shield, label: "LINUX", color: "#FCC624" },
]

/** Organism — skills section split into DEV / DEVOPS columns */
export function SkillsSection({
  title = "Skills",
  subtitle = "I am striving to never stop learning and improving",
  devCategories = DEFAULT_DEV_CATEGORIES,
  devSkills = DEFAULT_DEV_SKILLS,
  devopsCategories = DEFAULT_DEVOPS_CATEGORIES,
  devopsSkills = DEFAULT_DEVOPS_SKILLS,
  className,
  bgColor = "#292F36",
  accentColor = "#12F7D6",
}: SkillsSectionProps) {
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

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Scroll Indicator */}
        <div className="mb-16 flex justify-center">
          <ScrollIndicator accentColor={accentColor} />
        </div>

        {/* Section Title */}
        <div className="mb-20">
          <SectionTitle variant="centered" title={title} subtitle={subtitle} accentColor={accentColor} />
        </div>

        {/* Skills Grid with Divider */}
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* DEV Column */}
          <SkillsColumn
            title="DEV"
            categories={devCategories}
            skills={devSkills}
            accentColor={accentColor}
          />

          {/* Vertical Divider */}
          <DividerLine accentColor={accentColor} className="hidden lg:flex" />

          {/* DEVOPS Column */}
          <SkillsColumn
            title="DEVOPS"
            categories={devopsCategories}
            skills={devopsSkills}
            accentColor={accentColor}
          />
        </div>
      </div>
    </section>
  )
}
