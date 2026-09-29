import { Link, createFileRoute } from '@tanstack/react-router'
import type * as React from 'react'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Highlight, PageHero, type HeroImage } from '~/components/PageHero'
import {
  IdeaCard,
  ModelCard,
  type ModelItem,
  ShopPriceTable,
  shopPriceLabel,
} from '~/components/ProductCards'
import { type ImageName } from '~/components/ResponsiveImage'
import { Testimonials } from '~/components/Testimonials'
import {
  CheckList,
  Section,
  SectionHeader,
  buttonClass,
  textLink,
  textLinkDark,
} from '~/components/ui'
import {
  DPI,
  URGENT,
  activeChristmasDeadline,
  bucharestTodayIso,
  formatLei,
  type ActiveChristmasDeadline,
  whatsappHref,
} from '~/data/business'
import images from '~/data/images.gen.json'
import { getProduct } from '~/data/products'
import { formatSize, getShopProduct, shopProductsIn } from '~/data/shop'
import {
  BUSINESS_ID,
  SERVICE_AREA,
  SITE_URL,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

const product = getProduct('/globuri-craciun-personalizate')

const schemaImages = [
  '/img/products/glob-craciun-cu-nume-personalizat',
  '/img/products/glob-craciun-personalizat-craiova',
  '/img/products/glob-craciun-lemn-nume-nicolas',
  '/img/products/glob-craciun-lemn-craiova-brad',
  '/img/products/glob-craciun-lemn-nume-cristina-ren',
  '/img/products/glob-craciun-lemn-straturi-craciun-fericit',
  '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
  '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
] as const satisfies ReadonlyArray<ImageName>

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

// Owner-supplied dates like '10 decembrie' must not split across lines.
const keepTogether = (text: string) => text.replace(/ /g, '\u00a0')

// "Execuție urgentă de la 24 de ore" at the start of a sentence
const urgentSentence = `${URGENT[0].toUpperCase()}${URGENT.slice(1)}.`

// The shop's Christmas prices, one per material ("10 lei" while every model
// of a material costs the same).
const plexiglasShop = shopProductsIn('craciun').filter((p) => p.material === 'plexiglas')
const woodShop = shopProductsIn('craciun').filter((p) => p.material === 'lemn')
const globeSize = formatSize(getShopProduct('glob-craciun-cu-nume')!.size)
const layeredGlobeSize = formatSize(getShopProduct('glob-craciun-fericit-lemn-pictat')!.size)

export const Route = createFileRoute('/globuri-craciun-personalizate')({
  component: GloburiCraciunPage,
  // Today's date in Romania for the Christmas deadline copy. It is computed
  // once on the server and hydrated, so both renders show the same text.
  loader: () => ({ today: bucharestTodayIso() }),
  head: () => ({
    ...seo({
      title: 'Globuri personalizate cu nume, din lemn și plexiglas – Craiova',
      // The shop prices per material; the cheaper one is the page's
      // starting price (product.fromPrice).
      description: `Globuri de Crăciun personalizate cu nume: ${shopPriceLabel(
        plexiglasShop,
      )}/buc. din plexiglas, ${shopPriceLabel(
        woodShop,
      )}/buc. din lemn, numele inclus. Tăiate laser în Craiova, livrare în toată România.`,
      path: '/globuri-craciun-personalizate',
      image: '/img/og/og-globuri-craciun.jpg',
      imageAlt:
        'Glob de Crăciun din plexiglas roșu personalizat cu numele „Cristina”, cu sanie și reni, LaserCraft Craiova',
    }),
    // No Product node here: Google shows product rich results only for a
    // page about one product, and each ornament's /magazin page carries its
    // own Product and Offer.
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
        name: 'Globuri de Crăciun personalizate din plexiglas și lemn',
        serviceType: 'Ornamente de Crăciun personalizate tăiate laser',
        description:
          'Globuri și ornamente de Crăciun din plexiglas colorat și din lemn, tăiate și gravate laser, personalizate cu nume, oraș, an sau mesaj, realizate în atelierul LaserCraft din Craiova.',
        url: `${SITE_URL}/globuri-craciun-personalizate`,
        provider: { '@id': BUSINESS_ID },
        areaServed: SERVICE_AREA,
        image: schemaImages.map(largestVariantUrl),
      }),
    ],
  }),
})

