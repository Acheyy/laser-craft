import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { productCountLabel } from '~/components/CartLink'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { buttonClass } from '~/components/ui'
import { PHONE_HREF, formatLei, whatsappHref } from '~/data/business'
import { whatsappMessageFor } from '~/data/products'
import { cartCount, cartTotal, useCart } from '~/utils/cart'

// Always-reachable contact on phones. It slides in once the hero (which has
// the same two buttons) is scrolled away, and is hidden by app.css while the
// menu or the cookie banner is open.
//
// In the shop, once something is in the cart, the cart becomes the main
// button and the bar shows straight away: the next step there is sending the
// order, not finding the contact buttons.
export function MobileActionBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const cart = useCart()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Both pages end in their own send button.
  if (pathname === '/contact' || pathname === '/cos') return null

  const message = whatsappMessageFor(pathname)
  const count = cartCount(cart)
  const showCart =
    count > 0 && (pathname === '/magazin' || pathname.startsWith('/magazin/'))
  const visible = scrolled || showCart

  return (
    <aside
      aria-label={showCart ? 'Coșul și contact rapid' : 'Contact rapid'}
      data-mobile-bar
      data-placement="sticky-bar"
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-900/95 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-200 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {showCart ? (
        <div className="mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_auto] gap-2">
          {/* The WhatsApp gradient: the cart ends in the WhatsApp order, so
              it is the same action one step earlier. Two lines, so a
              three-digit total still fits beside WhatsApp on a 360px phone. */}
          <Link
            to="/cos"
            aria-label={`Coșul de cumpărături: ${productCountLabel(count)}, ${formatLei(cartTotal(cart))}`}
            className={buttonClass('primary', 'md', 'px-3!')}
          >
            <Icon name="bag" className="w-5 h-5 shrink-0" />
            <span className="min-w-0 text-left leading-tight">
              <span className="block">Coșul</span>
              {/* Below 360px only the total fits (the count stays in the
                  aria-label); the ellipsis guards four-digit totals. */}
              <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium tabular-nums">
                <span className="max-[359px]:hidden">{`${count}\u00a0buc. · `}</span>
                {formatLei(cartTotal(cart))}
              </span>
            </span>
          </Link>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener"
            className={buttonClass('outlineDark', 'md', 'px-4!')}
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      ) : (
        <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener"
            className={buttonClass('primary', 'md')}
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp
          </a>
          <a href={PHONE_HREF} className={buttonClass('outlineDark', 'md')}>
            <Icon name="phone" className="w-5 h-5" />
            Sunați
          </a>
        </div>
      )}
    </aside>
  )
}
