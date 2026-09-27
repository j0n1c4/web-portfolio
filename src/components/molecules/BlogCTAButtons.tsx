import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface BlogCTAButtonsProps {
  /** Bascule « Voir plus » / « Voir moins ». */
  onToggle?: () => void
  onSubscribe?: () => void
  /** Libellé du bouton de bascule, déjà résolu par l'appelant. */
  toggleText: string
  subscribeText?: string
  /** Masque la bascule quand l'état affiché est déjà définitif. */
  showToggle?: boolean
  className?: string
  accentColor?: string
}

/** Molecule — "View more/less" + "Subscribe" CTA button pair */
export function BlogCTAButtons({
  onToggle,
  onSubscribe,
  toggleText,
  subscribeText,
  showToggle = true,
  className,
  accentColor = "#12F7D6",
}: BlogCTAButtonsProps) {
  const { t } = useI18n()

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
      {/* View More / View Less Button */}
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="cursor-pointer rounded-full px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: accentColor, color: "#292F36" }}
        >
          {toggleText}
        </button>
      )}

      {/* Subscribe Button */}
      <button
        type="button"
        onClick={onSubscribe}
        className="cursor-pointer rounded-full border-2 px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
        style={{ borderColor: accentColor, color: accentColor }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = accentColor
          e.currentTarget.style.color = "#292F36"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"
          e.currentTarget.style.color = accentColor
        }}
      >
        {subscribeText ?? t("blog.subscribe")}
      </button>
    </div>
  )
}
