import { Link, useRouterState } from '@tanstack/react-router'
import { Icon } from '~/components/Icon'
import { cartCount, useCart } from '~/utils/cart'

// "1 produs", "3 produse", "20 de produse": Romanian puts "de" before counts
// whose last two digits are 20–99 or 00.
export function productCountLabel(count: number) {
  if (count === 1) return '1 produs'
  const rest = count % 100
  return `${count} ${count > 0 && (rest === 0 || rest >= 20) ? 'de ' : ''}produse`
}

function isShopPath(pathname: string) {
  return pathname === '/magazin' || pathname.startsWith('/magazin/') || pathname === '/cos'
}

// Header link to /cos. It shows once something is in the cart, and always in
// the shop itself. The cart is empty on the server, so the link (or its
// count) appears right after hydration without a mismatch.
//
// No live region here: the add button and the cart page announce their own
// changes, and a second announcement from the header would repeat each one.
export function CartLink({ className = '' }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const count = cartCount(useCart())

  if (count === 0 && !isShopPath(pathname)) return null

  return (
    <Link
      to="/cos"
      aria-label={`Coșul de cumpărături: ${count ? productCountLabel(count) : 'gol'}`}
      activeProps={{ className: 'bg-white/10 !text-amber-300' }}
      className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 active:bg-white/15 ${className}`}
    >
      <Icon name="bag" className="w-6 h-6" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-0 top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] leading-none font-bold tabular-nums text-slate-950"
        >
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
