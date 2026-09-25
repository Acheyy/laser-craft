import { Link, createFileRoute } from '@tanstack/react-router'
import { CTASection } from '~/components/CTASection'
import { Faq } from '~/components/Faq'
import { Highlight, PageHero } from '~/components/PageHero'
import {
  ResponsiveImage,
  type ImageName,
} from '~/components/ResponsiveImage'
import {
  ACRYLIC_PRICE_PER_CM2,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  formatLei,
  plaquePricing,
} from '~/data/business'
import images from '~/data/images.gen.json'
import {
  BUSINESS_ID,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

const PATH = '/taiere-laser-plexiglas'
const RATE = `${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²`
const MIN_PLAQUE_PRICE = Math.min(...plaquePricing.map((item) => item.price))

const serviceImage: ImageName = '/img/services/taiere-laser-plexiglas'
const serviceImageUrl = absoluteUrl(
  `${serviceImage}-${images[serviceImage].width}.webp`,
)

const linkClass =
  'text-amber-600 font-semibold hover:text-amber-700 transition-colors'

export const Route = createFileRoute('/taiere-laser-plexiglas')({
  component: TaiereLaserPlexiglasPage,
  head: () => ({
    ...seo({
      title: `Tăiere Laser Plexiglas Craiova – Debitare la ${RATE}`,
      description: `Tăiere laser plexiglas în Craiova: debitare la dimensiune, orice formă, până la 25 mm, margini lustruite, precizie ±0,05 mm. Preț ${RATE}, ofertă gratuită.`,
      path: PATH,
      image: '/img/og/og-servicii.jpg',
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

const materials = [
  {
    title: 'Plexiglas transparent',
    text: 'Pentru semnalistică, trofee și piese la care contează claritatea materialului.',
  },
  {
    title: 'Plexiglas colorat',
    text: 'Pentru plăcuțe de adresă, litere și decorațiuni — de exemplu negru lucios sau alb.',
  },
  {
    title: 'Plexiglas oglindă',
    text: 'Pentru elemente decorative și aplicații comerciale care atrag privirea.',
  },
  {
    title: 'Grosimi de până la 25 mm',
    text: 'De la plăci subțiri, potrivite pentru straturi aplicate, până la piese groase și rigide.',
  },
  {
    title: 'Policarbonat',
    text: 'Pe lângă plexiglas, prelucrăm și policarbonat.',
  },
]

const precision = [
  {
    title: 'Margini curate, lustruite',
    text: 'Muchiile pieselor sunt curate și lustruite, cu un aspect finisat și îngrijit.',
  },
  {
    title: 'Toleranțe de ±0,05 mm',
    text: 'Dimensiunile finale respectă fidel cotele cerute — important pentru piese care se îmbină sau se montează în straturi.',
  },
  {
    title: 'Orice formă, orice design',
    text: 'Contururi complexe, decupaje interioare, litere și detalii fine, nu doar dreptunghiuri.',
  },
  {
    title: 'De la o singură piesă la serie',
    text: 'Tăiem cu aceeași grijă un prototip unic sau o producție de serie, cu termene de execuție scurte.',
  },
]

const priceExamples = [
  { label: 'Plăcuță mică sau etichetă', width: 10, height: 5 },
  { label: 'Panou pătrat', width: 20, height: 20 },
  { label: 'Semn sau panou decorativ', width: 30, height: 40 },
].map((item) => {
  const area = item.width * item.height
  return { ...item, area, price: area * ACRYLIC_PRICE_PER_CM2 }
})

const applications: Array<{
  title: string
  text: string
  image: ImageName
  alt: string
  link: { to: '/placute-adresa' | '/litere-volumetrice'; label: string }
}> = [
  {
    title: 'Plăcuțe de adresă din plexiglas',
    text: 'Plăcuță orizontală din plexiglas negru lucios, cu cifre aurii și distanțiere aurii. Pachetele standard au două straturi: fundal și litere sau cifre aplicate.',
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
    alt: 'Plăcuță de adresă orizontală din plexiglas negru lucios, cu numărul 36 și textul „Str. Caisului” în auriu, prinsă cu distanțiere aurii',
    link: {
      to: '/placute-adresa',
      label: 'Vedeți modelele și prețurile plăcuțelor de adresă',
    },
  },
  {
    title: 'Litere volumetrice și decor pentru evenimente',
    text: 'Litere 3D „Nuntă de probă” tăiate laser din plexiglas alb și montate pe un panou crem, pentru un decor elegant de eveniment.',
    image: '/img/products/litere-volumetrice-decor-eveniment-2',
    alt: 'Litere volumetrice din plexiglas alb tăiate laser cu textul „Nuntă de probă”, montate pe panou crem lângă un aranjament floral',
    link: {
      to: '/litere-volumetrice',
      label: 'Descoperiți literele volumetrice din plexiglas',
    },
  },
]

const quoteChecklist = [
  'Tipul de plexiglas dorit (transparent, colorat sau oglindă) și grosimea',
  'Dimensiunile pieselor și cantitatea',
  'Fișierele de design, dacă le aveți',
  'Termenul de execuție dorit',
]

const faqItems = [
  {
    question: 'Cât costă tăierea laser a plexiglasului?',
    answer: (
      <>
        Proiectele custom se calculează pe suprafață, la {RATE}. De exemplu, o
        piesă de {priceExamples[0].width} × {priceExamples[0].height} cm (
        {priceExamples[0].area} cm²) costă orientativ{' '}
        {formatLei(priceExamples[0].price)}. Pentru cantități mari oferim
        reduceri, iar prețul final îl primiți în oferta gratuită.
      </>
    ),
  },
  {
    question: 'Ce grosime maximă de plexiglas puteți tăia?',
    answer:
      'Tăiem plexiglas cu grosimi de până la 25 mm, în variantele transparent, colorat sau oglindă. Prelucrăm și policarbonat.',
  },
  {
    question: 'Cât de precisă este tăierea cu laser?',
    answer:
      'Lucrăm cu toleranțe de ±0,05 mm, iar marginile pieselor rămân curate și lustruite. Putem tăia forme complexe și detalii fine, nu doar contururi simple.',
  },
  {
    question: 'Puteți tăia o singură piesă sau lucrați doar pe serie?',
    answer:
      'Realizăm atât piese unice și prototipuri, cât și producție de serie. Pentru cantități mari oferim reduceri.',
  },
  {
    question: 'În cât timp este gata comanda?',
    answer:
      'Termenele de execuție sunt scurte, de la 24 de ore pentru comenzile urgente. Menționați în cerere când aveți nevoie de piese, iar termenul exact vi-l confirmăm în ofertă.',
  },
  {
    question: 'Am nevoie de un fișier de design pentru a cere o ofertă?',
    answer: (
      <>
        Dacă aveți fișiere de design, trimiteți-le împreună cu cererea de
        ofertă. Dacă nu le aveți, precizați tipul de plexiglas, dimensiunile,
        cantitatea și termenul dorit, iar noi vă oferim consultanță gratuită
        pentru alegerea materialelor și a tehnicilor optime.{' '}
        <Link to="/contact" className={linkClass}>
          Cereți o ofertă gratuită
        </Link>
        .
      </>
    ),
  },
]

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}

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
      >
        <p>
          În atelierul LaserCraft din Craiova oferim tăiere laser plexiglas și
          debitare la dimensiune, în orice formă și după orice design — de la
          o piesă unică sau un prototip până la producție de serie.
        </p>
        <p>
          Lucrăm cu plexiglas (acril) transparent, colorat sau oglindă, cu
          grosimi de până la 25 mm. Prețul se calculează pe suprafață, la{' '}
          {RATE}, iar oferta este gratuită.
        </p>
      </PageHero>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Tipuri de plexiglas și grosimi prelucrate
            </h2>
            <p className="text-zinc-600 leading-relaxed mb-6">
              Fiecare piesă este tăiată în atelierul nostru din Craiova, după
              dimensiunile și forma cerute de dumneavoastră. Dacă nu știți ce
              variantă vi se potrivește, vă oferim consultanță gratuită pentru
              alegerea materialului și a tehnicii optime.
            </p>
            <ul className="space-y-4">
              {materials.map((material) => (
                <li key={material.title} className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-zinc-900">
                      {material.title}
                    </h3>
                    <p className="text-sm text-zinc-600">{material.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-zinc-600 leading-relaxed">
              Lucrăm și cu lemn, MDF, piele sau textile — lista completă o
              găsiți pe pagina de{' '}
              <Link to="/servicii" className={linkClass}>
                servicii și prețuri pentru tăiere și gravură laser
              </Link>
              .
            </p>
          </div>
          <div className="rounded-2xl aspect-[4/3] overflow-hidden">
            <ResponsiveImage
              name={serviceImage}
              alt="Piese din plexiglas transparent și colorat tăiate laser: litere, cifre și forme geometrice cu margini lustruite"
              sizes="(min-width: 1280px) 616px, (min-width: 1024px) 50vw, 100vw"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Precizie de ±0,05 mm și margini lustruite
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Laserul urmează fidel conturul dorit, iar la producția de serie
              fiecare bucată respectă aceleași dimensiuni.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {precision.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 border border-zinc-200"
              >
                <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <CheckIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Preț tăiere plexiglas pe cm²
            </h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed">
              <p>
                Pentru proiectele custom, tariful este simplu și transparent:{' '}
                {RATE}, calculat pe suprafața piesei, pentru orice formă tăiată
                sau gravată în plexiglas.
              </p>
              <p>
                Pentru o estimare rapidă, înmulțiți lungimea cu lățimea piesei
                (în centimetri), apoi rezultatul cu{' '}
                {formatLei(ACRYLIC_PRICE_PER_CM2)}. În tabel găsiți trei
                exemple orientative.
              </p>
              <p>
                Pentru cantități mari oferim reduceri, iar prețul final vi-l
                confirmăm în oferta gratuită. Aveți nevoie de o plăcuță de
                adresă? Avem pachete standard cu preț fix, de la{' '}
                {formatLei(MIN_PLAQUE_PRICE)} — vedeți{' '}
                <Link to="/placute-adresa" className={linkClass}>
                  prețurile plăcuțelor de adresă din plexiglas
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-8 shadow-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Proiecte custom
            </div>
            <div className="flex items-baseline gap-2 flex-wrap mb-6">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {formatLei(ACRYLIC_PRICE_PER_CM2).replace(' lei', '')}
              </span>
              <span className="text-base sm:text-lg text-zinc-300 font-medium">
                lei / cm²
              </span>
            </div>
            <table className="w-full text-left text-sm">
              <caption className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Exemple de preț (orientativ)
              </caption>
              <thead>
                <tr className="text-zinc-400 border-b border-white/10">
                  <th scope="col" className="py-2 pr-3 font-medium">
                    Dimensiuni
                  </th>
                  <th scope="col" className="py-2 pr-3 font-medium">
                    Suprafață
                  </th>
                  <th scope="col" className="py-2 font-medium text-right">
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
                      <div className="font-semibold whitespace-nowrap">
                        {item.width} × {item.height} cm
                      </div>
                      <div className="text-xs text-zinc-400">{item.label}</div>
                    </td>
                    <td className="py-3 pr-3 text-zinc-300 whitespace-nowrap">
                      {item.area} cm²
                    </td>
                    <td className="py-3 text-right font-bold text-amber-400 whitespace-nowrap">
                      ≈ {formatLei(item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Aplicații pentru plexiglasul tăiat laser
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Plexiglasul tăiat la dimensiune este ideal pentru semnalistică,
              decorațiuni, plăcuțe de adresă și aplicații comerciale. Iată două
              exemple din lucrările noastre.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
              >
                <div className="aspect-[4/3] bg-zinc-100 overflow-hidden">
                  <ResponsiveImage
                    name={item.image}
                    alt={item.alt}
                    sizes="(min-width: 1280px) 604px, (min-width: 768px) 48vw, 100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                    {item.text}
                  </p>
                  <Link
                    to={item.link.to}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    {item.link.label} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-600 leading-relaxed">
            Mai multe proiecte, inclusiv decorul cu litere montate pe panouri
            arcuite pentru locația Roselle, găsiți în{' '}
            <Link to="/portofoliu" className={linkClass}>
              portofoliul nostru de lucrări laser
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Gravură laser pe plexiglas
            </h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed">
              <p>
                Pe lângă tăiere, gravăm plexiglasul cu o rezoluție de până la
                1200 DPI — text, logo sau modele decorative, direct pe piesa
                debitată la dimensiune. Tariful pe suprafață se aplică și
                pieselor gravate.
              </p>
              <p>
                Așa au fost realizate, de exemplu, trofeele din plexiglas pentru
                competiții sportive și un semn de business din plexiglas cu logo
                gravat și iluminare LED pe margine.
              </p>
              <p>
                Aflați mai multe despre{' '}
                <Link to="/gravura-laser-craiova" className={linkClass}>
                  gravura laser pe plexiglas, lemn, sticlă și piele
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Ce ne trimiteți pentru ofertă
            </h2>
            <ol className="space-y-3 mb-6">
              {quoteChecklist.map((item, index) => (
                <li key={item} className="flex items-start gap-3 text-zinc-700">
                  <span className="flex w-7 h-7 rounded-full bg-amber-500/10 text-amber-700 text-sm font-bold items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ol>
            <div className="space-y-3 text-zinc-600 leading-relaxed">
              <p>
                Oferta este gratuită și vă răspundem în maximum 24 de ore
                lucrătoare. Ne puteți suna la{' '}
                <a href={PHONE_HREF} className={linkClass}>
                  {PHONE_DISPLAY}
                </a>{' '}
                sau scrie la{' '}
                <a href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
                  {EMAIL}
                </a>
                . Detaliile complete le găsiți pe{' '}
                <Link to="/contact" className={linkClass}>
                  pagina de contact pentru cereri de ofertă
                </Link>
                .
              </p>
              <p className="text-sm text-zinc-500">
                Program: Luni–Vineri 08:00–17:00, Sâmbătă 09:00–14:00, Duminică
                închis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqItems} />

      <CTASection />
    </>
  )
}
