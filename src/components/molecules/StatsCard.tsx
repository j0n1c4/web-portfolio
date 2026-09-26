import { StatItem } from "@/components/atoms"
import { cn } from "@/lib/utils"

interface Stat {
  value: string | number
  label: string
}

interface StatsCardProps {
  stats: Stat[]
  className?: string
  accentColor?: string
}

/** Molecule — vertical card of stats */
export function StatsCard({ stats, className, accentColor = "#12F7D6" }: StatsCardProps) {
  return (
    <div
      className={cn(
        "space-y-8 rounded-[40px] border border-white/5 bg-[#1a1f24] p-8 shadow-2xl",
        className,
      )}
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} value={stat.value} label={stat.label} accentColor={accentColor} />
      ))}
    </div>
  )
}