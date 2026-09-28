// The shop cart. There is no checkout: /cos turns the lines into one WhatsApp
// (or email) message, and the owner confirms delivery, payment and the date
// in the chat.
//
// The lines live in localStorage and in a tiny external store read through
// useSyncExternalStore. The server snapshot is always empty, so the server
// render and hydration agree; the stored lines appear right after hydration.
// Other tabs stay in step through the storage event.

import { useSyncExternalStore } from 'react'
import { formatLei } from '~/data/business'
import { type ShopProduct, formatSize, getShopProduct } from '~/data/shop'
import { trackEvent } from '~/utils/analytics'

export type CartLine = {
  slug: string
  // Personalisation, '' when there is none or when an optional field was
  // left empty ("as on the photo"). The same product with another name is
  // another line.
  text: string
  quantity: number
}

export type CartItem = CartLine & { key: string; product: ShopProduct }

const STORAGE_KEY = 'lc-cos'
export const MAX_QUANTITY = 99

const EMPTY: CartItem[] = []
let items: CartItem[] = EMPTY
let loaded = false
const listeners = new Set<() => void>()

// Spaces collapsed so "Maria " and "Maria" are one line
export function normalizeText(text: string) {
  return text.replace(/\s+/g, ' ').trim()
}

function clampQuantity(quantity: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity) || 1))
}

// Case-sensitive: "ANA" and "Ana" are cut differently.
function lineKey(slug: string, text: string) {
  return `${slug}\n${text}`
}

// Unknown slugs (a product taken off the shop) and malformed entries are
// dropped instead of breaking the page.
function toItems(lines: unknown): CartItem[] {
  if (!Array.isArray(lines)) return EMPTY
  const byKey = new Map<string, CartItem>()
  for (const line of lines) {
    if (!line || typeof line !== 'object') continue
    const { slug, text, quantity } = line as Partial<CartLine>
    const product = typeof slug === 'string' ? getShopProduct(slug) : undefined
    if (!product || typeof quantity !== 'number') continue
    const clean = product.personalization
      ? normalizeText(typeof text === 'string' ? text : '').slice(
          0,
          product.personalization.maxLength,
        )
      : ''
    const key = lineKey(product.slug, clean)
    const existing = byKey.get(key)
    byKey.set(key, {
      key,
      slug: product.slug,
      text: clean,
      quantity: clampQuantity((existing?.quantity ?? 0) + quantity),
      product,
    })
  }
  return byKey.size ? [...byKey.values()] : EMPTY
}

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? toItems(JSON.parse(raw)) : EMPTY
  } catch {
    return EMPTY
  }
}

