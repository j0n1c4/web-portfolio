import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, ZoomIn } from "lucide-react"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface ImageLightboxProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

interface LightboxTriggerProps {
  src: string
  alt: string
  className?: string
  /** `object-cover` pour une vignette carrée, `object-contain` pour un portrait. */
  fit?: "cover" | "contain"
  /** Désactive l'effet de zoom au survol (photo déjà grande). */
  zoomOnHover?: boolean
  accentColor?: string
}

/**
 * Molecule — visionneuse plein écran.
 *
 * Le portail est rendu sur `document.body` : un `z-[100]` resterait prisonnier
 * de la section parente (`isolate`) et passerait sous le header en `z-50`.
 * Même mécanique que `ProjectModal` / `BlogPostModal`.
 */
export function ImageLightbox({ src, alt, isOpen, onClose }: ImageLightboxProps) {
  const { t } = useI18n()

  // Verrouille le scroll du body pendant l'affichage.
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Fermeture au clavier.
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      {/* Backdrop — un clic ferme */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-[#00C7FF] hover:text-[#000F2E]"
        aria-label={t("common.close")}
      >
        <X className="h-5 w-5" />
      </button>

      <img
        src={src}
        alt={alt}
        className="relative max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl"
      />
    </div>,
    document.body,
  )
}

/**
 * Molecule — photo cliquable qui ouvre `ImageLightbox`.
 *
 * Le `<button>` apporte le focus clavier et le rôle, sans quoi l'image serait
 * un lien mort pour qui navigue au clavier ou au lecteur d'écran.
 */
export function LightboxImage({
  src,
  alt,
  className,
  fit = "cover",
  zoomOnHover = true,
  accentColor = "#00C7FF",
}: LightboxTriggerProps) {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("common.enlargeImage")}
        className={cn(
          "group relative block w-full cursor-zoom-in overflow-hidden",
          zoomOnHover && "transition duration-300 hover:-translate-y-1 hover:opacity-90",
          className,
        )}
        style={{ borderColor: accentColor }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn("w-full rounded-md", fit === "cover" ? "object-cover" : "object-contain")}
        />

        {/* Loupe — discrète, elle disparait au survol du conteneur */}
        {zoomOnHover && (
          <span
            className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ color: accentColor }}
            aria-hidden="true"
          >
            <ZoomIn className="h-4 w-4" />
          </span>
        )}
      </button>

      <ImageLightbox src={src} alt={alt} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}