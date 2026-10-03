import { useGSAP } from "@gsap/react";
import {
  animateIn,
  gsap,
  OFFSET,
  prefersReducedMotion,
  ScrollTrigger,
} from "@/lib/gsap";
import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Convention du projet : un bloc qui porte `data-reveal` est animé par
 * `useRevealOnScroll`. Pas de props, pas de wrapper — les composants gardent
 * exactement le même balisage, on neRajoute qu'un attribut.
 */
export const REVEAL_SELECTOR = "[data-reveal]";

/**
 * Anime chaque bloc `[data-reveal]` de `scope` quand il entre dans le viewport.
 *
 * `ScrollTrigger.batch` regroupe les blocs qui entrent ensemble (le hero au
 * chargement, puis chaque section au fil du scroll) et les fait jouer en
 * cascade : une seule ligne dans la page suffit à animer tout le site.
 */
export function useRevealOnScroll(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const targets = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR, root);
      if (targets.length === 0) return;

      // État initial posé dans un useLayoutEffect, donc avant le premier
      // rendu visible : aucun clignotement avant l'animation.
      if (!prefersReducedMotion()) {
        gsap.set(targets, { autoAlpha: 0, y: OFFSET });
      }

      ScrollTrigger.batch(targets, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => animateIn(batch),
      });
    },
    { scope },
  );
}

/**
 * Recalcule les déclencheurs de scroll quand la mise en page change — typiquement
 * un changement de langue, qui réécrit tous les textes et déplace le contenu.
 */
export function useRefreshScrollTriggers(dependency: unknown) {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [dependency]);
}
