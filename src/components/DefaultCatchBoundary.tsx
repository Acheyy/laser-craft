import { Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { Section, buttonClass } from '~/components/ui'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <Section>
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-amber-700">Eroare</h1>
        <p className="mt-4 text-lg text-zinc-600">
          {error.message || 'A apărut o eroare neașteptată.'}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.invalidate()}
            className={buttonClass('primary')}
          >
            Încercați din nou
          </button>
          <Link to="/" className={buttonClass('outlineLight')}>
            Pagina principală
          </Link>
        </div>
      </div>
    </Section>
  )
}
