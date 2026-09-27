import { Link, createFileRoute } from '@tanstack/react-router'
import type * as React from 'react'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Highlight, PageHero } from '~/components/PageHero'
import { IdeaCard, ModelCard, type ModelItem } from '~/components/ProductCards'
import type { ImageName } from '~/components/ResponsiveImage'
import {
  CheckList,
  Section,
  SectionHeader,
  buttonClass,
  textLink,
} from '~/components/ui'
import {
  DPI,
  SHOW_CHRISTMAS_PROMO,
  URGENT,
  formatLei,
  whatsappHref,
} from '~/data/business'
import images from '~/data/images.gen.json'
import { getProduct } from '~/data/products'
import {
  BUSINESS_ID,
  SERVICE_AREA,
  SITE_URL,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

// Set fromPrice (products.ts) to the name keychain's starting price: the
// price copy and the Product node below describe the keychain.
const product = getProduct('/cadouri-personalizate')

const schemaImages = [
  '/img/products/breloc-nume-plexiglas-doua-straturi',
  '/img/products/breloc-gravat-mesaj-personalizat',
  '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
  '/img/products/decor-love-pisici-plexiglas-roz',
  '/img/products/glob-craciun-lemn-nume-nicolas',
] as const satisfies ReadonlyArray<ImageName>

const keychainImages = [
  '/img/products/breloc-nume-plexiglas-doua-straturi',
  '/img/products/breloc-gravat-mesaj-personalizat',
] as const satisfies ReadonlyArray<ImageName>

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

export const Route = createFileRoute('/cadouri-personalizate')({
  component: CadouriPersonalizatePage,
  head: () => ({
    ...seo({
      title: 'Cadouri personalizate și brelocuri cu nume – Craiova | LaserCraft',
      description:
        'Brelocuri cu nume, decor cu suport și globuri de Crăciun cu nume, din plexiglas și lemn, realizate în Craiova. Livrare în toată țara, ofertă gratuită.',
      path: '/cadouri-personalizate',
      image: '/img/og/og-cadouri-personalizate.jpg',
      imageAlt:
        'Decor din plexiglas magenta și galben cu siluetele unei mame și a unui copil cu balon, pe suport, LaserCraft Craiova',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        { name: 'Cadouri personalizate', path: '/cadouri-personalizate' },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Cadouri personalizate din plexiglas și lemn',
        serviceType: 'Cadouri personalizate tăiate și gravate laser',
        description:
          'Cadouri personalizate din plexiglas și lemn tăiate și gravate laser — brelocuri cu nume sau mesaj, decoruri cu suport, globuri de Crăciun cu nume și forme decorative — realizate în atelierul LaserCraft din Craiova.',
        url: `${SITE_URL}/cadouri-personalizate`,
        provider: { '@id': BUSINESS_ID },
        areaServed: SERVICE_AREA,
        image: schemaImages.map(largestVariantUrl),
      }),
      // Only once the owner publishes a starting price (products.ts).
      ...(product.fromPrice
        ? [
            jsonLd({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Breloc personalizat cu nume',
              url: `${SITE_URL}/cadouri-personalizate`,
              image: keychainImages.map(largestVariantUrl),
              description:
                'Breloc din plexiglas personalizat cu nume sau mesaj, tăiat și gravat laser în atelierul LaserCraft din Craiova.',
              brand: { '@type': 'Brand', name: 'LaserCraft' },
              offers: {
                '@type': 'AggregateOffer',
                lowPrice: product.fromPrice,
                priceCurrency: 'RON',
                availability: 'https://schema.org/MadeToOrder',
                areaServed: SERVICE_AREA,
                seller: { '@id': BUSINESS_ID },
              },
            }),
          ]
        : []),
    ],
  }),
})

type GiftGroup = {
  title: string
  intro: React.ReactNode
  items: ModelItem[]
  // Model-card request; defaults to the gift message
  whatsappMessage?: string
}

