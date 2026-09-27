import { Link } from '@tanstack/react-router'
import { Section, SectionHeader, textLink } from '~/components/ui'
import { TESTIMONIALS, type Testimonial } from '~/data/business'
import type { ProductPath } from '~/data/products'

// 'Ce spun clienții': real, consented quotes from business.ts. Renders nothing
// until TESTIMONIALS is filled in. On a product page pass `to` to show only
// the quotes about that product. Plain markup only: never add Review or
// aggregateRating JSON-LD for these.
//
// The layout follows the count: one quote is a pull quote, two share a
// narrower two-column row, three fill the desktop row. Pass tone="white"
// where the section above is already paper (home, after RecentWork).
export function Testimonials({
  to,
  items = TESTIMONIALS,
  tone = 'muted',
}: {
  to?: ProductPath
  items?: Testimonial[]
  tone?: 'white' | 'muted'
}) {
  const quotes = (to ? items.filter((item) => item.to === to) : items).slice(0, 3)
  if (quotes.length === 0) return null

  const caption = (item: Testimonial) => (
    <figcaption className="mt-4 text-sm text-zinc-600">
      — <span className="font-semibold text-zinc-900">{item.name}</span>,{' '}
      {item.town} ·{' '}
      {/* Link to the product, unless this is already its page. */}
      {item.to && !to ? (
        <Link to={item.to} className={textLink}>
          {item.productLabel}
        </Link>
      ) : (
        item.productLabel
      )}
    </figcaption>
  )

  return (
    <Section tone={tone}>
      <SectionHeader title="Ce spun clienții" />
      {quotes.length === 1 ? (
        <figure className="max-w-3xl border-l-4 border-amber-400 pl-5">
          <blockquote className="text-lg leading-relaxed text-zinc-800 sm:text-xl">
            <p>„{quotes[0].quote}”</p>
          </blockquote>
          {caption(quotes[0])}
        </figure>
      ) : (
        <ul
          className={`grid gap-4 sm:gap-5 md:grid-cols-2 ${
            quotes.length === 2 ? 'max-w-5xl' : 'lg:grid-cols-3'
          }`}
        >
          {quotes.map((item) => (
            <li key={`${item.name}-${item.quote.slice(0, 24)}`}>
              <figure
                className={`flex h-full flex-col rounded-2xl border border-paper-line p-5 sm:p-6 ${
                  tone === 'white' ? 'bg-paper' : 'bg-white'
                }`}
              >
                <blockquote className="flex-1 leading-relaxed text-zinc-800">
                  <p>„{item.quote}”</p>
                </blockquote>
                {caption(item)}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
