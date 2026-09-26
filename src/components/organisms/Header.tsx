import { useEffect, useState } from "react"
import { GitBranch, Camera, Menu, MessageCircle, X } from "lucide-react"
import { Logo } from "@/components/atoms"
import { Navigation, SearchBar, SocialLinks, type NavItem, type SocialLinkItem } from "@/components/molecules/Navigation"
import { cn } from "@/lib/utils"

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", active: true },
  { label: "Blogs", href: "/blogs", active: false },
]

const DEFAULT_SOCIAL_LINKS: SocialLinkItem[] = [
  { platform: "Instagram", url: "https://instagram.com", icon: Camera },
  { platform: "Discord", url: "https://discord.com", icon: MessageCircle },
  { platform: "Github", url: "https://github.com", icon: GitBranch },
]

interface HeaderProps {
  logoText?: string
  navItems?: NavItem[]
  socialLinks?: SocialLinkItem[]
  className?: string
  bgColor?: string
  accentColor?: string
}

/** Organism — fixed site header with mobile menu */
export function Header({
  logoText = "SinanTokmak",
  navItems = DEFAULT_NAV_ITEMS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  className,
  bgColor = "#292F36",
  accentColor = "#12F7D6",
}: HeaderProps) {
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
      <div className="mx-auto max-w-7xl px-6 lg:px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Logo text={logoText} codeColor={accentColor} />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Navigation items={navItems} />
          </div>

          {/* Search Bar - Desktop */}
          <div className="mx-8 hidden max-w-md flex-1 items-center justify-center lg:flex">
            <SearchBar iconColor={accentColor} />
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden items-center md:flex">
            <SocialLinks links={socialLinks} iconColor={accentColor} />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="p-2 text-white transition-colors hover:text-[#12F7D6] md:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="space-y-4 border-t border-white/10 py-4 md:hidden">
            <Navigation items={navItems} className="flex-col gap-4" />
            <div className="border-t border-white/10 pt-4">
              <SearchBar iconColor={accentColor} className="justify-start" />
            </div>
            <div className="border-t border-white/10 pt-4">
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
