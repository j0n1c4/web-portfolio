/**
 * EmailJS — configuration pour le build Vite.
 *
 * Les identifiants sont injectés par Vercel au moment du build, avec le
 * préfixe `VITE_` (convention Vite) :
 *
 *   VITE_EMAILJS_SERVICE_ID   → serviceId   (ex. service_69156bk)
 *   VITE_EMAILJS_TEMPLATE_ID  → templateId  (ex. template_og7z4di)
 *   VITE_EMAILJS_PUBLIC_KEY   → publicKey   (ex. zAvt1tXd_nYSJwmMs)
 *
 * → En production : rien à faire, le build Vercel récupère ces variables.
 * → En local : `cp .env.example .env`, puis `npm run dev`.
 *
 * Ces identifiants sont publics par conception (ils sont livrés au navigateur
 * pour envoyer le formulaire) : ne jamais y mettre de secret.
 */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
} as const

export type EmailjsConfig = typeof emailjsConfig

/** `true` quand les trois identifiants EmailJS sont renseignés. */
export const isEmailjsConfigured = Boolean(
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey,
)

/**
 * Chaque identifiant EmailJS porte son type dans son préfixe : `service_…`
 * pour un service, `template_…` pour un template, rien pour la clé publique.
 * Cette table sert à détecter les valeurs placées dans la mauvaise variable.
 */
const IDENTIFIERS = [
  {
    key: "serviceId",
    variable: "VITE_EMAILJS_SERVICE_ID",
    mustStartWith: "service_",
    example: "service_69156bk",
    /** Libellé du type attendu, pour un message d'erreur lisible. */
    expects: "un identifiant de service",
  },
  {
    key: "templateId",
    variable: "VITE_EMAILJS_TEMPLATE_ID",
    mustStartWith: "template_",
    example: "template_og7z4di",
    expects: "un identifiant de template",
  },
  {
    key: "publicKey",
    variable: "VITE_EMAILJS_PUBLIC_KEY",
    mustStartWith: "",
    example: "zAvt1tXd_nYSJwmMs",
    expects: "une clé publique",
  },
] as const

/** Placeholders laissés dans `.env.example` (`service_xxxxxxx`). */
const PLACEHOLDER = /x{4,}/i

/** Types connus, pour nommer celui d'une valeur mal rangée. */
const KNOWN_PREFIXES = [
  { prefix: "service_", label: "un identifiant de service" },
  { prefix: "template_", label: "un identifiant de template" },
]

/**
 * Vérifie la configuration EmailJS et retourne une liste de problèmes
 * (vide si tout est correct). Fonction pure : ne dépend pas de `import.meta.env`
 * pour être testable.
 */
export function diagnoseEmailjsConfig(config: EmailjsConfig): string[] {
  const issues: string[] = []

  for (const { key, variable, mustStartWith, example, expects } of IDENTIFIERS) {
    const value = config[key].trim()

    if (!value) {
      issues.push(`${variable} est absente ou vide`)
      continue
    }

    if (PLACEHOLDER.test(value)) {
      issues.push(`${variable} contient encore la valeur d'exemple (« ${value} »)`)
      continue
    }

    if (mustStartWith) {
      if (!value.startsWith(mustStartWith)) {
        const actual = KNOWN_PREFIXES.find((known) => value.startsWith(known.prefix))
        issues.push(
          actual
            ? `${variable} contient ${actual.label} (« ${value} ») alors qu'elle attend ${expects} (« ${example} »)`
            : `${variable} ne commence pas par « ${mustStartWith} » alors qu'elle attend ${expects} (« ${example} »)`,
        )
      }
      continue
    }

    // Clé publique : aucun préfixe attendu, donc un préfixe connu signale
    // qu'une autre valeur a été rangée ici.
    const misplaced = KNOWN_PREFIXES.find((known) => value.startsWith(known.prefix))
    if (misplaced) {
      issues.push(
        `${variable} contient ${misplaced.label} (« ${value} ») alors qu'elle attend ${expects} (« ${example} »)`,
      )
    }
  }

  return issues
}

/**
 * Diagnostic au démarrage. Volontairement `console` uniquement : ces détails
 * sont destinés au développeur, l'interface affiche un message générique.
 */
const issues = diagnoseEmailjsConfig(emailjsConfig)

if (issues.length > 0) {
  console.error(
    `[EmailJS] ${issues.length} problème(s) de configuration :\n` +
      issues.map((issue) => `  • ${issue}`).join("\n") +
      `\n  → Vercel > Settings > Environment Variables, puis redeployer.` +
      `\n  → Attendu : service_…, template_…, et une clé publique sans préfixe.`,
  )
}
