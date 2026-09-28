import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Icon } from '~/components/Icon'
import { NotFound } from '~/components/NotFound'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { AddToCartForm, ShopCard, ShopFacts, ShopToast, midSentence } from '~/components/Shop'
import { Chip, Container, Section, SectionHeader, textLink } from '~/components/ui'
import images from '~/data/images.gen.json'
import { getProduct } from '~/data/products'
import {
  type ShopProduct,
  formatPrice,
  formatSize,
  getShopCategory,
  getShopProduct,
  shopOgImage,
  shopProducts,
} from '~/data/shop'
import { trackCartEvent } from '~/utils/cart'
import {
  BUSINESS_ID,
  SERVICE_AREA,
  SITE_URL,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`

// Material and colour as separate facts. Plexiglas finishes are "plexiglas
// <colour>"; the wood finishes ("lemn baițuit", "placaj de lemn natur")
// describe the material itself, so they have no separate colour.
function materialAndColor(product: ShopProduct) {
  if (product.material === 'plexiglas') {
    return { material: 'Plexiglas', color: product.finish.replace(/^plexiglas\s+/, '') }
  }
  return { material: capitalize(product.finish), color: undefined }
}

// "Glob de Crăciun personalizat cu nume – 10 lei | LaserCraft", without the
// brand when the whole title would run past the ~60 characters search
// results show. seoTitle says what a short name is ("Fulg de nea, ornament
// de Crăciun"); the H1 keeps the owner's name.
function pageTitle(product: ShopProduct) {
  const title = `${product.seoTitle ?? product.name} – ${formatPrice(product)}`
  const branded = `${title} | LaserCraft`
  return branded.length <= 60 ? branded : title
}

function pageDescription(product: ShopProduct) {
  const nameIncluded = product.personalization?.required ? ', cu numele inclus' : ''
  return `${product.name}, ${product.finish}, ${formatSize(product.size)}: ${formatPrice(
    product,
  )}/bucată${nameIncluded}. Tăiere laser în Craiova, livrare prin curier în toată România.`
}

// Up to four other products: the next ones in the same category (wrapping
// around), then the other categories. Matched by slug: on the client the
// loader data is a copy, not the object in shopProducts.
function relatedProducts(product: ShopProduct) {
  const index = shopProducts.findIndex((p) => p.slug === product.slug)
  const rotated = [...shopProducts.slice(index + 1), ...shopProducts.slice(0, index)]
  return [
    ...rotated.filter((p) => p.category === product.category),
    ...rotated.filter((p) => p.category !== product.category),
  ].slice(0, 4)
}

export const Route = createFileRoute('/magazin/$slug')({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getShopProduct(params.slug)
    if (!product) throw notFound()
    return { product }
  },
  // An unknown slug answers 404 with the site's not-found page; the title
  // and noindex come from here because the root head only sees a global
  // not-found.
  notFoundComponent: () => <NotFound />,
  head: ({ loaderData }) => {
    const product = loaderData?.product
    if (!product) {
      return {
        meta: [
          { title: 'Pagina nu a fost găsită | LaserCraft' },
          { name: 'robots', content: 'noindex' },
        ],
      }
    }
    const path = `/magazin/${product.slug}`
    const url = `${SITE_URL}${path}`
    const { material, color } = materialAndColor(product)
    return {
      ...seo({
        title: pageTitle(product),
        description: pageDescription(product),
        path,
        image: shopOgImage(product),
        imageAlt: product.alt,
      }),
      scripts: [
        breadcrumbs([
          { name: 'Magazin', path: '/magazin' },
          { name: product.name, path },
        ]),
        // No shipping details, return policy or ratings: the owner confirms
        // delivery in the chat, and the site publishes no reviews.
        jsonLd({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.details[0],
          url,
          image: absoluteUrl(`${product.image}-${images[product.image].width}.webp`),
          sku: product.slug,
          brand: { '@type': 'Brand', name: 'LaserCraft' },
          material,
          size: formatSize(product.size).replace(/\u00a0/g, ' '),
          ...(color ? { color } : {}),
          offers: {
            '@type': 'Offer',
            url,
            price: product.price,
            priceCurrency: 'RON',
            // Google's list of availability values has no MadeToOrder. In
            // its terms InStock means "accepting orders and can fulfil
            // them", which is the case; no lead time is implied.
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: { '@id': BUSINESS_ID },
            areaServed: SERVICE_AREA,
          },
        }),
      ],
    }
  },
})

function ProductPage() {
  const { product } = Route.useLoaderData()
  const category = getShopCategory(product.category)
  const landing = getProduct(category.landing)
  const field = product.personalization
  const { material, color } = materialAndColor(product)

  // Once per product: a reloaded loader returns an equal but new object.
  useEffect(() => {
    trackCartEvent('view_item', [{ product, quantity: 1 }])
  }, [product.slug])

  const facts: Array<[string, string]> = [
    ['Material', material],
    ...(color ? [['Culoare', capitalize(color)] as [string, string]] : []),
    ['Dimensiuni', formatSize(product.size)],
    ...(product.layers ? [['Straturi', `${product.layers} straturi`] as [string, string]] : []),
    ...(product.stand ? [['Suport', 'Da, de așezat pe masă sau pe raft'] as [string, string]] : []),
    ...(product.hangs ? [['Agățare', 'Orificiu pentru agățare în brad'] as [string, string]] : []),
    ...(field
      ? [
          [
            'Personalizare',
            field.required
              ? `${field.label}, inclus în preț`
              : `Textul la alegere (ca în poză: „${field.example}”), inclus în preț`,
          ] as [string, string],
        ]
      : []),
  ]

  const chips = [
    capitalize(product.finish),
    formatSize(product.size),
    ...(product.layers ? ['Pe două straturi'] : []),
    ...(product.stand ? ['Cu suport'] : []),
    ...(product.hangs ? ['Cu orificiu de agățare'] : []),
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-slate-900">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cutbed" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
        />
        <Container className="relative py-5 sm:py-10 lg:py-14">
          <nav aria-label="Cale de navigare">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
              <li>
                <Link to="/" className="-my-3 inline-block py-3 hover:text-amber-300">
                  Acasă
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">›</span>
                <Link to="/magazin" className="-my-3 inline-block py-3 hover:text-amber-300">
                  Magazin
                </Link>
              </li>
              <li className="flex min-w-0 items-center gap-2">
                <span aria-hidden="true">›</span>
                <span aria-current="page" className="text-zinc-200">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-4 grid gap-6 sm:mt-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] xl:gap-16">
            {/* Portrait photos: capped on phones so the name and the price
                still show in the first screen. */}
            <ResponsiveImage
              name={product.image}
              alt={product.alt}
              sizes="(min-width: 1280px) 480px, (min-width: 1024px) 416px, (min-width: 640px) 380px, calc(100vw - 32px)"
              priority
              className="mx-auto h-auto max-h-[55vh] w-auto max-w-full rounded-2xl ring-1 ring-white/10 lg:max-h-none lg:w-full"
            />

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-white text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]">
                {product.name}
              </h1>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="text-3xl font-extrabold tracking-tight text-amber-300 sm:text-4xl">
                  {formatPrice(product)}
                </span>
                <span className="text-zinc-300">
                  / bucată
                  {field?.required && ', cu numele inclus'}
                </span>
              </p>
              <p className="mt-3 leading-relaxed text-zinc-300 sm:text-lg">{product.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <Chip key={chip} dark>
                    {chip}
                  </Chip>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-white p-4 shadow-xl shadow-slate-950/30 sm:p-6 lg:max-w-lg">
                <AddToCartForm key={product.slug} product={product} />
              </div>
            </div>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
        />
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader title="Detalii" className="mb-5! sm:mb-6!" />
            <dl className="divide-y divide-paper-line border-y border-paper-line">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <dt className="text-zinc-600">{label}</dt>
                  <dd className="font-semibold text-zinc-900">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 space-y-3 leading-relaxed text-zinc-700">
              {product.details.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-paper-line bg-paper p-5 sm:p-6 lg:self-start">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Bine de știut</h2>
            <ShopFacts className="mt-4 text-[15px]" />
            <p className="mt-5 text-[15px] leading-relaxed text-zinc-700">
              Alte modele, la comandă:{' '}
              <Link to={category.landing} className={textLink}>
                {midSentence(landing.label)}
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 sm:mb-8">
          <SectionHeader title="Alte produse" className="mb-0!" />
          <Link
            to="/magazin"
            className={`inline-flex min-h-11 items-center gap-1.5 ${textLink}`}
          >
            Toate produsele
            <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {relatedProducts(product).map((related) => (
            <li key={related.slug}>
              <ShopCard
                product={related}
                sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, calc(50vw - 22px)"
              />
            </li>
          ))}
        </ul>
      </Section>

      <ShopToast />
    </>
  )
}
