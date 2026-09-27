import { Link } from '@tanstack/react-router'
import * as React from 'react'
import { ContactActions } from '~/components/Contact'
import { ResponsiveImage, type ImageName, imageMeta } from '~/components/ResponsiveImage'
import { Chip, Container } from '~/components/ui'
import { RESPONSE_TIME } from '~/data/business'

type Crumb = {
  label: string
  to?: '/' | '/servicii' | '/portofoliu'
}

export type HeroImage = {
  name: ImageName
  alt: string
  // CSS object-position for the desktop crop, e.g. '50% 30%'
  position?: string
}

const DEFAULT_NOTE = `Trimiteți-ne pe WhatsApp o poză sau textul dorit. ${RESPONSE_TIME}`

// Hero for every inner page: breadcrumb, H1, a 1–2 sentence intro, price/status
// chips, WhatsApp + call buttons and (optionally) up to 3 real photos.
export function PageHero({
  crumbs,
  title,
  intro,
  chips,
  actions = true,
  note = DEFAULT_NOTE,
  whatsappMessage,
  media,
  children,
}: {
  crumbs: Crumb[]
  title: React.ReactNode
  intro?: React.ReactNode
  chips?: React.ReactNode[]
  actions?: boolean | React.ReactNode
  // Line under the default buttons: what to send, and the response time
  note?: string
  whatsappMessage?: string
  media?: HeroImage[]
  children?: React.ReactNode
}) {
  const trail: Crumb[] = [{ label: 'Acasă', to: '/' }, ...crumbs]
  const hasMedia = !!media && media.length > 0

  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cutbed" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
      />
      <Container className="relative py-8 sm:py-12 lg:py-16">
        <div
          className={
            hasMedia
              ? 'grid gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-8 xl:gap-12'
              : 'max-w-3xl'
          }
        >
          <div className="min-w-0">
            <nav aria-label="Cale de navigare">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
                {trail.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden="true">›</span>}
                    {crumb.to ? (
                      <Link
                        to={crumb.to}
                        className="-my-3 inline-block py-3 hover:text-amber-300"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-zinc-200">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            {/* Leading 1.08 from lg keeps the ș/ț commas clear of the next line. */}
            <h1 className="mt-3 text-3xl font-extrabold text-white text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] xl:text-5xl">
              {title}
            </h1>
            {intro && (
              <div className="mt-4 space-y-3 text-base leading-relaxed text-zinc-300 sm:text-lg">
                {intro}
              </div>
            )}
            {chips && chips.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {chips.map((chip, index) => (
                  <Chip key={index} dark>
                    {chip}
                  </Chip>
                ))}
              </div>
            )}
            {actions === true ? (
              <>
                <div data-placement="hero">
                  <ContactActions message={whatsappMessage} className="mt-6" />
                </div>
                <p className="mt-3 text-sm text-zinc-400">{note}</p>
              </>
            ) : (
              actions || null
            )}
            {children && (
              <div className="mt-6 space-y-4 text-zinc-300">{children}</div>
            )}
          </div>
          {hasMedia && <HeroMedia images={media} />}
        </div>
      </Container>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
      />
    </section>
  )
}

// Rendered tile heights below lg, in px (h-48 / h-72): they set each photo's
// width, and therefore its `sizes`.
const PHONE_ROW_HEIGHT = 192
const SM_ROW_HEIGHT = 288
// Desktop media column minus the 16px gap between the photo columns. From
// 1280px: (1280 - 2×32 padding - 48 gap) × 5/11 - 16. At 1024–1279px the same
// sum with a 32px gap: (100vw - 96px) × 5/11 - 16px ≈ 45.45vw - 60px.
const XL_PHOTOS_WIDTH = 515
const LG_PHOTOS_WIDTH = '45.45vw - 60px'