const ornaments: ModelItem[] = [
  {
    image: '/img/products/glob-craciun-cu-nume-personalizat',
    shopSlug: 'glob-craciun-cu-nume',
    alt: 'Glob de Crăciun din plexiglas roșu personalizat cu numele „Cristina”, cu Moș Crăciun în sanie, reni și fulgi de nea',
    title: 'Glob personalizat cu nume',
    description: 'Numele dorit, pe banda centrală.',
    meta: 'Plexiglas roșu',
  },
  {
    image: '/img/products/glob-craciun-personalizat-craiova',
    shopSlug: 'glob-craciun-craiova',
    alt: 'Glob de Crăciun din plexiglas verde personalizat cu textul „Craiova 26”, cu sanie, reni și fulgi de nea decupați laser',
    title: 'Glob cu numele orașului și anul',
    description: 'Orașul și anul se pot schimba.',
    meta: 'Plexiglas verde',
  },
  {
    image: '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
    shopSlug: 'glob-craciun-sat-de-iarna',
    alt: 'Glob de Crăciun din plexiglas negru cu sat de iarnă decupat laser: case, biserică, brazi și stea în vârf',
    title: 'Glob cu sat de iarnă',
    meta: 'Plexiglas negru',
  },
  {
    image: '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
    shopSlug: 'glob-craciun-sanie-si-ren',
    alt: 'Glob de Crăciun din plexiglas verde cu Moș Crăciun în sanie trasă de un ren, stele și brazi decupați laser',
    title: 'Glob cu sanie și ren',
    meta: 'Plexiglas verde',
  },
  {
    image: '/img/products/glob-craciun-lemn-nume-nicolas',
    shopSlug: 'glob-craciun-lemn-cu-nume',
    alt: 'Glob de Crăciun rotund din lemn baițuit, gravat laser cu numele „Nicolas”, un om de zăpadă cu joben și mătură, o căsuță cu horn și fulgi de nea',
    title: 'Glob din lemn cu nume',
    description: 'Numele dorit, gravat în lemn.',
    meta: 'Lemn baițuit',
  },
  {
    image: '/img/products/glob-craciun-lemn-craiova-brad',
    shopSlug: 'glob-craciun-lemn-craiova',
    alt: 'Glob de Crăciun din placaj de lemn natur tăiat laser, cu textul „Craiova”, un brad cu model dantelat de fulgi de nea și două stele',
    title: 'Glob din lemn „Craiova”',
    description: 'Orașul se poate schimba.',
    meta: 'Placaj de lemn',
  },
  {
    image: '/img/products/glob-craciun-lemn-nume-cristina-ren',
    shopSlug: 'glob-craciun-lemn-cu-nume-si-ren',
    alt: 'Glob de Crăciun rotund din lemn baițuit, gravat laser cu numele „Cristina” și un puiuț de ren cu ochi mari, cu o fundă și o floricică în coarne',
    title: 'Glob din lemn cu nume și ren',
    description: 'Numele dorit, cu un puiuț de ren gravat.',
    meta: 'Lemn baițuit',
  },
  {
    image: '/img/products/glob-craciun-lemn-straturi-craciun-fericit',
    shopSlug: 'glob-craciun-fericit-lemn-pictat',
    alt: 'Glob de Crăciun din lemn baițuit pe straturi, cu brazi decupați laser peste un cer albastru pictat cu lună și fulgi de nea, sania lui Moș Crăciun cu reni aplicată în relief argintiu și urarea gravată „Crăciun Fericit!”',
    title: 'Glob din lemn pictat, pe straturi',
    description: 'Cer pictat, cu sania în relief.',
    meta: 'Lemn baițuit și pictat',
  },
  {
    image: '/img/products/ornament-craciun-bastoane-rosii',
    shopSlug: 'bastoane-de-craciun',
    alt: 'Ornament de Crăciun din plexiglas roșu cu două bastoane legate cu fundă și fulgi de nea decupați laser',
    title: 'Bastoane de Crăciun',
    meta: 'Plexiglas roșu',
  },
  {
    image: '/img/products/ornament-craciun-fulg-de-nea-alb',
    shopSlug: 'fulg-de-nea',
    alt: 'Ornament fulg de nea din plexiglas alb tăiat laser, cu orificiu pentru agățare în brad',
    title: 'Fulg de nea',
    meta: 'Plexiglas alb',
  },
  {
    image: '/img/products/ornament-craciun-spiridus-luna',
    shopSlug: 'spiridus-pe-luna',
    alt: 'Ornament de Crăciun din plexiglas verde cu un spiriduș pe o semilună și stele decupate laser',
    title: 'Spiriduș pe lună',
    meta: 'Plexiglas verde',
  },
  {
    image: '/img/products/glob-craciun-fericit-plexiglas-verde',
    shopSlug: 'glob-craciun-fericit',
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
  { name: '/img/products/glob-craciun-lemn-nume-nicolas' },
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
          gravură laser
        </Link>
        , pe plexiglas sau pe lemn, până la {DPI}
      </>
    ),
  },
]

