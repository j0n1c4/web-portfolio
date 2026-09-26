/**
 * Sections de la landing page — l'ordre définit le scroll-spy partagé par
 * le Header, la Sidebar et la navigation principale.
 */
export const SECTION_IDS = ["hero", "about", "skills", "projects", "blog", "contact"] as const

export type SectionId = (typeof SECTION_IDS)[number]

/** Clé de dictionnaire associée à chaque section. */
export const SECTION_LABEL_KEYS: Record<SectionId, string> = {
  hero: "nav.home",
  about: "nav.about",
  skills: "nav.skills",
  projects: "nav.projects",
  blog: "nav.blog",
  contact: "nav.contact",
}
