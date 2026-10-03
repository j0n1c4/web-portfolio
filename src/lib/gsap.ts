import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Point d'entrée unique de GSAP.
 *
 * - les plugins publics (ScrollTrigger) sont enregistrés ici, une seule fois ;
 * - le vocabulaire d'animation (courbe, durée, décalage) est partagé, donc
 *   toutes les animations de la page se ressemblent ;
 * - `animateIn()` est LA recette d'apparition : elle est appelée aussi bien
 *   par les hooks que par les composants, ce qui garantit un rendu identique.
 *
 * Convention : importer `gsap` / `ScrollTrigger` depuis ce module, jamais
 * directement depuis le paquet.
 */
gsap.registerPlugin(ScrollTrigger);

/** Courbe unique pour toute la page — les apparitions ne « dansent » pas. */
export const EASE = "power3.out";
/** Durée standard d'une apparition. */
export const DURATION = 0.8;
/** Décalage entre deux éléments d'un même lot. */
export const STAGGER = 0.08;
/** Distance de départ d'une apparition (px). */
export const OFFSET = 32;

export interface AnimateInOptions {
  /** Décalage vertical de départ. `0` = apparition sur place. */
  y?: number;
  /** Décalage horizontal de départ. */
  x?: number;
  /** Échelle de départ (`1` = pas de zoom). */
  scale?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
}

/** L'utilisateur a demandé « animations réduites » : on n'anime rien. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Fait apparaître `targets` : opacité 0 -> 1, décalage -> 0.
 *
 * L'état final est nettoyé (`clearProps`) pour ne jamais laisser de style
 * inline qui concurrencerait les `transform` CSS du survol.
 *
 * Retourne `null` quand le mouvement est réduit — l'appelant peut alors se
 * passer d'attente.
 *
 * (`GSAPTweenTarget` / `GSAPTween` sont les alias globaux déclarés par les
 * types de GSAP : `import { gsap } from "gsap"` masque le namespace `gsap`.)
 */
export function animateIn(
  targets: GSAPTweenTarget,
  options: AnimateInOptions = {},
): GSAPTween | null {
  const {
    y = OFFSET,
    x = 0,
    scale = 1,
    delay = 0,
    duration = DURATION,
    stagger = STAGGER,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { clearProps: "all" });
    return null;
  }

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, x, y, scale },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger,
      ease: EASE,
      clearProps: "transform,opacity,visibility",
    },
  );
}

export { gsap, ScrollTrigger };
