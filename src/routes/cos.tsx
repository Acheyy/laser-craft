import { Link, createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { PageHero } from '~/components/PageHero'
import { QuantityStepper } from '~/components/QuantityStepper'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { productMeta } from '~/components/Shop'
import { Container, buttonClass, textLink } from '~/components/ui'
import {
  EMAIL,
  RESPONSE_TIME,
  WHATSAPP_CHAT_HREF,
  emailHref,
  formatLei,
  whatsappHref,
} from '~/data/business'
import {
  SHOP_MIN_PRICE,
  SHOP_OG_IMAGE,
  type ShopProduct,
  formatPrice,
  shopCategories,
  shopProductsIn,
} from '~/data/shop'
import { trackEvent } from '~/utils/analytics'
import {
  type CartItem,
  type OrderDetails,
  cartCount,
  cartTotal,
  clearCart,
  missingText,
  normalizeText,
  orderMessage,
  removeFromCart,
  setQuantity,
  setText,
  trackCartEvent,
  useCart,
} from '~/utils/cart'
import { copyText } from '~/utils/clipboard'
import { focusTarget } from '~/utils/focus'
import { seo } from '~/utils/seo'

// The cart shows only what this browser saved, so it stays out of the index
// (and out of public/sitemap.xml).
export const Route = createFileRoute('/cos')({
  component: CartPage,
  head: () => {
    const head = seo({
      title: 'Coșul de cumpărături | LaserCraft',
      description:
        'Produsele alese din magazinul LaserCraft. Trimiteți comanda pe WhatsApp într-un singur mesaj.',
      path: '/cos',
      image: SHOP_OG_IMAGE,
    })
    return { ...head, meta: [...head.meta, { name: 'robots', content: 'noindex' }] }
  },
})

const EMAIL_SUBJECT = 'Comandă din magazin - LaserCraft'

// Delivery, name and notes survive a reload, like the cart itself.
const DETAILS_KEY = 'lc-cos-detalii'
const EMPTY_DETAILS: OrderDetails = { delivery: 'curier', name: '', city: '', note: '' }

const deliveryOptions: Array<{ value: OrderDetails['delivery']; label: string }> = [
  { value: 'curier', label: 'Prin curier, în toată România' },
  { value: 'ridicare', label: 'Ridicare personală din Craiova' },
]

// No documented limit for wa.me texts; past about 2000 characters of URL some
// apps are reported to cut the message, so the page points to "Copiați
// comanda" instead of shortening the order.
const LONG_WHATSAPP_URL = 2000

// A malformed or older entry falls back field by field.
function readDetails(): OrderDetails {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(DETAILS_KEY) ?? 'null')
    if (!saved || typeof saved !== 'object') return EMPTY_DETAILS
    const { delivery, name, city, note } = saved as Record<string, unknown>
    const text = (value: unknown) => (typeof value === 'string' ? value : '')
    return {
      delivery: delivery === 'ridicare' ? 'ridicare' : 'curier',
      name: text(name),
      city: text(city),
      note: text(note),
    }
  } catch {
    return EMPTY_DETAILS
  }
}

const isEmptyDetails = (details: OrderDetails) =>
  details.delivery === EMPTY_DETAILS.delivery &&
  !details.name.trim() &&
  !details.city.trim() &&
  !details.note.trim()

// An untouched form leaves nothing behind: emptying the cart resets the
// details, so the buyer's name and notes don't stay in a shared browser.
function saveDetails(details: OrderDetails) {
  try {
    if (isEmptyDetails(details)) localStorage.removeItem(DETAILS_KEY)
    else localStorage.setItem(DETAILS_KEY, JSON.stringify(details))
  } catch {
    // Private mode or a full quota: the details still work for this visit.
  }
}

// Cart keys include the text, so committing a new name renames the line. Rows
// are keyed by an id that survives the rename: the row keeps its DOM, focus
// stays in the field, and a tap that caused the blur (on "+") still lands.
function useLineIds() {
  const ids = React.useRef(new Map<string, number>())
  const last = React.useRef(0)
  const idOf = (key: string) => {
    let id = ids.current.get(key)
    if (id === undefined) {
      id = ++last.current
      ids.current.set(key, id)
    }
    return id
  }
  const rename = (from: string, to: string) => {
    ids.current.set(to, idOf(from))
    ids.current.delete(from)
  }
  return { idOf, rename }
}

