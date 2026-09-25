import { Link } from '@tanstack/react-router'
import type * as React from 'react'
import { ContactActions } from '~/components/Contact'
import { Icon } from '~/components/Icon'
import { Highlight } from '~/components/PageHero'
import { ResponsiveImage, type ImageName } from '~/components/ResponsiveImage'
import { Container, textLinkDark } from '~/components/ui'
import { ACRYLIC_PRICE_PER_CM2, PLAQUE_MIN_PRICE, formatLei } from '~/data/business'

const trust: React.ReactNode[] = [
  <>
    <strong>10+ ani</strong> de experiență
  </>,
  <>
    <strong>2000+</strong> proiecte realizate
  </>,
  <>
    <strong>99%</strong> clienți mulțumiți
  </>,
  <>
    execuție urgentă de la <strong className="whitespace-nowrap">24 de ore</strong>
  </>,
]

// Desktop-only collage. The photos differ from the product tiles right below,
// so the first two screens show more real pieces instead of the same ones twice.
const collage: Array<{ name: ImageName; alt: string; aspect: string }> = [
  {
    name: '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
    alt: 'Plăcuță de adresă orizontală din plexiglas negru lucios cu cifre aurii și distanțiere aurii',
    aspect: 'aspect-square',
  },
  {
    name: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
    alt: 'Decor din plexiglas magenta și galben cu siluetele unei mame și a unui copil cu balon, pe suport',
    aspect: 'aspect-[3/4]',
  },
  {
    name: '/img/products/glob-craciun-personalizat-craiova',
    alt: 'Glob de Crăciun din plexiglas verde personalizat cu textul „Craiova 26”, cu sanie, reni și fulgi de nea decupați laser',
    aspect: 'aspect-[3/4]',
  },
  {
    name: '/img/products/litere-volumetrice-decor-eveniment-2',
    alt: 'Litere volumetrice din plexiglas alb „Nuntă de probă” pe panou crem, cu aranjament floral',
    aspect: 'aspect-[3/2]',
  },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <Container className="relative py-8 sm:py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-16">
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl xl:text-6xl">
              Tăiere și gravură <Highlight>laser</Highlight> în Craiova
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Plăcuțe de adresă{' '}
              <strong className="font-semibold text-white">
                de la {formatLei(PLAQUE_MIN_PRICE)}
              </strong>
              , tăiere plexiglas la{' '}
              <strong className="font-semibold text-white">
                {formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²
              </strong>
              , litere volumetrice, globuri și cadouri personalizate, gravură pe
              lemn, sticlă și piele.
            </p>

            <div data-placement="hero" className="mt-6">
              <ContactActions />
            </div>

            <Link
              to="/servicii"
              hash="preturi"
              className={`mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm sm:text-base ${textLinkDark}`}
            >
              Vedeți prețurile
              <Icon name="arrowRight" className="w-4 h-4" />
            </Link>

            {/* 13px on phones keeps each fact on one line down to 360px. The
                urgent-order fact is the longest: below 390px it gets a row of
                its own instead of wrapping inside its column. */}
            <ul className="mt-4 grid grid-cols-[auto_auto] justify-start gap-x-4 gap-y-1.5 border-t border-white/10 pt-4 text-[13px] text-zinc-400 sm:flex sm:flex-wrap sm:gap-x-6 sm:text-sm [&_strong]:font-semibold [&_strong]:text-amber-300">
              {trust.map((item, index) => (
                <li
                  key={index}
                  className={
                    index === trust.length - 1 ? 'col-span-2 min-[390px]:col-span-1' : undefined
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <HeroCollage />
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
      />
    </section>
  )
}

// Two staggered columns whose heights match: 1 + 4/3 = 1/3 + 4/3 + 2/3 (in
// column widths), so the offset column ends level with the first one.
function HeroCollage() {
  const [a, b, c, d] = collage
  return (
    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="space-y-4">
        <CollagePhoto photo={a} priority />
        <CollagePhoto photo={b} />
      </div>
      <div className="space-y-4 pt-[33.333%]">
        <CollagePhoto photo={c} />
        <CollagePhoto photo={d} />
      </div>
    </div>
  )
}

function CollagePhoto({
  photo,
  priority = false,
}: {
  photo: (typeof collage)[number]
  priority?: boolean
}) {
  return (
    <div
      className={`${photo.aspect} overflow-hidden rounded-2xl bg-slate-800 ring-1 ring-white/10`}
    >
      {/* Hidden below lg: the 1px slot keeps the eager first photo at its
          smallest file on phones. */}
      <ResponsiveImage
        name={photo.name}
        alt={photo.alt}
        sizes="(min-width: 1280px) 200px, (min-width: 1024px) 168px, 1px"
        priority={priority}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
