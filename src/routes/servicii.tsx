import type * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Icon } from '~/components/Icon'
import { Highlight, PageHero } from '~/components/PageHero'
import { ProductTiles } from '~/components/ProductCards'
import {
  SERVICES_WHATSAPP_MESSAGE,
  type ProductPath,
  getProduct,
  products,
} from '~/data/products'
import {
  ResponsiveImage,
  type ImageName,
} from '~/components/ResponsiveImage'
import {
  CheckList,
  Chip,
  Eyebrow,
  RateCard,
  Section,
  SectionHeader,
  textLink,
} from '~/components/ui'
import {
  ACRYLIC_EXAMPLE,
  ACRYLIC_PRICE_PER_CM2,
  PLAQUE_MIN_PRICE,
  PRECISION,
  formatAmount,
  formatLei,
  plaquePricing,
} from '~/data/business'
import { BUSINESS_ID, SITE_URL, breadcrumbs, jsonLd, seo } from '~/utils/seo'

export const Route = createFileRoute('/servicii')({
  component: ServiciiPage,
  head: () => ({
    ...seo({
      title: 'Prețuri Tăiere și Gravură Laser Craiova – Servicii | LaserCraft',
      description:
        'Tăiere laser plexiglas de la 0,09 lei/cm², plăcuțe de adresă de la 55 lei, tăiere laser lemn și MDF, gravură laser pe lemn, sticlă și piele. Atelier în Craiova.',
      path: '/servicii',
      image: '/img/og/og-servicii.jpg',
    }),
    scripts: [
      breadcrumbs([{ name: 'Servicii', path: '/servicii' }]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'Servicii de tăiere și gravură laser – LaserCraft Craiova',
        url: `${SITE_URL}/servicii`,
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tăiere și gravură laser plexiglas',
              url: `${SITE_URL}/taiere-laser-plexiglas`,
              provider: { '@id': BUSINESS_ID },
              areaServed: 'Craiova',
            },
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: ACRYLIC_PRICE_PER_CM2,
              priceCurrency: 'RON',
              unitText: 'cm²',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Plăcuțe de adresă din plexiglas',
              url: `${SITE_URL}/placute-adresa`,
              provider: { '@id': BUSINESS_ID },
              areaServed: 'Craiova',
            },
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: Math.min(...plaquePricing.map((item) => item.price)),
              maxPrice: Math.max(...plaquePricing.map((item) => item.price)),
              priceCurrency: 'RON',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tăiere laser lemn, placaj și MDF',
              url: `${SITE_URL}/servicii#taiere-laser-lemn`,
              provider: { '@id': BUSINESS_ID },
              areaServed: 'Craiova',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Globuri de Crăciun personalizate din plexiglas',
              url: `${SITE_URL}/globuri-craciun-personalizate`,
              provider: { '@id': BUSINESS_ID },
              areaServed: 'Craiova',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cadouri personalizate din plexiglas',
              url: `${SITE_URL}/cadouri-personalizate`,
              provider: { '@id': BUSINESS_ID },
              areaServed: 'Craiova',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Gravură laser',
              url: `${SITE_URL}/gravura-laser-craiova`,
              provider: { '@id': BUSINESS_ID },
              areaServed: 'Craiova',
            },
          },
        ],
      }),
    ],
  }),
})

const WHATSAPP_MESSAGE = SERVICES_WHATSAPP_MESSAGE

// Product pages as tiles; the two service pages get link cards further down.
const productTiles = products.filter(
  (p) => p.to !== '/taiere-laser-plexiglas' && p.to !== '/gravura-laser-craiova',
)

// Cheapest size first, as on /placute-adresa
const sortedPlaquePricing = [...plaquePricing].sort((a, b) => a.price - b.price)

type OnRequestRow = {
  label: string
  hint: string
  link: { to: ProductPath } | { to: '/servicii'; hash: string }
}

// Product names come from products.ts so they match the tiles and the menu.
// Most hints are local: the products' own "preț la cerere" would repeat the
// column title.
const productRow = (to: ProductPath, hint = getProduct(to).hint): OnRequestRow => ({
  label: getProduct(to).label,
  hint,
  link: { to },
})

// Everything without a fixed price. Each row links to its page (wood/MDF has
// no page of its own, so it points to the block further down). Plexiglas
// engraving is not here: it has the per-cm² rate.
const onRequest: OnRequestRow[] = [
  productRow('/globuri-craciun-personalizate', 'din plexiglas, cu an sau mesaj'),
  productRow('/cadouri-personalizate', 'brelocuri, decor cu suport, cadouri gravate'),
  productRow('/litere-volumetrice'),
  productRow('/gravura-laser-craiova', 'lemn, sticlă, piele'),
  {
    label: 'Tăiere laser lemn și MDF',
    hint: 'placaj, MDF, piele, textile',
    link: { to: '/servicii', hash: 'taiere-laser-lemn' },
  },
]