const textFieldId = (lineId: number) => `cos-text-${lineId}`
const removeButtonId = (lineId: number) => `cos-elimina-${lineId}`

// "Glob de Crăciun personalizat cu nume, Maria": tells apart two lines of the
// same product in the button and stepper names.
function lineLabel(item: CartItem) {
  return item.text ? `${item.product.name}, ${item.text}` : item.product.name
}

// border-field-line: the border is all that marks an empty white field on a
// white card, so it needs 3:1 against white (app.css).
const inputClass =
  'mt-1.5 block min-h-11 w-full rounded-xl border border-field-line bg-white px-3 py-2 text-base text-zinc-900 placeholder:text-zinc-500 transition-colors hover:border-zinc-600 aria-[invalid=true]:border-red-600'
const labelClass = 'block text-sm font-semibold text-zinc-900'
const blockTitle = 'text-xl font-bold text-zinc-900 sm:text-2xl'

function Optional() {
  return <span className="font-normal text-zinc-500"> (opțional)</span>
}

function CartPage() {
  const items = useCart()
  // The server and the hydration render see an empty cart (it lives in
  // localStorage). A placeholder stands in until mounted, so a visitor with
  // a full cart never sees "Coșul este gol" flash first.
  const [mounted, setMounted] = React.useState(false)
  const [details, setDetails] = React.useState(EMPTY_DETAILS)
  // Set when the visitor empties the cart here: the empty state then takes
  // focus (not when another tab empties it).
  const [emptiedHere, setEmptiedHere] = React.useState(false)
  const [announcement, setAnnouncement] = React.useState('')

  React.useEffect(() => {
    setDetails(readDetails())
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (mounted) saveDetails(details)
  }, [mounted, details])

  const viewTracked = React.useRef(false)
  React.useEffect(() => {
    if (!mounted || viewTracked.current) return
    viewTracked.current = true
    if (items.length) trackCartEvent('view_cart', items)
  }, [mounted, items])

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Magazin', to: '/magazin' }, { label: 'Coș' }]}
        title="Coșul de cumpărături"
        intro={
          <p>
            Coșul pregătește comanda într-un singur mesaj, gata scris, pe care
            ni-l trimiteți pe WhatsApp sau pe email; noi v-o confirmăm în
            conversație.
          </p>
        }
        actions={false}
      />

      <section className="bg-paper py-8 sm:py-12 lg:py-14">
        <Container>
          {!mounted ? (
            <CartPlaceholder />
          ) : items.length ? (
            <CartContents
              items={items}
              details={details}
              onDetails={(change) => setDetails((current) => ({ ...current, ...change }))}
              // Details belong to this cart: they go with it (see saveDetails).
              onEmptied={() => {
                setDetails(EMPTY_DETAILS)
                setEmptiedHere(true)
              }}
              announce={setAnnouncement}
            />
          ) : (
            <EmptyCart focusHeading={emptiedHere} />
          )}
          {/* Rendered from the start: a live region only announces changes. */}
          <p role="status" className="sr-only">
            {announcement}
          </p>
        </Container>
      </section>
    </>
  )
}

// Same outline as the cart, so the page doesn't jump when it fills in.
function CartPlaceholder() {
  const block = 'animate-pulse rounded-2xl bg-white ring-1 ring-inset ring-paper-line'
  return (
    <>
      <p className="sr-only">Se încarcă coșul.</p>
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-10"
      >
        <div className="space-y-3">
          <div className="h-8 w-56 rounded-lg bg-zinc-200/60" />
          <div className={`h-44 ${block}`} />
          <div className={`h-44 ${block}`} />
        </div>
        <div className={`h-80 ${block}`} />
      </div>
    </>
  )
}

