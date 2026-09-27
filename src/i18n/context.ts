import { createContext, useContext } from "react"
import type { Dictionary } from "@/i18n/locales/fr"

export type Locale = "fr" | "en"

export const LOCALES: Locale[] = ["fr", "en"]
/**
 * Nom accessible de chaque langue, dans la langue elle-même (endonyme) —
 * convention des sélecteurs de langue : un visiteur qui ne parle pas français
 * reconnaît « English » plus facilement que « EN ».
 *
 * Sert de `aria-label` aux boutons du sélecteur, dont le contenu visible est
 * un drapeau. Volontairement hors dictionnaire : un endonyme ne se traduit pas.
 */
export const LOCALE_LABELS: Record<Locale, string> = { fr: "Français", en: "English" }

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

/**
 * Locale initiale : `localStorage` si l'utilisateur a déjà choisi, sinon
 * l'anglais.
 *
 * La langue du navigateur n'est plus consultée : avec un défaut `en`, elle
 * ne pouvait plus rien décider (un navigateur `en` donnait `en`, tout autre
 * tombait sur le défaut `en`). Ne la réintroduire que si tu veux que le
 * site suive la langue du visiteur plutôt que l'anglais.
 */
export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en"

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "fr" || stored === "en") return stored

  return "en"
}

/** Hook d'accès au dictionnaire — à utiliser dans tout composant affichant du texte. */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n doit être utilisé à l'intérieur de <I18nProvider>")
  }
  return context
}
