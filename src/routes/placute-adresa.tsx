import { Link, createFileRoute } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Highlight, PageHero } from '~/components/PageHero'
import { IdeaCard, ModelCard, type ModelItem } from '~/components/ProductCards'
import type { ImageName } from '~/components/ResponsiveImage'
import { Testimonials } from '~/components/Testimonials'
import {
  CheckList,
  Section,
  SectionHeader,
  buttonClass,
  textLink,
} from '~/components/ui'
import {
  PLAQUE_MIN_PRICE,
  PRECISION,
  URGENT,
  formatLei,
  plaquePricing,
  whatsappHref,
} from '~/data/business'
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

const product = getProduct('/placute-adresa')

const sortedPricing = [...plaquePricing].sort((a, b) => a.price - b.price)
const cheapest = sortedPricing[0]
const priciest = sortedPricing[sortedPricing.length - 1]
const standardSizes = sortedPricing.map((item) => item.size)

const productImages: ImageName[] = [
  '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
  '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
  '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
]

export const Route = createFileRoute('/placute-adresa')({
  component: PlacuteAdresaPage,
  head: () => ({
    ...seo({
      title: `Plăcuțe de adresă din plexiglas Craiova – de la ${formatLei(cheapest.price)}`,
      description: `Plăcuțe de adresă din plexiglas pe 2 straturi, de la ${formatLei(cheapest.price)} (${cheapest.size}), și numere de casă decupate laser, realizate în Craiova. Ofertă gratuită.`,
      path: '/placute-adresa',
      image: '/img/og/og-placute-adresa-2.jpg',
      imageAlt:
        'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii, realizată de LaserCraft Craiova',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        { name: 'Plăcuțe de adresă', path: '/placute-adresa' },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Plăcuță de adresă din plexiglas pe 2 straturi',
        url: `${SITE_URL}/placute-adresa`,
        image: productImages.map((name) =>
          absoluteUrl(`${name}-${images[name].width}.webp`),
        ),
        description:
          'Plăcuță de adresă personalizată din plexiglas, construită pe 2 straturi (fundal + litere/cifre aplicate), tăiată și gravată laser în atelierul LaserCraft din Craiova.',
        brand: { '@type': 'Brand', name: 'LaserCraft' },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: cheapest.price,
          highPrice: priciest.price,
          priceCurrency: 'RON',
          offerCount: plaquePricing.length,
          availability: 'https://schema.org/MadeToOrder',
          seller: { '@id': BUSINESS_ID },
          offers: sortedPricing.map((item) => ({
            '@type': 'Offer',
            name: `Plăcuță de adresă din plexiglas ${item.size}`,
            price: item.price,
            priceCurrency: 'RON',
            availability: 'https://schema.org/MadeToOrder',
          })),
        },
      }),
    ],
  }),
})

// Ordered so every desktop row of 3 ends level: the two squares beside the
// tall floral number, then the two 4:3 photos beside the idea tile. On phones
// the floral number moves down next to the idea tile (phoneLast), so the
// 2-column pairs match as well: 1:1, 4:3, then 3:4 + idea.
const models: Array<ModelItem & { orderable: boolean; phoneLast?: boolean }> = [
  {
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
    alt: 'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii volumetrice, prinsă cu distanțiere din inox',
    title: 'Litere și cifre aurii volumetrice',
    description:
      'Numele străzii și numărul casei aplicate în auriu, montaj cu distanțiere din inox.',
    meta: 'Plexiglas negru + auriu',
    orderable: true,
  },
  {
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
    alt: 'Plăcuță de adresă orizontală din plexiglas negru lucios cu cifre aurii și distanțiere aurii',
    title: 'Format orizontal, negru lucios',
    description: 'Numărul casei în cifre aurii, cu distanțiere aurii asortate.',
    meta: 'Plexiglas negru lucios + auriu',
    orderable: true,
  },
  {
    image: '/img/products/numar-casa-plexiglas-negru-model-floral',
    alt: 'Număr de casă 32 din plexiglas negru, cu cifre decupate și model floral tăiat laser',
    title: 'Număr de casă cu model floral',
    description:
      'Cifrele casei decupate într-o bandă de plexiglas, cu model floral tăiat laser.',
    meta: 'Plexiglas negru',
    orderable: true,
    phoneLast: true,
    // Portrait photo in a row of two square ones; the square crop keeps the
    // whole plate.
    frame: 'square',
  },
  {
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
    alt: 'Plăcuță de adresă din plexiglas negru lucios cu pictogramă de casă și text auriu',
    title: 'Pictogramă de casă și text auriu',
    description: 'Numele străzii și numărul în auriu, montaj cu distanțiere.',
    meta: 'Plexiglas negru lucios + auriu',
    orderable: true,
  },
  {
    image: '/img/products/placuta-adresa-metal-decupat',
    alt: 'Plăcuță de adresă din oțel vopsit negru mat, decupată laser, cu siluetă de casă și text personalizat',
    title: 'Plăcuță din metal decupată laser',
    description:
      'Proiect unicat din portofoliu, cu pictograma casei și textul decupate laser; nu face parte din oferta standard.',
    meta: 'Oțel vopsit mat',
    // A one-off project, not an orderable product
    orderable: false,
  },
]

