import {
  Boxes,
  Braces,
  CodeXml,
  Container,
  Database,
  Dog,
  FileCode2,
  Flame,
  GitBranch,
  GitPullRequest,
  Monitor,
  Network,
  Package,
  Rocket,
  Server,
  Settings,
  ShieldCheck,
  SquareCode,
  SquareTerminal,
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
    subtitle: "Next.js · React · TypeScript · TanStack Query",
  },
  {
    icon: Server,
    titleKey: "skills.categories.backend",
    subtitle: "NestJS · Node.js · Python · REST · GraphQL",
  },
]

/** Les 4 premières sont mises en avant (voir `VISIBLE_SKILLS`) : l'ordre est
 *  donc éditorial — les technos les plus recherchées d'abord, pour donner
 *  envie de lire la suite. */
export const devSkills: SkillItem[] = [
  { icon: Braces, label: "TYPESCRIPT", color: "#3178C6" },
  { icon: Monitor, label: "REACT", color: "#61DAFB" },
  { icon: FileCode2, label: "NEXT.JS", color: "#FFFFFF" },
  { icon: Network, label: "NEST.JS", color: "#E0234E" },
  { icon: Server, label: "NODE.JS", color: "#3C873A" },
  { icon: Flame, label: "PYTHON", color: "#3776AB" },
  { icon: Database, label: "POSTGRES", color: "#336791" },
  { icon: Database, label: "MYSQL", color: "#00758F" },
  { icon: Container, label: "TAILWIND", color: "#06B6D4" },
  { icon: Zap, label: "VITE", color: "#646CFF" },
  { icon: Package, label: "TANSTACK QUERY", color: "#FF4154" },
  { icon: ShieldCheck, label: "ZOD", color: "#3068B8" },
  { icon: Dog, label: "HUSKY", color: "#F0DB4F" },
  { icon: SquareCode, label: "VANILLA JS", color: "#F7DF1E" },
]

export const devopsCategories: SkillCategory[] = [
  {
    icon: Workflow,
    titleKey: "skills.categories.ciCd",
    subtitle: "GitHub Actions · GitLab CI · Jenkins · Ansible",
  },
  {
    icon: Container,
    titleKey: "skills.categories.infra",
    subtitle: "Docker · Kubernetes · Nginx · Linux · Keycloak",
  },
]

/** Même logique que `devSkills` : les 4 premières sont les plus parlantes. */
export const devopsSkills: SkillItem[] = [
  { icon: Container, label: "DOCKER", color: "#2496ED" },
  { icon: Boxes, label: "KUBERNETES", color: "#326CE5" },
  { icon: GitBranch, label: "GIT", color: "#F05032" },
  { icon: Terminal, label: "LINUX", color: "#FCC624" },
  { icon: Rocket, label: "GITHUB ACTIONS", color: "#2088FF" },
  { icon: GitPullRequest, label: "GITLAB CI", color: "#FC6D26" },
  { icon: Workflow, label: "JENKINS", color: "#D24939" },
  { icon: Network, label: "ANSIBLE", color: "#EE0000" },
  { icon: Server, label: "NGINX", color: "#009639" },
  { icon: Settings, label: "GITOPS", color: "#4FC08D" },
  { icon: CodeXml, label: "BASH", color: "#4EAA25" },
  { icon: Package, label: "DOCKER-COMPOSE", color: "#3D9BE9" },
  { icon: SquareTerminal, label: "KEYCLOAK", color: "#4D4D4D" },
]
