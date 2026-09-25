import { useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { buttonClass } from '~/components/ui'
import { PHONE_HREF, whatsappHref } from '~/data/business'
import { whatsappMessageFor } from '~/data/products'

// Always-reachable contact on phones. It slides in once the hero (which has
// the same two buttons) is scrolled away, and is hidden by app.css while the
// menu or the cookie banner is open.
export function MobileActionBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname === '/contact') return null

  const message = whatsappMessageFor(pathname)

  return (
    <div
      data-mobile-bar
      data-placement="sticky-bar"
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-900/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-200 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
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
    </div>
  )
}
