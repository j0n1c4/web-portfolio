import { useEffect } from "react"
import { createPortal } from "react-dom"
import { CalendarDays, Clock, X } from "lucide-react"
import { BlogCategoryBadge } from "@/components/atoms"
import type { BlogPost } from "@/components/molecules/BlogCard"
import { BlogPostBody } from "@/components/molecules/BlogPostBody"
import { useI18n } from "@/i18n"

interface BlogPostModalProps {
  post: BlogPost | null
  isOpen: boolean
  onClose: () => void
  accentColor?: string
}

/** Molecule — full article reader. Miroir de `ProjectModal` pour la section blog. */
export function BlogPostModal({ post, isOpen, onClose, accentColor = "#12F7D6" }: BlogPostModalProps) {
  const { t } = useI18n()

  // Verrouille le scroll du body quand l'article est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Fermeture au clavier
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen || !post) return null

  // Portail sur `document.body` — même raison que `ProjectModal` : le `z` d'un
  // overlay est inutile s'il reste piégé dans le contexte d'empilement d'une
  // section parente, face au header en `z-50`.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Article */}
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1E242B] shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-[#12F7D6] hover:text-[#292F36]"
          aria-label={t("common.close")}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Cover */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E242B] via-[#1E242B]/40 to-transparent" />
        </div>

        <article className="space-y-6 p-6 md:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4">
            <BlogCategoryBadge category={post.category} />
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" style={{ color: accentColor }} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" style={{ color: accentColor }} />
                {post.readTime}
              </span>
              <span>{post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl leading-tight font-bold text-white md:text-4xl">
            {post.title}
          </h2>

          {/* Standfirst */}
          <p className="border-l-2 pl-4 text-base text-gray-400" style={{ borderColor: accentColor }}>
            {post.excerpt}
          </p>

          {/* Body */}
          <BlogPostBody content={post.content} accentColor={accentColor} />
        </article>
      </div>
    </div>,
    document.body,
  )
}
