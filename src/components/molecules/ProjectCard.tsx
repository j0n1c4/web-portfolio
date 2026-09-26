import type { Project } from "@/domain/entities"
import { Badge } from "@/components/atoms"

/** Molecule — combination of atoms */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url ?? "#"}
      target={project.url ? "_blank" : undefined}
      rel="noreferrer"
      className="block rounded-2xl border border-border bg-muted/30 p-6 transition-colors hover:border-primary/50"
    >
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>
    </a>
  )
}
