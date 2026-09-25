import type * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Faq } from '~/components/Faq'
import { Highlight, PageHero } from '~/components/PageHero'
import { ModelCard, type ModelItem } from '~/components/ProductCards'
import { ResponsiveImage, imageMeta } from '~/components/ResponsiveImage'
import { RateCard, Section, SectionHeader, textLink } from '~/components/ui'
import {
  ACRYLIC_EXAMPLE,
  ACRYLIC_PRICE_PER_CM2,
  PLAQUE_MIN_PRICE,
  formatAmount,
  formatLei,
} from '~/data/business'
import { getProduct } from '~/data/products'
import { BUSINESS_ID, SITE_URL, breadcrumbs, jsonLd, seo } from '~/utils/seo'

export const Route = createFileRoute('/gravura-laser-craiova')({
  component: GravuraLaserPage,
  head: () => ({
    ...seo({
      title: 'Gravură Laser Craiova – Lemn, Sticlă, Piele, Plexiglas',
      description:
        'Gravură laser în Craiova pe lemn, bambus, sticlă, piele și plexiglas, cu rezoluție de până la 1200 DPI: cadouri, trofee și logo-uri de firmă. Ofertă gratuită.',
      path: '/gravura-laser-craiova',
      image: '/img/og/og-gravura-laser.jpg',
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
          'Gravură laser în Craiova pe lemn și bambus, sticlă și cristal, piele, plexiglas și plastic, cu rezoluție de până la 1200 DPI, pentru cadouri, trofee, branding și elemente decorative.',
        url: `${SITE_URL}/gravura-laser-craiova`,
        provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'City', name: 'Craiova' },
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

const detailImage = '/img/services/gravura-laser' as const
const detailImageMeta = imageMeta(detailImage)

const examples: ModelItem[] = [
  {
    title: 'Trofee din plexiglas',
    description: 'Text, logo și detalii grafice gravate pe aceeași piesă.',
    image: '/img/products/trofeu-plexiglas-gravat',
    alt: 'Trofeu din plexiglas gravat laser cu logo și text, pe bază neagră',
  },
  {
    title: 'Semn de firmă cu LED',
    description: 'Logo gravat laser pe plexiglas transparent, iluminat cu LED.',
    image: '/img/products/semn-luminos-plexiglas-led',
    alt: 'Semn luminos LED din plexiglas transparent cu logo gravat laser',
  },
  {
    title: 'Suporturi de pahar din lemn de nuc',
    description: 'Set de 4, cu modele botanice și geometrice gravate.',
    image: '/img/products/suporturi-pahar-lemn-gravate',
    alt: 'Set de 4 suporturi de pahar rotunde din lemn, gravate laser cu modele botanice și geometrice',
  },
  {
    title: 'Jurnal din piele naturală',
    description: 'Copertă gravată cu artă botanică și monogramă.',
    image: '/img/products/jurnal-piele-gravat',
    alt: 'Copertă de jurnal din piele naturală gravată laser cu motiv botanic și monogramă',
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
          cadouri personalizate din plexiglas
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
      'După confirmarea ofertei trecem la execuție. La nevoie, execuție urgentă de la 24 de ore.',
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
          'Până la 1200 DPI',
        ]}
        whatsappMessage={product.whatsappMessage}
        media={[
          {
            name: '/img/products/breloc-gravat-mesaj-personalizat',
            alt: 'Breloc rotund din plexiglas negru gravat laser cu mesaj personalizat',
          },
          {
            name: '/img/products/icoana-isus-plexiglas-negru-cu-suport',
            alt: 'Icoană cu chipul lui Isus din plexiglas negru decupat laser pe fundal alb, cu suport',
          },
        ]}
      />

      <Section>
        <SectionHeader
          title="Exemple de gravură laser din portofoliu"
          intro={
            <>
              Câteva lucrări realizate în atelier. Mai multe proiecte găsiți în{' '}
              <Link to="/portofoliu" className={textLink}>
                portofoliul nostru de lucrări
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
                    Se aplică proiectelor custom din plexiglas, tăiate sau
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
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
              <p className="text-zinc-700">
                Prețul se stabilește prin ofertă, după material, dimensiuni și
                cantitate.
              </p>
              <p className="mt-4 border-t border-zinc-200 pt-4 text-sm leading-relaxed text-zinc-600">
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
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5"
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
          title="Detalii fine, cu rezoluție de până la 1200 DPI"
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
            alt="Exemple de gravură laser: placă din lemn cu text și motive florale, portofel din piele și trofee transparente cu logo"
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
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5"
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
        whatsappMessage={product.whatsappMessage}
        emailSubject="Cerere ofertă - gravură laser"
      />

      <Faq
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
                Proiectele custom din plexiglas, tăiate sau gravate, se
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
            answer:
              'Oferim execuție urgentă de la 24 de ore. Termenul exact îl stabilim împreună, în funcție de proiect, atunci când vă trimitem oferta.',
          },
          {
            question: 'Cât de detaliată poate fi gravura?',
            answer:
              'Gravăm la o rezoluție de până la 1200 DPI, potrivită pentru texte, monograme, logo-uri și modele decorative fine, precum motivele botanice și geometrice din portofoliul nostru.',
          },
          {
            question: 'Faceți și tăiere laser, nu doar gravură?',
            answer: (
              <>
                Da. Tăiem laser plexiglas de până la 25 mm grosime, lemn masiv
                de până la 15 mm, placaj și MDF de până la 20 mm, precum și
                piele, textile, carton și hârtie. Detalii găsiți pe pagina{' '}
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
