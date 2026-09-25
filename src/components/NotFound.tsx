import { Link } from '@tanstack/react-router'
import { ContactActions } from '~/components/Contact'
import { Icon } from '~/components/Icon'
import { ProductTiles } from '~/components/ProductCards'
import { Section, textLink } from '~/components/ui'

export function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <p aria-hidden="true" className="text-6xl font-extrabold text-amber-700 sm:text-7xl">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold text-zinc-900 sm:text-3xl">
          Pagina nu a fost găsită
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          Pagina căutată nu există sau a fost mutată. Poate căutați unul dintre
          produsele de mai jos.
        </p>
        <ContactActions dark={false} className="mt-6 sm:justify-center" />
        <Link to="/" className={`mt-3 inline-flex min-h-11 items-center gap-1.5 ${textLink}`}>
          Înapoi la pagina principală
          <Icon name="arrowRight" className="w-4 h-4" />
        </Link>
      </div>
      <div className="mt-12">
        <ProductTiles headingLevel="h2" />
      </div>
    </Section>
  )
}
