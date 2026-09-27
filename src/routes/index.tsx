import { Link, createFileRoute } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Hero } from '~/components/Hero'
import { Icon } from '~/components/Icon'
import { ProductTiles } from '~/components/ProductCards'
import { RecentWork } from '~/components/RecentWork'
import { ResponsiveImage, type ImageName } from '~/components/ResponsiveImage'
import { Testimonials } from '~/components/Testimonials'
import {
  Container,
  Section,
  SectionHeader,
  buttonClass,
  textLink,
} from '~/components/ui'
import {
  ACRYLIC_PRICE_PER_CM2,
  DELIVERY,
  DPI,
  PLAQUE_MIN_PRICE,
  PRECISION,
  SHOW_CHRISTMAS_PROMO,
  URGENT,
  activeChristmasDeadline,
  bucharestTodayIso,
  formatLei,
  type ActiveChristmasDeadline,
} from '~/data/business'
import { getProduct } from '~/data/products'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  // Today's date in Romania for the Christmas deadline copy. It is computed
  // once on the server and hydrated, so both renders show the same text.
  loader: () => ({ today: bucharestTodayIso() }),
  head: () =>
    seo({
      title: 'Tăiere și gravură laser Craiova – plexiglas, lemn | LaserCraft',
      description:
        `Atelier de tăiere și gravură laser în Craiova: plăcuțe de adresă din plexiglas de la ${formatLei(PLAQUE_MIN_PRICE)}, litere volumetrice, decor de evenimente, gravură pe lemn și sticlă.`,
      path: '/',
      image: '/img/og/og-home-2.jpg',
    }),
})

// Owner-supplied dates like '10 decembrie' must not split across lines.
const keepTogether = (text: string) => text.replace(/ /g, '\u00a0')

// Materials and limits already published on the landing pages; each heading
// links there.
const capabilities: Array<{
  title: string
  to: '/taiere-laser-plexiglas' | '/servicii' | '/gravura-laser-craiova'
  hash?: string
  facts: Array<[label: string, value: string]>
}> = [
  {
    title: 'Tăiere laser plexiglas',
    to: '/taiere-laser-plexiglas',
    facts: [
      ['Grosime', 'până la 25\u00a0mm'],
      ['Precizie', PRECISION],
      ['Preț', `${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²`],
    ],
  },
  {
    title: 'Tăiere laser lemn și MDF',
    to: '/servicii',
    hash: 'taiere-laser-lemn',
    facts: [
      ['Lemn masiv', 'până la 15\u00a0mm'],
      ['Placaj și MDF', 'până la 20\u00a0mm'],
    ],
  },
  {
    title: 'Gravură laser',
    to: '/gravura-laser-craiova',
    facts: [
      ['Materiale', 'lemn, sticlă, piele, plexiglas'],
      ['Rezoluție', `până la ${DPI}`],
    ],
  },
]

const workshopFacts = [
  'De la o singură piesă la serii mari',
  `${URGENT[0].toUpperCase()}${URGENT.slice(1)}`,
  DELIVERY.replace(/\.$/, ''),
]