// Wording ideas only: any text can be cut or engraved.
const textIdeas = [
  '„Primul meu Crăciun”, cu numele bebelușului și anul',
  '„Primul nostru Crăciun împreună” sau „Primul Crăciun ca părinți”',
  'Un set pentru familie, cu numele fiecăruia',
  'Pentru educatoare și învățătoare: câte un glob cu numele fiecărui copil din grupă sau din clasă',
  '„Dragi nași” și anul',
  'Numele firmei sau o urare, pentru colegi și clienți',
]

const quoteChecklist = [
  'Modelul din galerie sau ideea dumneavoastră, plus numele sau urarea dorită',
  'Materialul: plexiglas transparent, colorat sau oglindă, ori lemn (vă ajutăm să alegeți)',
  'Dimensiunile și cantitatea, de la un singur glob la producție de serie',
  'Fișierele de design, dacă există',
  'Data la care vreți globurile',
]

// Only the order days still ahead: a passed courier day is left out.
function deadlineAnswer({ next, courier, pickup }: ActiveChristmasDeadline) {
  if (!courier) {
    return `Pentru ridicare din Craiova înainte de Crăciun, comandați până la ${keepTogether(next.label)}.`
  }
  return `Pentru livrare prin curier înainte de Crăciun, comandați până la ${keepTogether(courier.label)}${
    pickup ? `; pentru ridicare din Craiova, până la ${keepTogether(pickup.label)}` : ''
  }.`
}

