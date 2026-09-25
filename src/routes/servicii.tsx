import type * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import {
  ResponsiveImage,
  type ImageName,
} from '~/components/ResponsiveImage'
import {
  ACRYLIC_PRICE_PER_CM2,
  formatLei,
  plaquePricing,
} from '~/data/business'
import { BUSINESS_ID, SITE_URL, breadcrumbs, jsonLd, seo } from '~/utils/seo'

export const Route = createFileRoute('/servicii')({
  component: ServiciiPage,
  head: () => ({
    ...seo({
      title: 'Servicii și Prețuri Tăiere și Gravură Laser Craiova | LaserCraft',
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

const services: Array<{
  id: string
  title: string
  image: ImageName
  description: string
  features: string[]
  link?: { to: '/taiere-laser-plexiglas' | '/gravura-laser-craiova'; label: string }
  icon: React.ReactNode
}> = [
  {
    id: 'taiere-laser-plexiglas',
    title: 'Tăiere Laser Plexiglas (Acril)',
    image: '/img/services/taiere-laser-plexiglas',
    description:
      'Tăiere și debitare de precizie în plexiglas (acril) pentru semnalistică, decorațiuni, plăcuțe de adresă și aplicații comerciale. Margini curate și lustruite.',
    link: {
      to: '/taiere-laser-plexiglas',
      label: 'Detalii și prețuri tăiere plexiglas',
    },
    features: [
      'Plexiglas (acril) până la 25mm',
      'Margini curate, lustruite',
      'Toleranțe de ±0.05mm',
      'Plexiglas transparent, colorat sau oglindă',
      'Ideal pentru semnalistică',
      'Personalizare completă',
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        />
      </svg>
    ),
  },
  {
    id: 'taiere-laser-lemn',
    title: 'Tăiere Laser Lemn',
    image: '/img/services/taiere-laser-lemn',
    description:
      'Decupări complexe în lemn, placaj, MDF și alte materiale organice. Perfect pentru decorațiuni, mobilier personalizat și elemente arhitecturale.',
    features: [
      'Lemn masiv până la 15mm',
      'Placaj și MDF până la 20mm',
      'Carton și hârtie',
      'Piele naturală și sintetică',
      'Textile și fetru',
      'Forme complexe și detaliate',
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    id: 'gravura-laser',
    title: 'Gravură Laser',
    image: '/img/services/gravura-laser',
    description:
      'Gravuri de înaltă rezoluție pe diverse materiale, perfecte pentru personalizare, branding și elemente decorative de excepție.',
    link: {
      to: '/gravura-laser-craiova',
      label: 'Detalii despre gravura laser',
    },
    features: [
      'Gravură pe acril și plastic',
      'Gravură pe lemn și bambus',
      'Gravură pe sticlă și cristal',
      'Gravură pe piele',
      'Rezoluție până la 1200 DPI',
    ],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
]

const materials = [
  { name: 'Plexiglas (Acril)', category: 'Plastic' },
  { name: 'Policarbonat', category: 'Plastic' },
  { name: 'Lemn Masiv', category: 'Organic' },
  { name: 'Placaj / MDF', category: 'Organic' },
  { name: 'Piele', category: 'Organic' },
  { name: 'Textile / Fetru', category: 'Organic' },
  { name: 'Carton / Hârtie', category: 'Organic' },
  { name: 'Sticlă (gravură)', category: 'Mineral' },
]

function ServiciiPage() {
  return (
    <>
      <section className="bg-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Servicii și{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                prețuri
              </span>{' '}
              de tăiere și gravură laser în Craiova
            </h1>
            <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
              Oferim soluții complete de tăiere și gravare laser pentru orice
              tip de proiect — de la piese unice la producție de serie — în
              atelierul nostru din Craiova.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
              Prețuri transparente
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4">
              Tarifele noastre
            </h2>
            <p className="text-base sm:text-lg text-zinc-600">
              Două opțiuni simple, prețuri fixe. Alege pachetul standard pentru
              plăcuțe sau calculează pe suprafață pentru proiecte custom.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-8 border border-zinc-200 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1.5 sm:mb-2">
                    Pachete standard
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-zinc-900">
                    <Link
                      to="/placute-adresa"
                      className="hover:text-amber-700 transition-colors"
                    >
                      Plăcuțe de adresă
                    </Link>
                  </h3>
                </div>
                <div className="flex w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 text-amber-600 rounded-xl items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l2 2 4-4m-7.5 9.5h9"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-zinc-600 mb-5 sm:mb-6">
                Mărimi standard din plexiglas (acril), construcție pe 2 straturi
                (fundal + litere/cifre aplicate).
              </p>

              <div className="space-y-2 flex-1">
                {plaquePricing.map((item) => (
                  <div
                    key={item.size}
                    className="flex items-center justify-between gap-3 px-4 py-3 sm:p-4 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-zinc-300 transition-colors"
                  >
                    <div className="font-semibold text-zinc-900 text-base sm:text-lg whitespace-nowrap">
                      {item.size}
                    </div>
                    <div className="font-bold text-zinc-900 text-base sm:text-lg whitespace-nowrap">
                      {formatLei(item.price)}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 sm:mt-6 text-xs text-zinc-500 leading-relaxed">
                * Prețurile includ ambele straturi de plexiglas, tăierea și
                gravarea textului. Pentru logo sau design custom,
                contactează-ne pentru o ofertă.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-8 shadow-xl flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5 sm:mb-2">
                    Proiecte custom
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white">
                    <Link
                      to="/taiere-laser-plexiglas"
                      className="hover:text-amber-400 transition-colors"
                    >
                      Tăiere & gravură pe plexiglas
                    </Link>
                  </h3>
                </div>
                <div className="flex w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 text-amber-400 rounded-xl items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mb-5 sm:mb-6">
                Orice formă, orice design — tăiat sau gravat în plexiglas (acril),
                calculat pe suprafață.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 mb-5 sm:mb-6">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {formatLei(ACRYLIC_PRICE_PER_CM2).replace(' lei', '')}
                  </span>
                  <span className="text-base sm:text-lg text-zinc-300 font-medium">
                    lei / cm²
                  </span>
                </div>
                <div className="mt-3 text-xs text-zinc-400">
                  Exemplu: 100 × 50 mm (50 cm²) ≈{' '}
                  <span className="text-amber-400 font-semibold">
                    {formatLei(50 * ACRYLIC_PRICE_PER_CM2)}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 sm:space-y-3 text-sm text-zinc-300 flex-1">
                <li className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Forme și dimensiuni la alegere
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Plexiglas transparent, colorat sau oglindă
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                  Reduceri pentru cantități mari
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              id={service.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-24"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-zinc-700"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4 text-amber-500 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.link && (
                  <Link
                    to={service.link.to}
                    className="mt-6 inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                  >
                    {service.link.label} →
                  </Link>
                )}
              </div>
              <div
                className={`rounded-2xl aspect-[4/3] overflow-hidden ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <ResponsiveImage
                  name={service.image}
                  alt={service.title}
                  sizes="(min-width: 1280px) 616px, (min-width: 1024px) 50vw, 100vw"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4 text-center">
            Materiale Prelucrate
          </h2>
          <p className="text-lg text-zinc-600 text-center mb-12 max-w-2xl mx-auto">
            Lucrăm cu o gamă largă de materiale pentru a acoperi nevoile
            diverselor industrii.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {materials.map((material) => (
              <div
                key={material.name}
                className="bg-white rounded-xl p-4 border border-zinc-200 text-center hover:border-amber-500/50 hover:shadow-sm transition-all"
              >
                <div className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">
                  {material.category}
                </div>
                <div className="font-medium text-zinc-900">{material.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Aveți nevoie de un serviciu personalizat?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Contactați-ne pentru o ofertă adaptată nevoilor dumneavoastră.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25"
          >
            Solicită Ofertă
          </Link>
        </div>
      </section>
    </>
  )
}
