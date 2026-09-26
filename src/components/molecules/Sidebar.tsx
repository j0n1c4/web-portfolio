import { Code2, LayoutGrid, Mail, Monitor, PenLine, User, type LucideIcon } from "lucide-react"
import { SidebarIcon } from "@/components/atoms"
import { useI18n } from "@/i18n"
import { SECTION_IDS, SECTION_LABEL_KEYS, type SectionId } from "@/data/sections"
import { cn } from "@/lib/utils"

/** Une icône par section, dans l'ordre défini par `SECTION_IDS`. */
const SECTION_ICONS: Record<SectionId, LucideIcon> = {
  hero: LayoutGrid,
  about: User,
  skills: Code2,
  projects: Monitor,
  blog: PenLine,
  contact: Mail,
}

interface SidebarProps {
  activeItem?: string
  onItemClick?: (item: string) => void
  className?: string
  accentColor?: string
}

/** Molecule — barre latérale fixe verticale, synchronisée avec le scroll-spy */
export function Sidebar({
  activeItem = "hero",
  onItemClick,
  className,
  accentColor = "#12F7D6",
}: SidebarProps) {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        "fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-white/20 bg-[#292F36]/80 p-3 backdrop-blur-sm lg:flex",
        className,
      )}
    >
      {SECTION_IDS.map((id) => (
        <SidebarIcon
          key={id}
          icon={SECTION_ICONS[id]}
          label={t(SECTION_LABEL_KEYS[id])}
          active={activeItem === id}
          accentColor={accentColor}
          onClick={() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
            onItemClick?.(id)
          }}
        />
      ))}
    </div>
  )
}
