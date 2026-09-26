import { useEffect } from "react"
import { ExternalLink, GitBranch, X } from "lucide-react"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"
import type { WorkProject } from "@/components/molecules/WorkProjectCard"

interface ProjectModalProps {
  project: WorkProject | null
  isOpen: boolean
  onClose: () => void
  accentColor?: string
}

/** Molecule — full project details modal */
export function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const { t } = useI18n()

  // Lock body scroll when modal is open
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

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen || !project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div
        className={cn(
          "relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-[#2d343c] shadow-2xl",
        )}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-all hover:bg-[#12F7D6] hover:text-[#292F36]"
          aria-label={t("common.close")}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d343c] to-transparent" />
        </div>

        {/* Content */}
        <div className="space-y-6 p-8">
          {/* Header */}
          <div>
            <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">{project.title}</h2>
            {project.tags && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#12F7D6]/10 px-3 py-1 font-mono text-sm text-[#12F7D6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4 leading-relaxed text-gray-300">
            <p>{project.description}</p>
            {project.longDescription && <p>{project.longDescription}</p>}
          </div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h4 className="mb-3 text-lg font-semibold text-white">{t("works.technologies")}</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#12F7D6] px-6 py-3 font-medium text-[#292F36] transition-colors hover:bg-[#12F7D6]/90"
              >
                <span>{t("works.viewLive")}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                <span>{t("works.viewCode")}</span>
                <GitBranch className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}