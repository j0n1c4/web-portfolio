import heroImage from "@/assets/hero.png"
import type { Locale } from "@/i18n"
import type { BlogPost } from "@/components/molecules/BlogCard"
import { profile } from "@/data/profile"

/**
 * Blog — un seul article, tiré du texte de présentation de v1
 * (`about.subtitle` / `about.badge` dans v1/lib/i18n/locales/fr.ts).
 */
const blogPosts: Record<Locale, BlogPost[]> = {
  fr: [
    {
      id: "solutions-numeriques-innovantes",
      image: heroImage,
      title:
        "Passionné par la création de solutions numériques innovantes et performantes",
      excerpt:
        "Développeur & ingénieur DevOps, je conçois des applications web modernes et les déploie sur une infrastructure fiable : conteneurisation Docker, reverse proxy Nginx, TLS et GitOps. De la modélisation des données jusqu'à la mise en production.",
      category: "Développement & DevOps",
      author: profile.name,
      date: "2026",
      readTime: "4 Min",
      slug: "solutions-numeriques-innovantes",
    },
  ],
  en: [
    {
      id: "innovative-high-performing-digital-solutions",
      image: heroImage,
      title: "Passionate about building innovative, high-performing digital solutions",
      excerpt:
        "Developer and DevOps engineer: I design modern web applications and ship them on reliable infrastructure — Docker containerization, Nginx reverse proxy, TLS and GitOps. From data modeling all the way to production.",
      category: "Development & DevOps",
      author: profile.name,
      date: "2026",
      readTime: "4 min",
      slug: "innovative-high-performing-digital-solutions",
    },
  ],
}

export const getBlogPosts = (locale: Locale) => blogPosts[locale]
