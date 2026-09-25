import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Icon } from '~/components/Icon'
import { Highlight, PageHero, type HeroImage } from '~/components/PageHero'
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
  RESPONSE_TIME,
  formatAmount,
  formatLei,
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

const PRICE_PER_CM2 = formatLei(ACRYLIC_PRICE_PER_CM2)
const WHATSAPP_MESSAGE = getProduct('/litere-volumetrice').whatsappMessage

const roselleImages = [
  '/img/products/litere-volumetrice-decor-eveniment-1',
  '/img/products/litere-volumetrice-decor-eveniment-2',
] as const satisfies ReadonlyArray<ImageName>

const roselleAlts = [
  'Panouri arcuite cu litere volumetrice din plexiglas alb „Nuntă de probă” și „Roselle”, lângă un aranjament floral',
  'Litere 3D din plexiglas alb „Nuntă de probă” tăiate laser, montate pe panou crem, cu flori albe în prim-plan',
]

// Every photo appears once: the hero shows the first Roselle photo and a
// coloured-letter piece, the case study below shows the second Roselle photo.
const heroMedia: HeroImage[] = [
  { name: roselleImages[0], alt: roselleAlts[0] },
  {
    name: '/img/products/decor-love-pisici-plexiglas-roz',
    alt: 'Decor „LOVE” din plexiglas roz tăiat laser, cu siluete de pisici integrate în litere',
  },
]
const caseStudyImage = roselleImages[1]

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

export const Route = createFileRoute('/litere-volumetrice')({
  component: LitereVolumetricePage,
  head: () => ({
    ...seo({
      title: 'Litere Volumetrice din Plexiglas Craiova – Nunți și Evenimente',
      description: `Litere volumetrice din plexiglas tăiate laser în Craiova: nume pentru nuntă, decor de eveniment și litere 3D pentru firme. Reper ${PRICE_PER_CM2}/cm², ofertă gratuită.`,
      path: '/litere-volumetrice',
      image: '/img/og/og-litere-volumetrice.jpg',
      imageAlt:
        'Litere volumetrice din plexiglas alb pentru decor de eveniment, LaserCraft Craiova',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        { name: 'Litere volumetrice', path: '/litere-volumetrice' },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Litere volumetrice din plexiglas',
        serviceType: 'Tăiere laser litere volumetrice',
        description:
          'Litere volumetrice, nume și forme din plexiglas tăiate laser pentru decor de nuntă, evenimente și semnalistică pentru firme, realizate în atelierul LaserCraft din Craiova.',
        url: `${SITE_URL}/litere-volumetrice`,
        provider: { '@id': BUSINESS_ID },
        areaServed: 'Craiova',
        image: roselleImages.map(largestVariantUrl),
      }),
    ],
  }),
})

const useCases = [
  {
    title: 'Nume și litere pentru nuntă',
    description:
      'Numele mirilor, inițiale sau un mesaj de bun venit, din plexiglas alb, colorat sau oglindă.',
  },
  {
    title: 'Litere 3D pentru decor de eveniment',
    description:
      'Inscripții volumetrice pentru panouri, colțuri foto sau decorul locației.',
  },
  {
    title: 'Litere și semnalistică pentru firme',
    description: 'Numele firmei în litere tăiate laser sau forme după logo.',
  },
  {
    title: 'Litere și forme din lemn sau MDF',
    description:
      'Pentru un aspect natural, litere și forme decorative din lemn masiv, placaj sau MDF.',
  },
]

const materials = [
  {
    name: 'Plexiglas',
    detail: 'transparent, colorat sau oglindă, până la 25\u00a0mm',
  },
  { name: 'Lemn masiv', detail: 'grosimi de până la 15\u00a0mm' },
  { name: 'Placaj și MDF', detail: 'grosimi de până la 20\u00a0mm' },
  {
    name: 'Finisaj',
    detail: `margini curate și lustruite, precizie ${PRECISION.replace(' ', ' ')}`,
  },
]

const priceFactors = [
  'Dimensiunile și numărul literelor (suprafața tăiată)',
  'Materialul: plexiglas sau lemn și MDF',
  'Designul: logo sau design custom, cu ofertă dedicată',
  'Cantitatea: reduceri pentru cantități mari',
]

const quoteChecklist = [
  'Tipul materialului dorit (plexiglas, lemn sau MDF) și culoarea',
  'Textul, dimensiunile literelor și cantitatea',
  'Fișierele de design, dacă există',
  'Termenul de execuție dorit sau data evenimentului',
]

const faqItems = [
  {
    question: 'Cât costă literele volumetrice din plexiglas?',
    answer: (
      <p>
        Pentru piesele din plexiglas, reperul este tariful calculat pe
        suprafață, de {PRICE_PER_CM2}/cm². Prețul final depinde de dimensiuni,
        material și design și îl primiți printr-o ofertă.
      </p>
    ),
  },
  {
    question: 'Din ce materiale pot fi realizate literele volumetrice?',
    answer: (
      <p>
        Din plexiglas transparent, colorat sau oglindă, cu grosimi de până la
        25 mm. Pentru un aspect natural, le putem tăia și din lemn masiv (până
        la 15 mm), placaj sau MDF (până la 20 mm).
      </p>
    ),
  },
  {
    question: 'Puteți realiza numele mirilor pentru decorul de nuntă?',
    answer: (
      <p>
        Da. Literele din plexiglas pot fi tăiate laser în orice formă: numele
        mirilor, inițialele sau un mesaj pentru invitați. Trimiteți-ne textul,
        dimensiunile dorite și fișierul de design, dacă îl aveți, și vă
        pregătim oferta.
      </p>
    ),
  },
  {
    question: 'Realizați litere volumetrice și pentru firme?',
    answer: (
      <p>
        Da: numele firmei, forme după logo sau semnalistică din plexiglas, cu
        margini curate și lustruite. Lucrăm atât piese unice, cât și producție
        de serie. Pentru logo sau design custom, contactați-ne pentru o
        ofertă.
      </p>
    ),
  },
  {
    question: 'În cât timp sunt gata literele?',
    answer: (
      <p>
        Oferim execuție urgentă de la 24 de ore. Pentru nunți și evenimente cu
        dată fixă vă recomandăm să ne contactați din timp și să menționați data
        evenimentului când cereți oferta.
      </p>
    ),
  },
  {
    question: 'Ce informații trebuie să trimit pentru o ofertă?',
    answer: (
      <p>
        Tipul materialului dorit, textul, dimensiunile și cantitatea, fișierele
        de design (dacă există) și termenul de execuție dorit sau data
        evenimentului. Oferta este gratuită. {RESPONSE_TIME}
      </p>
    ),
  },
]

function LitereVolumetricePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Litere volumetrice' },
        ]}
        title={
          <>
            <Highlight>Litere volumetrice</Highlight> din plexiglas pentru
            evenimente și firme, în Craiova
          </>
        }
        intro={
          <p>
            Realizăm litere volumetrice din plexiglas (acril) în atelierul
            nostru de tăiere laser din Craiova: nume și inscripții pentru
            nuntă, decor de eveniment și litere 3D pentru firme, cu margini
            curate și lustruite.
          </p>
        }
        chips={[`Plexiglas ${PRICE_PER_CM2}/cm²`, 'Plexiglas sau lemn']}
        whatsappMessage={WHATSAPP_MESSAGE}
        media={heroMedia}
      />

      <Section tone="muted">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <SectionHeader
            eyebrow="Studiu de caz"
            title="Decor de eveniment pentru locația Roselle"
            intro={
              <p>
                Pentru un eveniment la locația Roselle am tăiat din plexiglas
                alb inscripțiile „Nuntă de probă” și „Roselle”, montate
                volumetric pe panouri arcuite, în relief față de fundalul crem.
                Mai multe lucrări găsiți în{' '}
                <Link to="/portofoliu" className={textLink}>
                  portofoliul nostru de proiecte laser
                </Link>
                .
              </p>
            }
            className="mb-0!"
          />
          <div
            className="overflow-hidden rounded-2xl bg-zinc-100"
            style={{
              aspectRatio: `${images[caseStudyImage].width} / ${images[caseStudyImage].height}`,
            }}
          >
            <ResponsiveImage
              name={caseStudyImage}
              alt={roselleAlts[1]}
              sizes="(min-width: 1280px) 584px, (min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          title="Ce litere volumetrice putem realiza"
          intro={
            <p>
              Literele din plexiglas pot fi tăiate laser în orice formă, după
              designul dumneavoastră, de la o singură piesă la producție de
              serie.
            </p>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5"
            >
              <h3 className="font-semibold leading-snug text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <h3 className="mt-10 text-lg font-semibold text-zinc-900">
          Materiale și finisaje
        </h3>
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {materials.map((material) => (
            <div
              key={material.name}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5"
            >
              <dt className="font-semibold text-zinc-900">{material.name}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-zinc-600">
                {material.detail}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-3xl leading-relaxed text-zinc-600">
          Detalii tehnice găsiți pe pagina despre{' '}
          <Link to="/taiere-laser-plexiglas" className={textLink}>
            tăierea laser a plexiglasului
          </Link>
          . Un logo sau un text fin se poate completa cu{' '}
          <Link to="/gravura-laser-craiova" className={textLink}>
            gravura laser pe plexiglas
          </Link>
          . Pentru casă realizăm și{' '}
          <Link to="/placute-adresa" className={textLink}>
            plăcuțe de adresă din plexiglas
          </Link>
          , cu litere și cifre aplicate pe fundal, de la{' '}
          {formatLei(PLAQUE_MIN_PRICE)}.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeader title="Cât costă literele volumetrice" />
        {/* Mobile: the rate first; desktop: rate card on the right. */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="lg:order-last">
            <RateCard
              dark
              label="Preț pe suprafață"
              value={formatAmount(ACRYLIC_PRICE_PER_CM2)}
              unit="lei / cm²"
              note={
                <>
                  <p>Exemplu: {ACRYLIC_EXAMPLE}</p>
                  <p className="mt-1 text-zinc-400">
                    Tarif orientativ pentru tăierea sau gravarea plexiglasului.
                  </p>
                </>
              }
            />
          </div>

          <div>
            <p className="mb-4 leading-relaxed text-zinc-600">
              Prețul final pentru un set de litere îl primiți printr-o ofertă
              gratuită și depinde de:
            </p>
            <CheckList items={priceFactors} />
            <p className="mt-5 leading-relaxed text-zinc-600">
              Vedeți toate{' '}
              <Link to="/servicii" className={textLink}>
                serviciile și prețurile de tăiere și gravură laser
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <OrderBlock
        title="Termene de execuție și comandă"
        intro={
          <p>Scrieți-ne pe WhatsApp sau pe email cu aceste detalii:</p>
        }
        checklist={quoteChecklist}
        whatsappMessage={WHATSAPP_MESSAGE}
        emailSubject="Cerere ofertă - litere volumetrice"
      >
        <div className="mt-8 flex gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-inset ring-white/10">
          <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
            <strong className="font-semibold text-white">
              Planificați din timp pentru evenimente.
            </strong>{' '}
            Pentru nunți și evenimente cu dată fixă, scrieți-ne cât mai
            devreme. La nevoie, oferim execuție urgentă de la 24 de ore.
          </p>
        </div>
      </OrderBlock>

      <Faq items={faqItems} />
    </>
  )
}
