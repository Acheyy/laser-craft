import { Link } from '@tanstack/react-router'
import type * as React from 'react'
import { useId } from 'react'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { ResponsiveImage, type ImageName, imageMeta } from '~/components/ResponsiveImage'
import { buttonClass } from '~/components/ui'
import { SHOW_CHRISTMAS_PROMO, whatsappHref } from '~/data/business'
import { type Product, products as allProducts } from '~/data/products'

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

// Gallery card for a concrete model, with a pre-filled WhatsApp request.
// The frame keeps the photo's own aspect ratio, so text on the piece is never
// cropped (unless the item asks for a square frame, see ModelItem).
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
  // The material goes into the message only when it is plain text, starting
  // lower-case mid-sentence: "Modelul: … (plexiglas roșu)."
  const material =
    typeof item.meta === 'string'
      ? ` (${item.meta.charAt(0).toLowerCase()}${item.meta.slice(1)})`
      : ''
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-paper-line bg-white">
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
        {whatsappMessage && (
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
        )}
      </div>
    </article>
  )
}
