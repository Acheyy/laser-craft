import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { QuantityStepper } from '~/components/QuantityStepper'
import { ResponsiveImage, imageMeta } from '~/components/ResponsiveImage'
import { CheckList, buttonClass } from '~/components/ui'
import { DELIVERY, RESPONSE_TIME, URGENT, formatLei, whatsappHref } from '~/data/business'
import { shopWhatsappMessage } from '~/data/products'
import { type ShopProduct, formatPrice, formatSize } from '~/data/shop'
import { addToCart, cartCount, normalizeText, useCart } from '~/utils/cart'

// Shared UI of the shop: the product card, the product page's order form, the
// "added to cart" toast and the facts list of /magazin and the product pages.

const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`

// A menu label mid-sentence: "globuri de Crăciun cu nume" (proper nouns stay
// capitalised).
export const midSentence = (text: string) => `${text.charAt(0).toLowerCase()}${text.slice(1)}`

// "Plexiglas roșu · 9 × 9 cm"
export function productMeta(product: ShopProduct) {
  return `${capitalize(product.finish)}\u00a0· ${formatSize(product.size)}`
}

// Romanian puts "de" between numbers from 20 up and the noun: "20 de
// caractere", but "12 caractere".
function characters(count: number) {
  const n = count % 100
  return `${count}\u00a0${count >= 20 && (n === 0 || n >= 20) ? 'de\u00a0' : ''}caractere`
}

// "Glob de Crăciun personalizat cu nume, „Maria”, 2 buc."; an empty optional
// field reads "ca în poză („Craiova 26”)", as in the order message.
function addedLabel(product: ShopProduct, text: string, quantity: number) {
  const field = product.personalization
  const personal = text ? `, „${text}”` : field ? `, ca în poză („${field.example}”)` : ''
  return `${product.name}${personal}, ${quantity}\u00a0buc.`
}

// --- Toast -----------------------------------------------------------------

type Toast = { id: number; label: string }

let toast: Toast | null = null
let toastId = 0
const toastListeners = new Set<() => void>()

function setToast(next: Toast | null) {
  toast = next
  for (const listener of toastListeners) listener()
}

function subscribeToast(listener: () => void) {
  toastListeners.add(listener)
  return () => toastListeners.delete(listener)
}

// Quick-add from a card: adds one piece and tells the page's <ShopToast/>.
export function quickAdd(product: ShopProduct) {
  addToCart(product, '', 1)
  toastId += 1
  setToast({ id: toastId, label: addedLabel(product, '', 1) })
}

const TOAST_MS = 5000

// Confirmation for the card buttons, rendered once per page. It sits just
// below the sticky header, clear of the bottom action bar and the cookie
// banner, and stays while it is hovered or holds focus. The live region is
// always in the DOM, so screen readers announce each new message.
export function ShopToast() {
  const current = useSyncExternalStore(subscribeToast, () => toast, () => null)
  const cart = useCart()
  // The toast being hovered or focused. Tied to its id: closing a toast
  // removes it without a mouseleave or blur, and a plain flag would then
  // keep the next toast open for good.
  const [pausedId, setPausedId] = useState<number | null>(null)
  const paused = current !== null && pausedId === current.id

  useEffect(() => {
    if (!current || paused) return
    const timer = setTimeout(() => setToast(null), TOAST_MS)
    return () => clearTimeout(timer)
  }, [current, paused])

  // A toast left open on another page would be stale there.
  useEffect(() => () => setToast(null), [])

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 top-[4.5rem] z-40 flex justify-center pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
    >
      {current && (
        <div
          key={current.id}
          onMouseEnter={() => setPausedId(current.id)}
          onMouseLeave={() => setPausedId(null)}
          onFocus={() => setPausedId(current.id)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPausedId(null)
          }}
          className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl bg-slate-900 py-3 pl-4 pr-1 text-sm text-white shadow-xl shadow-slate-900/30 ring-1 ring-white/10"
        >
          <Icon
            name="check"
            strokeWidth={2.25}
            className="mt-0.5 w-5 h-5 shrink-0 text-amber-400"
          />
          <div className="min-w-0 flex-1">
            <p className="leading-snug">
              Adăugat în coș:{' '}
              <span className="font-semibold">{current.label}</span>
            </p>
            <Link
              to="/cos"
              onClick={() => setToast(null)}
              className="-my-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-amber-300 underline decoration-amber-400/40 underline-offset-4 hover:text-amber-200"
            >
              Vedeți coșul ({cartCount(cart)})
              <Icon name="arrowRight" className="w-4 h-4" />
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Închideți mesajul"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-zinc-400 hover:bg-white/10 hover:text-white"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}

// --- Card ------------------------------------------------------------------

// Shop tile for /magazin and "Alte produse". The name is the link, and its
// ::after layer makes the whole card the tap target; the add button sits
// above that layer. Products that need a name can't be added from the card,
// so they show where the name is chosen instead.
export function ShopCard({
  product,
  headingLevel = 'h3',
  priority = false,
  sizes,
}: {
  product: ShopProduct
  headingLevel?: 'h2' | 'h3'
  priority?: boolean
  sizes: string
}) {
  const Heading = headingLevel
  const meta = imageMeta(product.image)
  const needsName = !!product.personalization?.required

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-paper-line bg-white transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10">
      <div
        className="overflow-hidden bg-slate-900"
        style={{ aspectRatio: `${meta.width} / ${meta.height}` }}
      >
        <ResponsiveImage
          name={product.image}
          alt={product.alt}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <Heading className="font-semibold leading-snug text-zinc-900 [overflow-wrap:anywhere] sm:text-lg">
          <Link
            to="/magazin/$slug"
            params={{ slug: product.slug }}
            className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-amber-800"
          >
            {product.name}
          </Link>
        </Heading>
        <p className="mt-1 text-xs text-zinc-600 sm:text-sm">{productMeta(product)}</p>
        <p className="mt-1.5 hidden text-sm leading-relaxed text-zinc-600 sm:block">
          {product.summary}
        </p>
        <div className="mt-auto pt-3">
          <p className="text-xl font-extrabold tracking-tight text-amber-800">
            {formatPrice(product)}
            <span className="text-sm font-medium text-zinc-600">/buc.</span>
          </p>
          {needsName ? (
            // Looks like a button, but the card stays the one link to the
            // product page, where the name is typed.
            <span
              className={buttonClass(
                'outlineLight',
                'sm',
                'mt-2 min-h-11 w-full whitespace-nowrap px-1 group-hover:border-amber-400',
              )}
            >
              Alegeți numele
              <Icon name="arrowRight" className="hidden w-4 h-4 sm:block" />
            </span>
          ) : (
            <button
              type="button"
              onClick={() => quickAdd(product)}
              // Starts with the visible label; the name tells the repeated
              // buttons apart in a screen reader.
              aria-label={`Adăugați în coș: ${product.name}`}
              className={buttonClass(
                'dark',
                'sm',
                'relative z-10 mt-2 min-h-11 w-full whitespace-nowrap px-1',
              )}
            >
              <Icon name="bag" className="w-4 h-4 shrink-0" />
              {/* The full label doesn't fit a 2-column card on phones. */}
              <span>
                Adăugați<span className="max-sm:hidden"> în coș</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

// --- Product page form -----------------------------------------------------

type Added = { label: string; name: boolean }

// The product page's order form: the personalisation, the quantity and the
// add button, with an inline confirmation. After a name is added the field is
// emptied and, after a keyboard or mouse submit, keeps focus, since families
// order one globe per name.
export function AddToCartForm({ product }: { product: ShopProduct }) {
  const field = product.personalization
  const cart = useCart()
  const [text, setText] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [added, setAdded] = useState<Added | null>(null)
  // Spoken after "−" / "+" (focus stays on the button, so nothing else
  // would say the new amount); not after the reset to 1 that follows an add.
  const [quantityStatus, setQuantityStatus] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  // How the add button was pressed: a touch refocus would reopen the phone
  // keyboard over the confirmation.
  const pointerType = useRef('')
  const id = useId()
  const textId = `${id}-text`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const quantityId = `${id}-quantity`

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const clean = normalizeText(text)
    if (field?.required && !clean) {
      setError(`Scrieți ${field.label.charAt(0).toLowerCase()}${field.label.slice(1)}.`)
      inputRef.current?.focus()
      return
    }
    const line = addToCart(product, clean, quantity)
    setAdded({ label: addedLabel(product, line.text, quantity), name: !!field?.required })
    setQuantity(1)
    setQuantityStatus('')
    if (field?.required) {
      setText('')
      if (pointerType.current !== 'touch') inputRef.current?.focus()
    }
    pointerType.current = ''
    // On phones the confirmation would open under the bottom bar; html's
    // scroll-padding keeps it clear. Nothing moves when it is already in view.
    requestAnimationFrame(() => statusRef.current?.scrollIntoView({ block: 'nearest' }))
  }

  const changeQuantity = (next: number) => {
    setQuantity(next)
    setQuantityStatus(`Cantitate: ${next}. Total: ${formatLei(product.price * next)}.`)
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {field && (
        <div>
          <label htmlFor={textId} className="block font-semibold text-zinc-900">
            {field.label}
            {!field.required && (
              <span className="font-normal text-zinc-600"> (opțional)</span>
            )}
          </label>
          <input
            ref={inputRef}
            id={textId}
            type="text"
            value={text}
            maxLength={field.maxLength}
            placeholder={`ex.: ${field.example}`}
            autoComplete="off"
            // As in the cart: the name is cut exactly as typed, so no
            // spell-check marks and no lower-case start. Autocorrect stays on,
            // as it suggests the diacritics the hint asks for.
            autoCapitalize="words"
            spellCheck={false}
            enterKeyHint="done"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${errorId} ${hintId}` : hintId}
            onChange={(event) => {
              setText(event.target.value)
              if (error) setError(null)
            }}
            className={`mt-2 block min-h-12 w-full rounded-xl border bg-white px-4 text-base text-zinc-900 placeholder:text-zinc-500 ${
              error ? 'border-red-600' : 'border-field-line hover:border-zinc-600'
            }`}
          />
          {error && (
            <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-red-700">
              <Icon name="close" strokeWidth={2.25} className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}
          <p id={hintId} className="mt-2 text-sm leading-relaxed text-zinc-600">
            {field.required
              ? `Scrieți-l exact cum doriți să apară, cu diacritice (maximum ${characters(field.maxLength)}). Pentru mai multe nume, adăugați-le în coș pe rând.`
              : `Lăsați gol pentru „${field.example}”, ca în poză (maximum ${characters(field.maxLength)}).`}
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
        <div>
          <label htmlFor={quantityId} className="block font-semibold text-zinc-900">
            Cantitate
          </label>
          <QuantityStepper
            id={quantityId}
            value={quantity}
            onChange={changeQuantity}
            className="mt-2"
          />
        </div>
        <p className="pb-2.5 text-zinc-600">
          Total:{' '}
          <span className="text-lg font-bold text-zinc-900">
            {formatLei(product.price * quantity)}
          </span>
        </p>
      </div>

      <p role="status" className="sr-only">
        {quantityStatus}
      </p>

      <button
        type="submit"
        onPointerDown={(event) => {
          pointerType.current = event.pointerType
        }}
        className={buttonClass('primary', 'lg', 'w-full')}
      >
        <Icon name="bag" className="w-5 h-5 shrink-0" />
        Adăugați în coș
      </button>

      <div ref={statusRef} role="status">
        {added && (
          <div className="rounded-xl bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-950 ring-1 ring-inset ring-emerald-200">
            <p className="flex gap-2">
              <Icon
                name="check"
                strokeWidth={2.25}
                className="mt-0.5 w-4 h-4 shrink-0 text-emerald-700"
              />
              <span>
                Adăugat în coș: <strong className="font-semibold">{added.label}</strong>
                {added.name && ' Pentru alt nume, scrieți-l mai sus și adăugați-l și pe el.'}
              </span>
            </p>
            <div className="mt-1 flex flex-wrap gap-x-5 pl-6">
              <Link
                to="/cos"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-zinc-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-800"
              >
                Vedeți coșul ({cartCount(cart)})
                <Icon name="arrowRight" className="w-4 h-4" />
              </Link>
              <Link
                to="/magazin"
                className="inline-flex min-h-11 items-center font-medium text-zinc-700 underline decoration-zinc-400 underline-offset-4 hover:text-zinc-900"
              >
                Continuați cumpărăturile
              </Link>
            </div>
          </div>
        )}
      </div>

      <p className="border-t border-zinc-200 pt-4 text-sm text-zinc-600">
        Aveți o întrebare despre acest produs?{' '}
        <a
          // The same question as the header and the bottom bar send here
          href={whatsappHref(shopWhatsappMessage(product))}
          target="_blank"
          rel="noopener"
          data-placement="product-question"
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-zinc-900 underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-800"
        >
          <WhatsAppIcon className="w-4 h-4 shrink-0" />
          Întrebați-ne pe WhatsApp
        </a>
      </p>
    </form>
  )
}

// --- Facts -----------------------------------------------------------------

// "Bine de știut" on /magazin and the product pages: only facts the owner
// has published (see shop.ts). Delivery cost and payment are confirmed in
// the chat, never stated here.
export const shopFacts: React.ReactNode[] = [
  'Prețurile sunt pe bucată; la produsele cu nume, numele este inclus în preț.',
  'Pentru cantități mari oferim reduceri.',
  'Putem adapta textul, culoarea sau motivul oricărui model.',
  DELIVERY,
  'Vă confirmăm pe WhatsApp costul livrării și modalitatea de plată.',
  `La nevoie, ${URGENT}.`,
  RESPONSE_TIME,
]

export function ShopFacts({ className = '' }: { className?: string }) {
  return <CheckList items={shopFacts} className={className} />
}
