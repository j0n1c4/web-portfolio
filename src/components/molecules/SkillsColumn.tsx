import { Minus, Plus, type LucideIcon } from "lucide-react"
import { useState } from "react"
import { Doodle } from "@/components/molecules/Doodles"
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

/** Nombre de skills visibles au repos : 6 = une ligne pleine en `md` et plus. */
const VISIBLE_SKILLS = 6

/** Molecule — grille d'icônes façon `blue-portfolio` (3 → 6 colonnes) */
export function SkillsColumn({
  title,
  categories,
  skills,
  visibleCount = VISIBLE_SKILLS,
  showMoreLabel,
  showLessLabel,
  className,
  accentColor = "#00C7FF",
}: SkillsColumnProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const canExpand = skills.length > visibleCount
  const visibleSkills = isExpanded ? skills : skills.slice(0, visibleCount)
  const hiddenCount = skills.length - visibleCount

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {/* Titre de colonne — mono cyan + filet, façon label du template */}
      <div className="relative flex items-center gap-3">
        <Doodle
          src="/static/doodles/projects/pop.svg"
          position="right-[2%] top-1/2 hidden -translate-y-1/2 sm:block"
          width={62}
          opacity={0.5}
          delay={2.6}
        />
        <h3
          className="font-mono text-sm font-bold tracking-widest uppercase"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: `${accentColor}40` }}
        />
      </div>

      {/* Catégories — liste simple (plus de cartes pleine couleur) */}
      {categories.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.title} className="flex items-start gap-3">
                <Icon className="mt-1 h-4 w-4 shrink-0" style={{ color: accentColor }} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{category.title}</span>
                  <span className="font-mono text-xs text-gray-300">{category.subtitle}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Grille d'icônes */}
      <div className="grid grid-cols-3 items-center justify-items-center gap-8 sm:grid-cols-4 md:gap-10 md:grid-cols-6">
        {visibleSkills.map((skill) => {
          const Icon = skill.icon
          return (
            <div
              key={skill.label}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <Icon
                className="h-9 w-9 transition-transform duration-300 group-hover:-translate-y-1 md:h-10 md:w-10"
                style={{ color: accentColor }}
              />
              <span className="font-mono text-xs font-semibold tracking-wide text-gray-200 transition-colors duration-300 group-hover:text-[#00C7FF]">
                {skill.label}
              </span>
            </div>
          )
        })}
      </div>

      {canExpand && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((previous) => !previous)}
            aria-expanded={isExpanded}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-6 py-2.5 font-mono text-sm font-bold transition-colors duration-300 hover:bg-[#00C7FF] hover:text-[#000A1F]"
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