function CartContents({
  items,
  details,
  onDetails,
  onEmptied,
  announce,
}: {
  items: CartItem[]
  details: OrderDetails
  onDetails: (change: Partial<OrderDetails>) => void
  onEmptied: () => void
  announce: (message: string) => void
}) {
  const { idOf, rename } = useLineIds()
  const total = cartTotal(items)

  const changeQuantity = (item: CartItem, quantity: number) => {
    if (quantity === item.quantity) return
    setQuantity(item.key, quantity)
    const next = total + (quantity - item.quantity) * item.product.price
    announce(`Cantitate: ${quantity}. Total produse: ${formatLei(next)}.`)
  }

  // keepFocus: the edit ended with Enter, or with focus moving to another
  // control of the same row (Tab to "−"). A merge removes that row, so focus
  // goes to the merged line's field instead of falling back to <body>.
  const commitText = (item: CartItem, text: string, keepFocus: boolean) => {
    const nextKey = setText(item.key, text)
    if (!nextKey || nextKey === item.key) return
    // `items` is still the cart from before the change: a key already in it
    // means the text matched another line of the product, which took this
    // one's pieces.
    if (items.some((i) => i.key === nextKey)) {
      announce(`„${normalizeText(text)}” era deja în coș: am adunat bucățile pe un singur rând.`)
      if (keepFocus) document.getElementById(textFieldId(idOf(nextKey)))?.focus()
    } else {
      rename(item.key, nextKey)
    }
  }

  // Focus moves to the remove button that takes the removed one's place (or
  // the one before it); an emptied cart hands it to the empty state.
  const remove = (item: CartItem, index: number) => {
    const neighbour = items[index + 1] ?? items[index - 1]
    removeFromCart(item.key)
    if (neighbour) {
      document.getElementById(removeButtonId(idOf(neighbour.key)))?.focus()
      announce(
        `Ați eliminat din coș: ${lineLabel(item)}. Total produse: ${formatLei(
          total - item.quantity * item.product.price,
        )}.`,
      )
    } else {
      onEmptied()
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:grid-rows-[auto_1fr] lg:gap-x-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
      <div className="min-w-0 lg:col-start-1 lg:row-start-1">
        <h2 className={blockTitle}>Produsele din coș</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => {
            const lineId = idOf(item.key)
            return (
              <CartRow
                key={lineId}
                item={item}
                lineId={lineId}
                onQuantity={(quantity) => changeQuantity(item, quantity)}
                onText={(text, keepFocus) => commitText(item, text, keepFocus)}
                onRemove={() => remove(item, index)}
              />
            )
          })}
        </ul>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6">
          <Link to="/magazin" className={`inline-flex min-h-11 items-center gap-1.5 ${textLink}`}>
            <Icon name="arrowRight" className="w-4 h-4 rotate-180" />
            Continuați cumpărăturile
          </Link>
          <ClearCart
            onClear={() => {
              clearCart()
              onEmptied()
            }}
          />
        </div>
      </div>

      <div className="min-w-0 lg:col-start-1 lg:row-start-2 lg:self-start">
        <OrderDetailsForm details={details} onChange={onDetails} />
      </div>

      <div className="min-w-0 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
        <OrderSummary items={items} details={details} lineIdOf={idOf} />
      </div>
    </div>
  )
}

