import { Marquee } from "@/components/ui/magicui"
import { Badge } from "@/components/atoms"

interface SkillsMarqueeProps {
  skills: string[]
}

/** Organism — infinite marquee of skills (Magic UI Marquee) */
export function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  return (
    <section className="py-12">
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <Marquee pauseOnHover duration={25}>
          {skills.map((skill) => (
            <Badge key={skill} className="mx-2 border border-border bg-muted/40 px-5 py-2 text-sm">
              {skill}
            </Badge>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
