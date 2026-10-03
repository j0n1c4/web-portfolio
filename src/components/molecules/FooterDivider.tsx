import { cn } from "@/lib/utils"

interface FooterDividerProps {
  className?: string
  accentColor?: string
}

/** Molecule — thin accent divider line */
export function FooterDivider({ className, accentColor = "#00C7FF" }: FooterDividerProps) {
  return (
    <div
      className={cn("h-px w-full", className)}
      style={{ backgroundColor: accentColor, opacity: 0.3 }}
    />
  )
}