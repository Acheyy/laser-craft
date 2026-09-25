/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
  redirect,
} from '@tanstack/react-router'
import * as React from 'react'
import { CookieConsent } from '~/components/CookieConsent'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { MobileActionBar } from '~/components/MobileActionBar'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import interLatinExt from '@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2?url'
import { BUSINESS_ID, SITE_URL } from '~/utils/seo'
import { EMAIL, PHONE_E164, openingHours } from '~/data/business'
import { gaHeadScript, trackContactClick } from '~/utils/analytics'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: 'LaserCraft',
      alternateName: 'LaserCraft Craiova',
      description:
        'Atelier de tăiere și gravură laser în Craiova: plăcuțe de adresă din plexiglas, tăiere laser plexiglas și lemn, litere volumetrice, globuri de Crăciun și cadouri personalizate, gravură pe lemn, sticlă și piele.',
      url: `${SITE_URL}/`,
      telephone: PHONE_E164,
      email: EMAIL,
      image: `${SITE_URL}/img/og/og-home.jpg`,
      logo: `${SITE_URL}/img/logo-512.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Craiova',
        addressRegion: 'Dolj',
        addressCountry: 'RO',
      },
      areaServed: [
        { '@type': 'City', name: 'Craiova' },
        { '@type': 'AdministrativeArea', name: 'Județul Dolj' },
        { '@type': 'Country', name: 'România' },
      ],
      openingHoursSpecification: openingHours.map((row) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: row.days,
        opens: row.opens,
        closes: row.closes,
      })),
      priceRange: '$$',
      currenciesAccepted: 'RON',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'LaserCraft',
      inLanguage: 'ro',
      publisher: { '@id': BUSINESS_ID },
    },
  ],
}

export const Route = createRootRoute({
  // One URL per page: 301 upper-case and trailing-slash variants (the router
  // matches both case-insensitively and with a trailing slash, which would
  // otherwise serve duplicate pages).
  beforeLoad: ({ location }) => {
    const { pathname } = location
    if (/[^\x21-\x7e]/.test(pathname)) return
    let normalized = pathname.toLowerCase()
    if (normalized.length > 1) normalized = normalized.replace(/\/+$/, '') || '/'
    if (normalized !== pathname) {
      throw redirect({
        href: `${normalized}${location.searchStr}`,
        statusCode: 301,
      })
    }
  },
  head: ({ match }) => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#0f172b' },
      ...(match.globalNotFound
        ? [
            { title: 'Pagina nu a fost găsită | LaserCraft' },
            { name: 'robots', content: 'noindex' },
          ]
        : []),
    ],
    links: [
      // Romanian diacritics (ă, ș, ț) live in the latin-ext subset, so both
      // subsets are needed for the first paint.
      {
        rel: 'preload',
        href: interLatin,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: interLatinExt,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', href: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    document.addEventListener('click', trackContactClick)
    return () => document.removeEventListener('click', trackContactClick)
  }, [])

  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body className="bg-white font-sans text-zinc-900 antialiased">
        {/* Not in <head>: HeadContent renders route JSON-LD there on the
            server only, which would shift this script during hydration. */}
        <script dangerouslySetInnerHTML={{ __html: gaHeadScript }} />
        <a
          href="#continut"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-amber-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950"
        >
          Salt la conținut
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="continut" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <MobileActionBar />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Scripts />
      </body>
    </html>
  )
}
