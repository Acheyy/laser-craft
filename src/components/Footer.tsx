import { Link, useRouterState } from '@tanstack/react-router'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Logo } from '~/components/Logo'
import { Container } from '~/components/ui'
import {
  COMPANY,
  DELIVERY,
  EMAIL,
  GBP_URL,
  HOURS_SHORT,
  PHONE_DISPLAY,
  PHONE_HREF,
  SOCIAL_LINKS,
  emailHref,
  openingHours,
  whatsappHref,
} from '~/data/business'
import { products, whatsappMessageFor } from '~/data/products'
import { openConsentSettings } from '~/utils/analytics'

const infoLinks = [
  { to: '/servicii', label: 'Servicii și prețuri' },
  { to: '/portofoliu', label: 'Portofoliu' },
  { to: '/despre-noi', label: 'Despre noi' },
  { to: '/contact', label: 'Contact' },
  { to: '/politica-de-confidentialitate', label: 'Confidențialitate' },
] as const

// Touch-sized (44px) links on phones and tablets, a denser list on desktop.
const linkClass =
  'flex min-h-11 items-center text-sm text-zinc-300 transition-colors hover:text-amber-300 lg:min-h-9'
const contactLinkClass = 'inline-flex min-h-11 items-center gap-2 lg:min-h-9'
// Column titles are h2s for heading navigation; font-sans keeps them in the
// small uppercase label style instead of the display face.
const headingClass = 'font-sans text-xs font-semibold uppercase tracking-wider text-zinc-400'

// Google profile and social pages, once the owner has them.
const profileLinks = [
  ...(GBP_URL ? [{ label: 'Recenzii pe Google', href: GBP_URL }] : []),
  ...SOCIAL_LINKS,
]

// slate-950, a step darker than the slate-900 order block above it, so the
// page's last call to action doesn't read as the top of the footer.
export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <footer className="bg-slate-950 text-zinc-300">
      <Container className="py-8 sm:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-12 lg:gap-y-10">
          <div className="col-span-2 lg:col-span-4">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
              Atelier de tăiere și gravură laser în Craiova, județul Dolj.
            </p>
            <ul className="mt-3 text-sm">
              <li>
                <a
                  href={whatsappHref(whatsappMessageFor(pathname))}
                  target="_blank"
                  rel="noopener"
                  className={`${contactLinkClass} font-semibold text-white hover:text-amber-300`}
                >
                  <WhatsAppIcon className="w-5 h-5 text-amber-400" />
                  WhatsApp: {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={PHONE_HREF}
                  className={`${contactLinkClass} font-semibold text-white hover:text-amber-300`}
                >
                  <Icon name="phone" className="w-5 h-5 text-amber-400" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={emailHref()} className={`${contactLinkClass} hover:text-amber-300`}>
                  <Icon name="mail" className="w-5 h-5 text-amber-400" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 py-3 lg:py-2">
                <Icon name="mapPin" className="w-5 h-5 shrink-0 text-amber-400" />
                Craiova, jud. Dolj, România
              </li>
            </ul>
            {profileLinks.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 text-sm">
                {profileLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className={`${contactLinkClass} font-medium text-amber-300 underline decoration-amber-400/40 underline-offset-4 hover:text-amber-200`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Produse" className="lg:col-span-3">
            <h2 className={headingClass}>Produse</h2>
            <ul className="mt-2">
              {products.map((product) => (
                <li key={product.to}>
                  <Link to={product.to} className={linkClass}>
                    {product.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/servicii"
                  hash="taiere-laser-lemn"
                  activeOptions={{ includeHash: true }}
                  className={linkClass}
                >
                  Tăiere laser lemn și MDF
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Informații" className="lg:col-span-2">
            <h2 className={headingClass}>Informații</h2>
            <ul className="mt-2">
              {infoLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-3">
            <h2 className={headingClass}>Program</h2>
            <p className="mt-3 text-sm text-white lg:hidden">
              {HOURS_SHORT}, duminică închis
            </p>
            <dl className="mt-3 hidden space-y-1.5 text-sm lg:block">
              {openingHours.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 max-w-xs">
                  <dt>{row.label}</dt>
                  <dd className="font-medium text-white">{`${row.opens}–${row.closes}`}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 max-w-xs">
                <dt>Duminică</dt>
                <dd className="text-zinc-400">Închis</dd>
              </div>
            </dl>
            <p className="mt-3 flex max-w-xs gap-2 text-sm leading-relaxed text-zinc-400 lg:mt-4">
              <Icon name="truck" className="w-5 h-5 shrink-0 text-amber-400" />
              {DELIVERY}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 sm:mt-10 sm:gap-3 sm:pt-6 pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between lg:pb-0">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> LaserCraft ·
            laser-craft.ro
            {COMPANY && (
              <>
                {' '}
                · {COMPANY.name} · CUI {COMPANY.cui} · {COMPANY.regCom}
              </>
            )}
          </p>
          <button
            type="button"
            onClick={openConsentSettings}
            className="inline-flex min-h-11 items-center self-start text-left hover:text-amber-300 sm:self-auto"
          >
            Setări cookie
          </button>
        </div>
      </Container>
    </footer>
  )
}
