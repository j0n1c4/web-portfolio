import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface BlogCTAButtonsProps {
  onViewMore?: () => void
  onSubscribe?: () => void
  viewMoreText?: string
  subscribeText?: string
  className?: string
  accentColor?: string
}

/** Molecule — "View More" + "Subscribe" CTA button pair */
export function BlogCTAButtons({
  onViewMore,
  onSubscribe,
  viewMoreText,
  subscribeText,
  className,
  accentColor = "#12F7D6",
}: BlogCTAButtonsProps) {
  const { t } = useI18n()

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
      {/* View More Button */}
      <button
        type="button"
        onClick={onViewMore}
        className="rounded-full px-8 py-3 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        style={{ backgroundColor: accentColor, color: "#292F36" }}
      >
        {viewMoreText ?? t("blog.viewMore")}
      </button>

      {/* Subscribe Button */}
      <button
        type="button"
        onClick={onSubscribe}
        className="rounded-full border-2 px-8 py-3 font-medium transition-all duration-300 hover:scale-105"
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