// Nothing is cropped at any size. Desktop: 1 photo alone, 2 side by side, or 3
// as one tall photo plus two stacked; column widths come from the aspect
// ratios so the columns end up the same height. Phones: 2 photos share a
// two-column grid; 1 or 3 sit in a swipeable row, low enough (h-48) for a
// third portrait photo to peek in at 360px.
function HeroMedia({ images }: { images: HeroImage[] }) {
  const ratios = images.map((image) => {
    const meta = imageMeta(image.name)
    return meta.width / meta.height
  })
  const [first, ...rest] = images
  const pair = images.length === 2
  const restGrow =
    rest.length === 2 ? 1 / (1 / ratios[1] + 1 / ratios[2]) : (ratios[1] ?? 0)
  const firstShare = ratios[0] / (ratios[0] + restGrow)

  // fetchpriority=high goes to whichever of the first two photos covers more
  // of a phone screen: the taller one in the grid, the wider one in the row.
  const highIndex =
    images.length === 1 ? 0 : (pair ? ratios[1] < ratios[0] : ratios[1] > ratios[0]) ? 1 : 0

  const sizes = (index: number) => {
    // A lone photo is sized by its `sizes` value (w-full in a shrink-to-fit
    // box), so this must stay in step with the design.
    if (images.length === 1) return '(min-width: 1024px) 420px, 300px'
    const share = index === 0 ? firstShare : 1 - firstShare
    const phone = pair
      ? 'calc(50vw - 22px)'
      : `${Math.round(PHONE_ROW_HEIGHT * ratios[index])}px`
    return [
      `(min-width: 1280px) ${Math.round(XL_PHOTOS_WIDTH * share)}px`,
      `(min-width: 1024px) calc((${LG_PHOTOS_WIDTH}) * ${share.toFixed(3)})`,
      `(min-width: 640px) ${Math.round(SM_ROW_HEIGHT * ratios[index])}px`,
      phone,
    ].join(', ')
  }

  const tile = (image: HeroImage, index: number, fill = false) => (
    <div
      key={image.name}
      className={`overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-white/10 ${
        pair
          ? 'sm:h-72 sm:shrink-0 sm:snap-start'
          : `${images.length === 1 ? 'h-56' : 'h-48'} shrink-0 snap-start sm:h-72`
      } lg:w-full ${fill ? 'lg:h-full' : 'lg:h-auto'}`}
    >
      <ResponsiveImage
        name={image.name}
        alt={image.alt}
        sizes={sizes(index)}
        loading={index < 2 ? 'eager' : 'lazy'}
        fetchPriority={index === highIndex ? 'high' : 'auto'}
        style={image.position ? { objectPosition: image.position } : undefined}
        className={`object-cover ${
          pair ? 'h-auto w-full sm:h-full sm:w-auto' : 'h-full w-auto'
        } lg:w-full ${fill ? 'lg:h-full' : 'lg:h-auto'} ${
          images.length === 1 ? 'lg:max-h-[30rem]' : ''
        }`}
      />
    </div>
  )

  return (
    <PhotoRow
      className={`[scrollbar-width:none] lg:mx-0 lg:scroll-px-0 lg:gap-4 lg:overflow-visible lg:px-0 ${
        pair
          ? 'grid grid-cols-2 items-start gap-3 sm:-mx-6 sm:flex sm:snap-x sm:snap-mandatory sm:scroll-px-6 sm:overflow-x-auto sm:px-6'
          : '-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6'
      } ${images.length === 1 ? 'lg:justify-center' : ''}`}
    >
      {images.length === 1 ? (
        <div className="contents lg:block">{tile(first, 0)}</div>
      ) : (
        <>
          <div className="contents lg:block" style={{ flex: `${ratios[0]} 1 0%` }}>
            {tile(first, 0, true)}
          </div>
          <div
            className="contents lg:flex lg:flex-col lg:gap-4"
            style={{ flex: `${restGrow} 1 0%` }}
          >
            {rest.map((image, index) => tile(image, index + 1))}
          </div>
        </>
      )}
    </PhotoRow>
  )
}

// While the row actually scrolls sideways it becomes a named, focusable
// region, so keyboard users can scroll it with the arrow keys. When the
// photos fit (desktop, tablets, the phone grid) it adds no tab stop. The row
// runs edge to edge inside the hero's overflow-hidden, so its focus ring is
// drawn inside, in the px-4 gap before the photos (`!`: the global
// :focus-visible rule is unlayered).
function PhotoRow({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [scrolls, setScrolls] = React.useState(false)

  React.useEffect(() => {
    const row = ref.current
    if (!row) return
    const observer = new ResizeObserver(() => setScrolls(row.scrollWidth > row.clientWidth + 1))
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} focus-visible:outline-offset-[-2px]! focus-visible:shadow-none!`}
      {...(scrolls ? { role: 'region', 'aria-label': 'Fotografii', tabIndex: 0 } : {})}
    >
      {children}
    </div>
  )
}

export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
      {children}
    </span>
  )
}
