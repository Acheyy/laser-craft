import type * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { CTASection } from '~/components/CTASection'
import { Faq } from '~/components/Faq'
import { Highlight, PageHero } from '~/components/PageHero'
import { ResponsiveImage, type ImageName } from '~/components/ResponsiveImage'
import {
  ACRYLIC_PRICE_PER_CM2,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  formatLei,
  plaquePricing,
} from '~/data/business'
import { BUSINESS_ID, SITE_URL, breadcrumbs, jsonLd, seo } from '~/utils/seo'

export const Route = createFileRoute('/gravura-laser-craiova')({
  component: GravuraLaserPage,
  head: () => ({
    ...seo({
      title: 'Gravură Laser Craiova – Lemn, Sticlă, Piele, Plexiglas',
      description:
        'Gravură laser în Craiova pe lemn, bambus, sticlă, piele și plexiglas, cu rezoluție de până la 1200 DPI: cadouri, trofee și logo-uri de firmă. Ofertă gratuită.',
      path: '/gravura-laser-craiova',
      image: '/img/og/og-servicii.jpg',
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

const minPlaquePrice = Math.min(...plaquePricing.map((item) => item.price))

const linkClass =
  'font-semibold text-amber-600 hover:text-amber-700 transition-colors'

const materials: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: 'Lemn și bambus',
    body: (
      <>
        Gravura pe lemn și bambus se potrivește pentru cadouri, obiecte
        personalizate și elemente decorative. Un exemplu din portofoliu: un set
        de 4 suporturi de pahar din lemn de nuc, cu modele botanice și
        geometrice gravate.
      </>
    ),
  },
  {
    title: 'Sticlă și cristal',
    body: (
      <>
        Pe sticlă și cristal putem grava un text, o dată sau un logo, pentru
        cadouri sau pentru branding. Spuneți-ne ce doriți să gravăm, iar noi vă
        trimitem o ofertă gratuită.
      </>
    ),
  },
  {
    title: 'Piele',
    body: (
      <>
        Gravura laser pe piele se potrivește pentru cadouri personalizate și
        obiecte cu inițiale. În portofoliu avem o copertă de jurnal din piele
        naturală, gravată cu artă botanică și monogramă. Pe lângă gravare, putem
        și tăia laser piele naturală și sintetică.
      </>
    ),
  },
  {
    title: 'Plexiglas și plastic',
    body: (
      <>
        Gravăm pe plastic și pe plexiglas (acril) transparent, colorat sau
        oglindă, pentru trofee, semne și plăcuțe. Plexiglasul poate fi și tăiat
        în orice formă; detalii găsiți pe pagina despre{' '}
        <Link to="/taiere-laser-plexiglas" className={linkClass}>
          tăiere laser plexiglas
        </Link>
        .
      </>
    ),
  },
]

const advantages = [
  'De la piese unice și prototipuri la producție de serie',
  'Reduceri pentru cantități mari',
  'Termene scurte, de la 24 de ore pentru comenzi urgente',
  'Consultanță gratuită pentru alegerea materialului și a tehnicii',
]

const useCases = [
  {
    title: 'Cadouri gravate',
    body: 'Un nume, o dată, o monogramă sau un desen gravat transformă un obiect obișnuit într-un cadou personal. Gravăm pe lemn, sticlă, piele sau plexiglas, începând de la o singură bucată.',
  },
  {
    title: 'Trofee și premii',
    body: 'Realizăm trofee din plexiglas cu gravură laser, de exemplu pentru competiții sportive. Pe trofeu pot fi gravate numele premiului, logo-ul organizatorului și data evenimentului.',
  },
  {
    title: 'Gravură logo pentru firme',
    body: 'Pentru branding, gravăm logo-ul firmei pe plexiglas, lemn, sticlă sau piele. Un exemplu din portofoliu: un semn de firmă din plexiglas edge-lit, cu logo gravat laser și iluminare LED.',
  },
]

const examples: Array<{
  title: string
  description: string
  image: ImageName
  alt: string
}> = [
  {
    title: 'Trofee din plexiglas',
    description:
      'Trofee din plexiglas cu gravură laser pentru competiții sportive: text, logo și detalii grafice pe aceeași piesă.',
    image: '/img/products/trofeu-plexiglas-gravat',
    alt: 'Trofeu din plexiglas gravat laser cu logo și text, pe bază neagră',
  },
  {
    title: 'Suporturi de pahar din lemn de nuc',
    description:
      'Set de 4 suporturi de pahar (coastere) din lemn de nuc, cu modele botanice și geometrice gravate laser.',
    image: '/img/products/suporturi-pahar-lemn-gravate',
    alt: 'Set de 4 suporturi de pahar rotunde din lemn, gravate laser cu modele botanice și geometrice',
  },
  {
    title: 'Jurnal din piele naturală',
    description:
      'Copertă de jurnal din piele naturală gravată laser, cu artă botanică și monogramă.',
    image: '/img/products/jurnal-piele-gravat',
    alt: 'Copertă de jurnal din piele naturală gravată laser cu motiv botanic și monogramă',
  },
]

const steps = [
  {
    title: 'Trimiteți-ne detaliile',
    body: 'Precizați tipul materialului dorit, dimensiunile și cantitatea, termenul de execuție dorit și, dacă există, fișierele de design.',
  },
  {
    title: 'Primiți oferta gratuită',
    body: 'Vă răspundem în maximum 24 de ore lucrătoare și vă ajutăm gratuit să alegeți materialul și tehnica potrivite.',
  },
  {
    title: 'Realizăm gravura',
    body: 'După confirmarea ofertei trecem la execuție. Pentru comenzi urgente, termenele pornesc de la 24 de ore.',
  },
]

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}

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
      >
        <p>
          Atelierul LaserCraft din Craiova realizează gravură laser pe lemn și
          bambus, sticlă și cristal, piele, plexiglas și plastic — de la un
          singur obiect personalizat până la producție de serie.
        </p>
        <p>
          Gravarea laser redă texte, monograme, logo-uri și modele decorative la
          o rezoluție de până la 1200 DPI. Oferta este gratuită, iar răspunsul
          vine în maximum 24 de ore lucrătoare.
        </p>
      </PageHero>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Materiale pe care le gravăm
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Materialul potrivit depinde de ce doriți să obțineți: un cadou, un
              trofeu, un obiect de prezentare pentru firmă sau un element
              decorativ. Dacă nu v-ați hotărât încă, vă ajutăm gratuit să
              alegeți.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {materials.map((material) => (
              <div
                key={material.title}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-3">
                  {material.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">{material.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="rounded-2xl aspect-[4/3] overflow-hidden">
            <ResponsiveImage
              name="/img/services/gravura-laser"
              alt="Exemple de gravură laser: placă din lemn cu text și motive florale, portofel din piele și trofee transparente cu logo"
              sizes="(min-width: 1280px) 616px, (min-width: 1024px) 50vw, 100vw"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Detalii fine, cu rezoluție de până la 1200 DPI
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-6">
              Textele mici, monogramele, logo-urile și modelele decorative sunt
              redate clar. Lucrăm flexibil, în funcție de proiectul
              dumneavoastră:
            </p>
            <ul className="space-y-3">
              {advantages.map((advantage) => (
                <li
                  key={advantage}
                  className="flex items-start gap-2 text-zinc-700"
                >
                  <CheckIcon />
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-10 max-w-3xl">
            Obiecte gravate personalizate, pentru persoane și firme
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">{useCase.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-600 leading-relaxed max-w-3xl">
            Pregătiți un eveniment? Obiectele gravate se pot completa cu{' '}
            <Link to="/litere-volumetrice" className={linkClass}>
              litere volumetrice din plexiglas
            </Link>{' '}
            tăiate laser. Toate variantele de prelucrare le găsiți pe pagina de{' '}
            <Link to="/servicii" className={linkClass}>
              servicii și prețuri
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Exemple de gravură laser din portofoliu
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Câteva lucrări realizate în atelier. Mai multe proiecte găsiți în{' '}
              <Link to="/portofoliu" className={linkClass}>
                portofoliul nostru de lucrări
              </Link>
              .
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example) => (
              <figure
                key={example.title}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                  <ResponsiveImage
                    name={example.image}
                    alt={example.alt}
                    sizes="(min-width: 1280px) 395px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {example.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {example.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Cât costă gravura laser
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Pentru proiectele din plexiglas avem un tarif pe centimetru
              pătrat. Pentru celelalte materiale vă trimitem o ofertă gratuită,
              în funcție de detaliile proiectului.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Tarif pe suprafață
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-white mb-5">
                Gravură pe plexiglas
              </h3>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 mb-5">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    {formatLei(ACRYLIC_PRICE_PER_CM2).replace(' lei', '')}
                  </span>
                  <span className="text-base sm:text-lg text-zinc-300 font-medium">
                    lei / cm²
                  </span>
                </div>
                <div className="mt-3 text-sm text-zinc-400">
                  Exemplu: 100 × 50 mm (50 cm²) ≈{' '}
                  <span className="text-amber-400 font-semibold">
                    {formatLei(50 * ACRYLIC_PRICE_PER_CM2)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Tariful se aplică proiectelor custom din plexiglas, tăiate sau
                gravate: orice formă, orice design, calculat pe suprafață.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 flex flex-col">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                Ofertă gratuită
              </div>
              <h3 className="text-lg sm:text-2xl font-bold text-zinc-900 mb-5">
                Lemn, sticlă, piele și alte materiale
              </h3>
              <ul className="space-y-3 text-zinc-700 flex-1">
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Prețul se stabilește prin ofertă, după material, dimensiuni și
                  cantitate
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Reduceri pentru cantități mari
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon />
                  Răspuns în maximum 24 de ore lucrătoare
                </li>
              </ul>
              <p className="mt-6 text-sm text-zinc-600 leading-relaxed">
                Aveți nevoie de o plăcuță pentru casă?{' '}
                <Link to="/placute-adresa" className={linkClass}>
                  Plăcuțele de adresă din plexiglas
                </Link>{' '}
                au prețuri fixe pe mărimi standard, de la{' '}
                {formatLei(minPlaquePrice)}, cu ambele straturi de plexiglas,
                tăierea și gravarea textului incluse.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-8">
            Cum comandați o gravură laser
          </h2>
          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700 font-bold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-2xl bg-zinc-50 border border-zinc-200 p-6 sm:p-8 text-zinc-600 leading-relaxed">
            <p>
              Ne puteți suna la{' '}
              <a href={PHONE_HREF} className={linkClass}>
                {PHONE_DISPLAY}
              </a>{' '}
              sau ne puteți scrie la{' '}
              <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                {EMAIL}
              </a>
              . Atelierul nostru din Craiova are program de luni până vineri
              între 08:00 și 17:00 și sâmbătă între 09:00 și 14:00.
            </p>
            <p className="mt-3">
              Toate datele de contact le găsiți pe{' '}
              <Link to="/contact" className={linkClass}>
                pagina de contact LaserCraft
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <Faq
        items={[
          {
            question: 'Pe ce materiale faceți gravură laser în Craiova?',
            answer:
              'Gravăm pe lemn și bambus, sticlă și cristal, piele, plexiglas și plastic. Dacă nu sunteți sigur ce material se potrivește proiectului dumneavoastră, vă oferim consultanță gratuită.',
          },
          {
            question: 'Cât costă gravarea laser?',
            answer: (
              <>
                Proiectele custom din plexiglas, tăiate sau gravate, se
                calculează pe suprafață: {formatLei(ACRYLIC_PRICE_PER_CM2)}/cm².
                De exemplu, o piesă de 100 × 50 mm (50 cm²) costă aproximativ{' '}
                {formatLei(50 * ACRYLIC_PRICE_PER_CM2)}. Pentru lemn, sticlă,
                piele și alte materiale vă trimitem o ofertă gratuită, iar
                pentru cantități mari oferim reduceri.
              </>
            ),
          },
          {
            question: 'Puteți grava logo-ul firmei noastre?',
            answer:
              'Da. Gravăm logo-uri pe plexiglas, lemn, sticlă sau piele, de la o singură piesă până la producție de serie. Trimiteți-ne fișierul cu logo-ul, dacă îl aveți, împreună cu materialul, dimensiunile și cantitatea dorite.',
          },
          {
            question: 'Pot comanda o singură bucată?',
            answer:
              'Da. Lucrăm atât piese unice și prototipuri, cât și producție de serie. Pentru cantități mari oferim reduceri.',
          },
          {
            question: 'În cât timp este gata gravura?',
            answer:
              'Termenele de execuție sunt scurte, de la 24 de ore pentru comenzi urgente. Termenul exact îl stabilim împreună, în funcție de proiect, atunci când vă trimitem oferta.',
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
                <Link to="/taiere-laser-plexiglas" className={linkClass}>
                  tăiere laser plexiglas
                </Link>{' '}
                și în{' '}
                <Link to="/servicii" className={linkClass}>
                  lista completă de servicii
                </Link>
                .
              </>
            ),
          },
        ]}
      />

      <CTASection />
    </>
  )
}
