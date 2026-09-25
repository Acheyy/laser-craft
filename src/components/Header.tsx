import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const navLinks = [
  { to: '/', label: 'Acasă' },
  { to: '/despre-noi', label: 'Despre Noi' },
  { to: '/servicii', label: 'Servicii' },
  { to: '/portofoliu', label: 'Portofoliu' },
  { to: '/contact', label: 'Contact' },
] as const

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setScrolled(true)
      else if (window.scrollY < 10) setScrolled(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-800 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-12 sm:h-14' : 'h-16 sm:h-20'
          }`}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/img/logo.svg"
              alt=""
              width={44}
              height={44}
              className={`w-auto transition-all duration-300 ${scrolled ? 'h-7 sm:h-8' : 'h-9 sm:h-11'}`}
            />
            <span
              className={`font-bold text-white tracking-tight group-hover:text-amber-400 transition-all duration-300 ${
                scrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
              }`}
            >
              Laser<span className="text-amber-500">Craft</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === '/' }}
                activeProps={{ className: '!text-amber-400' }}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-5 py-2 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-colors"
            >
              Solicită Ofertă
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
            aria-label="Meniu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Meniu mobil"
        inert={!mobileOpen}
        className={`md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === '/' }}
              activeProps={{ className: '!text-amber-400 !bg-amber-500/10' }}
              className="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mt-3 px-4 py-3 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-colors text-center"
            onClick={() => setMobileOpen(false)}
          >
            Solicită Ofertă
          </Link>
        </div>
      </nav>
    </header>
  )
}