// Services that have their own landing page: a compact link card here, the
// details live on the dedicated page. The ids keep the old anchors working.
const serviceCards: Array<{
  id: string
  to: '/taiere-laser-plexiglas' | '/gravura-laser-craiova'
  title: string
  description: string
  facts: string[]
  cue: string
  image: ImageName
  alt: string
}> = [
  {
    id: 'taiere-laser-plexiglas',
    to: '/taiere-laser-plexiglas',
    title: 'Tăiere laser plexiglas (acril)',
    description:
      'Debitare la dimensiune și tăiere în orice formă, pentru semnalistică, plăcuțe, litere și decorațiuni.',
    facts: ['Grosimi de până la 25 mm', `Precizie ${PRECISION}`],
    cue: 'Detalii și prețuri',
    image: '/img/services/taiere-laser-plexiglas',
    alt: 'Piese din plexiglas transparent și colorat tăiate laser: litere, cifre și forme geometrice cu margini lustruite',
  },
  {
    id: 'gravura-laser',
    to: '/gravura-laser-craiova',
    title: 'Gravură laser',
    description:
      'Personalizare pentru cadouri, trofee și logo-uri de firmă, pe lemn, sticlă, piele sau acril.',
    facts: ['Până la 1200 DPI'],
    cue: 'Detalii și exemple',
    image: '/img/services/gravura-laser',
    alt: 'Exemple de gravură laser: placă din lemn cu text și motive florale, portofel din piele și trofee transparente cu logo',
  },
]

const woodFeatures = [
  'Lemn masiv până la 15 mm',
  'Placaj și MDF până la 20 mm',
  'Piele naturală și sintetică',
  'Textile și fetru',
  'Carton și hârtie',
  'Forme complexe și detaliate',
]

const materials: Array<{ title: string; items: string[] }> = [
  {
    title: 'Pentru tăiere laser',
    items: [
      'Plexiglas (acril)',
      'Policarbonat',
      'Lemn masiv',
      'Placaj și MDF',
      'Piele',
      'Textile și fetru',
      'Carton și hârtie',
    ],
  },
  {
    title: 'Pentru gravură laser',
    items: [
      'Acril și plastic',
      'Lemn și bambus',
      'Sticlă și cristal',
      'Piele',
    ],
  },
]

// Links on their own line get a 44px tap target
const standaloneLink = `${textLink} inline-block py-3`

function PriceColumn({
  title,
  intro,
  className = '',
  children,
}: {
  title: string
  intro: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-lg sm:text-xl font-semibold text-zinc-900">
        {title}
      </h3>
      <p className="mt-1 mb-4 text-sm text-zinc-600">{intro}</p>
      {children}
    </div>
  )
}

function ServiciiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Servicii' }]}
        title={
          <>
            Servicii și <Highlight>prețuri</Highlight> de tăiere și gravură
            laser în Craiova
          </>
        }
        intro={
          <p>
            Tăiere laser pe plexiglas, lemn și MDF, precum și gravură pe lemn,
            sticlă și piele, în atelierul nostru din Craiova.
          </p>
        }
        chips={[
          `Plăcuțe: ${plaquePricing.length} mărimi · de la ${formatLei(PLAQUE_MIN_PRICE)}`,
          `Plexiglas ${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²`,
        ]}
        whatsappMessage={WHATSAPP_MESSAGE}
        media={[
          {
            name: '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
            alt: 'Plăcuță de adresă din plexiglas negru lucios cu pictogramă de casă și text auriu',
          },
        ]}
      />

      <Section id="preturi">
        <SectionHeader title="Prețuri" />
        {/* Tablets: the two fixed-price columns side by side, the on-request
            list below them at full width. */}
        <div className="grid gap-9 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
          <PriceColumn
            title="Plăcuțe de adresă"
            intro="Plexiglas pe 2 straturi: fundal și litere sau cifre aplicate."
          >
            <div className="overflow-hidden rounded-2xl border border-zinc-200">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Prețuri plăcuțe de adresă din plexiglas, pe mărimi
                </caption>
                <thead className="bg-zinc-50 text-xs uppercase tracking-wider text-zinc-600">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-semibold">
                      Mărime
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2.5 text-right font-semibold"
                    >
                      Preț
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {sortedPlaquePricing.map((item) => (
                    <tr key={item.size}>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-4 py-2.5 font-medium text-zinc-900"
                      >
                        {item.size}
                      </th>
                      <td className="whitespace-nowrap px-4 py-2.5 text-right text-lg font-bold text-zinc-900">
                        {formatLei(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-zinc-600">
              Prețul include ambele straturi, tăierea și gravarea textului.
              Logo sau design propriu: preț prin ofertă.
            </p>
            <p className="mt-1 text-sm">
              <Link to="/placute-adresa" className={standaloneLink}>
                Modele de plăcuțe de adresă din plexiglas
              </Link>
            </p>
          </PriceColumn>

          <PriceColumn
            title="Tăiere și gravură pe plexiglas"
            intro="Piese la comandă, în orice formă, calculate pe suprafață."
          >
            <RateCard
              dark
              label="Preț pe suprafață"
              value={formatAmount(ACRYLIC_PRICE_PER_CM2)}
              unit="lei / cm²"
              note={`Exemplu: ${ACRYLIC_EXAMPLE}`}
            />
            <CheckList
              className="mt-4 text-sm"
              items={[
                'Plexiglas transparent, colorat sau oglindă',
                'Reduceri pentru cantități mari',
              ]}
            />
            <p className="mt-1 text-sm">
              <Link to="/taiere-laser-plexiglas" className={standaloneLink}>
                Prețuri și detalii pentru tăierea plexiglasului
              </Link>
            </p>
          </PriceColumn>

          <PriceColumn
            title="Preț la cerere, ofertă gratuită"
            intro="Prețul depinde de model, material și cantitate."
            className="md:col-span-2 lg:col-span-1"
          >
            <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200">
              {onRequest.map((row) => (
                <li key={row.label}>
                  <Link
                    {...row.link}
                    className="group flex min-h-14 items-center gap-3 px-4 py-2.5 transition-colors hover:bg-zinc-50"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-zinc-900 group-hover:text-amber-800">
                        {row.label}
                      </span>
                      <span className="block text-sm text-zinc-600">
                        {row.hint}
                      </span>
                    </span>
                    <Icon
                      name="chevronRight"
                      className="w-5 h-5 shrink-0 text-amber-600"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </PriceColumn>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader title="Produse personalizate din plexiglas" />
        {/* 4 tiles: one row on desktop instead of 3 + 1 */}
        <ProductTiles products={productTiles} columns={4} />
      </Section>

      <Section>
        {/* scroll-mt: the anchor has no section padding above it, so it
            would otherwise land flush under the sticky header. */}
        <div
          id="taiere-laser-lemn"
          className="grid scroll-mt-12 gap-6 lg:grid-cols-2 lg:items-center lg:gap-12"
        >
          <div>
            <SectionHeader
              title="Tăiere laser lemn, MDF, piele și textile"
              intro={
                <p>
                  Decupaje în lemn, placaj și MDF pentru decorațiuni, litere și
                  tablouri, în atelierul nostru din Craiova. Prețul se
                  stabilește prin ofertă, după material, dimensiuni și
                  cantitate.
                </p>
              }
              className="mb-0!"
            />
            <CheckList items={woodFeatures} columns={2} className="mt-5" />
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl bg-zinc-100">
            <ResponsiveImage
              name="/img/services/taiere-laser-lemn"
              alt="Decupaje laser din placaj: panou cu model floral, fulgi de nea, ren, căsuțe și suporturi rotunde"
              sizes="(min-width: 1280px) 584px, (min-width: 1024px) 46vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <Eyebrow>Alte servicii laser</Eyebrow>
          <ul className="mt-4 grid gap-4 sm:gap-5 lg:grid-cols-2">
            {serviceCards.map((card) => (
              <li key={card.id} id={card.id} className="scroll-mt-12">
                <article className="group relative flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 sm:p-5">
                  <div className="flex items-center gap-4">
                    <div className="aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:w-36">
                      <ResponsiveImage
                        name={card.image}
                        alt={card.alt}
                        sizes="144px"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold leading-snug text-zinc-900">
                      <Link
                        to={card.to}
                        className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-amber-800"
                      >
                        {card.title}
                      </Link>
                    </h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {card.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {card.facts.map((fact) => (
                      <Chip key={fact}>{fact}</Chip>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-amber-800">
                    {card.cue}
                    <Icon name="chevronRight" className="w-4 h-4" />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader title="Materiale prelucrate" />
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          {materials.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-zinc-900">{group.title}</h3>
              {/* Flat tags, not outlined pills: nothing here is tappable. */}
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-zinc-200/60 px-2.5 py-1 text-sm text-zinc-800"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <OrderBlock
        title="Cereți o ofertă pentru proiectul dumneavoastră"
        intro={
          <p>
            Vă trimitem prețul și termenul de execuție. La nevoie, avem
            execuție urgentă de la 24 de ore.
          </p>
        }
        whatsappMessage={WHATSAPP_MESSAGE}
      />
    </>
  )
}
