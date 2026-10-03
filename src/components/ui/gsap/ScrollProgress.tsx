import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ScrollProgressProps {
  className?: string;
  accentColor?: string;
}

/**
 * UI — barre de progression de lecture sous le header.
 * Le `scrub` est lissé par GSAP, donc la barre suit le scroll sans jitter,
 * contrairement à un calcul maison sur l'événement `scroll`.
 */
export function ScrollProgress({
  className,
  accentColor = "#00C7FF",
}: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      },
    );
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5",
        className,
      )}
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}
