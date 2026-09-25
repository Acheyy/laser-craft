import { Link } from '@tanstack/react-router'
import type * as React from 'react'
import { ContactActions } from '~/components/Contact'
import { ResponsiveImage, type ImageName, imageMeta } from '~/components/ResponsiveImage'
import { Chip, Container } from '~/components/ui'

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

// Hero for every inner page: breadcrumb, H1, a 1–2 sentence intro, price/status
// chips, WhatsApp + call buttons and (optionally) up to 3 real photos.
export function PageHero({
  crumbs,
  title,
  intro,
  chips,
  actions = true,
  whatsappMessage,
  media,
  children,
}: {
  crumbs: Crumb[]
  title: React.ReactNode
  intro?: React.ReactNode
  chips?: React.ReactNode[]
  actions?: boolean | React.ReactNode
  whatsappMessage?: string
  media?: HeroImage[]
  children?: React.ReactNode
}) {
  const trail: Crumb[] = [{ label: 'Acasă', to: '/' }, ...crumbs]
  const hasMedia = !!media && media.length > 0

  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
      />
      <Container className="relative py-8 sm:py-12 lg:py-16">
        <div
          className={
            hasMedia
              ? 'grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12'
              : 'max-w-3xl'
          }
        >
          <div className="min-w-0">
            <nav aria-label="Breadcrumb">
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
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
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
              <div data-placement="hero">
                <ContactActions message={whatsappMessage} className="mt-6" />
              </div>
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
    </section>
  )
}

// Nothing is cropped at any size. Mobile: a swipeable row of photos at their
// natural aspect ratio. Desktop: 1 photo alone, 2 side by side, or 3 as one
// tall photo plus two stacked; column widths come from the aspect ratios so
// the columns end up the same height.
function HeroMedia({ images }: { images: HeroImage[] }) {
  const ratio = (image: HeroImage) => {
    const meta = imageMeta(image.name)
    return meta.width / meta.height
  }
  const [first, ...rest] = images
  const restGrow =
    rest.length === 2 ? 1 / (1 / ratio(rest[0]) + 1 / ratio(rest[1])) : rest[0] && ratio(rest[0])

  const tile = (image: HeroImage, index: number, fill = false) => (
    <div
      key={image.name}
      className={`h-56 shrink-0 snap-start overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-white/10 sm:h-72 lg:h-auto lg:w-full ${
        fill ? 'lg:h-full' : ''
      }`}
    >
      <ResponsiveImage
        name={image.name}
        alt={image.alt}
        priority={index === 0}
        sizes="(min-width: 1024px) 420px, 300px"
        style={image.position ? { objectPosition: image.position } : undefined}
        className={`h-full w-auto object-cover lg:w-full ${
          fill ? '' : 'lg:h-auto'
        } ${images.length === 1 ? 'lg:max-h-[30rem]' : ''}`}
      />
    </div>
  )

  return (
    <div
      className={`-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-4 lg:overflow-visible lg:px-0 ${
        images.length === 1 ? 'lg:justify-center' : ''
      }`}
    >
      {images.length === 1 ? (
        <div className="contents lg:block">{tile(first, 0)}</div>
      ) : (
        <>
          <div className="contents lg:block" style={{ flex: `${ratio(first)} 1 0%` }}>
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
