import { useEffect, useState } from "react"

/**
 * Scroll spy — renvoie l'id de la section visible la plus haute dans le
 * viewport. `rootMargin` définit la « bande » de lecture : ici le tiers
 * supérieur de l'écran, pour que l'indicateur change avant que la section
 * ne soit centrée.
 */
export function useActiveSection(sectionIds: string[], rootMargin = "-33% 0px -66% 0px"): string {
  // Les ids sont souvent reconstruits à chaque render : on les aplatit en
  // une chaîne stable pour ne pas réabonner l'observateur inutilement.
  const idsKey = sectionIds.join("|")
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "")

  useEffect(() => {
    const elements = idsKey
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin, threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [idsKey, rootMargin])

  return activeSection
}
