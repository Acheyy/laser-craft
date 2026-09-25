export const PHONE_DISPLAY = '+40 754 497 243'
export const PHONE_E164 = '+40754497243'
export const PHONE_HREF = `tel:${PHONE_E164}`
export const EMAIL = 'lasercraft.contact@gmail.com'

export const plaquePricing = [
  { size: '30 × 20 cm', price: 70 },
  { size: '30 × 15 cm', price: 65 },
  { size: '25 × 15 cm', price: 60 },
  { size: '20 × 15 cm', price: 55 },
]

// Custom acrylic (plexiglas) cutting & engraving, priced per surface area
export const ACRYLIC_PRICE_PER_CM2 = 0.09

// Romanian decimal comma, deterministic on server and client (no ICU)
export function formatLei(value: number) {
  const rounded = Math.round(value * 100) / 100
  const amount = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2)
  return `${amount.replace('.', ',')} lei`
}
