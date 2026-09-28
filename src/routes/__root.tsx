/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getEvent } from '@tanstack/react-start/server'
import * as React from 'react'
import { CookieConsent } from '~/components/CookieConsent'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { MobileActionBar } from '~/components/MobileActionBar'
import { NotFound } from '~/components/NotFound'
import { type ImageName, imageMeta } from '~/components/ResponsiveImage'
import appCss from '~/styles/app.css?url'
// Same files as the @font-face rules in app.css, so Vite resolves both to one
// hashed URL and the preload is reused instead of downloaded twice.
import interRo from '~/assets/fonts/inter-ro-wght.woff2?url'
import bricolageRo from '~/assets/fonts/bricolage-ro-750.woff2?url'
import { BUSINESS_ID, SITE_URL, absoluteUrl } from '~/utils/seo'
import {
  EMAIL,
  GBP_URL,
  MAPS_URL,
  PHONE_E164,
  SOCIAL_LINKS,
  openingHours,
} from '~/data/business'
import { gaHeadScript, trackContactClick } from '~/utils/analytics'
import { focusTarget } from '~/utils/focus'

// Real work photos (largest generated width) rather than the logo share card.
const businessPhotos = (
  [
    '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
    '/img/products/litere-volumetrice-decor-eveniment-1',
    '/img/products/glob-craciun-cu-nume-personalizat',
  ] satisfies ImageName[]
).map((name) => absoluteUrl(`${name}-${imageMeta(name).width}.webp`))

// Profiles and the map link appear only once the owner supplies them.
const sameAs = [GBP_URL, ...SOCIAL_LINKS.map((link) => link.href)].filter(
  (href): href is string => Boolean(href),
)

// h3 collapses leading slashes before the router sees the URL ('//servicii'
// arrives as '/servicii'), so the server also checks the raw request path.
// The server half (and the server import) is compiled out of the client.
const rawRequestPath = createIsomorphicFn()
  .server(() => {
    try {
      return getEvent().node.req.url ?? ''
    } catch {
      return ''
    }
  })
  .client(() => '')

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: 'LaserCraft',
      alternateName: ['LaserCraft Craiova', 'Laser Craft Craiova', 'Laser Craft'],
      description:
        'Atelier de tăiere și gravură laser în Craiova: plăcuțe de adresă din plexiglas, tăiere laser plexiglas și lemn, litere volumetrice, globuri de Crăciun și cadouri personalizate, gravură pe lemn, sticlă și piele.',
      url: `${SITE_URL}/`,
      telephone: PHONE_E164,
      email: EMAIL,
      image: businessPhotos,
      logo: `${SITE_URL}/img/logo-512.png`,
      ...(sameAs.length > 0 ? { sameAs } : {}),
      ...(MAPS_URL ? { hasMap: MAPS_URL } : {}),
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
      // The price list on /servicii carries this @id.
      hasOfferCatalog: { '@id': `${SITE_URL}/servicii#catalog` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'LaserCraft',
      alternateName: ['LaserCraft Craiova', 'Laser Craft', 'laser-craft.ro'],
      inLanguage: 'ro',
      publisher: { '@id': BUSINESS_ID },
    },
  ],
}

export const Route = createRootRoute({
  // One URL per page: 301 upper-case, double-slash and trailing-slash variants
  // (the router matches all of them, which would otherwise serve duplicate
  // pages). Collapsing slashes first also keeps a "//host" path from becoming
  // a protocol-relative redirect.
  beforeLoad: ({ location }) => {
    const { pathname } = location
    if (/[^\x21-\x7e]/.test(pathname)) return
    let normalized = pathname.replace(/\/{2,}/g, '/').toLowerCase()
    if (normalized.length > 1) normalized = normalized.replace(/\/+$/, '') || '/'
    if (normalized !== pathname || /^\/{2,}/.test(rawRequestPath())) {
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
      // Inter is font-display: optional, so it has to arrive with the first
      // paint; Bricolage (h1/h2) is needed above the fold on every page.
      {
        rel: 'preload',
        href: interRo,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: bricolageRo,
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
  const router = useRouter()

  React.useEffect(() => {
    document.addEventListener('click', trackContactClick)
    return () => document.removeEventListener('click', trackContactClick)
  }, [])

  // The route JSON-LD the server put in <head> is not React's: on the client
  // the router's <Script> renders nothing and, finding the server copy, adds
  // none, so nothing would remove it when the page changes (the next page
  // would carry the first page's ItemList or OfferCatalog too). It goes on
  // the first page change; later pages add and remove their own copies.
  // Googlebot loads every URL fresh, so this only keeps in-browser readers
  // (extensions, testing tools) accurate.
  React.useEffect(() => {
    let serverLd = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
    const firstPath = router.state.location.pathname
    return router.subscribe('onBeforeNavigate', ({ toLocation }) => {
      if (!serverLd.length || toLocation.pathname === firstPath) return
      for (const script of serverLd) script.remove()
      serverLd = []
    })
  }, [router])

  // After a client-side page change, move focus to the new page's H1 (or to
  // the linked section for /page#id links): screen readers announce the new
  // page and the next Tab continues there instead of in the old footer. A
  // same-page hash link (footer → /servicii#taiere-laser-lemn) moves focus to
  // its section too: the router scrolls there itself, so the browser would
  // otherwise leave focus on the link. The first load leaves focus to the
  // browser (skip link first).
  //
  // The last shown location is tracked here because the router's
  // fromLocation is still undefined on the first navigation after hydration.
  React.useEffect(() => {
    let shown = router.state.location
    return router.subscribe('onResolved', ({ toLocation }) => {
      const samePage = toLocation.pathname === shown.pathname
      if (samePage && toLocation.hash === shown.hash) return
      shown = toLocation
      const hashTarget = toLocation.hash ? document.getElementById(toLocation.hash) : null
      if (samePage && !hashTarget) return
      const target = hashTarget ?? document.querySelector<HTMLElement>('main h1')
      if (target) focusTarget(target, { preventScroll: samePage || !hashTarget })
    })
  }, [router])

  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body className="bg-white font-sans text-zinc-900 antialiased">
        {/* Not in <head>: HeadContent renders route JSON-LD there on the
            server only, which would shift this script during hydration. */}
        <script dangerouslySetInnerHTML={{ __html: gaHeadScript }} />
        {/* Focuses main as well as jumping to it, so the next Tab starts
            there in every browser (main itself is not focusable). */}
        <a
          href="#continut"
          onClick={() => {
            const main = document.getElementById('continut')
            if (main) focusTarget(main, { preventScroll: true })
          }}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-amber-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-slate-950"
        >
          Salt la conținut
        </a>
        {/* Fixed at the bottom, but first in the DOM: the banner is the first
            Tab stop after the skip link and the first thing screen readers
            reach, instead of coming after the whole page. */}
        <CookieConsent />
        <div className="flex min-h-screen flex-col">
          <Header />
          {/* Not focusable itself: a permanent tabindex would make every
              click on its text the focus start, and the next Tab would
              jump back to the breadcrumb at the top. */}
          <main id="continut" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <MobileActionBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <Scripts />
      </body>
    </html>
  )
}
