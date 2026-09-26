import { Code2, LayoutGrid, Mail, Monitor, PenLine, User } from "lucide-react"
import { SidebarIcon } from "@/components/atoms"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { id: "dashboard", icon: LayoutGrid, label: "Dashboard" },
  { id: "profile", icon: User, label: "Profile" },
  { id: "code", icon: Code2, label: "Code" },
  { id: "projects", icon: Monitor, label: "Projects" },
  { id: "edit", icon: PenLine, label: "Edit" },
  { id: "contact", icon: Mail, label: "Contact" },
]

interface SidebarProps {
  activeItem?: string
  onItemClick?: (item: string) => void
  className?: string
  accentColor?: string
}

/** Molecule — fixed floating vertical sidebar */
export function Sidebar({
  activeItem = "dashboard",
  onItemClick,
  className,
  accentColor = "#12F7D6",
}: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full border border-white/20 bg-[#292F36]/80 p-3 backdrop-blur-sm lg:flex",
        className,
      )}
    >
      {sidebarItems.map((item) => (
        <SidebarIcon
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={activeItem === item.id}
          accentColor={accentColor}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
    </div>
  )
}