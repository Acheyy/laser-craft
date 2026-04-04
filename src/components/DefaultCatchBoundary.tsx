import { Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-amber-500 mb-4">Eroare</h1>
        <p className="text-zinc-600 text-lg mb-8">
          {error.message || 'A apărut o eroare neașteptată.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => router.invalidate()}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors"
          >
            Încearcă din nou
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 border border-zinc-300 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-50 transition-colors text-center"
          >
            Acasă
          </Link>
        </div>
      </div>
    </div>
  )
}
