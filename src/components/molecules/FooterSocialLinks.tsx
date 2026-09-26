import { Camera, GitBranch, MessageCircle, type LucideIcon } from "lucide-react"
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

// Note: `Instagram`/`Github` brand icons were removed from lucide-react v1.48;
// substitute icons (Camera / GitBranch) are used instead.
const defaultLinks: FooterSocialLinkItem[] = [
  { platform: "Instagram", url: "https://instagram.com", icon: Camera },
  { platform: "Discord", url: "https://discord.com", icon: MessageCircle },
  { platform: "Github", url: "https://github.com", icon: GitBranch },
]

/** Molecule — row of round social icon links */
export function FooterSocialLinks({ links = defaultLinks, className, accentColor = "#12F7D6" }: FooterSocialLinksProps) {
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