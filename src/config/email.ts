/**
 * EmailJS — configuration pour le build Vite.
 *
 * Les identifiants sont injectés par Vercel au moment du build, avec le
 * préfixe `VITE_` (convention Vite) :
 *
 *   VITE_EMAILJS_SERVICE_ID   → serviceId   (ex. service_xxxxxxx)
 *   VITE_EMAILJS_TEMPLATE_ID  → templateId  (ex. template_xxxxxxx)
 *   VITE_EMAILJS_PUBLIC_KEY   → publicKey   (ancienne « user id » EmailJS)
 *
 * → En production : rien à faire, le build Vercel récupère ces variables.
 * → En local : `cp .env.example .env`, puis `pnpm dev`.
 *
 * Ces identifiants sont publics par conception (ils sont livrés au navigateur
 * pour envoyer le formulaire) : ne jamais y mettre de secret.
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
