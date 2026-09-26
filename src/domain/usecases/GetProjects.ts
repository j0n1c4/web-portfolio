import type { Project } from "@/domain/entities"
import type { ProjectRepository } from "@/domain/repositories/ProjectRepository"

/**
 * Domain layer — use case orchestrating the retrieval of featured projects.
 */
export class GetFeaturedProjects {
  private readonly repository: ProjectRepository

  constructor(repository: ProjectRepository) {
    this.repository = repository
  }

  async execute(): Promise<Project[]> {
    return this.repository.getFeatured()
  }
}

export class GetSkills {
  private readonly repository: ProjectRepository

  constructor(repository: ProjectRepository) {
    this.repository = repository
  }

  async execute(): Promise<string[]> {
    return this.repository.getSkills()
  }
}