// Each gift category keeps its own H2 (each is a search topic).
const keychains: GiftGroup = {
  title: 'Brelocuri personalizate cu nume sau mesaj',
  intro:
    'Le facem din plexiglas colorat pe două straturi, cu literele aplicate pe fundal, sau dintr-o piesă gravată cu textul și desenul dorite.',
  items: [
    {
      image: '/img/products/breloc-nume-plexiglas-doua-straturi',
      alt: 'Breloc cu numele „Jonut” din plexiglas pe două straturi, cu litere albe aplicate pe fundal roz',
      title: 'Nume pe două straturi',
      description: 'Litere aplicate pe un fundal tăiat pe contur.',
      meta: 'Plexiglas alb + roz',
    },
    {
      image: '/img/products/breloc-gravat-mesaj-personalizat',
      alt: 'Breloc rotund din plexiglas negru gravat laser cu mesajul „you are INDISPENSABLE” și un personaj cu pancarta „THANK YOU”',
      title: 'Breloc gravat cu mesaj',
      description: 'Mesaj și desen gravate laser, cu inel metalic.',
      meta: 'Plexiglas negru',
    },
  ],
}

const standDecor: GiftGroup = {
  title: 'Decor personalizat cu suport',
  intro:
    'Un cadou care se așază pe masă sau pe raft: mai multe culori, siluete decupate și detalii gravate laser.',
  items: [
    {
      image: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
      alt: 'Decor din plexiglas magenta și galben cu suport: arcadă cu trandafiri gravați și siluetele unei mame și a unui copil',
      title: 'Mamă și copil, în două culori',
      description: 'Arcadă cu trandafiri gravați și siluete decupate.',
      meta: 'Plexiglas magenta + galben',
    },
    {
      image: '/img/products/icoana-isus-plexiglas-negru-cu-suport',
      alt: 'Icoană decorativă cu chipul lui Isus din plexiglas negru decupat laser pe fundal alb, cu suport pentru masă sau raft',
      title: 'Icoană decorativă',
      description: 'Chipul lui Isus decupat laser, cu suport.',
      meta: 'Plexiglas negru + alb',
    },
  ],
}

const petGifts: GiftGroup = {
  title: 'Cadouri pentru iubitorii de animale',
  intro: (
    <>
      <Link to="/taiere-laser-plexiglas" className={textLink}>
        Tăierea laser a plexiglasului
      </Link>{' '}
      urmează conturul dorit: pisica sau câinele dumneavoastră pot fi motivul
      cadoului, eventual cu numele lor.
    </>
  ),
  items: [
    {
      image: '/img/products/decor-love-pisici-plexiglas-roz',
      alt: 'Decor „LOVE” din plexiglas roz tăiat laser, cu siluete de pisici integrate în litere',
      title: 'Decor „LOVE” cu pisici',
      description: 'Siluete de pisici integrate în litere.',
      meta: 'Plexiglas roz',
    },
    {
      image: '/img/products/ornament-pisica-inger-plexiglas-roz',
      alt: 'Pisicuță-înger din plexiglas roz, așezată pe un nor, cu aureolă, aripi și detalii conturate în negru',
      title: 'Pisicuță-înger',
      description: 'Pe un nor, cu aureolă și aripi.',
      meta: 'Plexiglas roz',
    },
    {
      image: '/img/products/ornament-os-caine-plexiglas-roz',
      alt: 'Os din plexiglas roz cu orificiu în formă de inimă, agățat cu o panglică roșie',
      title: 'Os pentru iubitorii de câini',
      description: 'Cu orificiu în formă de inimă și panglică.',
      meta: 'Plexiglas roz',
    },
  ],
}

