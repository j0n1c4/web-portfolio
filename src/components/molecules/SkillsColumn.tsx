import type { LucideIcon } from "lucide-react"
import { SkillCard, SkillCircle } from "@/components/atoms"
import { cn } from "@/lib/utils"

interface SkillItem {
  icon: LucideIcon
  label: string
  color: string
}

interface SkillCategory {
  icon: LucideIcon
  title: string
  subtitle: string
}

interface SkillsColumnProps {
  title: string
  categories: SkillCategory[]
  skills: SkillItem[]
  className?: string
  accentColor?: string
}

/** Molecule — one skills column: title, category cards & skill circles */
export function SkillsColumn({
  title,
  categories,
  skills,
  className,
  accentColor = "#12F7D6",
}: SkillsColumnProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Column Title */}
      <div className="mb-8 text-center">
        <h3 className="font-mono text-2xl font-bold md:text-3xl" style={{ color: accentColor }}>
          {title}
        </h3>
        <div className="mx-auto mt-2 h-0.5 w-16" style={{ backgroundColor: accentColor }} />
      </div>

      {/* Skill Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <SkillCard
            key={category.title}
            icon={category.icon}
            title={category.title}
            subtitle={category.subtitle}
            accentColor={accentColor}
          />
        ))}
      </div>

      {/* Skill Circles */}
      <div className="grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-4">
        {skills.map((skill) => (
          <SkillCircle key={skill.label} icon={skill.icon} label={skill.label} color={skill.color} />
        ))}
      </div>
    </div>
  )
}