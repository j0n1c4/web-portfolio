import type { Project } from "@/domain/entities"

/**
 * Data layer — in-memory datasource (could be an API, CMS, etc.).
 */
export interface ProjectDataSource {
  fetchFeaturedProjects(): Project[]
  fetchSkills(): string[]
}

export class LocalProjectDataSource implements ProjectDataSource {
  private readonly projects: Project[] = [
    {
      id: "v1-portfolio",
      title: "Portfolio v1",
      description:
        "Première version de mon portfolio, construite avec Next.js et shadcn/ui.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      url: "https://github.com/j0n1c4/web-portfolio",
    },
    {
      id: "v2-portfolio",
      title: "Portfolio v2",
      description:
        "Refonte avec React + Vite, architecture clean et atomic design.",
      techStack: ["React", "Vite", "TypeScript", "Tailwind v4", "Magic UI"],
    },
  ]

  private readonly skills = [
    "React",
    "TypeScript",
    "Vite",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "GraphQL",
    "Figma",
  ]

  fetchFeaturedProjects(): Project[] {
    return this.projects
  }

  fetchSkills(): string[] {
    return this.skills
  }
}
