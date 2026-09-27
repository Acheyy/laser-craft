import type * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Highlight, PageHero } from '~/components/PageHero'
import { IdeaCard, ModelCard, type ModelItem } from '~/components/ProductCards'
import { ResponsiveImage, imageMeta } from '~/components/ResponsiveImage'
import { RateCard, Section, SectionHeader, textLink } from '~/components/ui'
import {
  ACRYLIC_EXAMPLE,
  ACRYLIC_PRICE_PER_CM2,
  DPI,
  PLAQUE_MIN_PRICE,
  URGENT,
  formatAmount,
  formatLei,
} from '~/data/business'
import { getProduct } from '~/data/products'
import {
  BUSINESS_ID,
  SERVICE_AREA,
  SITE_URL,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

export const Route = createFileRoute('/gravura-laser-craiova')({
  component: GravuraLaserPage,
  head: () => ({
    ...seo({
      title: 'Gravură laser Craiova – lemn, sticlă, piele, plexiglas',
      description:
        `Gravură laser în Craiova pe lemn, bambus, sticlă, piele și plexiglas, cu rezoluție de până la ${DPI}: cadouri, trofee și logo-uri de firmă. Ofertă gratuită.`,
      path: '/gravura-laser-craiova',
      image: '/img/og/og-gravura-laser-2.jpg',
      imageAlt:
        'Breloc din plexiglas negru gravat laser cu mesaj personalizat, LaserCraft Craiova',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        { name: 'Gravură laser', path: '/gravura-laser-craiova' },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Gravură laser',
        serviceType: 'Gravură laser pe lemn, sticlă, piele și plexiglas',
        description:
          `Gravură laser în Craiova pe lemn și bambus, sticlă și cristal, piele, plexiglas și plastic, cu rezoluție de până la ${DPI}, pentru cadouri, trofee, branding și elemente decorative.`,
        url: `${SITE_URL}/gravura-laser-craiova`,
        provider: { '@id': BUSINESS_ID },
        areaServed: SERVICE_AREA,
        offers: {
          '@type': 'Offer',
          name: 'Tăiere și gravură pe plexiglas, calculată pe suprafață',
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

const product = getProduct('/gravura-laser-craiova')

const detailImage = '/img/products/gravura-lemn-detaliu-nume' as const
const detailImageMeta = imageMeta(detailImage)

// Engraved pieces made in the workshop (the same photos as on the globuri and
// cadouri pages). The idea tile completes the 2×2 phone grid and the desktop row.
const examples: ModelItem[] = [
  {
    title: 'Glob din lemn cu nume',
    description: 'Numele și desenul, gravate laser în lemn baițuit.',
    meta: 'Lemn baițuit',
    image: '/img/products/glob-craciun-lemn-nume-nicolas',
    alt: 'Glob de Crăciun rotund din lemn baițuit, gravat laser cu numele „Nicolas”, un om de zăpadă cu joben și mătură, o căsuță cu horn și fulgi de nea',
  },
  {
    title: 'Mamă și copil, în două culori',
    description: 'Arcadă cu trandafiri gravați și siluete decupate.',
    meta: 'Plexiglas magenta + galben',
    image: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
    alt: 'Decor din plexiglas magenta și galben cu suport: arcadă cu trandafiri gravați și siluetele unei mame și a unui copil',
  },
  {
    title: 'Breloc gravat cu mesaj',
    description: 'Mesaj și desen gravate laser, cu inel metalic.',
    meta: 'Plexiglas negru',
    image: '/img/products/breloc-gravat-mesaj-personalizat',
    alt: 'Breloc rotund din plexiglas negru gravat laser cu mesajul „you are INDISPENSABLE” și un personaj cu pancarta „THANK YOU”',
  },
]

const materials: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: 'Lemn și bambus',
    body: 'Cadouri, obiecte personalizate și elemente decorative.',
  },
  {
    title: 'Sticlă și cristal',
    body: 'Un text, o dată sau un logo, pentru cadouri sau branding.',
  },
  {
    title: 'Piele',
    body: 'Cadouri și obiecte cu inițiale. Pielea naturală sau sintetică se poate și tăia laser.',
  },
  {
    title: 'Plexiglas și plastic',
    body: (
      <>
        Transparent, colorat sau oglindă, pentru trofee, semne și plăcuțe.
        Oferim și{' '}
        <Link to="/taiere-laser-plexiglas" className={textLink}>
          tăiere laser plexiglas la comandă
        </Link>
        .
      </>
    ),
  },
]

const useCases: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: 'Cadouri gravate',
    body: (
      <>
        Un nume, o dată, o monogramă sau un desen gravat transformă un obiect
        obișnuit într-un cadou personal. Mai multe idei găsiți pe pagina de{' '}
        <Link to="/cadouri-personalizate" className={textLink}>
          cadouri personalizate
        </Link>
        .
      </>
    ),
  },
  {
    title: 'Trofee și premii',
    body: 'Trofee din plexiglas gravat, de exemplu pentru competiții sportive, cu numele premiului, logo-ul organizatorului și data evenimentului.',
  },
  {
    title: 'Gravură logo pentru firme',
    body: 'Pentru branding, gravăm logo-ul firmei pe plexiglas, lemn, sticlă sau piele: semne de firmă, plăcuțe și obiecte de prezentare.',
  },
]

const steps = [
  {
    title: 'Trimiteți-ne detaliile',
    description:
      'Materialul dorit, dimensiunile, cantitatea, termenul și, dacă există, fișierele de design.',
  },
  {
    title: 'Primiți oferta gratuită',
    description:
      'Vă ajutăm să alegeți materialul și tehnica potrivite proiectului.',
  },
  {
    title: 'Realizăm gravura',
    description:
      `După confirmarea ofertei trecem la execuție. La nevoie, oferim ${URGENT}.`,
  },
]

function GravuraLaserPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Gravură laser' },
        ]}
        title={
          <>
            <Highlight>Gravură laser</Highlight> în Craiova pe lemn, sticlă,
            piele și plexiglas
          </>
        }
        intro={
          <p>
            Atelierul LaserCraft din Craiova realizează gravură laser pe lemn și
            bambus, sticlă și cristal, piele, plexiglas și plastic, de la un
            singur obiect personalizat până la producție de serie. Gravăm
            texte, monograme, logo-uri și modele decorative.
          </p>
        }
        chips={[
          `Plexiglas ${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²`,
          `Până la ${DPI}`,
        ]}
        whatsappMessage={product.orderMessage}
        media={[
          {
            name: '/img/products/breloc-gravat-mesaj-personalizat',
            alt: 'Breloc rotund din plexiglas negru gravat laser cu mesaj personalizat',
          },
          {
            name: '/img/products/glob-craciun-lemn-nume-nicolas',
            alt: 'Glob de Crăciun din lemn baițuit, gravat laser cu numele „Nicolas”',
          },
        ]}
      />

      <Section>
        <SectionHeader
          title="Gravuri realizate în atelierul din Craiova"
          intro={
            <>
              Nume, mesaje și desene gravate laser pe plexiglas și lemn. Mai
              multe proiecte găsiți în{' '}
              <Link to="/portofoliu" className={textLink}>
                portofoliul nostru de lucrări
              </Link>{' '}
              și printre{' '}
              <Link to="/globuri-craciun-personalizate" className={textLink}>
                globurile de Crăciun cu nume
              </Link>
              .
            </>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {examples.map((example) => (
            <ModelCard
              key={example.title}
              item={example}
              whatsappMessage={product.whatsappMessage}
              sizes="(min-width: 1280px) 300px, (min-width: 1024px) 23vw, 50vw"
            />
          ))}
          <IdeaCard
            title="Aveți o idee de gravură?"
            text="Trimiteți-ne o poză sau o schiță și vă spunem prețul."
            whatsappMessage={product.whatsappMessage}
          />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader title="Cât costă gravura laser" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-zinc-900">
              Gravură pe plexiglas
            </h3>
            <RateCard
              dark
              label="Preț pe suprafață"
              value={formatAmount(ACRYLIC_PRICE_PER_CM2)}
              unit="lei / cm²"
              note={
                <>
                  <p>Exemplu: {ACRYLIC_EXAMPLE}</p>
                  <p className="mt-1 text-zinc-400">
                    Se aplică pieselor din plexiglas la comandă, tăiate sau
                    gravate, în orice formă.
                  </p>
                </>
              }
            />
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-zinc-900">
              Lemn, sticlă, piele și alte materiale
            </h3>
            <div className="rounded-2xl border border-paper-line bg-white p-5 sm:p-6">
              <p className="text-zinc-700">
                Prețul se stabilește prin ofertă, după material, dimensiuni și
                cantitate.
              </p>
              <p className="mt-4 border-t border-paper-line pt-4 text-sm leading-relaxed text-zinc-600">
                Pentru casă,{' '}
                <Link to="/placute-adresa" className={textLink}>
                  plăcuțele de adresă din plexiglas
                </Link>{' '}
                au prețuri fixe pe mărimi standard, de la{' '}
                {formatLei(PLAQUE_MIN_PRICE)}, cu ambele straturi de plexiglas,
                tăierea și gravarea textului incluse.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader title="Materiale pe care le gravăm" />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {materials.map((material) => (
            <li
              key={material.title}
              className="rounded-2xl border border-paper-line bg-paper p-4 sm:p-5"
            >
              <h3 className="font-semibold text-zinc-900 sm:text-lg">
                {material.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                {material.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="muted"
        containerClassName="grid items-center lg:grid-cols-2 lg:gap-12"
      >
        <SectionHeader
          className="lg:mb-0"
          title={`Detalii fine, cu rezoluție de până la ${DPI}`}
          intro="Textele mici, monogramele, logo-urile și modelele decorative sunt redate clar."
        />
        <div
          className="overflow-hidden rounded-2xl bg-zinc-100"
          style={{
            aspectRatio: `${detailImageMeta.width} / ${detailImageMeta.height}`,
          }}
        >
          <ResponsiveImage
            name={detailImage}
            alt="Detaliu de gravură laser pe lemn baițuit: numele „Nicolas”, fulgi de nea, un om de zăpadă și o căsuță"
            sizes="(min-width: 1280px) 616px, (min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </Section>

      <Section>
        <SectionHeader title="Obiecte gravate personalizate, pentru persoane și firme" />
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="rounded-2xl border border-paper-line bg-paper p-4 sm:p-5"
            >
              <h3 className="font-semibold text-zinc-900 sm:text-lg">
                {useCase.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                {useCase.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl leading-relaxed text-zinc-600">
          Pregătiți un eveniment? Obiectele gravate se pot completa cu{' '}
          <Link to="/litere-volumetrice" className={textLink}>
            litere volumetrice din plexiglas
          </Link>{' '}
          tăiate laser. Toate variantele de prelucrare le găsiți pe pagina de{' '}
          <Link to="/servicii" className={textLink}>
            servicii și prețuri
          </Link>
          .
        </p>
      </Section>

      <OrderBlock
        title="Cum comandați o gravură laser"
        steps={steps}
        whatsappMessage={product.orderMessage}
        emailSubject="Cerere ofertă - gravură laser"
      />

      <Faq
        whatsappMessage={product.orderMessage}
        items={[
          {
            question: 'Pe ce materiale faceți gravură laser în Craiova?',
            answer:
              'Pe lemn și bambus, sticlă și cristal, piele, plexiglas și plastic. Dacă nu știți ce material se potrivește proiectului dumneavoastră, vă ajutăm să alegeți.',
          },
          {
            question: 'Cât costă gravarea laser?',
            answer: (
              <>
                Piesele din plexiglas la comandă, tăiate sau gravate, se
                calculează pe suprafață: {formatLei(ACRYLIC_PRICE_PER_CM2)}/cm².
                Exemplu: {ACRYLIC_EXAMPLE}. Pentru lemn, sticlă, piele și alte
                materiale vă trimitem o ofertă gratuită.
              </>
            ),
          },
          {
            question: 'Puteți grava logo-ul firmei noastre?',
            answer:
              'Da, pe plexiglas, lemn, sticlă sau piele. Trimiteți-ne fișierul cu logo-ul, dacă îl aveți, împreună cu materialul, dimensiunile și cantitatea dorite.',
          },
          {
            question: 'Pot comanda o singură bucată?',
            answer:
              'Da. Lucrăm atât piese unice și prototipuri, cât și producție de serie. Pentru cantități mari oferim reduceri.',
          },
          {
            question: 'În cât timp este gata gravura?',
            answer: `${product.leadTime ? `${product.leadTime} ` : ''}Oferim ${URGENT}. Termenul exact îl stabilim împreună, în funcție de proiect, atunci când vă trimitem oferta.`,
          },
          {
            question: 'Cât de detaliată poate fi gravura?',
            answer: `Gravăm la o rezoluție de până la ${DPI}, potrivită pentru texte, monograme, logo-uri și modele decorative fine, precum omul de zăpadă și căsuța de pe globul din lemn „Nicolas”.`,
          },
          {
            question: 'Faceți și tăiere laser, nu doar gravură?',
            answer: (
              <>
                Da. Tăiem laser plexiglas de până la 25&nbsp;mm grosime, lemn
                masiv de până la 15&nbsp;mm, placaj și MDF de până la 20&nbsp;mm,
                precum și piele, textile, carton și hârtie. Detalii găsiți pe
                pagina{' '}
                <Link to="/taiere-laser-plexiglas" className={textLink}>
                  tăiere laser plexiglas
                </Link>{' '}
                și în{' '}
                <Link to="/servicii" className={textLink}>
                  lista completă de servicii
                </Link>
                .
              </>
            ),
          },
        ]}
      />
    </>
  )
}
