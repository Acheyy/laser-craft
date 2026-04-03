import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">
          Pagina nu a fost găsită
        </h2>
        <p className="text-zinc-600 text-lg mb-8">
          Ne pare rău, pagina pe care o căutați nu există sau a fost mutată.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
        >
          Înapoi la pagina principală
        </Link>
      </div>
    </div>
  )
}
