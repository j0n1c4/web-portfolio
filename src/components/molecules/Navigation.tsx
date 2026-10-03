import { cn } from "@/lib/utils"
import { NavLink, SocialIcon } from "@/components/atoms"
import type { LucideIcon } from "lucide-react"

interface NavItem {
  label: string
  href: string
  active?: boolean
}

/** Molecule — list of navigation links */
export function Navigation({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    // gap resserré entre md et lg : « Réalisations » est plus long que
    // l'ancien libellé, et 6 liens + switcher + socials ne tiennent pas à 768px.
    <nav className={cn("flex items-center gap-6 lg:gap-8", className)}>
      {items.map((item) => (
        <NavLink key={item.href} href={item.href} active={item.active}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

interface SocialLinkItem {
  platform: string
  url: string
  icon: LucideIcon
}

/** Molecule — list of social icons */
export function SocialLinks({
  links,
  className,
  iconColor = "#00C7FF",
}: {
  links: SocialLinkItem[]
  className?: string
  iconColor?: string
}) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {links.map((link) => (
        <SocialIcon
          key={link.platform}
          icon={link.icon}
          href={link.url}
          label={link.platform}
          iconColor={iconColor}
        />
      ))}
    </div>
  )
}

export type { NavItem, SocialLinkItem }