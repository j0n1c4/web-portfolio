import { Mail } from "lucide-react"
import { CodeTag } from "@/components/atoms"
import { ProfileCard } from "@/components/molecules/ProfileCard"
import { Sidebar } from "@/components/molecules/Sidebar"
import { StatsCard } from "@/components/molecules/StatsCard"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface Stat {
  value: string | number
  label: string
}

interface HeroSectionProps {
  name: string
  title: string
  headline: string
  subtitle: string
  description: string
  avatar: string
  email?: string
  location?: string
  availability?: string
  website?: string
  skills?: string[]
  downloadCVUrl?: string
  stats?: Stat[]
  ctaText?: string
  /** Section visible (scroll-spy) — pilote l'icône active de la Sidebar. */
  activeSection?: string
  onCTAClick?: () => void
  className?: string
  bgColor?: string
  accentColor?: string
}

/** Organism — full hero with sidebar, profile card, headline & stats */
export function HeroSection({
  name,
  title,
  headline,
  subtitle,
  description,
  avatar,
  email,
  location,
  availability,
  website,
  skills = [],
  downloadCVUrl,
  stats = [],
  ctaText,
  activeSection,
  onCTAClick,
  className,
  bgColor = "#292F36",
  accentColor = "#12F7D6",
}: HeroSectionProps) {
  const { t } = useI18n()
  const firstName = name.split(" ")[0]

  return (
    <section
      id="hero"
      className={cn("relative min-h-screen overflow-hidden", className)}
      style={{ backgroundColor: bgColor }}
    >
      {/* Sidebar */}
      <Sidebar activeItem={activeSection} accentColor={accentColor} />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-20">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:min-h-[calc(100vh-8rem)]">
          {/* Left Column - Profile Card */}
          <div className="flex justify-center lg:col-span-3 lg:justify-start">
            <ProfileCard
              name={name}
              title={title}
              avatar={avatar}
              email={email}
              location={location}
              availability={availability}
              website={website}
              skills={skills}
              downloadCVUrl={downloadCVUrl}
              accentColor={accentColor}
            />
          </div>

          {/* Center Column - Main Content */}
          <div className="space-y-8 px-4 lg:col-span-6">
            {/* Big "Developer" text */}
            <h1
              className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
              style={{ color: accentColor }}
            >
              {headline ?? t("hero.headline")}
            </h1>

            {/* Heading with code tags */}
            <div className="space-y-2">
              <CodeTag tag="h1" accentColor={accentColor} />
              <h2 className="text-4xl leading-tight font-bold text-white md:text-5xl lg:text-6xl">
                Hey
                <br />
                I&apos;m <span style={{ color: accentColor }}>{firstName},</span>
                <br />
                {subtitle}
              </h2>
              <CodeTag tag="h1" closing accentColor={accentColor} />
            </div>

            {/* Description with code tags */}
            <div className="max-w-xl space-y-2">
              <CodeTag tag="p" accentColor={accentColor} />
              <p className="font-mono text-base leading-relaxed text-gray-300">{description}</p>
              <CodeTag tag="p" closing accentColor={accentColor} />
            </div>

            {/* CTA Button */}
            <button type="button" onClick={onCTAClick} className="group inline-flex items-center gap-3">
              <span
                className="font-mono text-2xl font-bold transition-all duration-300 group-hover:translate-x-2 md:text-3xl"
                style={{ color: accentColor }}
              >
                {ctaText ?? t("hero.cta")}
              </span>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <Mail className="h-5 w-5" style={{ color: accentColor }} />
              </div>
            </button>
          </div>

          {/* Right Column - Stats */}
          <div className="flex justify-center lg:col-span-3 lg:justify-end">
            <StatsCard stats={stats} accentColor={accentColor} />
          </div>
        </div>
      </div>

      {/* Decorative element — symbole de code en filigrane, lg et plus */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-20 hidden select-none lg:block"
        style={{
          maskImage: "linear-gradient(to bottom, black 45%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 100%)",
        }}
      >
        <span className="font-mono text-[20rem] leading-none text-slate-900/15">{"</>"}</span>
      </div>
    </section>
  )
}
