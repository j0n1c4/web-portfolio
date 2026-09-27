import { Minus, Plus, type LucideIcon } from "lucide-react"
import { useState } from "react"
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
  /** Nombre de skills affichés avant dépliage — une ligne de la grille. */
  visibleCount?: number
  showMoreLabel: string
  showLessLabel: string
  className?: string
  accentColor?: string
}

/** Nombre de skills visibles au repos : 4 = une ligne pleine en `sm` et plus. */
const VISIBLE_SKILLS = 4

/** Molecule — one skills column: title, category cards & skill circles */
export function SkillsColumn({
  title,
  categories,
  skills,
  visibleCount = VISIBLE_SKILLS,
  showMoreLabel,
  showLessLabel,
  className,
  accentColor = "#12F7D6",
}: SkillsColumnProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const canExpand = skills.length > visibleCount
  const visibleSkills = isExpanded ? skills : skills.slice(0, visibleCount)
  const hiddenCount = skills.length - visibleCount

  return (
    <div className={cn("space-y-8", className)}>
      {/* Column Title */}
      <div className="mb-8 text-center">
        <h3 className="font-mono text-2xl  font-bold md:text-3xl" style={{ color: accentColor }}>
          {title}
        </h3>
        <div className="mx-auto mt-2 h-0.5 w-16 " style={{ backgroundColor: accentColor }} />
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

      {/* Skill Circles — 4 par défaut, le reste derrière un bouton */}
      <div className="grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-4">
        {visibleSkills.map((skill) => (
          <SkillCircle key={skill.label} icon={skill.icon} label={skill.label} color={skill.color} />
        ))}
      </div>

      {canExpand && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((previous) => !previous)}
            aria-expanded={isExpanded}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-6 py-2.5 font-mono text-sm font-bold transition-all duration-300 hover:bg-white/5"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {isExpanded ? (
              <>
                <Minus className="h-4 w-4" />
                <span>{showLessLabel}</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>
                  {showMoreLabel} <span className="opacity-70">+{hiddenCount}</span>
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
