import { Link, createFileRoute } from '@tanstack/react-router'
import { CopyEmail, defaultOrderChecklist } from '~/components/Contact'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Highlight, PageHero } from '~/components/PageHero'
import { ResponsiveImage } from '~/components/ResponsiveImage'
import { CheckList, Section, SectionHeader, buttonClass, textLink } from '~/components/ui'
import {
  DELIVERY,
  PHONE_DISPLAY,
  PHONE_HREF,
  RESPONSE_TIME,
  emailHref,
  openingHours,
  whatsappHref,
} from '~/data/business'
import { products } from '~/data/products'
import { breadcrumbs, seo } from '~/utils/seo'

const EMAIL_SUBJECT = 'Cerere ofertă - LaserCraft'
const EMAIL_HREF = emailHref(
  EMAIL_SUBJECT,
  'Bună ziua,\n\nAș dori o ofertă pentru următorul proiect:\n\n- Material:\n- Dimensiuni / cantitate:\n- Termen dorit:\n- Detalii suplimentare:\n\nVă mulțumesc!',
)

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    ...seo({
      title: 'Contact LaserCraft Craiova – Cere Ofertă Tăiere și Gravură Laser',
      description: `Ofertă gratuită pentru tăiere și gravură laser în Craiova: WhatsApp sau telefon ${PHONE_DISPLAY}, ori email. Răspundem în maximum 24 de ore lucrătoare.`,
      path: '/contact',
      image: '/img/og/og-contact.jpg',
    }),
    scripts: [breadcrumbs([{ name: 'Contact', path: '/contact' }])],
  }),
})

const cardTitle = 'text-xs font-semibold uppercase tracking-wider'

function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        title={
          <>
            Contactați-<Highlight>ne</Highlight>
          </>
        }
        intro={
          <p>
            Cereți o ofertă gratuită de tăiere sau gravură laser în Craiova: pe
            WhatsApp, la telefon sau pe email.
          </p>
        }
        actions={false}
      />

      <Section tone="muted">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <SectionHeader title="Cum ne puteți contacta" />

            {/* The cards are big buttons: same colours and radius as buttonClass */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener"
                data-placement="contact-page"
                className={buttonClass('primary', 'md', 'group gap-4 p-5 sm:col-span-2 sm:p-6')}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-950/10 sm:size-14">
                  <WhatsAppIcon className="w-7 h-7" />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className={cardTitle}>WhatsApp</h3>
                  <p className="mt-0.5 text-2xl font-extrabold tracking-tight">
                    {PHONE_DISPLAY}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Scrieți-ne pe WhatsApp. Ne puteți trimite și poze sau schițe.
                  </p>
                </div>
                <Icon
                  name="arrowRight"
                  className="hidden w-6 h-6 shrink-0 transition-transform group-hover:translate-x-1 sm:block"
                />
              </a>

              <a
                href={PHONE_HREF}
                data-placement="contact-page"
                className={buttonClass('dark', 'md', 'gap-4 p-5 sm:p-6')}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                  <Icon name="phone" className="w-6 h-6" />
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className={`${cardTitle} text-amber-400`}>Telefon</h3>
                  <p className="mt-0.5 text-xl font-bold tracking-tight">{PHONE_DISPLAY}</p>
                  <p className="mt-1 text-sm font-normal text-zinc-300">
                    Sunați în timpul programului.
                  </p>
                </div>
              </a>

              <a
                href={EMAIL_HREF}
                data-placement="contact-page"
                className="flex items-center gap-4 rounded-xl bg-white p-5 ring-1 ring-inset ring-zinc-200 transition-[box-shadow,transform] hover:ring-amber-300 active:scale-[0.98] sm:p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Icon name="mail" className="w-6 h-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className={`${cardTitle} text-amber-800`}>Email</h3>
                  <p className="mt-0.5 text-xl font-bold tracking-tight text-zinc-900">
                    Scrieți-ne
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    Pentru cereri detaliate, fișiere sau proiecte complexe.
                  </p>
                </div>
              </a>

              {/* The card above opens the email template. The visible address
                  gets the full row: in a half-width column or inside a padded
                  card it would be shortened. */}
              <div className="sm:col-span-2">
                <CopyEmail subject={EMAIL_SUBJECT} dark={false} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-inset ring-zinc-200 sm:p-6 lg:row-span-2 lg:self-start">
            <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              <Icon name="clock" className="w-5 h-5 text-amber-600" />
              Program de lucru
            </h2>
            <dl className="mt-3 divide-y divide-zinc-100 text-sm">
              {openingHours.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-zinc-600">{row.label}</dt>
                  <dd className="font-semibold text-zinc-900">
                    {row.opens} – {row.closes}
                  </dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-zinc-600">Duminică</dt>
                <dd className="text-zinc-600">Închis</dd>
              </div>
            </dl>
            <p className="mt-2 text-sm text-zinc-600">{RESPONSE_TIME}</p>
            <ul className="mt-5 space-y-3 border-t border-zinc-200 pt-5 text-sm text-zinc-700">
              <li className="flex gap-2.5">
                <Icon name="mapPin" className="mt-0.5 w-5 h-5 shrink-0 text-amber-600" />
                <span>
                  <strong className="font-semibold text-zinc-900">Craiova, jud. Dolj</strong>,
                  România
                </span>
              </li>
              <li className="flex gap-2.5">
                <Icon name="truck" className="mt-0.5 w-5 h-5 shrink-0 text-amber-600" />
                <span>{DELIVERY}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-inset ring-zinc-200 sm:p-6 lg:col-span-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              Ce informații să includeți
            </h2>
            <CheckList columns={2} className="mt-4" items={defaultOrderChecklist} />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Ce realizăm" />
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.to}>
              <Link
                to={product.to}
                className="group flex h-full items-center gap-3 rounded-xl border border-zinc-200 bg-white p-2 pr-3 transition-colors hover:border-amber-300 active:border-amber-400"
              >
                <ResponsiveImage
                  name={product.image}
                  alt={product.alt}
                  sizes="56px"
                  className="size-14 shrink-0 rounded-lg bg-zinc-100 object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-snug text-zinc-900 group-hover:text-amber-800">
                    {product.label}
                  </span>
                  <span className="block text-sm font-semibold text-amber-800">
                    {product.hint}
                  </span>
                </span>
                <Icon name="chevronRight" className="w-5 h-5 shrink-0 text-zinc-400" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <Link
            to="/servicii"
            hash="preturi"
            className={`${textLink} inline-flex min-h-11 items-center gap-1.5`}
          >
            Toate serviciile și prețurile
            <Icon name="arrowRight" className="w-4 h-4 shrink-0" />
          </Link>
        </p>
      </Section>
    </>
  )
}