// One cart line on screen (CartLine in cart.ts is the stored line).
function CartRow({
  item,
  lineId,
  onQuantity,
  onText,
  onRemove,
}: {
  item: CartItem
  lineId: number
  onQuantity: (quantity: number) => void
  onText: (text: string, keepFocus: boolean) => void
  onRemove: () => void
}) {
  const { product } = item
  const label = lineLabel(item)
  return (
    <li className="rounded-2xl border border-paper-line bg-white p-3 sm:p-4">
      <div className="flex gap-3 sm:gap-4">
        {/* The name link below is the one announced; the photo only widens
            the tap area. */}
        <Link
          to="/magazin/$slug"
          params={{ slug: product.slug }}
          tabIndex={-1}
          aria-hidden="true"
          className="w-18 shrink-0 self-start overflow-hidden rounded-xl bg-zinc-100 sm:w-20"
        >
          <ResponsiveImage
            name={product.image}
            alt=""
            sizes="80px"
            className="aspect-[3/4] h-auto w-full object-cover"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h3 className="min-w-0 flex-1 pt-1 font-semibold leading-snug text-zinc-900">
              <Link
                to="/magazin/$slug"
                params={{ slug: product.slug }}
                className="hover:text-amber-800"
              >
                {product.name}
              </Link>
            </h3>
            <button
              id={removeButtonId(lineId)}
              type="button"
              aria-label={`Eliminați ${label} din coș`}
              onClick={onRemove}
              className="-mr-1.5 -mt-1.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-700"
            >
              <Icon name="trash" className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-0.5 text-sm text-zinc-600">{productMeta(product)}</p>
          <p className="text-sm text-zinc-600">{formatPrice(product)}/buc.</p>
        </div>
      </div>
      {/* Field and quantity share a row where the column is wide enough
          (not next to the lg summary); the stepper lines up with the input,
          below the field label. */}
      <div className="sm:flex sm:items-start sm:gap-6 sm:pl-24 lg:block xl:flex">
        {product.personalization && (
          <LineText item={item} id={textFieldId(lineId)} onCommit={onText} />
        )}
        <div
          className={`mt-3 flex items-center justify-between gap-3 sm:ml-auto sm:shrink-0 sm:gap-6 lg:ml-0 xl:ml-auto ${
            product.personalization ? 'sm:pt-6.5 lg:pt-0 xl:pt-6.5' : ''
          }`}
        >
          <QuantityStepper
            value={item.quantity}
            onChange={onQuantity}
            label={`Cantitate: ${label}`}
            context={label}
          />
          <p className="min-w-16 text-right text-lg font-bold tabular-nums text-zinc-900">
            <span className="sr-only">Subtotal: </span>
            {formatLei(item.quantity * product.price)}
          </p>
        </div>
      </div>
    </li>
  )
}

