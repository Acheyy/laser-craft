import { Link, createFileRoute } from '@tanstack/react-router'
import type * as React from 'react'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Highlight, PageHero, type HeroImage } from '~/components/PageHero'
import { IdeaCard, ModelCard, type ModelItem } from '~/components/ProductCards'
import { type ImageName } from '~/components/ResponsiveImage'
import {
  CheckList,
  Section,
  SectionHeader,
  buttonClass,
  textLink,
} from '~/components/ui'
import { DELIVERY, whatsappHref } from '~/data/business'
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
  '/img/products/glob-craciun-cu-nume-personalizat',
  '/img/products/glob-craciun-personalizat-craiova',
  '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
  '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
] as const satisfies ReadonlyArray<ImageName>

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

export const Route = createFileRoute('/globuri-craciun-personalizate')({
  component: GloburiCraciunPage,
  head: () => ({
    ...seo({
      title: 'Globuri de Crăciun Personalizate cu Nume – Craiova',
      description:
        'Globuri de Crăciun personalizate din plexiglas și lemn, tăiate laser în Craiova: cu nume, oraș, an sau mesaj, în culoarea dorită. Preț la cerere, ofertă gratuită.',
      path: '/globuri-craciun-personalizate',
      image: '/img/og/og-globuri-craciun.jpg',
      imageAlt:
        'Glob de Crăciun din plexiglas roșu personalizat cu numele „Cristina”, cu sanie și reni, LaserCraft Craiova',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        {
          name: 'Globuri de Crăciun personalizate',
          path: '/globuri-craciun-personalizate',
        },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Globuri de Crăciun personalizate din plexiglas',
        serviceType: 'Ornamente de Crăciun personalizate tăiate laser',
        description:
          'Globuri și ornamente de Crăciun din plexiglas colorat și din lemn, tăiate și gravate laser, personalizate cu nume, oraș, an sau mesaj, realizate în atelierul LaserCraft din Craiova.',
        url: `${SITE_URL}/globuri-craciun-personalizate`,
        provider: { '@id': BUSINESS_ID },
        areaServed: [{ '@type': 'City', name: 'Craiova' }],
        image: schemaImages.map(largestVariantUrl),
      }),
    ],
  }),
})

const product = getProduct('/globuri-craciun-personalizate')

