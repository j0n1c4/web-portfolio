import { StatItem } from "@/components/molecules/StatItem"
import { cn } from "@/lib/utils"

export interface SiteStat {
  value: number
  suffix?: string
  label: string
}

interface StatsSectionProps {
  stats?: SiteStat[]
  className?: string
}

/** Organism — animated stats row (Magic UI NumberTicker) */
export function StatsSection({ stats = [], className }: StatsSectionProps) {
  if (stats.length === 0) return null

  return (
    <section className={cn("px-6 py-16", className)}>
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  )
}