function faqItems(deadline: ActiveChristmasDeadline | null) {
  return [
    ...(deadline
      ? [
          {
            question: 'Până când pot comanda globuri pentru Crăciun?',
            answer: deadlineAnswer(deadline),
          },
        ]
      : []),
    {
      question: 'Ce se poate scrie pe un glob de Crăciun personalizat?',
      answer:
        'Un nume, numele orașului și anul, o urare precum „Crăciun Fericit” sau textul dorit de dumneavoastră, decupat sau gravat laser, în plexiglas ori în lemn.',
    },
    {
      question: 'Puteți scrie „Primul meu Crăciun” și numele copilului?',
      answer:
        'Da. Decupăm sau gravăm laser textul dorit, în plexiglas ori în lemn: numele, anul și o urare scurtă.',
    },
    {
      question: 'Cât costă un glob de Crăciun personalizat?',
      answer: (
        <>
          Un glob cu nume costă {shopPriceLabel(plexiglasShop)}/buc. din
          plexiglas și {shopPriceLabel(woodShop)}/buc. din lemn; numele este
          inclus în preț. Modelele din galerie se comandă direct din{' '}
          <Link to="/magazin" hash="craciun" className={textLink}>
            magazinul online
          </Link>
          . Pentru alte modele sau dimensiuni vă facem o ofertă gratuită;
          pentru cantități mari oferim reduceri.
        </>
      ),
    },
    {
      question: 'Faceți și globuri de Crăciun din lemn?',
      answer:
        'Da. Pe lângă plexiglas, tăiem și gravăm laser globuri din lemn, natur sau baițuit, cu nume, oraș sau alt text, ca modelele „Nicolas”, „Cristina” și „Craiova” din galerie. Facem și globuri din lemn pe două straturi, cu un cer pictat în spatele brazilor decupați, ca modelul „Crăciun Fericit!”.',
    },
    {
      question: 'Pot comanda globuri personalizate pentru colegi sau clienți?',
      answer:
        'Da. Lucrăm de la piese unice la producție de serie. În magazinul online adăugați în coș câte un glob pentru fiecare nume. Pentru cantități mari oferim reduceri: trimiteți-ne pe WhatsApp textul pentru fiecare glob și numărul de bucăți.',
    },
    {
      question: 'Pot trimite propriul design pentru globuri?',
      answer:
        'Da. Ne puteți trimite fișierele de design, dacă le aveți, sau puteți porni de la un model din galerie.',
    },
    {
      question: 'Când ar trebui să comand globurile?',
      answer: product.leadTime
        ? `${product.leadTime} La nevoie, oferim ${URGENT}.`
        : `Vă recomandăm să ne contactați din timp înainte de sărbători, mai ales pentru comenzile cu multe bucăți. La nevoie, oferim ${URGENT}.`,
    },
    {
      question: 'Cum se agață globurile în brad?',
      answer:
        'Modelele din galerie au în partea de sus un mic orificiu pentru agățare, prin care puteți trece o panglică sau un șnur.',
    },
    {
      question: 'Livrați globurile și în alte orașe?',
      answer:
        'Da, livrăm prin curier în toată România. În Craiova puteți ridica personal comanda.',
    },
  ]
}

