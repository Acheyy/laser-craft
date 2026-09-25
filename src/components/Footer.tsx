import { Link } from '@tanstack/react-router'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Logo } from '~/components/Logo'
import { Container } from '~/components/ui'
import {
  COMPANY,
  DELIVERY,
  EMAIL,
  HOURS_SHORT,
  PHONE_DISPLAY,
  PHONE_HREF,
  emailHref,
  openingHours,
  whatsappHref,
} from '~/data/business'
import { products } from '~/data/products'
import { openConsentSettings } from '~/utils/analytics'

const infoLinks = [
  { to: '/servicii', label: 'Servicii și prețuri' },
  { to: '/portofoliu', label: 'Portofoliu' },
  { to: '/despre-noi', label: 'Despre noi' },
  { to: '/contact', label: 'Contact' },
  { to: '/politica-de-confidentialitate', label: 'Confidențialitate' },
] as const

const linkClass =
  'inline-block py-1.5 text-sm text-zinc-300 transition-colors hover:text-amber-300'
const headingClass = 'text-xs font-semibold uppercase tracking-wider text-zinc-400'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900 text-zinc-300">
      <Container className="py-8 sm:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-12 lg:gap-y-10">
          <div className="col-span-2 lg:col-span-4">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
              Atelier de tăiere și gravură laser în Craiova, județul Dolj.
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 py-1 font-semibold text-white hover:text-amber-300"
                >
                  <WhatsAppIcon className="w-5 h-5 text-amber-400" />
                  WhatsApp: {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 py-1 font-semibold text-white hover:text-amber-300"
                >
                  <Icon name="phone" className="w-5 h-5 text-amber-400" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={emailHref()}
                  className="inline-flex items-center gap-2 py-1 hover:text-amber-300"
                >
                  <Icon name="mail" className="w-5 h-5 text-amber-400" />
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 py-1">
                <Icon name="mapPin" className="w-5 h-5 shrink-0 text-amber-400" />
                Craiova, jud. Dolj, România
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className={headingClass}>Produse</p>
            <ul className="mt-3">
              {products.map((product) => (
                <li key={product.to}>
                  <Link to={product.to} className={linkClass}>
                    {product.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/servicii" hash="taiere-laser-lemn" className={linkClass}>
                  Tăiere laser lemn și MDF
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className={headingClass}>Informații</p>
            <ul className="mt-3">
              {infoLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <p className={headingClass}>Program</p>
            <p className="mt-3 text-sm text-white lg:hidden">
              {HOURS_SHORT}, duminică închis
            </p>
            <dl className="mt-3 hidden space-y-1.5 text-sm lg:block">
              {openingHours.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 max-w-xs">
                  <dt>{row.label}</dt>
                  <dd className="font-medium text-white">
                    {row.opens} – {row.closes}
                  </dd>
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
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> LaserCraft
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
            className="self-start py-1 text-left hover:text-amber-300 sm:self-auto"
          >
            Setări cookie
          </button>
        </div>
      </Container>
    </footer>
  )
}
