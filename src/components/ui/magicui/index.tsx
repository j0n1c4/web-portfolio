"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  inView?: boolean;
  blur?: string;
  y?: number;
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  inView = true,
  blur = "6px",
  y = 8,
}: BlurFadeProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, filter: `blur(${blur})`, y }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: number;
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  duration = 20,
}: MarqueeProps) {
  return (
    <div
      style={
        { "--duration": `${duration}s`, "--gap": "1rem" } as React.CSSProperties
      }
      className={cn("flex w-full overflow-hidden [--gap:1rem]", className)}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-4 pr-4 animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

interface NumberTickerProps {
  value: number;
  className?: string;
  suffix?: string;
}

export function NumberTicker({
  value,
  className,
  suffix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(() => Math.round(motionValue.get()));
  const started = useRef(false);

  useAnimationFrame((t) => {
    if (started.current) return;
    if (t > 300) started.current = true;
    const progress = Math.min(Math.max((t - 300) / 1500, 0), 1);
    motionValue.set(value * (1 - Math.pow(1 - progress, 3)));
  });

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  color?: string;
}

export function BorderBeam({
  className,
  size = 60,
  duration = 6,
  color = "#8b5cf6",
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] border",
        className,
      )}
      style={
        {
          "--duration": duration,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute aspect-square animate-border-beam rounded-full bg-[length:100%_100%]"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `radial-gradient(circle, transparent ${size / 8}px, ${color} ${size / 8}px, transparent ${size / 2}px)`,
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  );
}

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  const gradient = useMotionTemplate`linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b, #8b5cf6)`;
  const backgroundPosition = useMotionValue("0% 50%");

  return (
    <motion.span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: gradient,
        backgroundSize: "300% 100%",
        backgroundPosition,
      }}
      animate={{ backgroundPosition: ["0% 50%", "300% 50%", "0% 50%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      {children}
    </motion.span>
  );
}
