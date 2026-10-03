import { useEffect } from "react"
import { createPortal } from "react-dom"
import { BookMarked, CalendarDays, Clock, X } from "lucide-react"
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
export function BlogPostModal({ post, isOpen, onClose, accentColor = "#00C7FF" }: BlogPostModalProps) {
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
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />

      {/* Article */}
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#000C24] shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-[#00C7FF] hover:text-[#000F2E]"
          aria-label={t("common.close")}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Cover */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000C24] via-[#000C24]/40 to-transparent" />
        </div>

        <article className="space-y-6 p-6 md:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4">
            <BlogCategoryBadge category={post.category} />
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-gray-300">
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
          <p className="border-l-2 pl-4 text-base text-gray-300" style={{ borderColor: accentColor }}>
            {post.excerpt}
          </p>

          {/* Body */}
          <BlogPostBody content={post.content} accentColor={accentColor} />

          {/* Sources — chaque affirmation de l'article est rattachée à sa
              documentation primaire, pour que le lecteur puisse vérifier. */}
          {post.sources && post.sources.length > 0 && (
            <section
              aria-labelledby="blog-sources"
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" style={{ color: accentColor }} />
                <h3 id="blog-sources" className="font-mono text-sm uppercase tracking-widest text-white">
                  {t("blog.sources")}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-400">{t("blog.sourcesHint")}</p>
              <ol className="mt-4 space-y-2">
                {post.sources.map((source, index) => (
                  <li key={source.url} className="flex min-w-0 gap-3 text-sm">
                    <span className="shrink-0 font-mono text-xs text-gray-500">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group min-w-0 break-all text-gray-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#00C7FF] hover:decoration-[#00C7FF]"
                    >
                      {source.label}
                      <span className="block font-mono text-xs break-all text-gray-500 group-hover:text-gray-300">
                        {source.url}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>
      </div>
    </div>,
    document.body,
  )
}
