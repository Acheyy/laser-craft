/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import appCss from '~/styles/app.css?url'
import { seo, SITE_URL } from '~/utils/seo'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'LaserCraft',
      description:
        'Servicii profesionale de tăiere laser și gravare laser. Acril, lemn, piele — precizie, calitate și rapiditate în Craiova, România.',
      url: SITE_URL,
      telephone: '+40754497243',
      email: 'lasercraft.contact@gmail.com',
      image: `${SITE_URL}/img/og/og-home.png`,
      logo: `${SITE_URL}/img/logo.svg`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Craiova',
        addressCountry: 'RO',
      },
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
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'LaserCraft',
      inLanguage: 'ro',
    },
  ],
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({
        title: 'LaserCraft - Servicii Profesionale de Tăiere și Gravare Laser',
        description:
          'LaserCraft oferă servicii profesionale de tăiere laser și gravare laser. Acril, lemn, piele — precizie, calitate și rapiditate în Craiova, România.',
        keywords:
          'taiere laser, gravare laser, taiere acril, taiere lemn, laser craft, servicii laser, Craiova',
        image: '/img/og/og-home.png',
        url: '/',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/img/logo.svg' },
      { rel: 'canonical', href: SITE_URL },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
      },
    ],
  }),
  errorComponent: (props) => (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  ),
  notFoundComponent: () => (
    <RootDocument>
      <NotFound />
    </RootDocument>
  ),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

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
      <body className="bg-white text-zinc-900 font-[Inter,system-ui,sans-serif] antialiased">
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
