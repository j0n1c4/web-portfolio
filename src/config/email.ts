/**
 * EmailJS — même configuration que v1/config/email.ts, adaptée aux
 * variables d'environnement de Vite (prefixe `VITE_` au lieu de
 * `NEXT_PUBLIC_`). Voir `.env.example`.
 *
 * Les clés publiques EmailJS (`userId`) sont exposées côté client par
 * conception : ne jamais y mettre de secret.
 */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
} as const

/** `true` quand les trois identifiants EmailJS sont renseignés. */
export const isEmailjsConfigured = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey,
)
