import type { ProjectRepository } from "@/domain/repositories/ProjectRepository"
import { LocalProjectDataSource } from "@/data/datasources/ProjectDataSource"
import { ProjectRepositoryImpl } from "@/data/repositories/ProjectRepositoryImpl"

/**
 * Infrastructure layer — composition root (poor man's DI).
 * Swap implementations here without touching the domain or UI.
 */
export const projectRepository: ProjectRepository = new ProjectRepositoryImpl(
  new LocalProjectDataSource(),
)
