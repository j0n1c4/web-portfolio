/**
 * Personal data — ported from v1/
 * (v1/lib/constants.ts, v1/lib/i18n/locales/fr.ts, v1/lib/data/library.ts)
 */
import type { Locale } from "@/i18n"

export const profile = {
  name: "Jonica",
  handle: "j0n1c4",
  fullName: "HENINTSOA Hasimanitriniaina Jonica",
  title: "Développeur FullStack & DevOps",
  titleEn: "FullStack Developer & DevOps Engineer",
  location: "Fianarantsoa, Madagascar",
  university: "École de Management et d'Innovation Technologique (EMIT)",
  program: "Modélisation et Ingénierie Informatique",
  programEn: "Modeling and Computer Engineering",
  studyStartYear: 2022,
  cvUrl: "https://cvdesignr.com/p/689d9cab81e04",
  availability: "Disponible pour de nouveaux projets",
  availabilityEn: "Available for new projects",
  contact: {
    email: "jonicahenintsoa@gmail.com",
    phone: "+261 38 67 775 24",
    linkedin: "https://www.linkedin.com/in/jonica-henintsoa-96a198357/",
    github: "https://github.com/j0n1c4",
  },
} as const

type Localized = { fr: string; en: string }

/** Pick the active locale out of a `{ fr, en }` pair. */
const pick = (value: Localized, locale: Locale) => value[locale]

export const getTitle = (locale: Locale) =>
  pick({ fr: profile.title, en: profile.titleEn }, locale)

export const getAvailability = (locale: Locale) =>
  pick({ fr: profile.availability, en: profile.availabilityEn }, locale)

export const getTagline = (locale: Locale) =>
  pick(
    {
      fr: "Construire des expériences numériques performantes, du concept jusqu'à la mise en production.",
      en: "Building high-performing digital experiences, from concept to production.",
    },
    locale,
  )

export const getProgram = (locale: Locale) =>
  pick({ fr: profile.program, en: profile.programEn }, locale)

/** Années d'études affichées dans le hero (2022 → aujourd'hui). */
export const yearsOfStudy = new Date().getFullYear() - profile.studyStartYear

/**
 * « À propos » — 3 short paragraphs condensed from `about.journeyP1-P3`
 * in v1. Highlighted keywords come from `aboutHighlightWords`.
 */
export const aboutParagraphs: Record<Locale, string[]> = {
  fr: [
    "Développeur full-stack & ingénieur DevOps, je conçois des applications web modernes et les déploie sur une infrastructure fiable : conteneurisation Docker, reverse proxy Nginx, TLS et GitOps.",
    "Au quotidien, je travaille avec Next.js, TypeScript et NestJS pour des produits de recherche, de santé et de mobilité — de la modélisation des données jusqu'à la mise en production.",
    "Je m'attache à un code clair, versionné et reproductible : chaque projet part d'un workflow CI/CD, d'une revue rigoureuse et d'un déploiement réversible.",
  ],
  en: [
    "Full-stack developer and DevOps engineer: I design modern web applications and ship them on reliable infrastructure — Docker containerization, Nginx reverse proxy, TLS and GitOps.",
    "Day to day I work with Next.js, TypeScript and NestJS on products spanning research, healthcare and mobility — from data modeling all the way to production.",
    "I care about clean, versioned and reproducible code: every project starts with a CI/CD workflow, a rigorous review process and a reversible deployment.",
  ],
}

/** Mots-clés surlignés dans le texte « À propos », un tableau par paragraphe. */
const aboutHighlightWords: Record<Locale, string[][]> = {
  fr: [
    ["Docker", "Nginx", "GitOps", "TLS"],
    ["Next.js", "TypeScript", "NestJS"],
    ["CI/CD", "reproductible"],
  ],
  en: [
    ["Docker", "Nginx", "GitOps", "TLS"],
    ["Next.js", "TypeScript", "NestJS"],
    ["CI/CD", "reproducible"],
  ],
}

export const getAboutHighlights = (locale: Locale) =>
  aboutParagraphs[locale].map((text, index) => ({
    text,
    words: aboutHighlightWords[locale][index] ?? [],
  }))

/** Career objective — from `about.objectiveDesc` in v1. */
export const aboutObjective: Record<Locale, string> = {
  fr: "Grandir professionnellement au quotidien, aux côtés des meilleurs, et repousser mes limites.",
  en: "Grow professionally every day, alongside the best, and push my limits.",
}

/** Badges displayed under the hero headline. */
export const heroSkills = ["Next.js", "TypeScript", "NestJS", "Docker"]

/**
 * Hero stats — values rebuilt from v1 data. Labels are dictionary keys so
 * they follow the active locale.
 */
export const heroStats = [
  { value: `${yearsOfStudy}+`, labelKey: "hero.stats.experience" },
  { value: "14+", labelKey: "hero.stats.projects" },
  { value: "5", labelKey: "hero.stats.professional" },
]

/** Stats band — derived from v1 skills/projects/library content. */
export const siteStats = [
  { value: 36, suffix: "", labelKey: "stats.technologies" },
  { value: 5, suffix: "", labelKey: "stats.proProjects" },
  { value: 2, suffix: "", labelKey: "stats.awards" },
]

/**
 * Lignes d'identité affichées sous le titre « À propos » — `labelKey` pointe
 * vers le dictionnaire, `value` est la donnée de v1.
 */
export const getAboutInfo = (locale: Locale) => [
  { labelKey: "hero.location", value: profile.location },
  {
    labelKey: "hero.education",
    value: `${profile.university} — ${getProgram(locale)}`,
  },
  { labelKey: "hero.objective", value: aboutObjective[locale] },
]

export const getCopyright = (locale: Locale) =>
  `© ${new Date().getFullYear()} HENINTSOA Jonica. ${
    locale === "fr" ? "Tous droits réservés." : "All rights reserved."
  }`