// The personalisation stays editable in the cart. It is committed on blur and
// on Enter. An emptied required name is never saved: the field goes back to
// the stored name, so the field, the cart and the message always agree.
function LineText({
  item,
  id,
  onCommit,
}: {
  item: CartItem
  id: string
  onCommit: (text: string, keepFocus: boolean) => void
}) {
  const field = item.product.personalization!
  const [draft, setDraft] = React.useState(item.text)
  // Follows the cart when the text changes elsewhere (another tab, a merge).
  const [shown, setShown] = React.useState(item.text)
  if (item.text !== shown) {
    setShown(item.text)
    setDraft(item.text)
  }

  // Only a line stored without its name (the ones a send is blocked for);
  // a name being retyped still has its stored one.
  const error = field.required && !normalizeText(draft) && !item.text
  const errorId = `${id}-eroare`
  const hintId = `${id}-nota`
  const hint = field.required ? null : `Lăsați gol pentru „${field.example}”, ca în poză.`

  const commit = (keepFocus: boolean) => {
    const clean = normalizeText(draft)
    if (field.required && !clean) {
      setDraft(item.text)
      return
    }
    setDraft(clean)
    onCommit(clean, keepFocus)
  }

  return (
    <div className="mt-3 min-w-0 flex-1">
      <label htmlFor={id} className={labelClass}>
        {field.label}
        {!field.required && <Optional />}
      </label>
      <input
        id={id}
        type="text"
        value={draft}
        maxLength={field.maxLength}
        placeholder={`ex.: ${field.example}`}
        autoComplete="off"
        autoCapitalize="words"
        spellCheck={false}
        enterKeyHint="done"
        aria-invalid={error || undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => {
          const row = event.currentTarget.closest('li')
          const next = event.relatedTarget
          commit(next instanceof Node && !!row?.contains(next))
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            commit(true)
          }
        }}
        className={`${inputClass} sm:max-w-xs`}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm font-medium text-red-700">
          Scrieți {field.label.toLowerCase()}.
        </p>
      ) : (
        hint && (
          <p id={hintId} className="mt-1.5 text-sm text-zinc-600">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

// Two steps without a dialog: "Goliți coșul" turns into a question with
// "Da, goliți" and "Anulați". Escape cancels.
function ClearCart({ onClear }: { onClear: () => void }) {
  const [asking, setAsking] = React.useState(false)
  const askButton = React.useRef<HTMLButtonElement>(null)
  const cancelButton = React.useRef<HTMLButtonElement>(null)
  const returnFocus = React.useRef(false)
  const questionId = React.useId()

  React.useEffect(() => {
    if (asking) {
      cancelButton.current?.focus()
    } else if (returnFocus.current) {
      returnFocus.current = false
      askButton.current?.focus()
    }
  }, [asking])

  const cancel = () => {
    returnFocus.current = true
    setAsking(false)
  }

  if (!asking) {
    return (
      <button
        ref={askButton}
        type="button"
        onClick={() => setAsking(true)}
        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-red-700"
      >
        <Icon name="trash" className="w-4 h-4" />
        Goliți coșul
      </button>
    )
  }

  return (
    <div
      role="group"
      aria-labelledby={questionId}
      onKeyDown={(event) => {
        if (event.key === 'Escape') cancel()
      }}
      className="flex flex-wrap items-center gap-x-1"
    >
      <span id={questionId} className="mr-1 text-sm font-medium text-zinc-900">
        Goliți tot coșul?
      </span>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
      >
        Da, goliți
      </button>
      <button
        ref={cancelButton}
        type="button"
        onClick={cancel}
        className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
      >
        Anulați
      </button>
    </div>
  )
}

function OrderDetailsForm({
  details,
  onChange,
}: {
  details: OrderDetails
  onChange: (change: Partial<OrderDetails>) => void
}) {
  return (
    <div className="rounded-2xl border border-paper-line bg-white p-4 sm:p-6">
      <h2 className={blockTitle}>Detaliile comenzii</h2>
      <fieldset className="mt-4">
        <legend className={labelClass}>Livrare</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {deliveryOptions.map((option) => (
            <label
              key={option.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-zinc-300 px-3 py-2.5 text-[15px] text-zinc-800 transition-colors hover:border-zinc-400 has-checked:border-amber-500 has-checked:bg-amber-50 has-checked:text-zinc-900"
            >
              <input
                type="radio"
                name="cos-livrare"
                value={option.value}
                checked={details.delivery === option.value}
                onChange={() => onChange({ delivery: option.value })}
                className="h-5 w-5 shrink-0 accent-amber-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Only the courier needs the town, for the delivery cost. */}
        {details.delivery === 'curier' && (
          <div>
            <label htmlFor="cos-localitate" className={labelClass}>
              Localitatea
              <Optional />
            </label>
            <input
              id="cos-localitate"
              type="text"
              value={details.city}
              autoComplete="address-level2"
              maxLength={60}
              onChange={(event) => onChange({ city: event.target.value })}
              className={inputClass}
            />
          </div>
        )}
        <div>
          <label htmlFor="cos-nume" className={labelClass}>
            Numele dumneavoastră
            <Optional />
          </label>
          <input
            id="cos-nume"
            type="text"
            value={details.name}
            autoComplete="name"
            maxLength={60}
            onChange={(event) => onChange({ name: event.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="cos-observatii" className={labelClass}>
          Observații
          <Optional />
        </label>
        <textarea
          id="cos-observatii"
          rows={3}
          value={details.note}
          maxLength={500}
          placeholder="De exemplu: altă culoare decât în poză sau data până la care aveți nevoie de comandă"
          onChange={(event) => onChange({ note: event.target.value })}
          className={`${inputClass} resize-y`}
        />
      </div>
    </div>
  )
}

function OrderSummary({
  items,
  details,
  lineIdOf,
}: {
  items: CartItem[]
  details: OrderDetails
  lineIdOf: (key: string) => number
}) {
  // Shown after a send was stopped, until every required name is filled in
  const [attempted, setAttempted] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  // The clipboard refused: the message is shown to copy by hand.
  const [manualCopy, setManualCopy] = React.useState(false)
  const manualField = React.useRef<HTMLTextAreaElement>(null)

  const message = orderMessage(items, details)
  const href = whatsappHref(message)
  const missing = items.filter(missingText)

  React.useEffect(() => {
    if (!manualCopy) return
    manualField.current?.focus()
    manualField.current?.select()
  }, [manualCopy])

  const focusLine = (item: CartItem) =>
    document.getElementById(textFieldId(lineIdOf(item.key)))?.focus()

  // A required name still empty stops the order: the message would read
  // "ca în poză" for it.
  const ready = (event: React.MouseEvent) => {
    if (!missing.length) return true
    event.preventDefault()
    setAttempted(true)
    focusLine(missing[0])
    return false
  }

  const copy = async (event: React.MouseEvent) => {
    if (!ready(event)) return
    if (!(await copyText(message))) {
      setManualCopy(true)
      return
    }
    setCopied(true)
    trackEvent('copy_order')
    setTimeout(() => setCopied(false), 2000)
  }

  const secondaryAction = `inline-flex min-h-11 items-center gap-1.5 text-sm ${textLink}`

  return (
    <div className="rounded-2xl border border-paper-line bg-white p-4 sm:p-6">
      <h2 className={blockTitle}>Sumarul comenzii</h2>
      <dl className="mt-4 text-[15px]">
        <div className="flex justify-between gap-4 text-zinc-600">
          <dt>Bucăți</dt>
          <dd className="tabular-nums">{cartCount(items)}</dd>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-paper-line pt-3">
          <dt className="font-semibold text-zinc-900">Total produse</dt>
          <dd className="text-2xl font-extrabold tabular-nums text-zinc-900">
            {formatLei(cartTotal(items))}
          </dd>
        </div>
      </dl>
      {/* Pickup costs nothing extra, so the note is for the courier only. */}
      {details.delivery === 'curier' && (
        <p className="mt-2 text-sm text-zinc-600">
          Totalul nu include livrarea prin curier; costul ei vi-l confirmăm
          odată cu comanda.
        </p>
      )}

      <div data-placement="cart" className="mt-5">
        {attempted && missing.length > 0 && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
          >
            <p className="font-semibold">Scrieți numele înainte de a trimite comanda:</p>
            <ul className="mt-1">
              {missing.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => focusLine(item)}
                    className="inline-flex min-h-11 items-center text-left font-medium underline decoration-red-300 underline-offset-4 hover:decoration-red-600"
                  >
                    {item.product.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* The link itself is the bare chat and the order is opened on
            click: GA4's enhanced measurement reports the href of every
            outbound click to Google, and the full link carries the whole
            order, names included. The cancelled click is skipped by the
            site's own tracker, so it is counted here. */}
        <a
          href={WHATSAPP_CHAT_HREF}
          target="_blank"
          rel="noopener"
          onClick={(event) => {
            if (!ready(event)) return
            event.preventDefault()
            window.open(href, '_blank', 'noopener')
            trackEvent('click_whatsapp', { placement: 'cart', page_path: window.location.pathname })
            trackCartEvent('begin_checkout', items)
          }}
          className={buttonClass('primary', 'lg', 'w-full')}
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          {/* Two lines on phones: balanced, not "pe" left at the end */}
          <span className="text-balance">Trimiteți comanda pe WhatsApp</span>
        </a>
        {/* The button only prepares the message; nothing is sent from here. */}
        <p className="mt-2 text-sm text-zinc-600">
          Butonul deschide WhatsApp cu mesajul comenzii gata scris. Comanda ne
          ajunge numai după ce trimiteți mesajul din WhatsApp; pe site nu se
          trimite și nu se plătește nimic.
        </p>
        {href.length > LONG_WHATSAPP_URL && (
          <p className="mt-2 text-sm text-zinc-600">
            Comanda are multe rânduri. Dacă mesajul nu apare întreg în
            WhatsApp, folosiți „Copiați comanda” și lipiți-o în chat.
          </p>
        )}
        <div className="mt-2 flex flex-wrap justify-center gap-x-6">
          <a
            href={emailHref(EMAIL_SUBJECT, message)}
            onClick={(event) => {
              if (ready(event)) trackCartEvent('begin_checkout', items)
            }}
            className={secondaryAction}
          >
            <Icon name="mail" className="w-4 h-4 shrink-0" />
            Trimiteți pe email
          </a>
          <button type="button" onClick={copy} className={secondaryAction}>
            <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4 shrink-0" />
            <span aria-live="polite">{copied ? 'Comanda a fost copiată' : 'Copiați comanda'}</span>
          </button>
        </div>
        {manualCopy && (
          <div className="mt-3">
            <label htmlFor="cos-mesaj" className={labelClass}>
              Selectați textul comenzii și copiați-l
            </label>
            <textarea
              ref={manualField}
              id="cos-mesaj"
              readOnly
              rows={8}
              value={message}
              className={inputClass}
            />
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-paper-line pt-4 text-sm leading-relaxed text-zinc-600">
        <h3 className="font-semibold text-zinc-900">Ce urmează</h3>
        {/* Steps only: the owner has set no rule for when an order is
            binding. No "pe WhatsApp" either, since the order may come by
            email. */}
        <p className="mt-1">
          Vă răspundem cu totalul (inclusiv costul livrării, dacă ați ales
          curierul), cu modalitatea de plată și cu data, iar comanda o stabilim
          împreună după ce sunteți de acord cu ele. {RESPONSE_TIME}
        </p>
        <p className="mt-2">
          Email:{' '}
          <span className="font-medium text-zinc-900 [overflow-wrap:anywhere]">{EMAIL}</span>
        </p>
      </div>
    </div>
  )
}

// First two products of the leading category, then the first of each other
// one: four cards fill the two-column phone grid and the desktop row.
const suggestions: ShopProduct[] = [
  ...shopProductsIn(shopCategories[0].id).slice(0, 2),
  ...shopCategories.slice(1).map((category) => shopProductsIn(category.id)[0]),
]

function EmptyCart({ focusHeading }: { focusHeading: boolean }) {
  const heading = React.useRef<HTMLHeadingElement>(null)

  React.useEffect(() => {
    if (focusHeading && heading.current) focusTarget(heading.current)
  }, [focusHeading])

  return (
    <>
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          <Icon name="bag" className="w-7 h-7" />
        </span>
        <h2 ref={heading} className="mt-4 text-2xl font-bold text-zinc-900 sm:text-3xl">
          Coșul este gol
        </h2>
        <p className="mt-3 leading-relaxed text-zinc-600 sm:text-lg">
          Alegeți din magazin globuri de Crăciun, brelocuri și decoruri tăiate
          laser în atelierul nostru din Craiova, la prețuri fixe de la{' '}
          {formatLei(SHOP_MIN_PRICE)}/buc.
        </p>
        <Link to="/magazin" className={buttonClass('primary', 'lg', 'mt-6')}>
          Vedeți magazinul
          <Icon name="arrowRight" className="w-5 h-5" />
        </Link>
      </div>

      <div className="mt-12 sm:mt-16">
        <h2 className={blockTitle}>Din magazin</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {suggestions.map((product) => (
            <li key={product.slug}>
              <SuggestionCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function SuggestionCard({ product }: { product: ShopProduct }) {
  // Named by the title and the price; the photo alt stays readable in
  // browse mode instead of being read with the link (as in ProductTile).
  const titleId = React.useId()
  const priceId = React.useId()
  return (
    <Link
      to="/magazin/$slug"
      params={{ slug: product.slug }}
      aria-labelledby={`${titleId} ${priceId}`}
      className="group block h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 active:border-amber-400"
    >
      <div className="aspect-[4/5] overflow-hidden bg-zinc-100 sm:aspect-square">
        <ResponsiveImage
          name={product.image}
          alt={product.alt}
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 sm:p-4">
        <h3
          id={titleId}
          className="font-semibold leading-snug text-zinc-900 group-hover:text-amber-800"
        >
          {product.name}
        </h3>
        <p id={priceId} className="mt-1 text-sm font-semibold text-amber-800">
          {formatPrice(product)}/buc.
        </p>
      </div>
    </Link>
  )
}