function commit(next: CartItem[]) {
  items = next.length ? next : EMPTY
  try {
    if (items.length) {
      const lines: CartLine[] = items.map(({ slug, text, quantity }) => ({ slug, text, quantity }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Private mode or a full quota: the cart still works for this visit.
  }
  for (const listener of listeners) listener()
}

function onStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) return
  items = read()
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener('storage', onStorage)
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot() {
  if (!loaded) {
    loaded = true
    items = read()
  }
  return items
}

const getServerSnapshot = () => EMPTY

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Adds to the line with the same product and text, or starts a new one.
// Returns the line as it is now in the cart.
export function addToCart(product: ShopProduct, text: string, quantity = 1): CartItem {
  const clean = product.personalization
    ? normalizeText(text).slice(0, product.personalization.maxLength)
    : ''
  const key = lineKey(product.slug, clean)
  const current = getSnapshot()
  const existing = current.find((item) => item.key === key)
  const line: CartItem = {
    key,
    slug: product.slug,
    text: clean,
    quantity: clampQuantity((existing?.quantity ?? 0) + quantity),
    product,
  }
  commit(existing ? current.map((item) => (item.key === key ? line : item)) : [...current, line])
  trackCartEvent('add_to_cart', [{ product, quantity }])
  return line
}

export function setQuantity(key: string, quantity: number) {
  commit(
    getSnapshot().map((item) =>
      item.key === key ? { ...item, quantity: clampQuantity(quantity) } : item,
    ),
  )
}

// A text that now matches another line of the same product merges into it.
// Returns the key of the line that holds the text now (the key includes the
// text), so /cos can keep the row on screen through the rename.
export function setText(key: string, text: string): string | undefined {
  const current = getSnapshot()
  const item = current.find((i) => i.key === key)
  if (!item?.product.personalization) return undefined
  const clean = normalizeText(text).slice(0, item.product.personalization.maxLength)
  // A required name is never cleared: two emptied lines of one product would
  // share the key `slug\n` and merge, and their names would be lost.
  if (item.product.personalization.required && !clean) return key
  const nextKey = lineKey(item.slug, clean)
  if (nextKey === key) return key
  const target = current.find((i) => i.key === nextKey)
  commit(
    current.flatMap((i) => {
      if (i.key === key) {
        return target ? [] : [{ ...i, key: nextKey, text: clean }]
      }
      if (target && i.key === nextKey) {
        return [{ ...i, quantity: clampQuantity(i.quantity + item.quantity) }]
      }
      return [i]
    }),
  )
  return nextKey
}

export function removeFromCart(key: string) {
  const item = getSnapshot().find((i) => i.key === key)
  commit(getSnapshot().filter((i) => i.key !== key))
  if (item) trackCartEvent('remove_from_cart', [item])
}

export function clearCart() {
  commit(EMPTY)
}

export function cartCount(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}

export function cartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
}

// A required name that is still empty (a line saved before the field was
// required, or cleared in the cart). /cos asks for it before sending.
export function missingText(item: CartItem) {
  return !!item.product.personalization?.required && !item.text
}

// GA4 ecommerce events; sent only after analytics consent (see trackEvent).
// Product data only: the personalisation text, the buyer's name, town and
// notes never go to Google, as the privacy policy says. For the same reason
// the cart's send link is the bare chat and the order text is only added on
// click: GA4's enhanced measurement reports outbound link URLs.
export function trackCartEvent(
  name: 'view_item' | 'add_to_cart' | 'remove_from_cart' | 'view_cart' | 'begin_checkout',
  lines: Array<{ product: ShopProduct; quantity: number }>,
) {
  trackEvent(name, {
    currency: 'RON',
    value: lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
    items: lines.map(({ product, quantity }) => ({
      item_id: product.slug,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity,
    })),
  })
}

export type OrderDetails = {
  delivery: 'curier' | 'ridicare'
  // Buyer's name, and the town for the courier; both optional; the owner
  // asks in the chat for whatever is missing.
  name: string
  city: string
  note: string
}

// "Numele de pe glob: „Maria”"; an empty optional field reads "ca în poză".
function personalizationLine(item: CartItem) {
  const field = item.product.personalization
  if (!field) return ''
  return item.text
    ? `${field.label}: „${item.text}”`
    : `${field.label}: ca în poză („${field.example}”)`
}

// The order as plain text for WhatsApp and email. Plain hyphens and line
// breaks only: WhatsApp would turn *…* or _…_ into formatting.
export function orderMessage(cart: CartItem[], details: OrderDetails) {
  const lines = cart.map((item, index) => {
    const { product } = item
    const personal = personalizationLine(item)
    return [
      `${index + 1}. ${product.name} (${product.finish}, ${formatSize(product.size)})`,
      ...(personal ? [`   ${personal}`] : []),
      `   ${item.quantity} × ${formatLei(product.price)} = ${formatLei(item.quantity * product.price)}`,
    ].join('\n')
  })
  const name = normalizeText(details.name)
  const city = normalizeText(details.city)
  const note = details.note.trim()
  const courier = details.delivery === 'curier'
  return [
    'Bună ziua! Aș dori să comand din magazinul LaserCraft:',
    '',
    ...lines,
    '',
    // Only the courier costs extra, so only it gets the "(fără livrare)".
    `Total produse: ${formatLei(cartTotal(cart))}${courier ? ' (fără livrare)' : ''}`,
    courier
      ? `Livrare: prin curier${city ? `, în ${city}` : ''}`
      : 'Livrare: ridicare personală din Craiova',
    // "Numele meu", so the owner doesn't read it as one more name to cut
    // (the lines above say "Numele de pe glob: …").
    ...(name ? [`Numele meu: ${name}`] : []),
    ...(note ? [`Observații: ${note}`] : []),
    '',
    courier
      ? 'Vă rog să-mi confirmați totalul cu livrare, modalitatea de plată și data livrării.'
      : 'Vă rog să-mi confirmați comanda, modalitatea de plată și când o pot ridica.',
  ].join('\n')
}
