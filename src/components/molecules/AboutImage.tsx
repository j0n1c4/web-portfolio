import { cn } from "@/lib/utils"

interface AboutImageProps {
  src: string
  alt: string
  className?: string
}

/** Molecule — portrait (cadre `rounded-xl border p-2` des cartes du template) */
export function AboutImage({ src, alt, className }: AboutImageProps) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-[#192742] p-2 transition duration-300 hover:-translate-y-1 hover:border-[#00C7FF] hover:opacity-90",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-md object-cover"
      />
    </div>
  )
}