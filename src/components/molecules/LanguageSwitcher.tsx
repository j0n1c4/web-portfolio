import enFlag from "@/assets/flags/en.svg"
import frFlag from "@/assets/flags/fr.svg"
import { LOCALES, LOCALE_LABELS, type Locale, useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

/**
 * Drapeau de chaque locale. Import simple : Vite renvoie une URL, consommée
 * par `<img src>` — pas de `?react`, qui produirait un composant.
 */
const LOCALE_FLAGS: Record<Locale, string> = { fr: frFlag, en: enFlag }

interface LanguageSwitcherProps {
  className?: string
  accentColor?: string
}

/** Molecule — drapeau FR / EN toggle */
export function LanguageSwitcher({ className, accentColor = "#12F7D6" }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t("header.language")}
      className={cn(
        "flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1",
        className,
      )}
    >
      {LOCALES.map((item) => {
        const isActive = item === locale

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            aria-pressed={isActive}
            aria-label={LOCALE_LABELS[item]}
            title={LOCALE_LABELS[item]}
            className={cn(
              "flex items-center justify-center rounded-full p-1 transition-all duration-300",
              isActive ? "scale-105" : "opacity-50 hover:opacity-100",
            )}
            style={isActive ? { backgroundColor: accentColor } : undefined}
          >
            <img
              src={LOCALE_FLAGS[item]}
              alt=""
              aria-hidden="true"
              width={24}
              height={16}
              className="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/30"
            />
          </button>
        )
      })}
    </div>
  )
}
