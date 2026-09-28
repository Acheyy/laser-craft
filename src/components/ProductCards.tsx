import { Link } from '@tanstack/react-router'
import type * as React from 'react'
import { useId } from 'react'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { ResponsiveImage, type ImageName, imageMeta } from '~/components/ResponsiveImage'
import { buttonClass } from '~/components/ui'
import { SHOW_CHRISTMAS_PROMO, formatLei, whatsappHref } from '~/data/business'
import { type Product, products as allProducts } from '~/data/products'
import { type ShopProduct, linkedShopProduct } from '~/data/shop'

// Grid of product tiles linking to the landing pages (home, /servicii, 404).
// Photos are cropped to 4:5 (square from sm), so each product image is chosen
// to survive that crop.
export function ProductTiles({
  products = allProducts,
  headingLevel = 'h3',
  priorityFirst = false,
  columns = 3,
}: {
  products?: Product[]
  headingLevel?: 'h2' | 'h3'
  priorityFirst?: boolean
  columns?: 3 | 4
}) {
  return (
    <ul
      className={`grid grid-cols-2 gap-3 sm:gap-5 ${
        columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
      }`}
    >
      {products.map((product, index) => (
        <li key={product.to}>
          <ProductTile
            product={product}
            headingLevel={headingLevel}
            priority={priorityFirst && index === 0}
          />
        </li>
      ))}
    </ul>
  )
}

function ProductTile({
  product,
  headingLevel,
  priority,
}: {
  product: Product
  headingLevel: 'h2' | 'h3'
  priority: boolean
}) {
  const Heading = headingLevel
  // The link is named by its title only; the photo alt stays readable in
  // browse mode instead of being read out with every link.
  const titleId = useId()
  return (
    <Link
      to={product.to}
      aria-labelledby={titleId}
      className="group block h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 active:border-amber-400"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100 sm:aspect-square">
        <ResponsiveImage
          name={product.image}
          alt={product.alt}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 50vw"
          priority={priority}
          style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {SHOW_CHRISTMAS_PROMO && product.seasonal && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-bold text-slate-950 shadow">
            Comenzi de Crăciun
          </span>
        )}
      </div>
      <div className="p-3 sm:p-5">
        <Heading
          id={titleId}
          className="font-semibold leading-snug text-zinc-900 group-hover:text-amber-800 sm:text-lg"
        >
          {product.label}
        </Heading>
        <p className="mt-1 text-sm font-semibold text-amber-800">{product.hint}</p>
        <p className="mt-1 hidden text-sm text-zinc-600 sm:block">{product.description}</p>
      </div>
    </Link>
  )
}

export type ModelItem = {
  image: ImageName
  alt: string
  title: string
  description?: React.ReactNode
  meta?: React.ReactNode
  // Square frame instead of the photo's own ratio, for a portrait photo in a
  // row of square ones (the row would otherwise stretch the square cards).
  // Only for photos whose centre square still shows the whole piece.
  frame?: 'square'
  // The shop product this model is (slug in shop.ts): the card then shows
  // its price and leads to its product page instead of WhatsApp.
  shopSlug?: string
}

// Last tile of a model gallery: invites a custom request. It fills the empty
// slot of an odd 2-column grid (pass className="lg:hidden" when the desktop
// grid is already full). layout="wide" is for a tile spanning two desktop
// columns: text left, WhatsApp button right, no stretching to the row height.
export function IdeaCard({
  title = 'Aveți altă idee?',
  text,
  whatsappMessage,
  layout = 'stack',
  className = '',
}: {
  title?: string
  text: React.ReactNode
  whatsappMessage: string
  layout?: 'stack' | 'wide'
  className?: string
}) {
  const wide = layout === 'wide'
  return (
    <a
      href={whatsappHref(`${whatsappMessage} Vă trimit o poză sau o schiță cu ideea mea.`)}
      target="_blank"
      rel="noopener"
      data-placement="gallery-idea"
      className={`flex flex-col justify-center rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-zinc-900 transition-colors hover:border-amber-400 hover:bg-amber-100 sm:p-6 ${
        wide
          ? 'lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:self-center lg:text-left'
          : ''
      } ${className}`}
    >
      <span className="flex flex-col">
        <span className="font-semibold leading-snug sm:text-lg">{title}</span>
        <span className="mt-1.5 text-sm leading-relaxed text-zinc-700">{text}</span>
      </span>
      <span
        className={`mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-800 ${
          wide ? 'lg:hidden' : ''
        }`}
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        Scrieți-ne pe WhatsApp
      </span>
      {wide && (
        // Styled as a button, but the whole card stays the one link.
        <span className="hidden shrink-0 lg:block">
          <span className={buttonClass('primary', 'sm')}>
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            Scrieți-ne pe WhatsApp
          </span>
        </span>
      )}
    </a>
  )
}

