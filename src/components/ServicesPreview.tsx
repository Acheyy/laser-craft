import type * as React from 'react'
import { Link } from '@tanstack/react-router'

const services: Array<{
  title: string
  to: '/taiere-laser-plexiglas' | '/servicii' | '/gravura-laser-craiova'
  hash?: string
  description: string
  icon: React.ReactNode
}> = [
  {
    title: 'Tăiere Laser Plexiglas',
    to: '/taiere-laser-plexiglas',
    description:
      'Tăiere și debitare de precizie în plexiglas (acril) cu margini curate și lustruite. Ideal pentru semnalistică, plăcuțe de adresă și decorațiuni.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
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
    title: 'Tăiere Laser Lemn',
    to: '/servicii',
    hash: 'taiere-laser-lemn',
    description:
      'Decupări complexe în lemn, placaj, MDF și HDF. Perfect pentru decorațiuni, mobilier personalizat și elemente arhitecturale.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
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
    title: 'Gravură Laser',
    to: '/gravura-laser-craiova',
    description:
      'Gravuri detaliate pe lemn, sticlă, piele și acril. Personalizare premium pentru cadouri, trofee și branding.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
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

export function ServicesPreview() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
            Servicii de Tăiere și Gravură Laser
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Oferim o gamă completă de servicii de prelucrare laser pentru orice
            tip de proiect, de la prototipuri unice la producție de serie.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.to}
              hash={service.hash}
              className="group block bg-white rounded-2xl p-6 border border-zinc-200 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-zinc-600">
          Cele mai cerute:{' '}
          <Link
            to="/placute-adresa"
            className="font-medium text-zinc-900 underline decoration-amber-500/50 underline-offset-4 hover:text-amber-700"
          >
            plăcuțe de adresă din plexiglas
          </Link>{' '}
          și{' '}
          <Link
            to="/litere-volumetrice"
            className="font-medium text-zinc-900 underline decoration-amber-500/50 underline-offset-4 hover:text-amber-700"
          >
            litere volumetrice
          </Link>
          .
        </p>

        <div className="text-center mt-8">
          <Link
            to="/servicii"
            className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
          >
            Vezi toate serviciile
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
