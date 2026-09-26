import { createContext, useContext } from "react"
import type { Dictionary } from "@/i18n/locales/fr"

export type Locale = "fr" | "en"

export const LOCALES: Locale[] = ["fr", "en"]
export const LOCALE_LABELS: Record<Locale, string> = { fr: "FR", en: "EN" }

/** Clé de persistance de la locale dans `localStorage`. */
export const STORAGE_KEY = "portfolio-locale"

/** Structure du dictionnaire — `fr` fait foi, `en` doit la reproduire. */
export type { Dictionary }

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: string) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

/** Résout une clé pointée (`"contact.errors.email"`) dans un dictionnaire. */
export function resolve(dictionary: unknown, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part]
    }
    return undefined
  }, dictionary)

  return typeof value === "string" ? value : undefined
}

/** Locale initiale : `localStorage`, sinon la langue du navigateur (FR par défaut). */
export function detectLocale(): Locale {
  if (typeof window === "undefined") return "fr"

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "fr" || stored === "en") return stored

  return window.navigator.language.toLowerCase().startsWith("en") ? "en" : "fr"
}

/** Hook d'accès au dictionnaire — à utiliser dans tout composant affichant du texte. */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n doit être utilisé à l'intérieur de <I18nProvider>")
  }
  return context
}
