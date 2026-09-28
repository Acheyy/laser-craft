import { Link, createFileRoute } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Highlight, PageHero } from '~/components/PageHero'
import { IdeaCard } from '~/components/ProductCards'
import { ShopCard, ShopFacts, ShopToast, midSentence } from '~/components/Shop'
import { Section, SectionHeader, textLink } from '~/components/ui'
import {
  URGENT,
  activeChristmasDeadline,
  bucharestTodayIso,
  formatLei,
  type ActiveChristmasDeadline,
} from '~/data/business'
import { SHOP_WHATSAPP_MESSAGE, getProduct } from '~/data/products'
import {
  type ShopCategory,
  SHOP_MIN_PRICE,
  SHOP_OG_IMAGE,
  minPriceIn,
  shopCategories,
  shopProductsIn,
} from '~/data/shop'
import { SITE_URL, breadcrumbs, jsonLd, seo } from '~/utils/seo'

// For the "other model" block at the end. The FAQ's "no answer found?"
// button sends the shop question (SHOP_WHATSAPP_MESSAGE) instead.
const CUSTOM_PRODUCT_WHATSAPP_MESSAGE =
  'Bună ziua! Aș dori un produs personalizat care nu este în magazinul online.'

// The cheapest globe with a name, for the description: "cu numele inclus"
// must not sit next to the 7-lei keychain, which takes no name. Christmas
// only, so a keychain price change can't slip in.
const namedGlobesFrom = Math.min(
  ...shopProductsIn('craciun')
    .filter((p) => p.personalization?.required)
    .map((p) => p.price),
)

// Every product in page order, for the ItemList and the numbering.
const listedProducts = shopCategories.flatMap((category) => shopProductsIn(category.id))

// Owner-supplied dates like '10 decembrie' must not split across lines.
const keepTogether = (text: string) => text.replace(/ /g, '\u00a0')

// Two phone columns, three from lg, four from xl (Container: 32px padding,
// 20px gaps).
const CARD_SIZES = '(min-width: 1280px) 290px, (min-width: 1024px) 31vw, calc(50vw - 22px)'