function GloburiCraciunPage() {
  const { today } = Route.useLoaderData()
  // Set only while the promo runs and an order day is still ahead
  const deadline = activeChristmasDeadline(today)

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
            plexiglas și lemn, în Craiova
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
          product.fromPrice
            ? `De la ${formatLei(product.fromPrice)}/buc. · ofertă gratuită`
            : 'Preț la cerere · ofertă gratuită',
          ...(deadline
            ? [
                `Comenzi ${deadline.next.kind === 'pickup' ? 'cu ridicare ' : ''}până la ${keepTogether(
                  deadline.next.label,
                )}`,
              ]
            : []),
          'Livrare prin curier în toată România',
        ]}
        whatsappMessage={product.orderMessage}
        media={heroMedia}
      />

      <Section>
        <SectionHeader
          title="Modele de globuri și ornamente de Crăciun din plexiglas și lemn"
          intro={
            <p>
              Modele realizate în atelierul nostru din Craiova, cu orificiu
              pentru agățare. Putem adapta textul, culoarea sau
              motivul oricărui model. Vedeți și{' '}
              <Link to="/portofoliu" className={textLink}>
                portofoliul LaserCraft
              </Link>
              .
            </p>
          }
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {ornaments.map((ornament) => (
            <li key={ornament.image}>
              <ModelCard
                item={ornament}
                whatsappMessage={product.whatsappMessage}
                sizes="(min-width: 1280px) 300px, (min-width: 1024px) 31vw, 50vw"
              />
            </li>
          ))}
          {/* 12 models fill every row at two, three and four columns, so
              this tile takes a full row of its own. (The geometric heart is
              not here: the owner sells it as a keychain, see
              /cadouri-personalizate.) */}
          <li className="col-span-2 lg:col-span-3 lg:flex xl:col-span-4">
            <IdeaCard
              text="Trimiteți-ne o poză sau o schiță a ornamentului dorit."
              whatsappMessage={product.whatsappMessage}
              layout="wide"
              className="w-full"
            />
          </li>
        </ul>
      </Section>

      <Section tone="muted">
        {/* Phones: text, prices, then the buttons. Desktop: text and buttons
            left, prices right. */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
          <SectionHeader
            title={'Cât costă globurile de\u00a0Crăciun personalizate'}
            intro={
              <p>
                <strong className="font-semibold text-zinc-900">
                  Prețuri fixe pe bucată,
                </strong>{' '}
                cu personalizarea inclusă: numele sau orașul de pe glob.
                Globurile au {globeSize}, iar cel pictat, pe straturi,{' '}
                {layeredGlobeSize}. Pentru alte modele sau dimensiuni vă
                facem o ofertă gratuită. Pentru cantități mari oferim reduceri.
              </p>
            }
            className="mb-0! lg:col-start-1 lg:row-start-1"
          />
          <ShopPriceTable
            caption="Prețuri globuri de Crăciun, pe material"
            rows={[
              {
                label: 'Globuri și ornamente din plexiglas',
                products: plexiglasShop,
              },
              {
                label: 'Globuri din lemn',
                products: woodShop,
              },
            ]}
            className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
          />
          {/* The WhatsApp link shows at every width: on phones the sticky
              bar stays hidden until the cookie choice is made. */}
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 lg:col-start-1 lg:row-start-2 lg:self-start">
            <Link
              to="/magazin"
              hash="craciun"
              className={buttonClass('dark', 'lg', 'w-full sm:w-auto')}
            >
              <Icon name="bag" className="w-5 h-5 shrink-0" />
              Comandați din magazin
            </Link>
            <a
              href={whatsappHref(product.orderMessage)}
              target="_blank"
              rel="noopener"
              data-placement="price"
              className={`${textLink} inline-flex min-h-11 items-center justify-center gap-2`}
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 text-amber-700" />
              Alt model? Scrieți-ne pe WhatsApp
            </a>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              title="Ce puteți personaliza pe un glob de Crăciun"
              intro={
                <p>
                  Ornamentele sunt{' '}
                  <Link to="/taiere-laser-plexiglas" className={textLink}>
                    tăiate laser din plexiglas
                  </Link>
                  , cu margini lustruite, sau din lemn; textul este decupat
                  direct în glob sau, pe unele modele din lemn, gravat.
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

          <div className="rounded-2xl border border-paper-line bg-paper p-4 sm:p-6 lg:self-start">
            <h2 className="text-xl sm:text-2xl font-bold text-balance text-zinc-900">
              Idei de text pentru globuri personalizate
            </h2>
            <CheckList items={textIdeas} className="mt-4" />
            <p className="mt-4 text-zinc-600 leading-relaxed">
              Alte idei:{' '}
              <Link to="/cadouri-personalizate" className={textLink}>
                cadouri personalizate
              </Link>
              , de la brelocuri cu nume la decoruri pe suport.
            </p>
          </div>
        </div>
      </Section>

      <Testimonials to="/globuri-craciun-personalizate" />

      <OrderBlock
        title="Cum comandați globuri de Crăciun personalizate"
        intro={
          <p>
            Modelele din galerie se comandă din{' '}
            <Link to="/magazin" hash="craciun" className={textLinkDark}>
              magazinul online
            </Link>
            . Pentru alt model, altă mărime sau cantități mari, scrieți-ne pe
            WhatsApp sau pe email cu aceste detalii:
          </p>
        }
        checklist={quoteChecklist}
        checklistTitle={null}
        whatsappMessage={product.orderMessage}
        emailSubject="Cerere ofertă - globuri de Crăciun personalizate"
      >
        <p className="mt-8 flex gap-3 rounded-xl bg-amber-400/10 p-4 text-sm leading-relaxed text-zinc-200 ring-1 ring-inset ring-amber-400/30">
          <Icon name="clock" className="w-5 h-5 shrink-0 text-amber-400" />
          {deadline ? (
            <strong className="font-semibold text-white">
              {deadline.courier
                ? `Comandați până la ${keepTogether(deadline.courier.label)} pentru livrare prin curier${
                    deadline.pickup
                      ? `, până la ${keepTogether(deadline.pickup.label)} pentru ridicare din Craiova`
                      : ''
                  }.`
                : `Comandați până la ${keepTogether(deadline.next.label)} pentru ridicare din Craiova.`}
            </strong>
          ) : (
            <span>
              <strong className="font-semibold text-white">
                Comandați din timp înainte de sărbători.
              </strong>{' '}
              {urgentSentence}
            </span>
          )}
        </p>
      </OrderBlock>

      <Faq items={faqItems(deadline)} whatsappMessage={product.orderMessage} />
    </>
  )
}
