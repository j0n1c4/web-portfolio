import { cn } from "@/lib/utils"
import { NavLink, SearchInput, SocialIcon } from "@/components/atoms"
import type { LucideIcon } from "lucide-react"

interface NavItem {
  label: string
  href: string
  active?: boolean
}

/** Molecule — list of navigation links */
export function Navigation({ items, className }: { items: NavItem[]; className?: string }) {
  return (
    <nav className={cn("flex items-center gap-8", className)}>
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
  iconColor = "#12F7D6",
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

/** Molecule — centered search input */
export function SearchBar({
  className,
  iconColor = "#12F7D6",
}: {
  className?: string
  iconColor?: string
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <SearchInput iconColor={iconColor} />
    </div>
  )
}

export type { NavItem, SocialLinkItem }