// Same titles and alts as in the /globuri-craciun-personalizate gallery
const christmasGifts: GiftGroup = {
  title: 'Cadouri de\u00a0Crăciun personalizate',
  intro:
    'Globuri din plexiglas sau din lemn, cu numele celui drag ori al orașului.',
  whatsappMessage: getProduct('/globuri-craciun-personalizate').whatsappMessage,
  items: [
    {
      image: '/img/products/glob-craciun-cu-nume-personalizat',
      alt: 'Glob de Crăciun din plexiglas roșu personalizat cu numele „Cristina”, cu Moș Crăciun în sanie, reni și fulgi de nea',
      title: 'Glob personalizat cu nume',
      description: 'Numele dorit, pe banda centrală.',
      meta: 'Plexiglas roșu',
    },
    {
      image: '/img/products/glob-craciun-lemn-nume-nicolas',
      alt: 'Glob de Crăciun rotund din lemn baițuit, gravat laser cu numele „Nicolas”, un om de zăpadă cu joben și mătură, o căsuță cu horn și fulgi de nea',
      title: 'Glob din lemn cu nume',
      description: 'Numele dorit, gravat în lemn.',
      meta: 'Lemn baițuit',
    },
    {
      image: '/img/products/glob-craciun-lemn-craiova-brad',
      alt: 'Glob de Crăciun din placaj de lemn natur tăiat laser, cu textul „Craiova”, un brad cu model dantelat de fulgi de nea și două stele',
      title: 'Glob din lemn „Craiova”',
      description: 'Orașul se poate schimba.',
      meta: 'Placaj de lemn',
    },
  ],
}

const personalizationOptions: React.ReactNode[] = [
  'Numele, inițialele sau un mesaj scurt, tăiate din plexiglas sau gravate laser.',
  <>
    Un desen, un simbol sau un logo, prin{' '}
    <Link to="/gravura-laser-craiova" className={textLink}>
      gravură laser
    </Link>{' '}
    la până la {DPI}.
  </>,
  'Materialul: plexiglas (acril) transparent, colorat sau oglindă, pe unul sau două straturi; sau lemn.',
  'Forma: breloc, decor cu suport, ornament sau conturul dorit, cu margini lustruite.',
]

const christmas = {
  title: 'Crăciun',
  description: (
    <>
      <Link to="/globuri-craciun-personalizate" className={textLink}>
        Globuri de Crăciun personalizate
      </Link>{' '}
      cu numele celor dragi.
    </>
  ),
}

const otherOccasions: Array<{ title: string; description: React.ReactNode }> = [
  {
    title: 'Ziua Mamei',
    description: 'Decor cu suport, pentru mame sau bunici.',
  },
  {
    title: 'Zile de naștere',
    description: 'Un breloc cu numele sărbătoritului.',
  },
  {
    title: 'Botez',
    description: 'Icoană sau decor cu numele copilului.',
  },
  {
    title: 'Nași și fini',
    description: 'Un glob „Dragi nași” sau un decor cu numele finilor.',
  },
]

// Christmas goes first while the ornaments are promoted; it spans both
// columns so the 2-column grid has no empty cell.
const occasions = SHOW_CHRISTMAS_PROMO
  ? [christmas, ...otherOccasions]
  : [...otherOccasions, christmas]

// Only facts published elsewhere on the site
const businessGifts: React.ReactNode[] = [
  'Brelocuri cu mesaj sau logo, în serie',
  <>
    <Link to="/globuri-craciun-personalizate" className={textLink}>
      Globuri de Crăciun
    </Link>{' '}
    cu numele firmei sau cu o urare, pentru colegi și clienți
  </>,
  <>
    Logo-ul firmei, prin{' '}
    <Link to="/gravura-laser-craiova" className={textLink}>
      gravură laser
    </Link>{' '}
    pe plexiglas, lemn, sticlă sau piele
  </>,
  'Reduceri pentru cantități mari',
]

const quoteChecklist = [
  'Obiectul dorit și textul de pe piesă',
  'Materialul și culorile (vă ajutăm să le alegeți)',
  'Mărimea aproximativă și câte bucăți doriți',
  'Fișierele de design, dacă există (desen sau logo)',
  'Termenul dorit',
]

