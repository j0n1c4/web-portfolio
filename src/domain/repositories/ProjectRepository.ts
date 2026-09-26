import type { Project } from "@/domain/entities"

/**
 * Port (interface) — the domain defines the contract,
 * the data layer implements it (Dependency Inversion).
 */
export interface ProjectRepository {
  getFeatured(): Promise<Project[]>
  getSkills(): Promise<string[]>
}