const ornaments: ModelItem[] = [
  {
    image: '/img/products/glob-craciun-cu-nume-personalizat',
    alt: 'Glob de Crăciun din plexiglas roșu personalizat cu numele „Cristina”, cu Moș Crăciun în sanie, reni și fulgi de nea',
    title: 'Glob personalizat cu nume',
    description: 'Numele dorit, pe banda centrală.',
    meta: 'Plexiglas roșu',
  },
  {
    image: '/img/products/glob-craciun-personalizat-craiova',
    alt: 'Glob de Crăciun din plexiglas verde personalizat cu textul „Craiova 26”, cu sanie, reni și fulgi de nea decupați laser',
    title: 'Glob cu numele orașului și anul',
    description: 'Orașul și anul se pot schimba.',
    meta: 'Plexiglas verde',
  },
  {
    image: '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
    alt: 'Glob de Crăciun din plexiglas negru cu sat de iarnă decupat laser: case, biserică, brazi și stea în vârf',
    title: 'Glob cu sat de iarnă',
    meta: 'Plexiglas negru',
  },
  {
    image: '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
    alt: 'Glob de Crăciun din plexiglas verde cu Moș Crăciun în sanie trasă de un ren, stele și brazi decupați laser',
    title: 'Glob cu sanie și ren',
    meta: 'Plexiglas verde',
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
  {
    image: '/img/products/ornament-craciun-bastoane-rosii',
    alt: 'Ornament de Crăciun din plexiglas roșu cu două bastoane legate cu fundă și fulgi de nea decupați laser',
    title: 'Bastoane de Crăciun',
    meta: 'Plexiglas roșu',
  },
  {
    image: '/img/products/ornament-craciun-fulg-de-nea-alb',
    alt: 'Ornament fulg de nea din plexiglas alb tăiat laser, cu orificiu pentru agățare în brad',
    title: 'Fulg de nea',
    meta: 'Plexiglas alb',
  },
  {
    image: '/img/products/ornament-craciun-inima-geometrica-roz',
    alt: 'Ornament inimă geometrică din plexiglas roz tăiat laser, agățat cu o panglică roșie',
    title: 'Inimă geometrică',
    meta: 'Plexiglas roz',
  },
  {
    image: '/img/products/ornament-craciun-spiridus-luna',
    alt: 'Ornament de Crăciun din plexiglas verde cu un spiriduș pe o semilună și stele decupate laser',
    title: 'Spiriduș pe lună',
    meta: 'Plexiglas verde',
  },
  {
    image: '/img/products/glob-craciun-fericit-plexiglas-verde',
    alt: 'Ornament rotund de Crăciun din plexiglas verde cu textul „Crăciun Fericit” și fulgi de nea, tăiat laser',
    title: 'Ornament „Crăciun Fericit”',
    meta: 'Plexiglas verde',
  },
]

// Hero photos reuse the gallery alts; the first one loads with priority.
const heroPhotos: Array<Omit<HeroImage, 'alt'>> = [
  { name: '/img/products/glob-craciun-cu-nume-personalizat' },
  // keeps „Craiova 26” inside the desktop collage crop
  {
    name: '/img/products/glob-craciun-personalizat-craiova',
    position: '50% 60%',
  },
  { name: '/img/products/glob-craciun-sanie-reni-plexiglas-verde' },
]

const heroMedia: HeroImage[] = heroPhotos.map((photo) => ({
  ...photo,
  alt: ornaments.find((ornament) => ornament.image === photo.name)!.alt,
}))

const personalizationOptions: Array<{
  title: string
  detail: React.ReactNode
}> = [
  { title: 'Un nume', detail: 'ca pe modelul „Cristina”' },
  { title: 'Orașul și anul', detail: 'ca pe globul „Craiova 26”' },
  { title: 'O urare', detail: '„Crăciun Fericit” sau textul dorit' },
  // The gallery cards already name each model's material and colour.
  {
    title: 'Materialul',
    detail: 'plexiglas transparent, colorat sau oglindă, ori lemn',
  },
  {
    title: 'Motivul',
    detail: 'sanie cu reni, fulgi de nea, sat de iarnă sau designul propriu',
  },
  {
    title: 'Detalii gravate',
    detail: (
      <>
        prin{' '}
        <Link to="/gravura-laser-craiova" className={textLink}>
          gravură laser pe plexiglas
        </Link>
        , până la 1200 DPI
      </>
    ),
  },
]

const ideas = [
  'Un set pentru bradul familiei, cu numele fiecăruia, în aceeași culoare',
  'Un cadou de sărbători cu numele celui drag',
  'Ornamente cu numele firmei sau cu o urare, pentru colegi și clienți',
]

const quoteChecklist = [
  'Modelul din galerie sau ideea dumneavoastră, plus numele sau urarea dorită',
  'Materialul: plexiglas transparent, colorat sau oglindă, ori lemn (vă ajutăm să alegeți)',
  'Dimensiunile și cantitatea, de la un singur glob la producție de serie',
  'Fișierele de design, dacă există',
  'Data la care vreți globurile',
]

const faqItems = [
  {
    question: 'Ce se poate scrie pe un glob de Crăciun personalizat?',
    answer:
      'Un nume, numele orașului și anul, o urare precum „Crăciun Fericit” sau textul dorit de dumneavoastră, decupat laser în plexiglas.',
  },
  {
    question: 'Cât costă un glob de Crăciun personalizat?',
    answer:
      'Prețul este la cerere și depinde de model, dimensiuni și cantitate. Oferta este gratuită.',
  },
  {
    question: 'Faceți și globuri de Crăciun din lemn?',
    answer:
      'Da. Pe lângă plexiglas, tăiem și gravăm laser globuri din lemn, natur sau baițuit, cu nume, oraș sau alt text, ca modelele „Nicolas” și „Craiova” din galerie.',
  },
  {
    question: 'Pot comanda globuri personalizate pentru colegi sau clienți?',
    answer:
      'Da. Lucrăm de la piese unice la producție de serie. Trimiteți-ne textul pentru fiecare glob și numărul de bucăți.',
  },
  {
    question: 'Pot trimite propriul design?',
    answer:
      'Da, personalizarea este completă. Ne puteți trimite fișierele de design, dacă le aveți, sau puteți porni de la un model din galerie.',
  },
  {
    question: 'Când ar trebui să comand globurile?',
    answer:
      'Vă recomandăm să ne contactați din timp înainte de sărbători, mai ales pentru comenzile cu multe bucăți. La nevoie, oferim execuție urgentă de la 24 de ore.',
  },
  {
    question: 'Cum se agață globurile în brad?',
    answer:
      'Modelele din galerie au în partea de sus un mic orificiu pentru agățare, prin care puteți trece o panglică sau un șnur.',
  },
  {
    question: 'Livrați globurile și în alte orașe?',
    answer: `Da. ${DELIVERY}`,
  },
]

function GloburiCraciunPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Globuri de Crăciun personalizate' },
        ]}
        title={
          <>
            Globuri de Crăciun <Highlight>personalizate</Highlight> din
            plexiglas, în Craiova
          </>
        }
        intro={
          <p>
            Realizăm în atelierul nostru din Craiova globuri de Crăciun
            personalizate din plexiglas și lemn, tăiate laser: ornamente pentru
            brad cu un nume, cu orașul și anul sau cu o urare, în culoarea
            dorită.
          </p>
        }
        chips={[
          'Preț la cerere · ofertă gratuită',
          'Livrare prin curier în toată România',
        ]}
        whatsappMessage={product.whatsappMessage}
        media={heroMedia}
      />

      <Section>
        <SectionHeader
          title="Modele de globuri și ornamente de Crăciun din plexiglas și lemn"
          intro={
            <p>
              Lucrări reale, tăiate laser în atelierul nostru din Craiova, cu
              orificiu pentru agățare. Putem adapta textul, culoarea sau
              motivul oricărui model. Vedeți și{' '}
              <Link to="/portofoliu" className={textLink}>
                portofoliul LaserCraft
              </Link>
              .
            </p>
          }
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {ornaments.map((ornament) => (
            <li key={ornament.image}>
              <ModelCard
                item={ornament}
                whatsappMessage={product.whatsappMessage}
              />
            </li>
          ))}
          {/* 11 models leave one empty slot in both the 2- and 3-column
              grids; this tile fills it. */}
          <li>
            <IdeaCard
              text="Trimiteți-ne o poză sau o schiță a ornamentului dorit."
              whatsappMessage={product.whatsappMessage}
              className="h-full"
            />
          </li>
        </ul>
      </Section>

      <Section tone="muted">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-12">
          <SectionHeader
            title="Cât costă globurile de Crăciun personalizate"
            intro={
              <p>
                <strong className="font-semibold text-zinc-900">
                  Preț la cerere
                </strong>
                . Prețul depinde de modelul ales sau designul propriu, de
                dimensiunile ornamentelor și de numărul de bucăți. Pentru
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
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionHeader
              title="Ce puteți personaliza pe un glob de Crăciun"
              intro={
                <p>
                  Ornamentele sunt realizate prin{' '}
                  <Link to="/taiere-laser-plexiglas" className={textLink}>
                    tăiere laser a plexiglasului
                  </Link>
                  , cu margini lustruite, iar textul este decupat direct în
                  glob.
                </p>
              }
            />
            <CheckList
              items={personalizationOptions.map((option) => (
                <>
                  <span className="block font-semibold leading-snug text-zinc-900">
                    {option.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-zinc-600">
                    {option.detail}
                  </span>
                </>
              ))}
              className="grid-cols-2 gap-y-4"
            />
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-6 lg:self-start">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-balance text-zinc-900">
              Idei pentru ornamentele de brad personalizate
            </h2>
            <CheckList items={ideas} className="mt-4" />
            <p className="mt-4 text-zinc-600 leading-relaxed">
              Alte idei:{' '}
              <Link to="/cadouri-personalizate" className={textLink}>
                cadouri personalizate din plexiglas
              </Link>
              , de la brelocuri cu nume la decoruri pe suport.
            </p>
          </div>
        </div>
      </Section>

      <OrderBlock
        title="Cum comandați globuri de Crăciun personalizate"
        intro="Scrieți-ne pe WhatsApp sau pe email cu aceste detalii:"
        checklist={quoteChecklist}
        checklistTitle={null}
        whatsappMessage={product.whatsappMessage}
        emailSubject="Cerere ofertă - globuri de Crăciun personalizate"
      >
        <p className="mt-8 flex gap-3 rounded-xl bg-amber-400/10 p-4 text-sm leading-relaxed text-zinc-200 ring-1 ring-inset ring-amber-400/30">
          <Icon name="clock" className="w-5 h-5 shrink-0 text-amber-400" />
          <span>
            <strong className="font-semibold text-white">
              Comandați din timp înainte de sărbători.
            </strong>{' '}
            Execuție urgentă de la 24 de ore.
          </span>
        </p>
      </OrderBlock>

      <Faq items={faqItems} />
    </>
  )
}
