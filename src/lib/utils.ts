import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Luminance relative WCAG d'une couleur hexadécimale. Accepte `RRGGBB`
 * comme `#RRGGBB` : les couleurs de comparaison (`dark`, `light`, `surface`)
 * arrivent souvent préfixées, et un `parseInt("#2", 16)` silencieusement
 * renvoyait `NaN`, ce qui faisait échouer toute comparaison de contraste.
 */
function relativeLuminance(color: string) {
  const hex = color.replace("#", "")
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

/** Rapport de contraste WCAG entre deux couleurs hexadécimales. */
function contrastRatio(a: string, b: string) {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Choisit, pour un texte posé sur `background`, la variante de `dark` ou
 * `light` la plus contrastée.
 *
 * Les skills déclarent des couleurs de marque allant du blanc pur (`#FFFFFF`
 * pour Next.js) au bleu nuit (`#336791` pour Postgres) : une icône en blanc
 * fixe disparaît sur les fonds clairs, une icône en foncé disparaît sur les
 * fonds sombres.
 */
export function readableTextColor(background: string, dark = "#000F2E", light = "#FFFFFF") {
  const hex = background.replace("#", "")
  if (!/^[0-9a-f]{6}$/i.test(hex)) return light
  return contrastRatio(hex, dark) >= contrastRatio(hex, light) ? dark : light
}

/**
 * Renvoie `color` si elle est assez contrastée sur `surface`, sinon `fallback`.
 *
 * Contrairement à `readableTextColor`, la teinte est préservée quand elle
 * passe : le code couleur du skill reste lisible tout en gardant son
 * identité. Sert pour du texte posé sur un fond de section sombre, où les
 * couleurs de marque foncées (`#4D4D4D` pour Keycloak) disparaissent.
 */
export function ensureLegibleOn(
  color: string,
  surface: string,
  fallback = "#E5E7EB",
  minRatio = 3,
) {
  const hex = color.replace("#", "")
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback
  return contrastRatio(hex, surface) >= minRatio ? color : fallback
}
