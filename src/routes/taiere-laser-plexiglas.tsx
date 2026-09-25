import { Link, createFileRoute } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Icon } from '~/components/Icon'
import { Highlight, PageHero } from '~/components/PageHero'
import {
  ResponsiveImage,
  type ImageName,
} from '~/components/ResponsiveImage'
import {
  CheckList,
  RateCard,
  Section,
  SectionHeader,
  textLink,
} from '~/components/ui'
import {
  ACRYLIC_EXAMPLE,
  ACRYLIC_PRICE_PER_CM2,
  PLAQUE_MIN_PRICE,
  PRECISION,
  formatAmount,
  formatLei,
} from '~/data/business'
import images from '~/data/images.gen.json'
import { type ProductPath, getProduct } from '~/data/products'
import {
  BUSINESS_ID,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

const PATH = '/taiere-laser-plexiglas'
const RATE = `${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²`
const product = getProduct(PATH)

const serviceImage: ImageName = '/img/services/taiere-laser-plexiglas'
const serviceImageUrl = absoluteUrl(
  `${serviceImage}-${images[serviceImage].width}.webp`,
)

export const Route = createFileRoute('/taiere-laser-plexiglas')({
  component: TaiereLaserPlexiglasPage,
  head: () => ({
    ...seo({
      title: `Tăiere Laser Plexiglas Craiova – Debitare la ${RATE}`,
      description: `Tăiere laser plexiglas în Craiova: debitare la dimensiune, orice formă, până la 25 mm, margini lustruite, precizie ±0,05 mm. Preț ${RATE}, ofertă gratuită.`,
      path: PATH,
      image: '/img/og/og-taiere-laser-plexiglas.jpg',
      imageAlt:
        'Număr de casă din plexiglas negru cu model floral tăiat laser, LaserCraft Craiova',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        { name: 'Tăiere laser plexiglas', path: PATH },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Tăiere laser plexiglas – LaserCraft Craiova',
        serviceType: 'Tăiere laser plexiglas',
        description:
          'Tăiere și debitare laser plexiglas la dimensiune, în orice formă: plexiglas transparent, colorat sau oglindă până la 25 mm, margini curate și lustruite, toleranțe de ±0,05 mm. Se prelucrează și policarbonat.',
        url: absoluteUrl(PATH),
        image: serviceImageUrl,
        provider: { '@id': BUSINESS_ID },
        areaServed: [{ '@type': 'City', name: 'Craiova' }],
        offers: {
          '@type': 'Offer',
          url: absoluteUrl(PATH),
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: ACRYLIC_PRICE_PER_CM2,
            priceCurrency: 'RON',
            unitCode: 'CMK',
            unitText: 'cm²',
          },
        },
      }),
    ],
  }),
})

const priceExamples = [
  { label: 'Plăcuță mică sau etichetă', width: 10, height: 5 },
  { label: 'Panou pătrat', width: 20, height: 20 },
  { label: 'Semn sau panou decorativ', width: 30, height: 40 },
].map((item) => {
  const area = item.width * item.height
  return { ...item, area, price: area * ACRYLIC_PRICE_PER_CM2 }
})

const materials = [
  {
    title: 'Plexiglas transparent',
    text: 'Semnalistică, trofee și piese la care contează claritatea.',
  },
  {
    title: 'Plexiglas colorat',
    text: 'Plăcuțe de adresă, litere și decorațiuni, de exemplu negru lucios sau alb.',
  },
  {
    title: 'Plexiglas oglindă',
    text: 'Elemente decorative și aplicații comerciale.',
  },
  {
    title: 'Grosimi de până la 25 mm',
    text: 'De la plăci subțiri pentru straturi aplicate la piese groase și rigide.',
  },
  {
    title: 'Policarbonat',
    text: 'Pe lângă plexiglas, prelucrăm și policarbonat.',
  },
]

