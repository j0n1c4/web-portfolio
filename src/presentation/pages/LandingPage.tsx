import { GraduationCap, MapPin, Target, type LucideIcon } from "lucide-react"
import mePhoto from "@/assets/me/profle-me.jpeg"
import { AboutSection } from "@/components/organisms/AboutSection"
import { BlogsSection } from "@/components/organisms/BlogsSection"
import { ContactSection } from "@/components/organisms/ContactSection"
import { Footer } from "@/components/organisms/Footer"
import { Header } from "@/components/organisms/Header"
import { HeroSection } from "@/components/organisms/HeroSection"
import { SkillsSection } from "@/components/organisms/SkillsSection"
import { StatsSection } from "@/components/organisms/StatsSection"
import { WorksSection } from "@/components/organisms/WorksSection"
import { useI18n } from "@/i18n"
import { getBlogPosts } from "@/data/blog"
import { footerSocialLinks, getNavItems, headerSocialLinks } from "@/data/navigation"
import {
  aboutParagraphs,
  getAboutHighlights,
  getAboutInfo,
  getAvailability,
  getCopyright,
  getTagline,
  getTitle,
  heroSkills,
  heroStats,
  profile,
  siteStats,
} from "@/data/profile"
import { getWorkProjects } from "@/data/projects"
import { SECTION_IDS } from "@/data/sections"
import {
  devCategories,
  devSkills,
  devopsCategories,
  devopsSkills,
} from "@/data/skills"
import { useActiveSection } from "@/hooks/useActiveSection"

/**
 * Icône associée à chaque ligne d'identité du bloc « À propos ».
 * Les clés correspondent aux `labelKey` renvoyés par `getAboutInfo`.
 */
const ABOUT_INFO_ICONS: Record<string, LucideIcon> = {
  "hero.location": MapPin,
  "hero.education": GraduationCap,
  "hero.objective": Target,
}

/** Ancres de la page — le scroll est géré en CSS (`scroll-behavior: smooth`). */
const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

/**
 * Presentation layer — page composed of organisms, data injected via
 * data modules (see src/data/*). Everything user-facing goes through
 * `t()` / the `get*(locale)` helpers, so a single provider re-renders
 * the whole page when the locale changes.
 */
export function LandingPage() {
  const { t, locale } = useI18n()

  // Scroll-spy partagé : une seule source de vérité pour le Header et la Sidebar.
  const activeSection = useActiveSection([...SECTION_IDS])

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header
        logoText={profile.handle}
        navItems={getNavItems(t)}
        socialLinks={headerSocialLinks}
        activeSection={activeSection}
      />
      <HeroSection
        name={profile.name}
        title={getTitle(locale)}
        headline={t("hero.headline")}
        subtitle={getTitle(locale)}
        description={getTagline(locale)}
        avatar={mePhoto}
        email={profile.contact.email}
        location={profile.location}
        availability={getAvailability(locale)}
        website={profile.cvUrl}
        skills={[...heroSkills]}
        downloadCVUrl={profile.cvUrl}
        stats={heroStats.map((stat) => ({ value: stat.value, label: t(stat.labelKey) }))}
        ctaText={t("hero.cta")}
        activeSection={activeSection}
        onCTAClick={() => scrollTo("contact")}
      />
      <AboutSection
        info={getAboutInfo(locale).map((item) => ({
          icon: ABOUT_INFO_ICONS[item.labelKey] ?? MapPin,
          text: `${t(item.labelKey)} — ${item.value}`,
        }))}
        paragraphs={aboutParagraphs[locale]}
        highlights={getAboutHighlights(locale)}
        imageAlt={t("about.imageAlt")}
      />
      <SkillsSection
        devCategories={devCategories.map((category) => ({ ...category }))}
        devSkills={devSkills.map((skill) => ({ ...skill }))}
        devopsCategories={devopsCategories.map((category) => ({ ...category }))}
        devopsSkills={devopsSkills.map((skill) => ({ ...skill }))}
      />
      <StatsSection
        stats={siteStats.map((stat) => ({ value: stat.value, suffix: stat.suffix, label: t(stat.labelKey) }))}
      />
      <WorksSection projects={getWorkProjects(locale)} />
      <BlogsSection posts={getBlogPosts(locale)} onReadMore={() => scrollTo("projects")} />
      <ContactSection />
      <Footer copyright={getCopyright(locale)} socialLinks={footerSocialLinks} showCredit={false} />
    </main>
  )
}
