import { Briefcase, Download, Link2, Mail, MapPin } from "lucide-react"
import { InfoRow, SkillBadge } from "@/components/atoms"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  name: string
  title: string
  avatar: string
  email?: string
  location?: string
  availability?: string
  website?: string
  skills?: string[]
  downloadCVUrl?: string
  className?: string
  accentColor?: string
}

/** Molecule — profile card with rounded corner, info rows, skills & CV button */
export function ProfileCard({
  name,
  title,
  avatar,
  email,
  location,
  availability,
  website,
  skills = [],
  downloadCVUrl,
  className,
  accentColor = "#12F7D6",
}: ProfileCardProps) {
  const { t } = useI18n()

  return (
    <div
      className={cn(
        "relative w-full  md:w-72 overflow-hidden rounded-tl-[80px] rounded-br-[80px] border-2 border-white bg-[#292F36]",
        className,
      )}
    >
      {/* Accent top border */}
      <div className="absolute top-0 right-0 left-0 h-1" style={{ backgroundColor: accentColor }} />

      {/* Curved accent on top-left */}
      <div
        className="absolute top-0 left-0 h-24 w-24 rounded-br-full"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, transparent 70%)`,
          opacity: 0.3,
        }}
      />

      <div className="relative p-6 pt-8">
        {/* Avatar */}
        <div className="mb-4 flex justify-center">
          <div
            className="h-24 w-24 overflow-hidden rounded-full border-2"
            style={{ borderColor: accentColor }}
          >
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Name & Title */}
        <div className="mb-6 text-center">
          <h3 className="mb-1 text-xl font-bold text-white">{name}</h3>
          <p className="font-mono text-sm text-gray-400">{title}</p>
        </div>

        {/* Info Rows */}
        <div className="mb-6 space-y-3">
          {email && <InfoRow icon={Mail} text={email} accentColor={accentColor} />}
          {location && <InfoRow icon={MapPin} text={location} accentColor={accentColor} />}
          {availability && (
            <InfoRow icon={Briefcase} text={availability} accentColor={accentColor} />
          )}
          {website && <InfoRow icon={Link2} text={website} accentColor={accentColor} />}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SkillBadge key={skill} label={skill} accentColor={accentColor} />
            ))}
          </div>
        )}

        {/* Download CV Button */}
        {downloadCVUrl && (
          <button
            type="button"
            onClick={() => window.open(downloadCVUrl, "_blank")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-[#292F36] transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          >
            <span>{t("hero.downloadCv")}</span>
            <Download className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
