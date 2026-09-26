/**
 * Domain layer — pure business entities.
 * No dependency on React, frameworks or data sources.
 */
export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  url?: string
}

export interface Skill {
  id: string
  name: string
  category: "frontend" | "backend" | "devops" | "design"
}
