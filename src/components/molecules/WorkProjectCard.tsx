import { ExternalLink } from "lucide-react"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

export interface WorkProject {
  id: string
  image: string
  title: string
  description?: string
  liveUrl?: string
  githubUrl?: string
  tags?: string[]
  longDescription?: string
  technologies?: string[]
  /** Poste occupé sur le projet — porte le signal DevOps sur la carte. */
  role?: string
}

interface WorkProjectCardProps {
  project: WorkProject
  onClick: () => void
  className?: string
  accentColor?: string
}

/**
 * Met le segment « DevOps » en couleur dans le libellé de rôle : c'est le
 * signal que le lecteur doit voir sur la carte, sans ouvrir la modale.
 */
const renderRole = (role: string, accentColor: string) =>
  role.split(/(DevOps|Devops)/g).map((part, index) =>
    /^devops$/i.test(part) ? (
      <span key={index} className="font-semibold" style={{ color: accentColor }}>
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  )

/** Molecule — project card with hover overlay & tags */
export function WorkProjectCard({
  project,
  onClick,
  className,
  accentColor = "#12F7D6",
}: WorkProjectCardProps) {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-300 hover:border-[#12F7D6]/50",
        className,
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div
            className="inline-flex translate-y-4 items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#292F36] transition-transform duration-300 group-hover:translate-y-0"
            style={undefined}
          >
            <span style={{ color: "#292F36" }}>{t("works.viewDetails")}</span>
            <ExternalLink className="h-4 w-4" style={{ color: accentColor }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#2d343c] p-6">
        {project.role && (
          <p className="mb-2 font-mono text-xs uppercase tracking-wide text-gray-400">
            {renderRole(project.role, accentColor)}
          </p>
        )}
        <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#12F7D6]">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-400">{project.description}</p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded bg-[#12F7D6]/10 px-2 py-1 font-mono text-xs text-[#12F7D6]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}