import { createFileRoute } from '@tanstack/react-router'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/despre-noi')({
  component: DespreNoiPage,
  head: () => ({
    meta: seo({
      title: 'Despre Noi - LaserCraft | Experiență în Servicii Laser',
      description:
        'Descoperiți povestea LaserCraft — peste 10 ani de experiență în servicii profesionale de tăiere și gravare laser în România. 2000+ proiecte realizate.',
      keywords:
        'despre LaserCraft, echipa laser craft, experienta taiere laser, firma taiere laser Craiova, servicii laser România',
      image: '/img/og/og-despre-noi.png',
      url: '/despre-noi',
    }),
  }),
})

const values = [
  {
    title: 'Precizie',
    description:
      'Fiecare proiect este realizat cu atenție la detalii și toleranțe de sub 0.1mm.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Inovație',
    description:
      'Investim constant în echipamente și tehnologii de ultimă generație.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
  },
  {
    title: 'Integritate',
    description:
      'Transparență totală în comunicare, prețuri corecte și termene respectate.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
  },
]


function DespreNoiPage() {
  return (
    <>
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Despre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                LaserCraft
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Suntem o echipă de profesioniști pasionați de tehnologia laser, cu
              o experiență de peste 10 ani în industria prelucrării materialelor.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-6">
                Povestea Noastră
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  LaserCraft a fost fondată cu o viziune simplă: să aducă
                  tehnologia de tăiere laser la cel mai înalt standard de
                  calitate pentru clienții din România.
                </p>
                <p>
                  Am început cu un singur echipament laser și o dorință imensă de
                  a crea produse perfecte. Astăzi, dispunem de un parc de
                  echipamente modern care ne permite să abordăm proiecte de orice
                  complexitate.
                </p>
                <p>
                  De-a lungul anilor, am colaborat cu sute de clienți din diverse
                  industrii — de la arhitectură și design interior, la industria
                  auto și aeronautică, artă și publicitate.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-12">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: '10+', label: 'Ani de Experiență' },
                  { value: '2000+', label: 'Proiecte Realizate' },
                  { value: '500+', label: 'Clienți Fideli' },
                  { value: '99%', label: 'Clienți Mulțumiți' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-amber-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-zinc-400 mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-12 text-center">
            Valorile Noastre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 border border-zinc-200 text-center"
              >
                <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
