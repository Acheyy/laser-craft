import { Link } from '@tanstack/react-router'

export function CTASection() {
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/10" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Aveți un proiect în minte?
        </h2>
        <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
          Contactați-ne pentru o consultație gratuită și o ofertă personalizată.
          Răspundem în cel mult 24 de ore.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25"
          >
            Solicită Ofertă Gratuită
          </Link>
          <a
            href="tel:+40754497243"
            className="inline-flex items-center justify-center px-8 py-4 border border-zinc-700 text-zinc-300 font-semibold rounded-xl hover:bg-white/5 hover:border-zinc-600 transition-all"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            Sună-ne Acum
          </a>
        </div>
      </div>
    </section>
  )
}
