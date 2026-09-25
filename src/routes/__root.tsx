/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
  redirect,
} from '@tanstack/react-router'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import appCss from '~/styles/app.css?url'
import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url'
import { BUSINESS_ID, SITE_URL } from '~/utils/seo'
import { EMAIL, PHONE_E164 } from '~/data/business'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: 'LaserCraft',
      alternateName: 'LaserCraft Craiova',
      description:
        'Atelier de tăiere și gravură laser în Craiova: plăcuțe de adresă din plexiglas, tăiere laser plexiglas și lemn, litere volumetrice, gravură pe lemn, sticlă și piele.',
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
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
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
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...(match.globalNotFound
        ? [
            { title: 'Pagina nu a fost găsită | LaserCraft' },
            { name: 'robots', content: 'noindex' },
          ]
        : []),
    ],
    links: [
      {
        rel: 'preload',
        href: interLatin,
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
  return (
    <html lang="ro">
      <head>
        <HeadContent />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T3L6H9G61S"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T3L6H9G61S');
            `,
          }}
        />
      </head>
      <body className="bg-white text-zinc-900 font-[Inter_Variable,system-ui,sans-serif] antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Scripts />
      </body>
    </html>
  )
}