export const Route = createFileRoute('/magazin/')({
  component: MagazinPage,
  // Today's date in Romania for the Christmas deadline question, computed
  // once on the server and hydrated.
  loader: () => ({ today: bucharestTodayIso() }),
  head: () => ({
    ...seo({
      title: 'Magazin online: globuri de Crăciun și cadouri | LaserCraft',
      description: `Globuri de Crăciun cu nume de la ${formatLei(
        namedGlobesFrom,
      )}/buc., numele inclus, brelocuri de la ${formatLei(
        minPriceIn('brelocuri'),
      )}/buc. și decoruri. Făcute în Craiova, livrare prin curier în toată România.`,
      path: '/magazin',
      image: SHOP_OG_IMAGE,
      imageAlt:
        'Globuri de Crăciun din plexiglas și lemn, brelocuri și decoruri tăiate laser, cu prețuri pe bucată, magazinul LaserCraft Craiova',
    }),
    scripts: [
      breadcrumbs([{ name: 'Magazin', path: '/magazin' }]),
      // Links to the product pages only: Google shows product rich results
      // for single-product pages, so the Product nodes live there.
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Magazin online LaserCraft',
        numberOfItems: listedProducts.length,
        itemListElement: listedProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_URL}/magazin/${product.slug}`,
          name: product.name,
        })),
      }),
    ],
  }),
})

const orderSteps = [
  {
    title: 'Adăugați produsele în coș',
    description: 'Cu numele dorit pe fiecare glob sau breloc.',
  },
  {
    title: 'Trimiteți comanda pe WhatsApp',
    description: 'Tot coșul pleacă într-un singur mesaj, gata scris.',
  },
  {
    title: 'Vă confirmăm comanda',
    description: 'Împreună cu costul livrării și modalitatea de plată.',
  },
  {
    title: 'Ridicare sau curier',
    description: 'Din Craiova sau prin curier, oriunde în România.',
  },
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
    {
      question: 'Cum comand din magazinul online?',
      answer:
        'Adăugați produsele în coș, cu numele dorite, apoi deschideți coșul și trimiteți comanda într-un singur mesaj pe WhatsApp (sau pe email). Vă confirmăm comanda, costul livrării și modalitatea de plată.',
    },
    ...(deadline
      ? [
          {
            question: 'Până când pot comanda pentru Crăciun?',
            answer: deadlineAnswer(deadline),
          },
        ]
      : []),
    {
      question: 'Numele este inclus în preț?',
      answer:
        'Da. La globurile și brelocurile cu nume, prețul afișat este pe bucată și include numele dorit.',
    },
    {
      question: 'Pot comanda mai multe globuri, cu nume diferite?',
      answer:
        'Da. Scrieți primul nume și adăugați globul în coș, apoi scrieți următorul nume și adăugați-l și pe el. Fiecare nume apare separat în coș, cu numărul lui de bucăți.',
    },
    {
      question: 'Cât costă livrarea?',
      answer:
        'Costul livrării prin curier vi-l confirmăm pe WhatsApp, odată cu comanda. În Craiova puteți ridica personal comanda.',
    },
    {
      question: 'Cum plătesc comanda?',
      answer:
        'Pe site nu se face nicio plată. Modalitatea de plată o stabilim împreună pe WhatsApp, când vă confirmăm comanda.',
    },
    {
      question: 'Pot alege altă culoare sau alt text?',
      answer:
        'Da. Putem adapta textul, culoarea sau motivul oricărui model. Scrieți ce doriți la observații, în coș, și vă confirmăm pe WhatsApp.',
    },
    {
      question: 'Oferiți reduceri la cantități mari?',
      answer:
        'Da. Pentru cantități mari oferim reduceri. Lucrăm de la piese unice la producție de serie: scrieți-ne numărul de bucăți.',
    },
    {
      question: 'Pot ridica personal comanda din Craiova?',
      answer:
        `Da. În coș alegeți ridicarea personală din Craiova, iar noi vă confirmăm pe WhatsApp când o puteți ridica. La nevoie, oferim ${URGENT}.`,
    },
  ]
}

// Idea tiles fill the slots a category leaves empty in its last row: ten
// Christmas products leave two at three and at four columns (one wide tile,
// desktop only); three gifts leave one at two and at four columns.
function ideaTile(category: ShopCategory, count: number) {
  const empty = (columns: number) => (columns - (count % columns)) % columns
  const { whatsappMessage } = getProduct(category.landing)
  const text = 'Putem adapta textul, culoarea sau motivul oricărui model.'
  if (empty(2) === 0 && empty(3) === 2 && empty(4) === 2) {
    return (
      <li className="max-lg:hidden lg:col-span-2 lg:flex">
        <IdeaCard
          title="Vreți alt model sau alt text?"
          text={text}
          whatsappMessage={whatsappMessage}
          layout="wide"
          className="w-full"
        />
      </li>
    )
  }
  if (empty(2) === 1 && empty(3) === 0 && empty(4) === 1) {
    return (
      <li className="lg:max-xl:hidden">
        <IdeaCard
          title="Alt model sau alt text?"
          text={text}
          whatsappMessage={whatsappMessage}
          className="h-full"
        />
      </li>
    )
  }
  return null
}

function MagazinPage() {
  const { today } = Route.useLoaderData()
  const deadline = activeChristmasDeadline(today)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Magazin' }]}
        title={
          <>
            Magazin online: <Highlight>globuri de Crăciun</Highlight> și cadouri cu nume
          </>
        }
        intro={
          <p>
            Prețuri fixe pe bucată; la produsele cu nume, numele este inclus în preț.
            Alegeți modelele și trimiteți-ne toată comanda într-un singur mesaj pe
            WhatsApp.
          </p>
        }
        chips={[
          `De la ${formatLei(SHOP_MIN_PRICE)}/buc.`,
          'Numele inclus în preț',
          'Livrare prin curier în toată România',
        ]}
        actions={
          <nav aria-label="Categorii" className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {shopCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    to="/magazin"
                    hash={category.id}
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 px-4 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    {category.label}
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-300">
                      {shopProductsIn(category.id).length}
                      <span className="sr-only"> produse</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {shopCategories.map((category, categoryIndex) => {
        const categoryProducts = shopProductsIn(category.id)
        const landing = getProduct(category.landing)
        return (
          <Section
            key={category.id}
            id={category.id}
            tone={categoryIndex % 2 === 1 ? 'muted' : 'white'}
            className={categoryIndex === 0 ? 'max-sm:pt-6' : ''}
          >
            <SectionHeader
              title={category.label}
              intro={
                <p>
                  {category.intro}{' '}
                  <span className="whitespace-nowrap">Alte modele, la comandă:</span>{' '}
                  <Link to={category.landing} className={textLink}>
                    {midSentence(landing.label)}
                  </Link>
                  .
                </p>
              }
              className="max-sm:mb-5"
            />
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product, index) => (
                <li key={product.slug}>
                  <ShopCard
                    product={product}
                    sizes={CARD_SIZES}
                    priority={categoryIndex === 0 && index < 2}
                  />
                </li>
              ))}
              {ideaTile(category, categoryProducts.length)}
            </ul>
          </Section>
        )
      })}

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <SectionHeader title="Cum comandați" className="mb-6! sm:mb-8!" />
            <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {orderSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-800"
                  >
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-semibold text-zinc-900">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-paper-line bg-white p-5 sm:p-6 lg:self-start">
            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">Bine de știut</h2>
            <ShopFacts className="mt-4 text-[15px]" />
          </div>
        </div>
      </Section>

      <Faq items={faqItems(deadline)} tone="white" whatsappMessage={SHOP_WHATSAPP_MESSAGE} />

      <OrderBlock
        title="Vreți alt model sau un produs la comandă?"
        intro="Realizăm și modele după ideea dumneavoastră, de la piese unice la producție de serie. Oferta este gratuită."
        whatsappMessage={CUSTOM_PRODUCT_WHATSAPP_MESSAGE}
        emailSubject="Cerere ofertă - produs la comandă"
      />

      <ShopToast />
    </>
  )
}
