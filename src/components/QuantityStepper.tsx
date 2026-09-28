import { useState } from 'react'
import { Icon } from '~/components/Icon'
import { MAX_QUANTITY } from '~/utils/cart'

// − [n] + for the product page and the cart. The number stays typeable
// (quicker than twelve taps for twelve globes); every valid digit is applied
// at once, so a form submitted with Enter never reads a stale draft. The
// buttons use aria-disabled rather than disabled, so focus stays on "−" when
// it reaches 1.
export function QuantityStepper({
  value,
  onChange,
  id,
  label,
  context,
  className = '',
}: {
  value: number
  onChange: (value: number) => void
  // Either the id of the field for a visible <label htmlFor>, or its
  // accessible name ("Cantitate: Glob cu nume, Maria")
  id?: string
  label?: string
  // Added to the button names where several steppers share a page (the cart:
  // "Mai multe bucăți, Glob cu nume, Maria")
  context?: string
  className?: string
}) {
  // '' while the field is being retyped; null shows the value itself
  const [draft, setDraft] = useState<string | null>(null)
  const set = (next: number) => onChange(Math.min(MAX_QUANTITY, Math.max(1, next)))
  const atMin = value <= 1
  const atMax = value >= MAX_QUANTITY
  const suffix = context ? `, ${context}` : ''
  // No overflow-hidden on the frame: it would clip the focus ring drawn
  // outside each cell. The end cells round themselves (11px inside the 12px
  // frame) so the hover fill follows the border, and a focused cell rises
  // above its neighbours so its whole ring shows.
  const buttonClass =
    'relative inline-flex h-11 w-11 shrink-0 items-center justify-center text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:z-10 aria-disabled:cursor-not-allowed aria-disabled:text-zinc-300 aria-disabled:hover:bg-transparent'

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-field-line bg-white ${className}`}
    >
      <button
        type="button"
        aria-label={`Mai puține bucăți${suffix}`}
        aria-disabled={atMin}
        onClick={() => !atMin && set(value - 1)}
        className={`${buttonClass} rounded-l-[11px]`}
      >
        <Icon name="minus" className="w-5 h-5" strokeWidth={2} />
      </button>
      <input
        id={id}
        aria-label={id ? undefined : label}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={draft ?? String(value)}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, '').slice(0, 2)
          if (digits) {
            setDraft(null)
            set(Number(digits))
          } else {
            setDraft('')
          }
        }}
        onBlur={() => setDraft(null)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault()
            set(value + (event.key === 'ArrowUp' ? 1 : -1))
          }
        }}
        className="relative h-11 w-12 border-x border-zinc-300 bg-white text-center text-base font-semibold tabular-nums text-zinc-900 focus-visible:z-10"
      />
      <button
        type="button"
        aria-label={`Mai multe bucăți${suffix}`}
        aria-disabled={atMax}
        onClick={() => !atMax && set(value + 1)}
        className={`${buttonClass} rounded-r-[11px]`}
      >
        <Icon name="plus" className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  )
}