const faqItems = [
  {
    question: 'Cât costă un cadou personalizat?',
    answer: product.fromPrice ? (
      <p>
        Un breloc cu nume costă de la {formatLei(product.fromPrice)}/buc.
        Prețul final depinde de dimensiuni, material, design și cantitate;
        pentru cantități mari oferim reduceri. Oferta este gratuită.
      </p>
    ) : (
      <p>
        Prețul este la cerere și depinde de dimensiuni, material, design și
        cantitate. Oferta este gratuită.
      </p>
    ),
  },
  {
    question: 'Pot comanda un singur breloc cu nume?',
    answer: (
      <p>
        Da. Lucrăm de la piese unice până la producție de serie, așa că puteți
        comanda un singur breloc sau mai multe bucăți, de exemplu pentru colegi
        ori clienți.
      </p>
    ),
  },
  {
    question: 'Ce se poate grava pe un breloc sau pe un decor?',
    answer: (
      <p>
        Un nume, un mesaj, un desen sau un logo, la o rezoluție de până la{' '}
        {DPI}. Gravăm pe plexiglas, dar și pe lemn, sticlă sau piele.
      </p>
    ),
  },
  {
    question: 'Pot trimite propriul desen sau logo pentru un cadou?',
    answer: (
      <p>
        Da. Trimiteți-ne fișierul împreună cu dimensiunile și cantitatea dorite.
        Dacă nu aveți un fișier, descrieți-ne ideea sau trimiteți-ne o poză.
      </p>
    ),
  },
  {
    question: 'În cât timp este gata un cadou personalizat?',
    answer: product.leadTime ? (
      <p>
        {product.leadTime} La nevoie, oferim {URGENT}.
      </p>
    ) : (
      <p>
        Menționați termenul dorit când cereți oferta. Oferim și {URGENT}.
      </p>
    ),
  },
  {
    question: 'Puteți trimite cadoul prin curier?',
    answer: (
      <p>
        Da, livrăm prin curier în toată România. În Craiova puteți ridica
        personal comanda.
      </p>
    ),
  },
]

// `subgrid` lines up the headings and card rows of two groups placed side by
// side on desktop.
function GiftGroupBlock({
  group,
  subgrid = false,
  gridClassName = '',
  children,
}: {
  group: GiftGroup
  subgrid?: boolean
  gridClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={subgrid ? 'lg:row-span-2 lg:grid lg:grid-rows-subgrid' : ''}>
      <SectionHeader
        title={group.title}
        intro={group.intro}
        className="mb-5! sm:mb-6! lg:pr-8"
      />
      <ul className={`grid grid-cols-2 gap-3 sm:gap-5 ${gridClassName}`}>
        {group.items.map((item) => (
          <li key={item.image}>
            <ModelCard
              item={item}
              whatsappMessage={group.whatsappMessage ?? product.whatsappMessage}
              sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 50vw"
            />
          </li>
        ))}
        {children}
      </ul>
    </div>
  )
}

// Ornament cards plus a tile that fills the 4th slot and leads to the full
// ornament gallery.
function ChristmasGiftsBlock() {
  return (
    <GiftGroupBlock group={christmasGifts} gridClassName="lg:grid-cols-4">
      <li>
        <Link
          to="/globuri-craciun-personalizate"
          className="group flex h-full flex-col justify-center rounded-2xl border border-amber-200 bg-amber-50 p-4 text-zinc-900 transition-colors hover:border-amber-300 hover:bg-amber-100 sm:p-6"
        >
          <span className="font-semibold leading-snug sm:text-lg">
            Mai multe globuri de Crăciun
          </span>
          <span className="mt-1.5 text-sm leading-relaxed text-zinc-700">
            Modele din plexiglas și lemn, cu nume, oraș, an sau mesaj.
          </span>
          <span className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-800">
            Vedeți toate modelele
            <Icon
              name="arrowRight"
              className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      </li>
    </GiftGroupBlock>
  )
}

function CadouriPersonalizatePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Cadouri personalizate' },
        ]}
        title={
          <>
            <Highlight>Cadouri personalizate</Highlight> din plexiglas și lemn,
            realizate în Craiova
          </>
        }
        intro={
          <p>
            Realizăm cadouri personalizate din plexiglas și lemn în atelierul
            nostru de tăiere și gravură laser din Craiova: brelocuri cu nume
            sau mesaj, decoruri cu suport și globuri de Crăciun cu nume.
          </p>
        }
        chips={[
          product.fromPrice
            ? `De la ${formatLei(product.fromPrice)}/buc. · ofertă gratuită`
            : 'Preț la cerere · ofertă gratuită',
          'Livrare prin curier în toată România',
        ]}
        whatsappMessage={product.orderMessage}
        media={[
          {
            name: '/img/products/breloc-nume-plexiglas-doua-straturi',
            alt: keychains.items[0].alt,
          },
          {
            name: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
            alt: standDecor.items[0].alt,
          },
          {
            name: '/img/products/decor-love-pisici-plexiglas-roz',
            alt: petGifts.items[0].alt,
          },
        ]}
      />

      <Section>
        {/* Christmas gifts lead while the ornaments are promoted. */}
        {SHOW_CHRISTMAS_PROMO && (
          <div className="mb-10 sm:mb-14">
            <ChristmasGiftsBlock />
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-5 lg:gap-y-0">
          <GiftGroupBlock group={keychains} subgrid />
          <GiftGroupBlock group={standDecor} subgrid />
        </div>

        <div className="mt-10 sm:mt-14">
          <GiftGroupBlock group={petGifts} gridClassName="lg:grid-cols-4">
            <li>
              <IdeaCard
                text="Trimiteți-ne o poză sau o schiță și vă spunem prețul."
                whatsappMessage={product.whatsappMessage}
                className="h-full"
              />
            </li>
          </GiftGroupBlock>
        </div>

        {!SHOW_CHRISTMAS_PROMO && (
          <div className="mt-10 sm:mt-14">
            <ChristmasGiftsBlock />
          </div>
        )}
      </Section>

      <Section tone="muted">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-12">
          <SectionHeader
            title="Cât costă un cadou personalizat"
            intro={
              <p>
                <strong className="font-semibold text-zinc-900">
                  {product.fromPrice
                    ? `De la ${formatLei(product.fromPrice)}/buc.`
                    : 'Preț la cerere.'}
                </strong>{' '}
                {product.fromPrice ? 'Prețul final depinde' : 'Depinde'} de
                dimensiuni, material, design și cantitate. Pentru cantități mari
                oferim reduceri.
              </p>
            }
            className="mb-0!"
          />
          {/* Shown at every width: on phones the sticky bar stays hidden
              until the cookie choice is made. */}
          <div className="mt-5 shrink-0 lg:mt-0">
            <a
              href={whatsappHref(product.orderMessage)}
              target="_blank"
              rel="noopener"
              data-placement="price"
              className={buttonClass('primary', 'lg', 'w-full sm:w-auto')}
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              Cereți prețul pe WhatsApp
            </a>
          </div>
        </div>

        {/* subgrid starts both lists on the same line although the second
            heading wraps to two lines */}
        <div className="mt-12 grid gap-10 border-t border-paper-line pt-12 sm:mt-14 sm:pt-14 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-0">
          <div className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
            <SectionHeader title="Ce puteți personaliza" />
            <CheckList items={personalizationOptions} />
          </div>
          <div className="lg:row-span-2 lg:grid lg:grid-rows-subgrid">
            <SectionHeader title="Idei de ocazii pentru un cadou personalizat" />
            <ul className="grid grid-cols-2 gap-x-4 gap-y-5">
              {occasions.map((occasion) => (
                <li
                  key={occasion.title}
                  className={`border-l-2 border-amber-400 pl-3 ${
                    occasion === christmas ? 'col-span-2' : ''
                  }`}
                >
                  <h3 className="font-semibold text-zinc-900">
                    {occasion.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                    {occasion.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-16">
          <SectionHeader
            title="Cadouri personalizate pentru firme"
            intro={
              <p>
                Pentru colegi, clienți și parteneri: de la piese unice la
                producție de serie.
              </p>
            }
            className="mb-0!"
          />
          <CheckList
            items={businessGifts}
            className="rounded-2xl border border-paper-line bg-paper p-5 sm:p-6"
          />
        </div>
      </Section>

      <OrderBlock
        title="Cum comandați un cadou personalizat"
        intro="Scrieți-ne pe WhatsApp sau pe email cu aceste detalii:"
        checklist={quoteChecklist}
        checklistTitle={null}
        whatsappMessage={product.orderMessage}
        emailSubject="Cerere ofertă - cadou personalizat"
      />

      <Faq items={faqItems} whatsappMessage={product.orderMessage} />
    </>
  )
}
