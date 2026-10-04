import { ProfileCard } from "@/components/molecules/ProfileCard"
import { Doodle, DoodleLayer } from "@/components/molecules/Doodles"
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

/**
 * Organism — hero (design `blue-portfolio` : ProfileCard conservée à gauche,
 * colonne de texte blanche `tracking-tighter`, CTA en pilule contour cyan,
 * doodles flottants autour du contenu).
 */
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
  bgColor = "#000A1F",
  accentColor = "#00C7FF",
}: HeroSectionProps) {
  const { t } = useI18n()
  const firstName = name.split(" ")[0]

  return (
    <section
      id="hero"
      className={cn("relative min-h-screen overflow-hidden", className)}
      style={{ backgroundColor: bgColor }}
    >
      {/* Sidebar (design actuel conservé) */}
      <Sidebar activeItem={activeSection} accentColor={accentColor} />

      {/* Doodles décoratifs */}
      <DoodleLayer>
        <Doodle
          src="/static/doodles/hero/coder.svg"
          position="right-[2%] top-[12%]"
          width={300}
          opacity={0.5}
          scale="scale-40 sm:scale-60 md:scale-80 lg:scale-100"
          delay={0}
        />
        <Doodle
          src="/static/doodles/hero/code.svg"
          position="left-[42%] top-[8%]"
          width={60}
          opacity={0.7}
          delay={1.2}
        />
        <Doodle
          src="/static/doodles/hero/html.svg"
          position="right-[26%] top-[62%]"
          width={54}
          opacity={0.65}
          delay={2.4}
        />
        <Doodle
          src="/static/doodles/hero/js.svg"
          position="right-[16%] bottom-[8%]"
          width={48}
          opacity={0.6}
          delay={3.1}
        />
        <Doodle
          src="/static/doodles/hero/paintbrush.svg"
          position="left-[38%] bottom-[6%]"
          width={74}
          opacity={0.45}
          delay={0.8}
        />
        <Doodle
          src="/static/doodles/hero/pop1.svg"
          position="left-[26%] top-[16%]"
          width={26}
          opacity={0.8}
          delay={1.8}
        />
        <Doodle
          src="/static/doodles/hero/pop2.svg"
          position="right-[34%] top-[26%]"
          width={30}
          opacity={0.7}
          delay={2.9}
        />
        <Doodle
          src="/static/doodles/hero/left-squiggle.svg"
          position="left-[-26px] bottom-[14%]"
          width={110}
          opacity={0.3}
          delay={1.4}
        />
        <Doodle
          src="/static/doodles/hero/right-squiggle.svg"
          position="right-[-40px] top-[38%]"
          width={170}
          opacity={0.25}
          delay={2.1}
        />
        <Doodle
          src="/static/doodles/hero/fancyLinesSm.svg"
          position="left-1/2 top-[52%] hidden -translate-x-1/2 lg:block"
          width={640}
          opacity={0.16}
          scale="scale-40 sm:scale-60 md:scale-80 lg:scale-100"
          delay={0.4}
        />
      </DoodleLayer>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:min-h-[calc(100vh-9rem)]">
          {/* Left Column — ProfileCard (design actuel conservé) */}
          <div
            data-reveal
            className="flex justify-center lg:col-span-3 lg:justify-start"
          >
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

          {/* Center Column — texte principal */}
          <div className="animate-hero-in flex flex-col gap-6 lg:col-span-6">
            <div data-reveal className="flex flex-col gap-3">
              <span className="font-mono text-xs font-bold tracking-widest text-gray-300 uppercase">
                {subtitle}
              </span>
              <h1 className="text-4xl leading-tight font-bold tracking-tighter text-white md:text-6xl">
                {headline ?? t("hero.headline")}{" "}
                <span style={{ color: accentColor }}>{firstName}</span>
              </h1>
              <p className="text-base font-medium text-gray-300 md:text-lg">
                {title}
              </p>
            </div>

            <p
              data-reveal
              className="max-w-xl text-base leading-relaxed text-gray-300"
            >
              {description}
            </p>

            {/* CTAs — pilule contour cyan (style template) */}
            <div data-reveal className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onCTAClick}
                className="rounded-full border-2 px-8 py-3 text-sm font-bold transition-colors duration-300"
                style={{
                  borderColor: accentColor,
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor
                  e.currentTarget.style.color = "#000A1F"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#ffffff"
                }}
              >
                {ctaText ?? t("hero.cta")}
              </button>
              <a
                href="#projects"
                className="rounded-full border-2 border-[#192742] px-8 py-3 text-sm font-bold text-white transition-colors duration-300 hover:border-[#00C7FF] hover:text-[#00C7FF]"
              >
                {t("hero.ctaProjects")}
              </a>
            </div>
          </div>

          {/* Right Column — Stats */}
          <div
            data-reveal
            className="flex justify-center lg:col-span-3 lg:justify-end"
          >
            <StatsCard stats={stats} accentColor={accentColor} />
          </div>
        </div>
      </div>
    </section>
  )
}