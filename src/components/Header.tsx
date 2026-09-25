import { Link, useRouterState } from '@tanstack/react-router'
import type * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ContactActions } from '~/components/Contact'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Logo } from '~/components/Logo'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { Container, buttonClass } from '~/components/ui'
import {
  HOURS_SHORT,
  PHONE_DISPLAY,
  PHONE_HREF,
  SHOW_CHRISTMAS_PROMO,
  whatsappHref,
} from '~/data/business'
import {
  type Product,
  productGroups,
  products,
  whatsappMessageFor,
} from '~/data/products'

const pageLinks = [
  { to: '/servicii', label: 'Prețuri' },
  { to: '/portofoliu', label: 'Portofoliu' },
  { to: '/despre-noi', label: 'Despre noi' },
  { to: '/contact', label: 'Contact' },
] as const

function SeasonBadge({ product }: { product: Product }) {
  if (!SHOW_CHRISTMAS_PROMO || !product.seasonal) return null
  return (
    <span className="ml-2 inline-flex rounded-full bg-amber-400 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-slate-950">
      Sezon
    </span>
  )
}

// Thumbnails only load once a menu has been opened, so the closed menus cost
// nothing on page load.
function Thumb({ product, show }: { product: Product; show: boolean }) {
  return (
    <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-200">
      {show && (
        <ResponsiveImage
          name={product.image}
          alt=""
          sizes="48px"
          className="h-full w-full object-cover"
        />
      )}
    </span>
  )
}

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [menusUsed, setMenusUsed] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMobileOpen(false)
    setProductsOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen || productsOpen) setMenusUsed(true)
  }, [mobileOpen, productsOpen])

  // The sheet is lg:hidden; widening the window (or rotating a tablet) while
  // it is open would otherwise leave the page scroll-locked.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (desktop.matches) setMobileOpen(false)
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    document.documentElement.dataset.menu = mobileOpen ? 'open' : 'closed'
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!productsOpen && !mobileOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      // Return focus to the toggle that opened the menu.
      document
        .querySelector<HTMLElement>(
          mobileOpen ? '[aria-controls="mobile-menu"]' : '[aria-controls="produse-menu"]',
        )
        ?.focus()
      setProductsOpen(false)
      setMobileOpen(false)
    }
    const onClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setProductsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [productsOpen, mobileOpen])

  const productsActive = products.some((p) => p.to === pathname)
  const pageMessage = whatsappMessageFor(pathname)

  // Links to the current page don't change the pathname, so the effect above
  // misses them; close on any link tap inside the menus as well.
  const closeOnLink = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('a')) {
      setMobileOpen(false)
      setProductsOpen(false)
    }
  }

  // The mobile sheet is a sibling of <header>: backdrop-filter on the header
  // would otherwise become the containing block of the fixed sheet.
  return (
    <>
      <header
        onClickCapture={closeOnLink}
        className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-md"
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <Logo />

            <nav aria-label="Meniu principal" className="hidden lg:flex items-center gap-1">
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  aria-expanded={productsOpen}
                  aria-controls="produse-menu"
                  onClick={() => setProductsOpen((open) => !open)}
                  className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white ${
                    productsActive || productsOpen ? 'text-amber-300' : 'text-zinc-200'
                  }`}
                >
                  Produse
                  <Icon
                    name="chevronDown"
                    className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  id="produse-menu"
                  className={`absolute left-0 top-full mt-3 w-[42rem] rounded-2xl bg-white p-5 shadow-2xl shadow-black/30 ring-1 ring-black/5 transition duration-150 ${
                    productsOpen
                      ? 'visible opacity-100 translate-y-0'
                      : 'invisible opacity-0 -translate-y-1'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-6">
                    {productGroups.map((group) => (
                      <div key={group.label}>
                        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          {group.label}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {group.items.map((product) => (
                            <li key={product.to}>
                              <Link
                                to={product.to}
                                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-zinc-100"
                              >
                                <Thumb product={product} show={menusUsed} />
                                <span className="min-w-0">
                                  <span className="block font-semibold text-zinc-900">
                                    {product.label}
                                    <SeasonBadge product={product} />
                                  </span>
                                  <span className="block text-sm text-zinc-600">
                                    {product.hint}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-zinc-100 px-2 pt-4 text-sm">
                    <Link
                      to="/servicii"
                      hash="taiere-laser-lemn"
                      className="font-medium text-zinc-700 hover:text-amber-700"
                    >
                      Tăiere laser lemn și MDF
                    </Link>
                    <Link
                      to="/servicii"
                      className="inline-flex items-center gap-1 font-semibold text-amber-700 hover:text-amber-800"
                    >
                      Toate serviciile și prețurile
                      <Icon name="arrowRight" className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {pageLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  activeProps={{ className: '!text-amber-300' }}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={PHONE_HREF}
                className="hidden xl:inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-amber-300"
              >
                <Icon name="phone" className="w-4 h-4 text-amber-400" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={whatsappHref(pageMessage)}
                target="_blank"
                rel="noopener"
                className={buttonClass('primary', 'sm')}
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <a
                href={whatsappHref(pageMessage)}
                target="_blank"
                rel="noopener"
                aria-label="Scrieți-ne pe WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-amber-400 transition-colors hover:bg-white/10 active:bg-white/15"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? 'Închideți meniul' : 'Deschideți meniul'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/10 active:bg-white/15"
              >
                <Icon name={mobileOpen ? 'close' : 'menu'} className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <nav
        id="mobile-menu"
        aria-label="Meniu mobil"
        data-placement="mobile-menu"
        onClickCapture={closeOnLink}
        inert={!mobileOpen}
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-slate-900 transition-opacity duration-200 ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <Container className="py-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Produse
          </p>
          <ul className="mt-2 space-y-1">
            {products.map((product) => (
              <li key={product.to}>
                <Link
                  to={product.to}
                  activeProps={{ className: 'bg-white/10' }}
                  className="flex min-h-16 items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5 active:bg-white/10"
                >
                  <Thumb product={product} show={menusUsed} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">
                      {product.label}
                      <SeasonBadge product={product} />
                    </span>
                    <span className="block text-sm text-zinc-400">{product.hint}</span>
                  </span>
                  <Icon name="chevronRight" className="w-5 h-5 text-zinc-500" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/servicii"
            hash="taiere-laser-lemn"
            className="mt-1 flex min-h-12 items-center gap-2 rounded-xl px-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 active:bg-white/10"
          >
            <Icon name="squares" className="w-5 h-5 text-amber-400" />
            Tăiere laser lemn și MDF
          </Link>

          <ul className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
            {pageLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeProps={{ className: '!text-amber-300 !bg-white/10' }}
                  className="flex min-h-12 items-center rounded-xl bg-white/5 px-4 font-medium text-zinc-100 transition-colors active:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ContactActions message={pageMessage} stacked className="mt-6" />
          <p className="mt-4 text-center text-sm text-zinc-400">
            Program: {HOURS_SHORT}
          </p>
        </Container>
      </nav>
    </>
  )
}
