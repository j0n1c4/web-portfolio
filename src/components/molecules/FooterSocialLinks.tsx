import { type LucideIcon } from "lucide-react"
import { FooterSocialIcon } from "@/components/atoms"
import { cn } from "@/lib/utils"

export interface FooterSocialLinkItem {
  platform: string
  url: string
  icon: LucideIcon
}

interface FooterSocialLinksProps {
  links?: FooterSocialLinkItem[]
  className?: string
  accentColor?: string
}

/**
 * Molecule — row of round social icon links.
 *
 * Pas de `defaultLinks` : un lien social vers une URL générique
 * (`instagram.com`, `discord.com`) affiche un compte qui n'appartient pas au
 * propriétaire du site. Les liens réels viennent de `data/navigation.ts`.
 */
export function FooterSocialLinks({ links = [], className, accentColor = "#12F7D6" }: FooterSocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {links.map((link) => (
        <FooterSocialIcon
          key={link.platform}
          icon={link.icon}
          href={link.url}
          label={link.platform}
          accentColor={accentColor}
        />
      ))}
    </div>
  )
}