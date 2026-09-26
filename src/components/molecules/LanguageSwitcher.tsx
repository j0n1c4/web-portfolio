import { LOCALES, LOCALE_LABELS, useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  className?: string
  accentColor?: string
}

/** Molecule — FR / EN toggle */
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
            className={cn(
              "rounded-full px-3 py-1 font-mono text-xs font-bold transition-all duration-300",
              isActive ? "text-[#292F36]" : "text-gray-300 hover:text-white",
            )}
            style={isActive ? { backgroundColor: accentColor } : undefined}
          >
            {LOCALE_LABELS[item]}
          </button>
        )
      })}
    </div>
  )
}
