/**
 * Modèle d'une réalisation et de son équipe.
 *
 * Le type vivait dans `WorkProjectCard.tsx`. Il est extrait ici pour que la
 * carte n'exporte qu'un composant : la règle `react-refresh` (fast refresh)
 * n'aime pas les fichiers qui mélangent composants et helpers.
 */

/** Personne avec qui le projet a été réalisé — le nom peut mener à son portfolio. */
export interface ProjectCollaborator {
  name: string
  /**
   * Portfolio / profil externe. Vide ou absent = nom affiché sans lien, le
   * temps que la personne renseigne son portfolio.
   */
  portfolioLink?: string
}

/**
 * Nombre de personnes listées dans `buildWith`. Le compteur « avec n autres
 * personnes » vaut exactement `buildWith.length` : aucune entrée ne représente
 * plusieurs personnes, donc le compte announced est toujours le total réel de
 * ce qui est connu — on ne gonfle pas l'équipe avec des noms inventés.
 */
export function countBuildWith(buildWith: ProjectCollaborator[] = []): number {
  return buildWith.length
}

export interface WorkProject {
  id: string
  image: string
  title: string
  description?: string
  liveUrl?: string
  githubUrl?: string
  tags?: string[]
  longDescription?: string
  technologies?: string[]
  /** Poste occupé sur le projet — porte le signal DevOps sur la carte. */
  role?: string
  /** Équipe du projet : co-auteurs, mentors, designers… */
  buildWith?: ProjectCollaborator[]
}