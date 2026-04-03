import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/servicii')({
  component: ServiciiPage,
  head: () => ({
    meta: seo({
      title: 'Servicii - LaserCraft',
      description:
        'Servicii complete de tăiere laser metal, tăiere laser lemn, gravură laser și debitare CNC. Descoperă soluțiile LaserCraft.',
    }),
  }),
})

const services = [
  {
    title: 'Tăiere Laser Metal',
    description:
      'Serviciul nostru principal de tăiere laser pentru metale oferă rezultate de excepție pentru o gamă variată de aplicații industriale și decorative.',
    features: [
      'Oțel carbon până la 20mm grosime',
      'Oțel inoxidabil până la 12mm',
      'Aluminiu până la 8mm',
      'Cupru și alamă până la 6mm',
      'Toleranțe de ±0.05mm',
      'Margini curate, fără bavuri',
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
    title: 'Tăiere Laser Lemn & Acril',
    description:
      'Realizăm decupări complexe în materiale nemetalice cu precizie ridicată, ideale pentru design, decorațiuni și aplicații comerciale.',
    features: [
      'Lemn masiv până la 15mm',
      'Placaj și MDF până la 20mm',
      'Acril (plexiglas) până la 25mm',
      'Carton și hârtie',
      'Piele naturală și sintetică',
      'Textile și fetru',
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
    title: 'Gravură Laser',
    description:
      'Gravuri de înaltă rezoluție pe diverse materiale, perfecte pentru personalizare, branding și elemente decorative de excepție.',
    features: [
      'Gravură pe metal (oțel, aluminiu, inox)',
      'Gravură pe lemn și bambus',
      'Gravură pe sticlă și cristal',
      'Gravură pe piele',
      'Gravură pe acril și plastic',
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
  {
    title: 'Debitare CNC',
    description:
      'Debitare cu precizie numerică pentru producție de serie sau prototipuri. Control total al procesului pentru rezultate repetabile.',
    features: [
      'Piese metalice de serie',
      'Prototipuri rapide',
      'Frezare 2D și 3D',
      'Îndoire și sudură',
      'Finisare suprafețe',
      'Control calitate inclus',
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
          d="M11.42 15.17l-5.684 5.684a2.121 2.121 0 01-3-3l5.684-5.684m0 0L15.17 5.42a2.121 2.121 0 113 3L11.42 15.17zm0 0L3 21M10.5 6H21m-10.5 6H21m-10.5 6H21"
        />
      </svg>
    ),
  },
]

const materials = [
  { name: 'Oțel Carbon', category: 'Metal' },
  { name: 'Oțel Inoxidabil', category: 'Metal' },
  { name: 'Aluminiu', category: 'Metal' },
  { name: 'Cupru', category: 'Metal' },
  { name: 'Alamă', category: 'Metal' },
  { name: 'Lemn Masiv', category: 'Organic' },
  { name: 'Placaj / MDF', category: 'Organic' },
  { name: 'Acril (Plexiglas)', category: 'Plastic' },
  { name: 'Policarbonat', category: 'Plastic' },
  { name: 'Piele', category: 'Organic' },
  { name: 'Sticlă', category: 'Mineral' },
  { name: 'Textile', category: 'Organic' },
]

function ServiciiPage() {
  return (
    <>
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Serviciile{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Noastre
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Oferim soluții complete de prelucrare laser pentru orice tip de
              proiect, de la piese unice la producție industrială de serie.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
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
              </div>
              <div
                className={`bg-gradient-to-br from-slate-100 to-zinc-100 rounded-2xl aspect-[4/3] flex items-center justify-center ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="text-zinc-400 text-center p-8">
                  <div className="w-16 h-16 bg-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {service.icon}
                  </div>
                  <p className="text-sm">Imagine {service.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4 text-center">
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
          <h2 className="text-3xl font-bold text-white mb-4">
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
