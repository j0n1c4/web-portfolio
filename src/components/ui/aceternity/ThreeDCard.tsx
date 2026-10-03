import { motion, useSpring, useTransform } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ElementType,
  PointerEvent,
  ReactNode,
} from "react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D Card Aceternity (CardContainer / CardBody / CardItem), en TypeScript.
 *
 * Le principe : `CardContainer` donne la perspective et suit le pointeur,
 * `CardItem` place ses enfants à différents `translateZ` — d'où l'effet de
 * profondeur au survol.
 *
 * Deux points d'attention :
 * - un `transform` sur un ancêtre aplatit `preserve-3d` ; ne pas mettre
 *   d'animation GSAP sur un parent de `CardContainer` ;
 * - `overflow: hidden` sur `CardBody` couperait les calques « flottants ».
 */

/** Amplitude maximale de l'inclinaison, en degrés. */
const MAX_ROTATION = 12;

interface CardContainerProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  style?: CSSProperties;
}

export function CardContainer({
  children,
  className,
  style,
  ...props
}: CardContainerProps) {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const springX = useSpring(tiltX, { stiffness: 180, damping: 22, mass: 0.6 });
  const springY = useSpring(tiltY, { stiffness: 180, damping: 22, mass: 0.6 });

  const rotateX = useTransform(springY, (value) => `${value}deg`);
  const rotateY = useTransform(springX, (value) => `${value}deg`);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    // Le tactile n'a pas de survol : on garde la carte à plat.
    if (event.pointerType === "touch") return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTiltY(x * 2 * MAX_ROTATION);
    setTiltX(y * -2 * MAX_ROTATION);
  };

  const handlePointerLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

return (
    <div
      className={className}
      style={{ perspective: 1000, ...style }}
      {...props}
    >
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface CardBodyProps extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  /** Profondeur du socle de la carte. */
  depth?: number;
}

export function CardBody({
  children,
  className,
  depth = 40,
  style,
  ...props
}: CardBodyProps) {
  return (
    <motion.div
      {...props}
      className={cn("relative", className)}
      style={{
        ...style,
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

interface CardItemProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  /** Balise rendue (`"p"`, `"a"`, `"button"`…). */
  as?: ElementType;
  /** Distance au socle, en px — plus c'est haut, plus l'élément « flotte ». */
  translateZ?: number;
}

export function CardItem({
  children,
  className,
  as: Tag = "div",
  translateZ = 0,
  style,
  ...props
}: CardItemProps) {
  return (
    <Tag
      {...props}
      className={cn(className)}
      style={
        {
          ...style,
          transform: `translateZ(${translateZ}px)`,
          transformStyle: "preserve-3d",
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
