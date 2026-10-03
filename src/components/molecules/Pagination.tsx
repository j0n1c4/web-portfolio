import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface PaginationProps {
  /** Nombre total de pages. */
  totalPages: number
  /** Page active, indexée à partir de 0. */
  currentPage: number
  onPageChange: (page: number) => void
  /** Options « par page » (03, 06, 09...). Vide => sélecteur masqué. */
  perPageOptions?: number[]
  perPage?: number
  onPerPageChange?: (perPage: number) => void
  className?: string
  accentColor?: string
}

/** `03` -> `03` : la pagination reste en chiffres, comme dans `blue-portfolio`. */
const formatPage = (value: number) => String(value).padStart(2, "0")

/**
 * Molecule — pagination numérotée (`01 02 03`) + sélecteur « par page ».
 *
 * Volontairement pas un carrousel : pas de flèches, pas de points, on affiche
 * des numéros de page. Choisir `06` par page affiche réellement 6 réalisations.
 */
export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  perPageOptions = [],
  perPage,
  onPerPageChange,
  className,
  accentColor = "#00C7FF",
}: PaginationProps) {
  const { t } = useI18n()

  const showPerPage = perPageOptions.length > 1 && perPage !== undefined && onPerPageChange
  const pages = Array.from({ length: totalPages }, (_, index) => index)

  return (
    <nav
      aria-label={t("works.pagination")}
      className={cn("flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10", className)}
    >
      {/* Sélecteur du nombre de réalisations affichées */}
      {showPerPage && (
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
            {t("works.perPage")}
          </span>
          <div className="flex items-center gap-2">
            {perPageOptions.map((option) => {
              const isActive = option === perPage
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onPerPageChange?.(option)}
                  aria-pressed={isActive}
                  className={cn(
                    "min-w-12 cursor-pointer border-b-2 px-2 py-1 font-mono text-sm transition-colors",
                    isActive
                      ? "font-bold"
                      : "border-transparent text-gray-400 hover:text-white",
                  )}
                  style={
                    isActive
                      ? { color: accentColor, borderColor: accentColor }
                      : undefined
                  }
                >
                  {formatPage(option)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Numéros de page */}
      {totalPages > 1 && (
        <ul className="flex items-center gap-2">
          {pages.map((page) => {
            const isActive = page === currentPage
            return (
              <li key={page}>
                <button
                  type="button"
                  onClick={() => onPageChange(page)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex h-11 min-w-11 cursor-pointer items-center justify-center border font-mono text-sm transition-colors",
                    isActive
                      ? "font-bold"
                      : "border-transparent text-gray-400 hover:border-white/20 hover:text-white",
                  )}
                  style={
                    isActive
                      ? {
                          color: accentColor,
                          borderColor: accentColor,
                          backgroundColor: `${accentColor}1a`,
                        }
                      : undefined
                  }
                >
                  {formatPage(page + 1)}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </nav>
  )
}