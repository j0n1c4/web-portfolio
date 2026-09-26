import type { Project } from "@/domain/entities"
import { ProjectCard } from "@/components/molecules/ProjectCard"
import { BlurFade } from "@/components/ui/magicui"

interface ProjectsSectionProps {
  projects: Project[]
}

/** Organism — featured projects grid */
export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <BlurFade>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Projets sélectionnés
          </h2>
        </BlurFade>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <BlurFade key={project.id} delay={0.1 * i}>
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
