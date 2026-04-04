import { Link } from '@tanstack/react-router'

export function Hero() {
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Precizie sub 0.1mm
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            Tăiere & Gravare{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Laser
            </span>{' '}
            de Înaltă Precizie
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            Transformăm ideile dumneavoastră în realitate cu tehnologie laser de
            ultimă generație. Acril, lemn, piele, textile — orice material,
            rezultate impecabile.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              Solicită Ofertă Gratuită
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link
              to="/portofoliu"
              className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 text-zinc-300 font-semibold rounded-xl hover:bg-white/5 hover:border-zinc-600 transition-all"
            >
              Vezi Portofoliul
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: '10+', label: 'Ani Experiență' },
              { value: '2000+', label: 'Proiecte Finalizate' },
              { value: '99%', label: 'Clienți Mulțumiți' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </section>
  )
}
