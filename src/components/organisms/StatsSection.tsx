import { StatItem } from "@/components/molecules/StatItem"

/** Organism — animated stats row (Magic UI NumberTicker) */
export function StatsSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-8">
        <StatItem value={4} suffix="+" label="Années d'expérience" delay={0} />
        <StatItem value={24} suffix="" label="Projets livrés" delay={0.1} />
        <StatItem value={100} suffix="%" label="Passion" delay={0.2} />
      </div>
    </section>
  )
}
