import { Link, createFileRoute } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Hero } from '~/components/Hero'
import { Icon } from '~/components/Icon'
import { ProductTiles } from '~/components/ProductCards'
import { RecentWork } from '~/components/RecentWork'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { Container, Section, SectionHeader, textLink } from '~/components/ui'
import { SHOW_CHRISTMAS_PROMO } from '~/data/business'
import { getProduct } from '~/data/products'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () =>
    seo({
      title: 'Tăiere și Gravură Laser Craiova – Plexiglas, Lemn | LaserCraft',
      description:
        'Atelier de tăiere și gravură laser în Craiova: plăcuțe de adresă din plexiglas de la 55 lei, litere volumetrice, decor de evenimente, gravură pe lemn și sticlă.',
      path: '/',
      image: '/img/og/og-home.jpg',
    }),
})

function HomePage() {
  return (
    <>
      <Hero />
      {SHOW_CHRISTMAS_PROMO && <ChristmasStrip />}

      <Section>
        <SectionHeader title="Ce realizăm în atelierul din Craiova" />
        <ProductTiles />
        <p className="mt-8 max-w-3xl leading-relaxed text-zinc-600 sm:text-lg">
          În atelierul din Craiova oferim tăiere laser pentru plexiglas, lemn
          și MDF, precum și gravură laser pe lemn, sticlă, piele și plexiglas,
          de la o singură piesă la serii mari.
        </p>
        <div className="mt-2 flex flex-col items-start gap-x-8 sm:flex-row sm:flex-wrap">
          <Link
            to="/servicii"
            hash="taiere-laser-lemn"
            className={`inline-flex min-h-11 items-center ${textLink}`}
          >
            Tăiere laser lemn, placaj și MDF
          </Link>
          <Link
            to="/servicii"
            className={`inline-flex min-h-11 items-center gap-1.5 ${textLink}`}
          >
            Toate serviciile și prețurile
            <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      <RecentWork />

      <OrderBlock />
    </>
  )
}

// Seasonal banner under the hero. Switched off with SHOW_CHRISTMAS_PROMO.
function ChristmasStrip() {
  return (
    <aside aria-label="Comenzi de Crăciun" className="border-b border-amber-200 bg-amber-50">
      <Container>
        <Link
          to="/globuri-craciun-personalizate"
          className="group flex items-center gap-3 py-3 sm:gap-4"
        >
          <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-amber-200">
            <ResponsiveImage
              name="/img/products/ornament-craciun-bastoane-rosii"
              alt="Ornament de Crăciun din plexiglas roșu cu două bastoane legate cu fundă și fulgi de nea decupați laser"
              sizes="48px"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="min-w-0 flex-1 text-sm leading-snug text-zinc-700 sm:text-base">
            <strong className="font-semibold text-zinc-900 group-hover:text-amber-800">
              {getProduct('/globuri-craciun-personalizate').label}
            </strong>{' '}
            – comandați din timp pentru sărbători
          </p>
          <Icon
            name="arrowRight"
            className="w-5 h-5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </Container>
    </aside>
  )
}