function HomePage() {
  const { today } = Route.useLoaderData()

  return (
    <>
      <Hero />
      {SHOW_CHRISTMAS_PROMO && (
        <ChristmasStrip deadline={activeChristmasDeadline(today)} />
      )}

      {/* Less space above the tiles on phones, so their first row starts
          inside the first screen. */}
      <Section className="max-sm:pt-6">
        <SectionHeader
          title="Ce realizăm în atelier"
          className="max-sm:mb-4"
        />
        <ProductTiles />

        <div className="mt-14 sm:mt-20">
          <SectionHeader
            title={'Tăiere și gravură laser în\u00a0Craiova: materiale și grosimi'}
            className="mb-6! sm:mb-8!"
          />
          <ul className="grid gap-3 sm:grid-cols-3 sm:gap-5">
            {capabilities.map((item) => (
              <li
                key={item.title}
                className="relative rounded-2xl border border-paper-line bg-paper p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold leading-snug text-zinc-900">
                  {/* includeHash: the lemn link points to a /servicii
                      section, not to the page itself (aria-current). The
                      ::after layer makes the whole card the tap target. */}
                  <Link
                    to={item.to}
                    hash={item.hash}
                    activeOptions={{ includeHash: true }}
                    className={`${textLink} after:absolute after:inset-0 after:rounded-2xl`}
                  >
                    {item.title}
                  </Link>
                </h3>
                <dl className="mt-3 divide-y divide-paper-line text-[15px]">
                  {item.facts.map(([label, value]) => (
                    // Label above the value in the narrow tablet columns
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-4 py-2 sm:max-lg:flex-col sm:max-lg:gap-0.5"
                    >
                      <dt className="text-zinc-600">{label}</dt>
                      <dd className="text-right font-semibold text-zinc-900 sm:max-lg:text-left">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-col gap-x-8 gap-y-2 text-zinc-700 sm:mt-6 lg:flex-row lg:flex-wrap">
            {workshopFacts.map((fact) => (
              <li key={fact} className="flex items-start gap-2">
                <Icon
                  name="check"
                  strokeWidth={2.25}
                  className="mt-0.5 w-5 h-5 shrink-0 text-amber-600"
                />
                {fact}
              </li>
            ))}
          </ul>
          <Link
            to="/servicii"
            className={`mt-4 inline-flex min-h-11 items-center gap-1.5 ${textLink}`}
          >
            Toate serviciile și prețurile
            <Icon name="arrowRight" className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      <RecentWork />

      {/* White: RecentWork above is already a paper band. */}
      <Testimonials tone="white" />

      <OrderBlock />
    </>
  )
}

const stripOrnaments: ImageName[] = [
  '/img/products/ornament-craciun-bastoane-rosii',
  '/img/products/glob-craciun-lemn-nume-nicolas',
  '/img/products/ornament-craciun-fulg-de-nea-alb',
]

// Seasonal banner under the hero. Switched off with SHOW_CHRISTMAS_PROMO.
// The thumbnails are decorative (alt=""): the text names the link. Phones
// show one of them and an arrow, larger screens three and a button.
function ChristmasStrip({ deadline }: { deadline: ActiveChristmasDeadline | null }) {
  return (
    <aside
      aria-label="Comenzi de Crăciun"
      className="border-b border-amber-200 bg-amber-50"
    >
      <Container>
        <Link
          to="/globuri-craciun-personalizate"
          className="group flex items-center gap-3 py-2.5 sm:gap-4 sm:py-3"
        >
          <div className="flex shrink-0 gap-1.5">
            {stripOrnaments.map((image, index) => (
              <div
                key={image}
                className={`h-12 w-12 overflow-hidden rounded-lg bg-slate-900 ring-1 ring-amber-200 sm:h-14 sm:w-14 ${
                  index > 0 ? 'hidden sm:block' : ''
                }`}
              >
                <ResponsiveImage
                  name={image}
                  alt=""
                  sizes="(min-width: 640px) 56px, 48px"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="min-w-0 flex-1 text-sm leading-snug text-zinc-700 sm:text-base">
            <strong className="font-semibold text-zinc-900 group-hover:text-amber-800">
              {getProduct('/globuri-craciun-personalizate').label}
            </strong>{' '}
            –{' '}
            {/* Once the courier day has passed, only pickup is left. The
                no-break space keeps 'sărbători' off a line of its own on
                360px phones (text-pretty would split the product name). */}
            {deadline
              ? `comandați până la ${keepTogether(deadline.next.label)}${
                  deadline.next.kind === 'pickup' ? ', cu ridicare din Craiova' : ''
                }`
              : 'comandați din timp pentru\u00a0sărbători'}
          </p>
          <Icon
            name="arrowRight"
            className="w-5 h-5 shrink-0 text-amber-700 transition-transform group-hover:translate-x-0.5 sm:hidden"
          />
          {/* Styled as a button, but the whole strip stays the one link.
              Dark, not the gradient: that stays for WhatsApp. */}
          <span className="hidden shrink-0 sm:block">
            <span className={buttonClass('dark', 'sm', 'group-hover:bg-slate-800')}>
              Vedeți modelele
              <Icon name="arrowRight" className="w-4 h-4" />
            </span>
          </span>
        </Link>
      </Container>
    </aside>
  )
}
