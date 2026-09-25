import { createFileRoute } from '@tanstack/react-router'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '~/data/business'
import { breadcrumbs, seo } from '~/utils/seo'

const EMAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  'Cerere ofertă - LaserCraft',
)}&body=${encodeURIComponent(
  'Bună ziua,\n\nAș dori o ofertă pentru următorul proiect:\n\n- Material:\n- Dimensiuni / cantitate:\n- Termen dorit:\n- Detalii suplimentare:\n\nVă mulțumesc!',
)}`

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    ...seo({
      title: 'Contact LaserCraft Craiova – Cere Ofertă Tăiere și Gravură Laser',
      description:
        'Cereți o ofertă gratuită pentru tăiere sau gravură laser în Craiova. Sunați la 0754 497 243 sau scrieți-ne pe email — răspundem în maximum 24 de ore.',
      path: '/contact',
      image: '/img/og/og-contact.jpg',
    }),
    scripts: [breadcrumbs([{ name: 'Contact', path: '/contact' }])],
  }),
})

function ContactPage() {
  return (
    <>
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Contactați-
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                ne
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Suntem aici pentru a vă ajuta cu proiectul dumneavoastră de tăiere
              sau gravură laser în Craiova. Sunați-ne direct sau trimiteți-ne un
              email — vă răspundem în cel mult 24 de ore.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
                  Cum ne puteți contacta
                </h2>
                <p className="text-zinc-600">
                  Alegeți modalitatea care vă convine cel mai mult. Vă răspundem
                  rapid, cu o ofertă personalizată pentru proiectul dumneavoastră.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a
                  href={PHONE_HREF}
                  className="group relative overflow-hidden bg-slate-900 rounded-2xl p-8 hover:shadow-xl hover:shadow-amber-500/10 transition-all"
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
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
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
                      Sunați-ne
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {PHONE_DISPLAY}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6">
                      Cea mai rapidă cale pentru a discuta despre proiectul
                      dumneavoastră.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 group-hover:gap-3 transition-all">
                      Apelează acum
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
                    </span>
                  </div>
                </a>

                <a
                  href={EMAIL_HREF}
                  className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 hover:shadow-xl hover:shadow-amber-500/30 transition-all"
                >
                  <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-white/15 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-amber-600 transition-colors">
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
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div className="text-xs uppercase tracking-wider text-white/80 font-semibold mb-2">
                      Trimiteți-ne email
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 break-all">
                      {EMAIL}
                    </h3>
                    <p className="text-sm text-white/80 mb-6">
                      Pentru cereri detaliate, fișiere sau proiecte complexe.
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                      Scrie-ne
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
                    </span>
                  </div>
                </a>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                  Ce informații să includeți
                </h3>
                <p className="text-sm text-zinc-600 mb-5">
                  Pentru a vă putea oferi o estimare cât mai precisă, ne ajută
                  dacă ne transmiteți următoarele detalii:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Tipul materialului dorit',
                    'Dimensiunile și cantitatea',
                    'Fișiere de design (dacă există)',
                    'Termenul de execuție dorit',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-zinc-700"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Date de Contact
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Adresă
                      </div>
                      <div className="text-sm text-zinc-400 mt-1">
                        Craiova, jud. Dolj, România
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Telefon
                      </div>
                      <a
                        href={PHONE_HREF}
                        className="text-sm text-zinc-400 mt-1 hover:text-amber-400 transition-colors"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white">
                        Email
                      </div>
                      <a
                        href={EMAIL_HREF}
                        className="text-sm text-zinc-400 mt-1 hover:text-amber-400 transition-colors break-all"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Program de Lucru
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Luni - Vineri</span>
                    <span className="text-white font-medium">
                      08:00 - 17:00
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Sâmbătă</span>
                    <span className="text-white font-medium">
                      09:00 - 14:00
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Duminică</span>
                    <span className="text-zinc-500">Închis</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  Răspuns Rapid
                </h3>
                <p className="text-sm text-zinc-600">
                  Garantăm un răspuns la mesajul dumneavoastră în maximum 24 de
                  ore lucrătoare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
