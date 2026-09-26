import { BriefcaseBusiness, Camera, GitBranch, Mail } from "lucide-react"
import type { NavItem, SocialLinkItem } from "@/components/molecules/Navigation"
import type { FooterSocialLinkItem } from "@/components/molecules/FooterSocialLinks"
import { SECTION_IDS, SECTION_LABEL_KEYS } from "@/data/sections"
import { profile } from "@/data/profile"

/**
 * Navigation & liens sociaux — sections ancrées sur la landing page
 * (pas de routeur : la navigation repose sur `scroll-behavior: smooth`).
 * Les libellés sont résolus via le dictionnaire i18n.
 *
 * Note: les icônes de marque (`Linkedin`, `Instagram`, `Github`) ont été
 * retirées de lucide-react v1.48 ; on utilise des icônes équivalentes.
 */
export const getNavItems = (t: (key: string) => string): NavItem[] =>
  SECTION_IDS.map((id) => ({
    label: t(SECTION_LABEL_KEYS[id]),
    href: `#${id}`,
    active: id === "hero",
  }))

export const headerSocialLinks: SocialLinkItem[] = [
  { platform: "LinkedIn", url: profile.contact.linkedin, icon: BriefcaseBusiness },
  { platform: "GitHub", url: profile.contact.github, icon: GitBranch },
  { platform: "Email", url: `mailto:${profile.contact.email}`, icon: Mail },
]

export const footerSocialLinks: FooterSocialLinkItem[] = [
  { platform: "LinkedIn", url: profile.contact.linkedin, icon: BriefcaseBusiness },
  { platform: "GitHub", url: profile.contact.github, icon: GitBranch },
  { platform: "Email", url: `mailto:${profile.contact.email}`, icon: Mail },
  { platform: "Instagram", url: "https://instagram.com", icon: Camera },
]