const precision = [
  `Toleranțe de ${PRECISION}, importante pentru piesele care se îmbină sau se montează în straturi`,
  'Margini curate și lustruite',
  'Contururi complexe, decupaje interioare, litere și detalii fine',
  'Aceleași dimensiuni la fiecare bucată, și la producția de serie',
]

// Linked items point to the landing page for that product.
const applications: Array<{ title: string; text: string; to?: ProductPath }> = [
  {
    title: 'Plăcuțe de adresă din plexiglas',
    text: 'Fundal și cifre aplicate, pe 2 straturi, în 4 mărimi.',
    to: '/placute-adresa',
  },
  {
    title: 'Litere volumetrice și decor pentru evenimente',
    text: 'Nume și inscripții 3D din plexiglas, pentru evenimente și firme.',
    to: '/litere-volumetrice',
  },
  {
    title: 'Globuri de Crăciun personalizate',
    text: 'Ornamente din plexiglas cu nume, an sau mesaj.',
    to: '/globuri-craciun-personalizate',
  },
  {
    title: 'Cadouri personalizate din plexiglas',
    text: 'Brelocuri cu nume și decor cu suport.',
    to: '/cadouri-personalizate',
  },
  {
    title: 'Semnalistică și aplicații comerciale',
    text: 'Semne, panouri și elemente decorative pentru firme.',
  },
  {
    title: 'Prototipuri și piese la comandă',
    text: 'Orice contur, după fișierul sau dimensiunile dumneavoastră.',
  },
]

const quoteChecklist = [
  'Tipul de plexiglas dorit (transparent, colorat sau oglindă) și grosimea',
  'Dimensiunile pieselor și cantitatea',
  'Fișierele de design, dacă există',
  'Termenul de execuție dorit',
]

const faqItems = [
  {
    question: 'Cât costă tăierea laser a plexiglasului?',
    answer: `Proiectele custom se calculează pe suprafață, la ${RATE}. Exemplu: ${ACRYLIC_EXAMPLE}. Prețul final vi-l confirmăm în ofertă.`,
  },
  {
    question: 'Ce grosime maximă de plexiglas puteți tăia?',
    answer:
      'Tăiem plexiglas (acril) cu grosimi de până la 25 mm, transparent, colorat sau oglindă. Prelucrăm și policarbonat.',
  },
  {
    question: 'Cât de precisă este tăierea cu laser?',
    answer: `Lucrăm cu toleranțe de ${PRECISION}, iar marginile pieselor rămân curate și lustruite. Tăiem și forme complexe sau detalii fine, nu doar contururi simple.`,
  },
  {
    question: 'Puteți tăia o singură piesă sau lucrați doar pe serie?',
    answer:
      'Tăiem atât piese unice și prototipuri, cât și producție de serie.',
  },
  {
    question: 'În cât timp este gata comanda?',
    answer:
      'Avem execuție urgentă de la 24 de ore. Spuneți-ne când aveți nevoie de piese, iar termenul exact vi-l confirmăm în ofertă.',
  },
  {
    question: 'Am nevoie de un fișier de design pentru a cere o ofertă?',
    answer:
      'Nu. Dacă aveți fișiere de design, trimiteți-le odată cu cererea. Dacă nu, precizați tipul de plexiglas, dimensiunile, cantitatea și termenul, iar noi vă ajutăm să alegeți materialul potrivit.',
  },
]

function TaiereLaserPlexiglasPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Tăiere laser plexiglas' },
        ]}
        title={
          <>
            Tăiere laser <Highlight>plexiglas</Highlight> și debitare la
            dimensiune în Craiova
          </>
        }
        intro={
          <p>
            În atelierul LaserCraft din Craiova oferim tăiere laser plexiglas
            și debitare la dimensiune, în orice formă și după orice design — de
            la o piesă unică sau un prototip până la producție de serie.
          </p>
        }
        chips={[
          `Plexiglas ${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²`,
          `Precizie ${PRECISION}`,
        ]}
        whatsappMessage={product.whatsappMessage}
        media={[
          {
            name: '/img/products/numar-casa-plexiglas-negru-model-floral',
            alt: 'Număr de casă 32 din plexiglas negru, cu cifre decupate și model floral tăiat laser',
          },
          {
            name: '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
            alt: 'Glob de Crăciun din plexiglas negru cu sat de iarnă decupat laser: case, biserică, brazi și stea în vârf',
            position: '50% 55%',
          },
          {
            name: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
            alt: 'Decor din plexiglas magenta și galben cu siluetele unei mame și a unui copil cu balon, pe suport',
            position: '50% 58%',
          },
        ]}
      />

      <Section>
        {/* Mobile order: heading, rate card, price factors. Desktop: heading
            and factors on the left, rate card on the right. */}
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="contents lg:block">
            <SectionHeader
              title="Preț tăiere plexiglas pe cm²"
              intro={
                <p>
                  Prețul se calculează pe suprafața piesei, indiferent de
                  formă.
                </p>
              }
              className="mb-0! lg:mb-6!"
            />
            <div className="order-last lg:order-none">
              <h3 className="mb-3 font-semibold text-zinc-900">
                Ce influențează prețul
              </h3>
              <CheckList
                items={[
                  <>
                    <strong className="text-zinc-900">Suprafața:</strong> lungime
                    × lățime (cm) ×{' '}
                    <span className="whitespace-nowrap">
                      {formatLei(ACRYLIC_PRICE_PER_CM2)}
                    </span>
                    .
                  </>,
                  <>
                    <strong className="text-zinc-900">Cantitatea:</strong> pentru
                    cantități mari oferim reduceri.
                  </>,
                  <>
                    <strong className="text-zinc-900">Plăcuțele de adresă</strong>{' '}
                    au preț fix, de la{' '}
                    <span className="whitespace-nowrap">
                      {formatLei(PLAQUE_MIN_PRICE)}
                    </span>
                    : vedeți{' '}
                    <Link
                      to="/placute-adresa"
                      hash="preturi"
                      className={textLink}
                    >
                      prețurile plăcuțelor de adresă din plexiglas
                    </Link>
                    .
                  </>,
                ]}
              />
              <p className="mt-5 text-zinc-600">
                Prețul final vi-l confirmăm în oferta gratuită.
              </p>
            </div>
          </div>

          <RateCard
            dark
            label="Preț pe suprafață"
            value={formatAmount(ACRYLIC_PRICE_PER_CM2)}
            unit="lei / cm²"
            note={
              <table className="mt-3 w-full text-left text-sm">
                <caption className="mb-2 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Exemple de preț (orientativ)
                </caption>
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400">
                    <th scope="col" className="py-2 pr-3 font-medium">
                      Dimensiuni
                    </th>
                    <th scope="col" className="py-2 pr-3 font-medium">
                      Suprafață
                    </th>
                    <th scope="col" className="py-2 text-right font-medium">
                      Preț
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceExamples.map((item) => (
                    <tr
                      key={item.label}
                      className="border-b border-white/10 last:border-0"
                    >
                      <td className="py-3 pr-3">
                        <div className="whitespace-nowrap font-semibold text-white">
                          {item.width} × {item.height} cm
                        </div>
                        <div className="text-xs text-zinc-400">{item.label}</div>
                      </td>
                      <td className="whitespace-nowrap py-3 pr-3 text-zinc-300">
                        {item.area} cm²
                      </td>
                      <td className="whitespace-nowrap py-3 text-right font-bold text-amber-400">
                        ≈ {formatLei(item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          />
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeader
              title="Tipuri de plexiglas și grosimi prelucrate"
              className="mb-6!"
            />
            {/* One column in the half-width desktop column: no orphan item and
                a height closer to the precision column. */}
            <CheckList
              columns={2}
              className="gap-y-4! lg:grid-cols-1"
              items={materials.map((material) => (
                <>
                  <h3 className="font-semibold text-zinc-900">
                    {material.title}
                  </h3>
                  <span className="block text-sm text-zinc-600">
                    {material.text}
                  </span>
                </>
              ))}
            />
            <p className="mt-6 text-zinc-600">
              Lucrăm și cu lemn, MDF, piele sau textile: vedeți{' '}
              <Link to="/servicii" className={textLink}>
                servicii și prețuri pentru tăiere și gravură laser
              </Link>
              .
            </p>
          </div>

          <div>
            <SectionHeader
              title={`Precizie de ${PRECISION} și margini lustruite`}
              className="mb-6!"
            />
            <CheckList items={precision} />
            <ResponsiveImage
              name={serviceImage}
              alt="Piese din plexiglas transparent și colorat tăiate laser: litere, cifre și forme geometrice cu margini lustruite"
              sizes="(min-width: 1280px) 592px, (min-width: 1024px) 46vw, 100vw"
              className="mt-6 h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Aplicații pentru plexiglasul tăiat laser"
          intro={<p>Câteva dintre produsele pe care le tăiem din plexiglas:</p>}
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {applications.map((item) => (
            <li key={item.title}>
              {item.to ? (
                <Link
                  to={item.to}
                  className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-4 transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 active:border-amber-400 sm:p-5"
                >
                  <ApplicationText item={item} />
                  {/* The arrow flows with the last word, so a 2-line cue on
                      narrow phones doesn't push it to the card's edge. */}
                  <span className="mt-auto pt-3 text-sm font-semibold text-amber-800 group-hover:text-amber-900">
                    Detalii și{' '}
                    <span className="whitespace-nowrap">
                      prețuri
                      <Icon
                        name="arrowRight"
                        className="ml-1 inline-block w-4 h-4 align-[-0.2em]"
                      />
                    </span>
                  </span>
                </Link>
              ) : (
                <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5">
                  <ApplicationText item={item} />
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-zinc-600">
          Mai multe proiecte, inclusiv decorul cu litere montate pe panouri
          arcuite pentru locația Roselle, găsiți în{' '}
          <Link to="/portofoliu" className={textLink}>
            portofoliul nostru de lucrări laser
          </Link>
          .
        </p>
      </Section>

      <Section tone="muted">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <SectionHeader
              title="Gravură laser pe plexiglas"
              className="mb-4!"
            />
            <p className="text-zinc-600 leading-relaxed">
              Pe lângă tăiere, gravăm plexiglasul la o rezoluție de până la
              1200 DPI (text, logo sau modele decorative), direct pe piesa
              debitată, la același tarif pe suprafață.
            </p>
            <p className="mt-4 text-zinc-600 leading-relaxed">
              Exemple: trofee din plexiglas pentru competiții sportive și un
              semn de firmă cu logo gravat și iluminare LED pe margine. Aflați
              mai multe despre{' '}
              <Link to="/gravura-laser-craiova" className={textLink}>
                gravura laser pe plexiglas, lemn, sticlă și piele
              </Link>
              .
            </p>
          </div>
          <ResponsiveImage
            name="/img/products/semn-luminos-plexiglas-led"
            alt="Semn luminos LED din plexiglas transparent cu logo gravat laser"
            sizes="(min-width: 1280px) 592px, (min-width: 1024px) 46vw, 100vw"
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </Section>

      <OrderBlock
        title="Ce ne trimiteți pentru ofertă"
        intro="Scrieți-ne pe WhatsApp sau pe email cu aceste detalii:"
        checklist={quoteChecklist}
        checklistTitle={null}
        whatsappMessage={product.whatsappMessage}
        emailSubject="Cerere ofertă - tăiere plexiglas"
      />

      <Faq items={faqItems} />
    </>
  )
}

function ApplicationText({
  item,
}: {
  item: { title: string; text: string }
}) {
  return (
    <>
      <h3 className="font-semibold leading-snug text-zinc-900">{item.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.text}</p>
    </>
  )
}
