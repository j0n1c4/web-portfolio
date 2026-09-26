import { useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  I18nContext,
  STORAGE_KEY,
  detectLocale,
  resolve,
  type I18nContextValue,
  type Locale,
} from "@/i18n/context"
import en from "@/i18n/locales/en"
import fr from "@/i18n/locales/fr"

const dictionaries = { fr, en }

interface I18nProviderProps {
  children: ReactNode
}

/** Provider — persist la locale et synchronise `<html lang>`. */
export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => setLocaleState(next), [])

  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "fr" ? "en" : "fr")),
    [],
  )

  // Repli sur le dictionnaire FR si une clé est absente, puis sur la clé
  // elle-même — une clé manquante reste visible en dev plutôt que muette.
  const t = useCallback(
    (key: string) => resolve(dictionaries[locale], key) ?? resolve(dictionaries.fr, key) ?? key,
    [locale],
  )

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
