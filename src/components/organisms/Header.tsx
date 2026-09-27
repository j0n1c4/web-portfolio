import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/atoms"
import {
  Navigation,
  SocialLinks,
  type NavItem,
  type SocialLinkItem,
} from "@/components/molecules/Navigation"
import { LanguageSwitcher } from "@/components/molecules/LanguageSwitcher"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface HeaderProps {
  logoText?: string
  navItems?: NavItem[]
  socialLinks?: SocialLinkItem[]
  activeSection?: string
  className?: string
  bgColor?: string
  accentColor?: string
}

/** Organism — fixed site header with language switcher & mobile menu */
export function Header({
  logoText = "j0n1c4",
  navItems = [],
  socialLinks = [],
  activeSection,
  className,
  bgColor = "#292F36",
  accentColor = "#12F7D6",
}: HeaderProps) {
  const { t } = useI18n()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled && "shadow-lg",
        className,
      )}
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Logo text={logoText} codeColor={accentColor} />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Navigation
              items={navItems.map((item) => ({
                ...item,
                active: activeSection ? item.href === `#${activeSection}` : item.active,
              }))}
            />
          </div>

          {/* Language Switcher & Social Links - Desktop */}
          <div className="hidden items-center gap-6 md:flex">
            <LanguageSwitcher accentColor={accentColor} />
            <SocialLinks links={socialLinks} iconColor={accentColor} />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="p-2 text-white transition-colors hover:text-[#12F7D6] md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="space-y-4 border-t border-white/10 py-4 md:hidden">
            <Navigation
              items={navItems.map((item) => ({
                ...item,
                active: activeSection ? item.href === `#${activeSection}` : item.active,
              }))}
              className="flex-col gap-4"
            />
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <LanguageSwitcher accentColor={accentColor} />
              <SocialLinks
                links={socialLinks}
                iconColor={accentColor}
                className="flex-col items-start gap-3"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
