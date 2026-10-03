import { ChevronLeft, ChevronRight } from "lucide-react"
import { CarouselButton, DotIndicator } from "@/components/atoms"
import { cn } from "@/lib/utils"

interface CarouselControlsProps {
  total: number
  currentIndex: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (index: number) => void
  className?: string
  accentColor?: string
}

/** Molecule — prev/next buttons + slide dots */
export function CarouselControls({
  total,
  currentIndex,
  onPrev,
  onNext,
  onDotClick,
  className,
  accentColor = "#00C7FF",
}: CarouselControlsProps) {
  return (
    <div className={cn("mt-12 flex items-center justify-center gap-8", className)}>
      <CarouselButton icon={ChevronLeft} onClick={onPrev} direction="prev" accentColor={accentColor} />

      <DotIndicator
        total={total}
        currentIndex={currentIndex}
        onDotClick={onDotClick}
        accentColor={accentColor}
      />

      <CarouselButton icon={ChevronRight} onClick={onNext} direction="next" accentColor={accentColor} />
    </div>
  )
}