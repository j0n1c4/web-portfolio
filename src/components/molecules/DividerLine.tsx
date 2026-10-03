import { cn } from "@/lib/utils"

interface DividerLineProps {
  className?: string
  accentColor?: string
}

/** Molecule — vertical decorative dashed line with dots at both ends */
export function DividerLine({ className, accentColor = "#00C7FF" }: DividerLineProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Top dot */}
      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: accentColor }} />
      {/* Dashed line */}
      <div
        className="min-h-[200px] w-px flex-1 border-l-2 border-dashed"
        style={{ borderColor: accentColor }}
      />
      {/* Bottom dot */}
      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: accentColor }} />
    </div>
  )
}