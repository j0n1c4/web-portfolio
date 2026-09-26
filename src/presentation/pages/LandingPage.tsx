import { HeroSection } from "@/components/organisms/HeroSection"
import { StatsSection } from "@/components/organisms/StatsSection"
import { WorksSection } from "@/components/organisms/WorksSection"
import { BlogsSection } from "@/components/organisms/BlogsSection"
import { ContactSection } from "@/components/organisms/ContactSection"
import { Footer } from "@/components/organisms/Footer"
import heroImage from "@/assets/hero.png"
import { SkillsSection } from "@/components/organisms/SkillsSection"
import { AboutSection } from "@/components/organisms/AboutSection"
import { Header } from "@/components/organisms/Header"

/**
 * Presentation layer — page composed of organisms,
 * data injected via use cases (clean architecture).
 */
export function LandingPage() {

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header />
      <HeroSection
        name="Sinan"
        title="Full-stack developer"
        subtitle="Full-Stack Developer"
        description="I help business grow by crafting amazing web experiences. If you're looking for a developer that likes to get stuff done,"
        avatar={heroImage}
        email="abdurrahman_sinan@hotmail.com"
        location="Turkey"
        availability="Full-time / Freelancer"
        website="www.sinantokmak.com"
        skills={["HTML", "CSS", "JS", "REACT"]}
        downloadCVUrl="/cv.pdf"
        ctaText="Let's Talk"
        onCTAClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
      />
      <AboutSection />
      <SkillsSection />
      <StatsSection />
      <WorksSection />
      <BlogsSection />
      <ContactSection onSubmit={(data) => console.log("Form submitted:", data)} />
      <Footer />
    </main>
  )
}
