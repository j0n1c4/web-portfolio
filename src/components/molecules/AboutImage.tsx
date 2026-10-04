import { LightboxImage } from "@/components/molecules/ImageLightbox"

interface AboutImageProps {
  src: string
  alt: string
  className?: string
}

/**
 * Molecule — portrait (cadre `rounded-xl border p-2` des cartes du template).
 * Clic sur la photo = visionneuse plein écran (`ImageLightbox`).
 */
export function AboutImage({ src, alt, className }: AboutImageProps) {
  return (
    <div
      className={
        "group rounded-xl border border-[#192742] p-2 transition duration-300 hover:border-[#00C7FF] " +
        (className ?? "")
      }
    >
      <LightboxImage src={src} alt={alt} />
    </div>
  )
}