// What to send for a quote: not sequential, so a checklist rather than steps.
const orderChecklist = [
  'Mărimea (standard sau la comandă) și numărul de bucăți',
  'Combinația de culori (vă ajutăm să alegeți, dacă e nevoie)',
  'Textul exact de pe plăcuță și, dacă există, logo-ul',
  'Fișierele de design, dacă există',
  `Termenul dorit (${URGENT}, la nevoie)`,
]

// Price-free anchors: the per-cm² rate lives on /taiere-laser-plexiglas only.
const relatedServices = [
  {
    to: '/taiere-laser-plexiglas',
    anchor: 'Tăiere laser plexiglas la comandă',
    note: 'Piese și semnalistică din plexiglas.',
  },
  {
    to: '/litere-volumetrice',
    anchor: 'Litere volumetrice pentru decor de evenimente',
    note: 'Nume și inscripții 3D pentru evenimente și firme.',
  },
  {
    to: '/gravura-laser-craiova',
    anchor: 'Gravură laser în Craiova',
    note: 'Logo gravat pe lemn, sticlă sau piele.',
  },
] as const

function PlacuteAdresaPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Plăcuțe de adresă' },
        ]}
        title={
          <>
            Plăcuțe de adresă din plexiglas,{' '}
            <Highlight>personalizate</Highlight> în Craiova
          </>
        }
        intro={
          <p>
            Plăcuțe de adresă din plexiglas pe 2 straturi, tăiate și gravate
            laser în atelierul nostru din Craiova, cu numărul casei, numele
            străzii și, la cerere, un simbol grafic. Realizăm și numere de casă
            decupate laser.
          </p>
        }
        chips={[
          `${plaquePricing.length} mărimi · de la ${formatLei(PLAQUE_MIN_PRICE)}`,
          'Livrare prin curier în toată România',
        ]}
        whatsappMessage={product.orderMessage}
        // The three plaques; the floral house number stays in the gallery.
        media={models
          .filter((model) => productImages.includes(model.image))
          .map((model) => ({ name: model.image, alt: model.alt }))}
      />

      <Section id="preturi">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div>
            <SectionHeader title="Prețuri plăcuțe de adresă" />
            <div className="overflow-hidden rounded-2xl border border-paper-line">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Prețuri plăcuțe de adresă din plexiglas pe 2 straturi
                </caption>
                <thead className="bg-paper text-xs font-semibold uppercase tracking-wider text-zinc-600">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      Dimensiune
                    </th>
                    <th scope="col" className="px-5 py-3 text-right">
                      Preț
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-paper-line">
                  {sortedPricing.map((item) => (
                    <tr key={item.size}>
                      <th
                        scope="row"
                        className="px-5 py-3.5 font-semibold text-zinc-900 whitespace-nowrap"
                      >
                        {item.size}
                      </th>
                      <td className="px-5 py-3.5 text-right text-lg font-bold text-zinc-900 whitespace-nowrap">
                        {formatLei(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* The sticky bar can't carry the size: this message starts with
                it, so the visitor only has to type it. */}
            <a
              href={whatsappHref(`${product.whatsappMessage} Mărimea dorită: `)}
              target="_blank"
              rel="noopener"
              data-placement="price-table"
              className={buttonClass('primary', 'md', 'mt-4 w-full sm:w-auto')}
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              Comandați pe WhatsApp
            </a>
          </div>

          <div className="rounded-2xl border border-paper-line bg-paper p-5 sm:p-6">
            <h3 className="text-lg font-bold text-zinc-900">
              Ce include prețul
            </h3>
            <CheckList
              className="mt-3"
              items={[
                'Ambele straturi de plexiglas',
                'Tăierea laser',
                'Gravarea textului',
              ]}
            />

            <h3 className="mt-6 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <Icon name="layers" className="w-5 h-5 text-amber-600" />
              Construcția pe 2 straturi
            </h3>
            <ol className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600">
              {[
                {
                  label: 'Fundalul',
                  text: 'placa de bază, tăiată laser la dimensiunea aleasă, care dă culoarea de fond (în portofoliu, negru lucios).',
                },
                {
                  label: 'Literele și cifrele',
                  text: 'numărul casei, numele străzii și eventualele simboluri, din plexiglas de altă culoare, aplicate pe fundal pentru un efect volumetric.',
                },
              ].map((layer, index) => (
                <li key={layer.label} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="flex w-7 h-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800"
                  >
                    {index + 1}
                  </span>
                  <p>
                    <strong className="font-semibold text-zinc-900">
                      {layer.label}:
                    </strong>{' '}
                    {layer.text}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Tăiem plexiglas transparent, colorat sau oglindă, cu margini
              lustruite și toleranțe de {PRECISION}, așa că și cifrele fine au
              contururi precise.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          title="Modele de plăcuțe de adresă și numere de casă"
          intro={
            <p>
              Plăcuțe realizate în atelierul din Craiova. Mai multe lucrări
              găsiți în{' '}
              <Link to="/portofoliu" className={textLink}>
                portofoliul LaserCraft
              </Link>
              .
            </p>
          }
        />
        {/* Each row stretches to its tallest card and ModelCard pins its link
            to the bottom, so the CTAs line up across a row. */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {models.map(({ orderable, phoneLast, ...model }) => (
            <li
              key={model.image}
              className={phoneLast ? 'max-lg:order-1' : undefined}
            >
              <ModelCard
                item={model}
                whatsappMessage={
                  orderable ? product.whatsappMessage : undefined
                }
              />
            </li>
          ))}
          {/* 6th cell: completes the last row of the 2- and 3-column grids. */}
          <li className="max-lg:order-1">
            <IdeaCard
              text="Trimiteți-ne o poză sau fișierul de design."
              whatsappMessage={product.whatsappMessage}
              className="h-full"
            />
          </li>
        </ul>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 lg:items-center lg:gap-12">
          <SectionHeader
            title="Dimensiuni la comandă, logo sau design personalizat"
            intro={
              <p>
                Dacă formatele standard nu vi se potrivesc, realizăm plăcuțe de
                adresă în orice formă, cu dimensiuni la comandă, cu logo sau cu
                designul dumneavoastră. Prețul lor îl stabilim prin ofertă
                gratuită.
              </p>
            }
          />
          <div className="rounded-2xl border border-paper-line bg-paper p-5 sm:p-6">
            <h3 className="text-lg font-bold text-zinc-900">Servicii înrudite</h3>
            <ul className="mt-1 divide-y divide-paper-line">
              {relatedServices.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center justify-between gap-3 py-3"
                  >
                    <span>
                      <span className={textLink}>{item.anchor}</span>
                      <span className="mt-0.5 block text-sm text-zinc-600">
                        {item.note}
                      </span>
                    </span>
                    <Icon
                      name="chevronRight"
                      className="w-5 h-5 shrink-0 text-amber-600 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Testimonials to="/placute-adresa" />

      <OrderBlock
        title="Cum comandați o plăcuță de adresă"
        intro="Scrieți-ne pe WhatsApp sau pe email cu aceste detalii:"
        checklist={orderChecklist}
        checklistTitle={null}
        whatsappMessage={product.orderMessage}
        emailSubject="Cerere ofertă - plăcuță de adresă"
      />

      <Faq
        whatsappMessage={product.orderMessage}
        items={[
          {
            question: 'Cât costă o plăcuță de adresă din plexiglas?',
            answer: `Formatele standard costă între ${formatLei(cheapest.price)} (${cheapest.size}) și ${formatLei(priciest.price)} (${priciest.size}). Prețul include ambele straturi de plexiglas, tăierea și gravarea textului.`,
          },
          {
            question: 'Ce dimensiuni sunt disponibile?',
            answer: `Formatele standard sunt ${standardSizes.slice(0, -1).join(', ')} și ${standardSizes[standardSizes.length - 1]}. Pentru alte dimensiuni vă pregătim o ofertă gratuită.`,
          },
          {
            // A different build from the 2-layer plaque: no price from the table.
            question: 'Puteți face doar numărul casei?',
            answer:
              'Da, ca modelul „Număr de casă cu model floral” din galerie: cifrele decupate într-o bandă de plexiglas. Prețul îl stabilim prin ofertă gratuită.',
          },
          {
            question: 'Pot adăuga un logo sau un design propriu?',
            answer:
              'Da. Plăcuțele cu logo sau cu design propriu se realizează pe bază de ofertă. Trimiteți-ne fișierele de design, dacă le aveți, împreună cu dimensiunile dorite.',
          },
          {
            question: 'În cât timp este gata plăcuța?',
            // Leads with the usual turnaround once the owner gives it.
            answer: product.leadTime
              ? `${product.leadTime} La nevoie, oferim ${URGENT}. Menționați termenul dorit când ne scrieți.`
              : `Lucrăm cu termene de execuție scurte și, la nevoie, oferim ${URGENT}. Menționați termenul dorit când ne scrieți.`,
          },
          {
            question: 'Ce culori de plexiglas pot alege?',
            answer:
              'Prelucrăm plexiglas transparent, colorat sau oglindă. Modelele din portofoliu combină fundalul negru lucios cu litere și cifre aurii; pentru o altă combinație, menționați-o când ne scrieți.',
          },
          {
            question: 'Oferiți reduceri pentru mai multe plăcuțe?',
            answer:
              'Da, pentru cantități mari oferim reduceri. Precizați numărul de bucăți când ne scrieți.',
          },
          {
            question: 'Livrați plăcuța și în alte orașe?',
            answer:
              'Da, livrăm prin curier în toată România. În Craiova puteți ridica personal comanda.',
          },
        ]}
      />
    </>
  )
}
