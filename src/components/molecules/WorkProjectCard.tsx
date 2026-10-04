import { ExternalLink, GitBranch } from "lucide-react"
import { useI18n } from "@/i18n"
import { countBuildWith, type WorkProject } from "@/lib/project"
import { cn } from "@/lib/utils"

export type { ProjectCollaborator, WorkProject } from "@/lib/project"

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

/** Molecule — project card (design `blue-portfolio`) */
export function WorkProjectCard({
  project,
  onClick,
  className,
  accentColor = "#00C7FF",
}: WorkProjectCardProps) {
  const { t } = useI18n()

  // La carte reste volontairement vague (« avec 11 autres personnes ») : les
  // noms et leurs portfolios sont dans la modale, pas sur la carte.
  const peopleCount = countBuildWith(project.buildWith)
  const peopleLabel =
    peopleCount > 1
      ? t("works.withOthersMany").replace("{count}", String(peopleCount))
      : t("works.withOthersOne").replace("{count}", String(peopleCount))

  return (
    <div
      className={cn(
        "group mx-auto flex w-full max-w-md cursor-pointer flex-col transition duration-300 hover:-translate-y-2 hover:opacity-80 mt-4",
        className,
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Visuel — cadre `rounded-xl border p-2` du template */}
      <div className="rounded-xl border border-[#192742] transition-colors duration-300 group-hover:border-[#00C7FF]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="max-h-50 w-full rounded-md object-cover object-top md:max-h-45"
        />
      </div>

      {/* Métadonnées */}
      <div className="mt-5 w-full">
        {project.role && (
          <p className="mb-1 font-mono text-xs tracking-wide text-gray-400 uppercase">
            {renderRole(project.role, accentColor)}
          </p>
        )}

        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#00C7FF]">
            {project.title}
          </h3>
          <div className="pointer-events-none flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.liveUrl && (
              <ExternalLink className="h-4 w-4" style={{ color: accentColor }} />
            )}
            {project.githubUrl && <GitBranch className="h-4 w-4" style={{ color: accentColor }} />}
          </div>
        </div>

        {project.description && (
          <p className="mt-1 text-sm text-gray-300">{project.description}</p>
        )}

        {project.tags && project.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap list-none">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="m-1 cursor-default rounded-lg bg-[#009ac5]/20 px-2 py-1 font-mono text-xs text-gray-200 transition-opacity duration-300 hover:opacity-75"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* Équipe — résumé only, les noms sont dans la modale */}
        {peopleCount > 0 && (
          <p className="mt-4 border-t border-[#192742] pt-3 font-mono text-xs text-gray-400">
            {peopleLabel}
          </p>
        )}
      </div>
    </div>
  )
}