// Gallery card for a concrete model. A model sold in the shop (its shopSlug)
// shows its fixed price and leads to its product page; the others keep
// a pre-filled WhatsApp request. The frame keeps the photo's own aspect ratio,
// so text on the piece is never cropped (unless the item asks for a square
// frame, see ModelItem).
export function ModelCard({
  item,
  whatsappMessage,
  headingLevel = 'h3',
  sizes = '(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 50vw',
}: {
  item: ModelItem
  whatsappMessage?: string
  headingLevel?: 'h2' | 'h3'
  sizes?: string
}) {
  const Heading = headingLevel
  const meta = imageMeta(item.image)
  const shopProduct = linkedShopProduct(item.shopSlug)
  // The material goes into the message only when it is plain text, starting
  // lower-case mid-sentence: "Modelul: … (plexiglas roșu)."
  const material =
    typeof item.meta === 'string'
      ? ` (${item.meta.charAt(0).toLowerCase()}${item.meta.slice(1)})`
      : ''
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-paper-line bg-white ${
        shopProduct
          ? 'relative transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10'
          : ''
      }`}
    >
      <div
        className={`overflow-hidden bg-zinc-100 ${item.frame === 'square' ? 'aspect-square' : ''}`}
        style={
          item.frame === 'square' ? undefined : { aspectRatio: `${meta.width} / ${meta.height}` }
        }
      >
        <ResponsiveImage
          name={item.image}
          alt={item.alt}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <Heading className="font-semibold leading-snug text-zinc-900 sm:text-lg">
          {item.title}
        </Heading>
        {item.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{item.description}</p>
        )}
        {item.meta && (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            {item.meta}
          </p>
        )}
        {shopProduct ? (
          <div className="mt-auto">
            {/* The short phone label leaves the price out, so it gets its
                own line there. */}
            <p className="pt-3 font-bold text-zinc-900 sm:hidden">
              {formatLei(shopProduct.price)}
              <span className="text-sm font-medium text-zinc-600">/buc.</span>
            </p>
            {/* Same box as the WhatsApp link below, so the two kinds of card
                line up in a row. It covers the whole card: a tap on the photo
                opens the product page too. */}
            <Link
              to="/magazin/$slug"
              params={{ slug: shopProduct.slug }}
              className="inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-amber-800 after:absolute after:inset-0 after:rounded-2xl hover:text-amber-900 sm:gap-2"
            >
              <Icon name="bag" className="w-4 h-4 shrink-0" />
              <span className="sm:hidden">Comandați</span>
              <span className="hidden sm:inline">
                Comandați · {formatLei(shopProduct.price)}
              </span>
              {/* Tells the repeated links apart in a screen reader's link list. */}
              <span className="sr-only">: {item.title}</span>
              <Icon name="arrowRight" className="hidden w-4 h-4 sm:block" />
            </Link>
          </div>
        ) : (
          whatsappMessage && (
            <a
              href={whatsappHref(`${whatsappMessage} Modelul: ${item.title}${material}.`)}
              target="_blank"
              rel="noopener"
              data-placement="model-card"
              className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-amber-800 hover:text-amber-900 sm:gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              {/* The full label doesn't fit a 2-column card on 360px phones. */}
              <span className="sm:hidden">Vreau modelul</span>
              <span className="hidden sm:inline">Vreau acest model</span>
              {/* Tells the repeated links apart in a screen reader's link list. */}
              <span className="sr-only">: {item.title}</span>
              <Icon name="arrowRight" className="hidden w-4 h-4 sm:block" />
            </a>
          )
        )}
      </div>
    </article>
  )
}

// "10 lei" when every piece of the group costs the same, else "de la 7 lei".
export function shopPriceLabel(products: ShopProduct[]) {
  const prices = products.map((p) => p.price)
  const min = Math.min(...prices)
  return min === Math.max(...prices) ? formatLei(min) : `de la ${formatLei(min)}`
}

// The shop's fixed prices on a landing page (globes by material, gifts by
// category), styled like the plaque price tables. A row whose pieces cost
// different amounts shows its cheapest one, "de la 7 lei".
export function ShopPriceTable({
  caption,
  rows,
  className = '',
}: {
  caption: string
  rows: Array<{ label: React.ReactNode; detail?: React.ReactNode; products: ShopProduct[] }>
  className?: string
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-paper-line bg-white ${className}`}>
      <table className="w-full text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-paper-line text-xs font-semibold uppercase tracking-wider text-zinc-600">
          <tr>
            <th scope="col" className="px-4 py-2.5 sm:px-5">
              Produs
            </th>
            <th scope="col" className="px-4 py-2.5 text-right sm:px-5">
              Preț/buc.
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-paper-line">
          {rows.map((row, index) => {
            const prices = row.products.map((p) => p.price)
            const min = Math.min(...prices)
            return (
              <tr key={index}>
                <th scope="row" className="px-4 py-3 font-semibold text-zinc-900 sm:px-5">
                  {row.label}
                  {row.detail && (
                    <span className="mt-0.5 block text-sm font-normal text-zinc-600">
                      {row.detail}
                    </span>
                  )}
                </th>
                <td className="whitespace-nowrap px-4 py-3 text-right text-lg font-bold text-zinc-900 sm:px-5">
                  {min < Math.max(...prices) && (
                    <span className="text-sm font-medium text-zinc-600">de la </span>
                  )}
                  {formatLei(min)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
