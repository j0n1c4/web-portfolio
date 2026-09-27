import { useState } from "react"
import type { FormEvent } from "react"
import emailjs from "@emailjs/browser"
import { Send } from "lucide-react"
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/atoms"
import { emailjsConfig, isEmailjsConfigured } from "@/config/email"
import { useI18n } from "@/i18n"
import { cn } from "@/lib/utils"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void
  className?: string
  accentColor?: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type SubmitStatus = "idle" | "sending" | "success" | "error" | "unconfigured"

const EMPTY_FORM: ContactFormData = { name: "", email: "", subject: "", message: "" }

/** Molecule — validated contact form with floating labels, sent via EmailJS */
export function ContactForm({ onSubmit, className, accentColor = "#12F7D6" }: ContactFormProps) {
  const { t } = useI18n()
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>("idle")

  const update = (key: keyof ContactFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const nextErrors: FormErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = t("contact.errors.name")
    }

    if (!formData.email.trim()) {
      nextErrors.email = t("contact.errors.email")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = t("contact.errors.emailInvalid")
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = t("contact.errors.subject")
    }

    if (!formData.message.trim()) {
      nextErrors.message = t("contact.errors.message")
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return

    // Piège à robots : champ masqué et hors tabulation. Un robot qui le
    // remplit est ignoré silencieusement (même garde-fou que v1).
    if (new FormData(event.currentTarget).get("bot-field")) return

    if (!validate()) return

    // Sans identifiants, l'API EmailJS rejette l'appel avec une erreur vide :
    // on s'arrête ici pour afficher une cause lisible dans l'interface.
    if (!isEmailjsConfigured) {
      console.error(
        "[contact] EmailJS non configuré — renseignez VITE_EMAILJS_SERVICE_ID, " +
          "VITE_EMAILJS_TEMPLATE_ID et VITE_EMAILJS_PUBLIC_KEY dans un fichier .env",
      )
      setStatus("unconfigured")
      return
    }

    setStatus("sending")
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        emailjsConfig.publicKey,
      )

      if (onSubmit) {
        await onSubmit(formData)
      }

      setFormData(EMPTY_FORM)
      setStatus("success")
    } catch (error) {
      // EmailJS renvoie tantôt une `Error`, tantôt un objet sans `message` :
      // on journalise tout pour pouvoir diagnostiquer depuis la console.
      console.error("[contact] Échec de l'envoi EmailJS", {
        error,
        text: (error as { text?: string } | null)?.text,
        status: (error as { status?: number } | null)?.status,
        message: (error as { message?: string } | null)?.message,
      })
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-8", className)} noValidate>
      <input aria-hidden="true" name="bot-field" type="text" tabIndex={-1} autoComplete="off" className="hidden" />

      {/* Name & Email Row */}
      <div className="grid gap-8 md:grid-cols-2">
        <FloatingLabelInput
          id="name"
          label={t("contact.name")}
          value={formData.name}
          onChange={update("name")}
          required
          error={errors.name}
          accentColor={accentColor}
        />

        <FloatingLabelInput
          id="email"
          label={t("contact.email")}
          type="email"
          value={formData.email}
          onChange={update("email")}
          required
          error={errors.email}
          accentColor={accentColor}
        />
      </div>

      {/* Subject */}
      <FloatingLabelInput
        id="subject"
        label={t("contact.subject")}
        value={formData.subject}
        onChange={update("subject")}
        required
        error={errors.subject}
        accentColor={accentColor}
      />

      {/* Message */}
      <FloatingLabelTextarea
        id="message"
        label={t("contact.message")}
        value={formData.message}
        onChange={update("message")}
        required
        error={errors.message}
        rows={2}
        accentColor={accentColor}
      />

      {/* Submit Button */}
      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex items-center gap-3 rounded-full px-10 py-4 text-lg font-medium transition-all duration-300",
            "hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
            status === "success" && "bg-green-500 text-white",
          )}
          style={status === "success" ? undefined : { backgroundColor: accentColor, color: "#292F36" }}
        >
          {status === "sending" ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>{t("contact.sending")}</span>
            </>
          ) : status === "success" ? (
            <>
              <span>{t("contact.success")}</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          ) : (
            <>
              <span>{t("contact.send")}</span>
              <Send className="h-5 w-5" />
            </>
          )}
        </button>

        <p aria-live="polite" className="min-h-5 text-center font-mono text-sm">
          {status === "error" && <span className="text-red-500">{t("contact.error")}</span>}
          {status === "unconfigured" && (
            <span className="text-amber-500">{t("contact.notConfigured")}</span>
          )}
        </p>
      </div>
    </form>
  )
}
