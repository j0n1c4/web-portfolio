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

/** Molecule — stats en liste légère (style `blue-portfolio` : mono cyan + gray) */
export function StatsCard({ stats, className, accentColor = "#00C7FF" }: StatsCardProps) {
  if (stats.length === 0) return null

  return (
    <dl
      className={cn(
        "grid w-full grid-cols-3 gap-6 border-t border-[#192742] pt-6 lg:grid-cols-1 lg:gap-4",
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <dt className="sr-only">{stat.label}</dt>
          <dd
            className="font-mono text-2xl font-bold whitespace-pre-line md:text-3xl"
            style={{ color: accentColor }}
          >
            {stat.value}
          </dd>
          <p className="font-mono text-xs leading-snug whitespace-pre-line text-gray-500">
            {stat.label}
          </p>
        </div>
      ))}
    </dl>
  )
}