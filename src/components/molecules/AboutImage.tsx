import { cn } from "@/lib/utils"

interface AboutImageProps {
  src: string
  alt: string
  className?: string
}

/** Molecule — image with hover glow effect */
export function AboutImage({ src, alt, className }: AboutImageProps) {
  return (
    <div className={cn("group relative", className)}>
      <div className="absolute inset-0 rounded-2xl bg-[#12F7D6]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <img
        src={src}
        alt={alt}
        className="relative h-full w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
      />
    </div>
  )
}