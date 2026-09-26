import { useState } from "react"
import type { FormEvent } from "react"
import { Send } from "lucide-react"
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/atoms"
import { cn } from "@/lib/utils"

export interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void
  className?: string
  accentColor?: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

/** Molecule — validated contact form with floating labels */
export function ContactForm({ onSubmit, className, accentColor = "#12F7D6" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (onSubmit) {
      onSubmit(formData)
    }

    setIsSubmitting(false)
    setIsSuccess(true)
    setFormData({ name: "", email: "", message: "" })

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-8", className)} noValidate>
      {/* Name & Email Row */}
      <div className="grid gap-8 md:grid-cols-2">
        <FloatingLabelInput
          id="name"
          label="Your name"
          value={formData.name}
          onChange={(value) => setFormData({ ...formData, name: value })}
          required
          error={errors.name}
          accentColor={accentColor}
        />

        <FloatingLabelInput
          id="email"
          label="Your email"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          required
          error={errors.email}
          accentColor={accentColor}
        />
      </div>

      {/* Message */}
      <FloatingLabelTextarea
        id="message"
        label="Your message"
        value={formData.message}
        onChange={(value) => setFormData({ ...formData, message: value })}
        required
        error={errors.message}
        rows={4}
        accentColor={accentColor}
      />

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex items-center gap-3 rounded-full px-10 py-4 text-lg font-medium transition-all duration-300",
            "hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
            isSuccess && "bg-green-500 text-white",
          )}
          style={
            isSuccess
              ? undefined
              : { backgroundColor: accentColor, color: "#292F36" }
          }
        >
          {isSubmitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Sending...</span>
            </>
          ) : isSuccess ? (
            <>
              <span>Message Sent!</span>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}