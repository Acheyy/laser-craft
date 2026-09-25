import { Link, createFileRoute } from '@tanstack/react-router'
import type * as React from 'react'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { WhatsAppIcon } from '~/components/Icon'
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
import { DELIVERY, SHOW_CHRISTMAS_PROMO, whatsappHref } from '~/data/business'
import images from '~/data/images.gen.json'
import { getProduct } from '~/data/products'
import {
  BUSINESS_ID,
  SITE_URL,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

const schemaImages = [
  '/img/products/breloc-nume-plexiglas-doua-straturi',
  '/img/products/breloc-gravat-mesaj-personalizat',
  '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
  '/img/products/decor-love-pisici-plexiglas-roz',
] as const satisfies ReadonlyArray<ImageName>

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

export const Route = createFileRoute('/cadouri-personalizate')({
  component: CadouriPersonalizatePage,
  head: () => ({
    ...seo({
      title: 'Cadouri Personalizate din Plexiglas – Craiova | LaserCraft',
      description:
        'Cadouri personalizate din plexiglas, tăiate și gravate laser în Craiova: brelocuri cu nume sau mesaj și decor cu suport. Preț la cerere, ofertă gratuită.',
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
        name: 'Cadouri personalizate din plexiglas',
        serviceType: 'Cadouri personalizate tăiate și gravate laser',
        description:
          'Cadouri personalizate din plexiglas tăiate și gravate laser — brelocuri cu nume sau mesaj, decoruri cu suport și forme decorative — realizate în atelierul LaserCraft din Craiova.',
        url: `${SITE_URL}/cadouri-personalizate`,
        provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'City', name: 'Craiova' },
        image: schemaImages.map(largestVariantUrl),
      }),
    ],
  }),
})

const product = getProduct('/cadouri-personalizate')

type GiftGroup = {
  title: string
  intro: React.ReactNode
  items: ModelItem[]
}

// The three gift categories keep their own H2s (each is a search topic).
const keychains: GiftGroup = {
  title: 'Brelocuri personalizate cu nume sau mesaj',
  intro:
    'Le facem din plexiglas colorat pe două straturi, cu literele aplicate pe fundal, sau dintr-o piesă gravată cu textul și desenul dorite.',
  items: [
    {
      image: '/img/products/breloc-nume-plexiglas-doua-straturi',
      alt: 'Breloc cu numele „Jonut” din plexiglas pe două straturi, cu litere albe aplicate pe fundal roz, ținut în palmă',
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

const personalizationOptions: React.ReactNode[] = [
  'Numele, inițialele sau un mesaj scurt, tăiate din plexiglas sau gravate laser.',
  <>
    Un desen, un simbol sau un logo, prin{' '}
    <Link to="/gravura-laser-craiova" className={textLink}>
      gravură laser
    </Link>{' '}
    la până la 1200 DPI.
  </>,
  'Plexiglas (acril) transparent, colorat sau oglindă, pe unul sau două straturi.',
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
    title: 'Colegi și clienți',
    description: 'Brelocuri cu mesaj sau logo, în serie.',
  },
]

// Christmas goes first while the ornaments are promoted; it spans both
// columns so the 2-column grid has no empty cell.
const occasions = SHOW_CHRISTMAS_PROMO
  ? [christmas, ...otherOccasions]
  : [...otherOccasions, christmas]

const quoteChecklist = [
  'Obiectul dorit și textul de pe piesă',
  'Materialul și culorile (vă ajutăm să le alegeți)',
  'Mărimea aproximativă și câte bucăți doriți',
  'Fișierele de design, dacă există (desen sau logo)',
  'Termenul dorit',
]

const faqItems = [
  {
    question: 'Cât costă un cadou personalizat din plexiglas?',
    answer: (
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
        Un nume, un mesaj, un desen sau un logo, la o rezoluție de până la 1200
        DPI. Gravăm pe plexiglas, dar și pe lemn, sticlă sau piele.
      </p>
    ),
  },
  {
    question: 'Pot trimite propriul design?',
    answer: (
      <p>
        Da. Trimiteți-ne fișierul împreună cu dimensiunile și cantitatea dorite.
        Dacă nu aveți un fișier, descrieți-ne ideea sau trimiteți-ne o poză.
      </p>
    ),
  },
  {
    question: 'În cât timp este gata comanda?',
    answer: (
      <p>
        Menționați termenul dorit când cereți oferta. Oferim și execuție
        urgentă de la 24 de ore.
      </p>
    ),
  },
  {
    question: 'Puteți trimite cadoul prin curier?',
    answer: <p>Da. {DELIVERY}</p>,
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
              whatsappMessage={product.whatsappMessage}
              sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 50vw"
            />
          </li>
        ))}
        {children}
      </ul>
    </div>
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
            <Highlight>Cadouri personalizate</Highlight> din plexiglas,
            realizate în Craiova
          </>
        }
        intro={
          <p>
            Realizăm cadouri personalizate din plexiglas în atelierul nostru de
            tăiere și gravură laser din Craiova: brelocuri cu nume sau mesaj,
            decoruri cu suport și forme decorative.
          </p>
        }
        chips={[
          'Preț la cerere · ofertă gratuită',
          'Livrare prin curier în toată România',
        ]}
        whatsappMessage={product.whatsappMessage}
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
      </Section>

      <Section tone="muted">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-12">
          <SectionHeader
            title="Cât costă un cadou personalizat"
            intro={
              <p>
                <strong className="font-semibold text-zinc-900">
                  Preț la cerere
                </strong>
                . Depinde de dimensiuni, material, design și cantitate. Pentru
                cantități mari oferim reduceri.
              </p>
            }
            className="mb-0!"
          />
          {/* Mobile has the sticky WhatsApp bar; desktop gets a direct CTA */}
          <div className="hidden shrink-0 lg:block">
            <a
              href={whatsappHref(product.whatsappMessage)}
              target="_blank"
              rel="noopener"
              data-placement="price"
              className={buttonClass('primary', 'lg')}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Cereți ofertă
            </a>
          </div>
        </div>

        {/* subgrid starts both lists on the same line although the second
            heading wraps to two lines */}
        <div className="mt-12 grid gap-10 border-t border-zinc-200 pt-12 sm:mt-14 sm:pt-14 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-0">
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

      <OrderBlock
        title="Cum comandați un cadou personalizat"
        intro="Scrieți-ne pe WhatsApp sau pe email cu aceste detalii:"
        checklist={quoteChecklist}
        checklistTitle={null}
        whatsappMessage={product.whatsappMessage}
        emailSubject="Cerere ofertă - cadou personalizat"
      />

      <Faq items={faqItems} />
    </>
  )
}
