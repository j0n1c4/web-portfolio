import type { Project } from "@/domain/entities"
import type { ProjectRepository } from "@/domain/repositories/ProjectRepository"
import type { ProjectDataSource } from "@/data/datasources/ProjectDataSource"

/**
 * Data layer — implements the domain port using a datasource.
 */
export class ProjectRepositoryImpl implements ProjectRepository {
  private readonly dataSource: ProjectDataSource

  constructor(dataSource: ProjectDataSource) {
    this.dataSource = dataSource
  }

  async getFeatured(): Promise<Project[]> {
    // Simulated latency to mimic a real network call
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.dataSource.fetchFeaturedProjects()
  }

  async getSkills(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.dataSource.fetchSkills()
  }
}
