import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * ImagesBadge Aceternity — un badge dont le texte défile verticalement pendant
 * qu'un bandeau d'images glisse derrière.
 *
 * Variante portfolio : `text` peut être un bouton (passer `onClick`), ce qui
 * permet d'utiliser le badge directement comme CTA.
 */

interface ImagesBadgeProps {
  /** Images du bandeau — chemins locaux (`/images/...`) ou URLs. */
  images: string[];
  /** Texte affiché au centre du badge. */
  text: string;
  /** Rend le badge cliquable (utilisé pour le CTA « Télécharger mon CV »). */
  onClick?: () => void;
  className?: string;
}

/** Durée d'affichage du texte avant de passer à l'image suivante. */
const ROTATE_INTERVAL = 2600;

export function ImagesBadge({
  images,
  text,
  onClick,
  className,
}: ImagesBadgeProps) {
  const [active, setActive] = useState(0);
  const xOffset = useMotionValue(0);
  const x = useSpring(xOffset, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (images.length === 0) return;

    // Une seule motion value pour toute la bande : on décale le container,
    // pas chaque image.
    xOffset.set(-100 * (active % images.length));

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [active, images.length, xOffset]);

  // `useTransform` garde l'offset en pourcentage : indépendant de la largeur.
  const percent = useTransform(x, (value) => `${value}%`);

  if (images.length === 0) return null;

  // Le badge devient un bouton uniquement quand le site lui donne une action.
  const Wrapper: ElementType = onClick ? "button" : "div";

  return (
    <motion.div
      className={cn("w-full", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Wrapper
        {...(onClick
          ? { type: "button" as const, onClick, "aria-label": text }
          : {})}
        className="relative block h-14 w-full min-w-0 overflow-hidden rounded-2xl bg-gray-900 text-left"
      >
        {/* Bandeau d'images qui glisse derrière le texte */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 z-10 flex w-full"
          style={{ x: percent }}
        >
          {images.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt=""
              draggable={false}
              className="h-14 w-full shrink-0 object-cover"
            />
          ))}
        </motion.div>

        {/* Texte qui monte / descend */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 z-20 flex items-center justify-center px-4 py-2"
          >
            <span className="text-center text-sm text-white md:text-base">
              {text}
            </span>
          </motion.span>
        </AnimatePresence>
      </Wrapper>
    </motion.div>
  );
}
