// Single source for NAP data, prices and shared facts. Page copy, schema and
// contact buttons all read from here so they can never disagree.

import type { ProductPath } from '~/data/products'

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
    label: 'Luni–vineri',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  { label: 'Sâmbătă', days: ['Saturday'], opens: '09:00', closes: '14:00' },
] as const

// Numbers and their units are joined with a non-breaking space (\u00a0), so a
// line never ends on "24 de" or starts with "lei". Word joiners (\u2060) keep
// "09:00–14:00" on one line, since browsers may break after a dash.
export const HOURS_SHORT =
  'Luni\u2060–\u2060vineri 08:00\u2060–\u206017:00, sâmbătă 09:00\u2060–\u206014:00'
export const RESPONSE_TIME = 'Răspundem în maximum 24\u00a0de\u00a0ore lucrătoare.'
export const DELIVERY =
  'Ridicare personală din Craiova sau livrare prin curier în toată România.'
export const PRECISION = '±0,05\u00a0mm'
export const URGENT = 'execuție urgentă de la 24\u00a0de\u00a0ore'
export const DPI = '1200\u00a0DPI'

// Legal entity details for the footer. The owner will supply them; nothing is
// rendered until they are filled in.
export const COMPANY: { name: string; cui: string; regCom: string } | null = null

// Seasonal promo for the Christmas ornaments (home tile, menu badge).
// Switch off after the holidays.
export const SHOW_CHRISTMAS_PROMO = true

// Owner facts not supplied yet. Like COMPANY, each one renders nothing until
// it is filled in; the pages and the schema pick them up automatically.

// Last Christmas order days: label as shown in the copy ('10 decembrie'), iso
// as YYYY-MM-DD (zero-padded: '2026-12-05'). Each date is shown up to and
// including its day, Romanian time; once both have passed, the copy falls
// back to 'comandați din timp'. Example:
//   { courier: { label: '10 decembrie', iso: '2026-12-10' },
//     pickup: { label: '20 decembrie', iso: '2026-12-20' } }
export type DeadlineDay = { label: string; iso: string }
export type ChristmasDeadline = {
  // Last order day for courier delivery before Christmas
  courier: DeadlineDay
  // Last order day for pickup in Craiova, usually a few days later
  pickup?: DeadlineDay
}
export const CHRISTMAS_ORDER_DEADLINE: ChristmasDeadline | null = null

// The days are compared as strings, which only works zero-padded: '2026-12-5'
// would count as later than every other December day. A malformed day is
// logged and ignored instead of thrown, so a typo can't take every page down.
function validDay(day?: DeadlineDay) {
  if (!day || /^\d{4}-\d{2}-\d{2}$/.test(day.iso)) return day
  console.error(`CHRISTMAS_ORDER_DEADLINE: "${day.iso}" is not YYYY-MM-DD, ignored`)
  return undefined
}

// Pickup neighbourhood or landmark in Craiova ('zona Rovine'), never a street
// address unless the owner publishes one.
export const PICKUP_AREA: string | null = null
export const MAPS_URL: string | null = null
// Public Google Business Profile / Maps place URL of the Craiova workshop (the
// maps.app.goo.gl "Share" link or google.com/maps?cid=…), NOT the
// g.page/r/…/review "ask for reviews" link: it is used as LocalBusiness.sameAs
// and as the footer "Recenzii pe Google" link.
export const GBP_URL: string | null = null
export const SOCIAL_LINKS: Array<{ label: string; href: string }> = []

// Real, consented customer quotes only. Shown as plain quotes: never emit
// Review or aggregateRating markup for them.
export type Testimonial = {
  quote: string
  name: string
  town: string
  productLabel: string
  to?: ProductPath
}
export const TESTIMONIALS: Testimonial[] = []

// Today's date in Romania as YYYY-MM-DD, for the dated Christmas copy. Call it
// in a route loader: the server's value is hydrated, so both renders show the
// same text. Built from parts because locale date formats change between ICU
// versions.
export function bucharestTodayIso(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Bucharest',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const part = (type: 'year' | 'month' | 'day') =>
    parts.find((p) => p.type === type)!.value
  return `${part('year')}-${part('month')}-${part('day')}`
}

export type ActiveChristmasDeadline = {
  // The earliest order day still ahead, for the one-line mentions (home
  // strip, hero chip): the courier day, then the pickup day.
  next: DeadlineDay & { kind: 'courier' | 'pickup' }
  courier?: DeadlineDay
  pickup?: DeadlineDay
}

// The order days that have not passed yet, while the promo is on; null when
// there are none. A passed day is dropped, so the copy never shows it.
export function activeChristmasDeadline(todayIso: string): ActiveChristmasDeadline | null {
  const deadline = CHRISTMAS_ORDER_DEADLINE
  if (!SHOW_CHRISTMAS_PROMO || !deadline) return null
  const ahead = (day?: DeadlineDay) => {
    const valid = validDay(day)
    return valid && todayIso <= valid.iso ? valid : undefined
  }
  const courier = ahead(deadline.courier)
  const pickup = ahead(deadline.pickup)
  if (courier) return { next: { ...courier, kind: 'courier' }, courier, pickup }
  if (pickup) return { next: { ...pickup, kind: 'pickup' }, pickup }
  return null
}

export const plaquePricing = [
  { size: '30\u00a0×\u00a020\u00a0cm', price: 70 },
  { size: '30\u00a0×\u00a015\u00a0cm', price: 65 },
  { size: '25\u00a0×\u00a015\u00a0cm', price: 60 },
  { size: '20\u00a0×\u00a015\u00a0cm', price: 55 },
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
  return `${formatAmount(value)}\u00a0lei`
}

// The one worked example for the per-cm² rate, in cm like every other size
// on the site: "10 × 5 cm (50 cm²) ≈ 4,50 lei".
const EXAMPLE_CM = { width: 10, height: 5 }
export const ACRYLIC_EXAMPLE = `${EXAMPLE_CM.width}\u00a0×\u00a0${EXAMPLE_CM.height}\u00a0cm (${
  EXAMPLE_CM.width * EXAMPLE_CM.height
}\u00a0cm²) ≈\u00a0${formatLei(EXAMPLE_CM.width * EXAMPLE_CM.height * ACRYLIC_PRICE_PER_CM2)}`
