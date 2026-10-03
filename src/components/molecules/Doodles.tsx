import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Layout layer for the decorative line-art doodles (portés depuis le template
 * `blue-portfolio` : traits cyan #00c7ff qui flottent autour du contenu).
 *
 * Le layer est le premier enfant de la section : le contenu vient après dans
 * l'ordre du DOM, donc il passe au-dessus sans avoir à gérer un z-index négatif
 * (qui serait masqué par le fond de la section).
 */
export function DoodleLayer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type DoodleProps = {
  /** Chemin public, ex : "/static/doodles/skills/laptop.svg" */
  src: string;
  /** Position horizontale ( Tailwind : `left-[12%]`, `right-6`, `center`, ...) */
  position?: string;
  /** Taille en pixels */
  width: number;
  className?: string;
  /** Délai de l'animation flottante (s) */
  delay?: number;
  opacity?: number;
  style?: CSSProperties;
};

/** Un doodle unique : flottement continu, non cliquable, décoratif. */
export function Doodle({
  src,
  position = "left-4 top-4",
  width,
  className,
  delay = 0,
  opacity = 0.6,
  style,
}: DoodleProps) {
  // Le positioning (y compris les `translate-*` de centrage) est porté par le
  // wrapper : l'animation `float` redefinit `transform` sur l'image, donc les
  // deux ne peuvent pas partager le même élément.
  return (
    <div aria-hidden="true" className={cn("absolute", position)} style={style}>
      <img
        src={src}
        alt=""
        loading="lazy"
        width={width}
        style={{
          width,
          animationDelay: `${delay}s`,
          opacity,
        }}
        className={cn("animate-float h-auto", className)}
      />
    </div>
  )
}