// Single source for NAP data, prices and shared facts. Page copy, schema and
// contact buttons all read from here so they can never disagree.

export const PHONE_DISPLAY = '0754 497 243'
export const PHONE_E164 = '+40754497243'
export const PHONE_HREF = `tel:${PHONE_E164}`
export const EMAIL = 'lasercraft.contact@gmail.com'

const WHATSAPP_NUMBER = PHONE_E164.replace('+', '')
const DEFAULT_WHATSAPP_MESSAGE =
  'Bună ziua! Aș dori o ofertă pentru un produs personalizat.'

export function whatsappHref(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function emailHref(subject = 'Cerere ofertă - LaserCraft', body?: string) {
  const params = [`subject=${encodeURIComponent(subject)}`]
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${EMAIL}?${params.join('&')}`
}

export const openingHours = [
  {
    label: 'Luni – Vineri',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  { label: 'Sâmbătă', days: ['Saturday'], opens: '09:00', closes: '14:00' },
] as const

export const HOURS_SHORT = 'L–V 08:00–17:00, S 09:00–14:00'
export const RESPONSE_TIME = 'Răspundem în maximum 24 de ore lucrătoare.'
export const DELIVERY =
  'Ridicare personală din Craiova sau livrare prin curier în toată România.'
export const PRECISION = '±0,05 mm'

// Legal entity details for the footer. The owner will supply them; nothing is
// rendered until they are filled in.
export const COMPANY: { name: string; cui: string; regCom: string } | null = null

// Seasonal promo for the Christmas ornaments (home tile, menu badge).
// Switch off after the holidays.
export const SHOW_CHRISTMAS_PROMO = true

export const plaquePricing = [
  { size: '30 × 20 cm', price: 70 },
  { size: '30 × 15 cm', price: 65 },
  { size: '25 × 15 cm', price: 60 },
  { size: '20 × 15 cm', price: 55 },
]

export const PLAQUE_MIN_PRICE = Math.min(...plaquePricing.map((p) => p.price))

// Custom acrylic (plexiglas) cutting & engraving, priced per surface area
export const ACRYLIC_PRICE_PER_CM2 = 0.09

// Romanian decimal comma, deterministic on server and client (no ICU)
export function formatAmount(value: number) {
  const rounded = Math.round(value * 100) / 100
  const amount = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2)
  return amount.replace('.', ',')
}

export function formatLei(value: number) {
  return `${formatAmount(value)} lei`
}

// The one worked example for the per-cm² rate, in cm like every other size
// on the site: "10 × 5 cm (50 cm²) ≈ 4,50 lei".
const EXAMPLE_CM = { width: 10, height: 5 }
export const ACRYLIC_EXAMPLE = `${EXAMPLE_CM.width} × ${EXAMPLE_CM.height} cm (${
  EXAMPLE_CM.width * EXAMPLE_CM.height
} cm²) ≈ ${formatLei(EXAMPLE_CM.width * EXAMPLE_CM.height * ACRYLIC_PRICE_PER_CM2)}`
