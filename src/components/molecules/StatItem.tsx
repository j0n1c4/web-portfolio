import { BlurFade, NumberTicker } from "@/components/ui/magicui"

/** Molecule — stat with animated number (Magic UI NumberTicker) */
export function StatItem({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number
  suffix?: string
  label: string
  delay?: number
}) {
  return (
    <BlurFade delay={delay} className="text-center">
      <div className="text-4xl font-bold text-primary">
        <NumberTicker value={value} suffix={suffix} />
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </BlurFade>
  )
}
