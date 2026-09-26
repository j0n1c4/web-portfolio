import {
  Braces,
  Container,
  Database,
  FileCode2,
  GitBranch,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react"

/**
 * Compétences — regroupées depuis v1/lib/data/skills.ts (4 groupes) en
 * 2 colonnes : DEV (frontend + backend + data) et DEVOPS (CI/CD + infra).
 *
 * Les titres de catégories sont des clés de dictionnaire i18n
 * (`skills.categories.*`) ; les sous-titres ne sont constitués que de noms
 * de technologies, qui ne se traduisent pas.
 */

export interface SkillCategory {
  icon: LucideIcon
  titleKey: string
  subtitle: string
}

export interface SkillItem {
  icon: LucideIcon
  label: string
  color: string
}

export const devCategories: SkillCategory[] = [
  {
    icon: Monitor,
    titleKey: "skills.categories.frontend",
    subtitle: "Next.js · React · TypeScript · Tailwind",
  },
  {
    icon: Server,
    titleKey: "skills.categories.backend",
    subtitle: "NestJS · Node.js · REST · GraphQL · PostgreSQL",
  },
]

export const devSkills: SkillItem[] = [
  { icon: FileCode2, label: "NEXT.JS", color: "#FFFFFF" },
  { icon: Braces, label: "TYPESCRIPT", color: "#3178C6" },
  { icon: Network, label: "NEST.JS", color: "#E0234E" },
  { icon: Zap, label: "VITE", color: "#646CFF" },
  { icon: Monitor, label: "REACT", color: "#61DAFB" },
  { icon: Server, label: "NODE.JS", color: "#3C873A" },
  { icon: Container, label: "TAILWIND", color: "#06B6D4" },
  { icon: Database, label: "POSTGRES", color: "#336791" },
]

export const devopsCategories: SkillCategory[] = [
  {
    icon: Workflow,
    titleKey: "skills.categories.ciCd",
    subtitle: "Jenkins · GitLab CI · GitHub Actions · Ansible",
  },
  {
    icon: Container,
    titleKey: "skills.categories.infra",
    subtitle: "Docker · Nginx · Linux · Keycloak · SonarQube",
  },
]

export const devopsSkills: SkillItem[] = [
  { icon: GitBranch, label: "GIT", color: "#F05032" },
  { icon: Container, label: "DOCKER", color: "#2496ED" },
  { icon: Workflow, label: "JENKINS", color: "#D24939" },
  { icon: Server, label: "NGINX", color: "#009639" },
  { icon: Terminal, label: "LINUX", color: "#FCC624" },
  { icon: ShieldCheck, label: "BASH", color: "#4EAA25" },
  { icon: Network, label: "ANSIBLE", color: "#EE0000" },
  { icon: ShieldCheck, label: "KEYCLOAK", color: "#4D4D4D" },
]
