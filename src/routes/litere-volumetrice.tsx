import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
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
  SITE_URL,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

const PRICE_PER_CM2 = formatLei(ACRYLIC_PRICE_PER_CM2)
const PLAQUE_FROM = formatLei(
  Math.min(...plaquePricing.map((item) => item.price)),
)

// 100 × 50 mm = 10 × 5 cm = 50 cm²
const EXAMPLE = { widthMm: 100, heightMm: 50 }
const EXAMPLE_AREA_CM2 = (EXAMPLE.widthMm / 10) * (EXAMPLE.heightMm / 10)

const roselleImages = [
  '/img/products/litere-volumetrice-decor-eveniment-1',
  '/img/products/litere-volumetrice-decor-eveniment-2',
] as const satisfies ReadonlyArray<ImageName>

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

export const Route = createFileRoute('/litere-volumetrice')({
  component: LitereVolumetricePage,
  head: () => ({
    ...seo({
      title: 'Litere Volumetrice din Plexiglas Craiova – Nunți și Evenimente',
      description: `Litere volumetrice din plexiglas tăiate laser în Craiova: nume pentru nuntă, decor de eveniment și litere 3D pentru firme. Reper ${PRICE_PER_CM2}/cm², ofertă gratuită.`,
      path: '/litere-volumetrice',
      image: '/img/og/og-servicii.jpg',
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

const linkClass =
  'font-semibold text-amber-700 underline decoration-amber-500/40 underline-offset-2 hover:text-amber-800 transition-colors'

const useCases = [
  {
    title: 'Nume și litere pentru nuntă',
    description:
      'Numele mirilor, inițiale sau un mesaj de bun venit, tăiate din plexiglas alb, colorat sau oglindă, pentru un decor de nuntă personalizat.',
  },
  {
    title: 'Litere 3D pentru decor de eveniment',
    description:
      'Inscripții volumetrice pentru panouri, colțuri foto sau decorul locației, ca literele montate pe panourile arcuite din proiectul Roselle.',
  },
  {
    title: 'Litere și semnalistică pentru firme',
    description:
      'Plexiglasul este ideal pentru semnalistică și aplicații comerciale: numele firmei în litere tăiate laser sau forme după logo. Pentru logo sau design custom, cereți o ofertă.',
  },
  {
    title: 'Litere și forme din lemn sau MDF',
    description:
      'Pentru un aspect natural, tăiem litere și forme decorative din lemn masiv de până la 15 mm sau din placaj și MDF de până la 20 mm.',
  },
]

const materials = [
  'Plexiglas transparent, colorat sau oglindă',
  'Plexiglas cu grosimi de până la 25 mm',
  'Margini curate, lustruite, toleranțe de ±0,05 mm',
  'Lemn masiv, placaj și MDF pentru un aspect natural',
]

const priceFactors = [
  'dimensiunile și numărul literelor, adică suprafața de material tăiată;',
  'materialul ales: plexiglas sau lemn și MDF;',
  'designul — pentru un logo sau un design custom primiți o ofertă dedicată;',
  'cantitatea — oferim reduceri pentru cantități mari.',
]

const quoteChecklist = [
  'Tipul materialului dorit (plexiglas, lemn sau MDF) și culoarea.',
  'Textul, dimensiunile literelor și cantitatea.',
  'Fișierele de design, dacă există.',
  'Termenul de execuție dorit sau data evenimentului.',
]

const faqItems = [
  {
    question: 'Cât costă literele volumetrice din plexiglas?',
    answer: (
      <p>
        Pentru piesele din plexiglas, reperul este tariful calculat pe
        suprafață, de {PRICE_PER_CM2}/cm². Prețul final depinde de dimensiuni,
        material și design și îl primiți printr-o ofertă gratuită. Pentru
        cantități mari oferim reduceri.
      </p>
    ),
  },
  {
    question: 'Din ce materiale pot fi realizate literele volumetrice?',
    answer: (
      <p>
        Literele pot fi realizate din plexiglas transparent, colorat sau
        oglindă, cu grosimi de până la 25 mm. Pentru un aspect natural, le
        putem tăia și din lemn masiv (până la 15 mm), placaj sau MDF (până la
        20 mm).
      </p>
    ),
  },
  {
    question: 'Puteți realiza numele mirilor pentru decorul de nuntă?',
    answer: (
      <p>
        Da. Literele din plexiglas pot fi tăiate laser în orice formă, așa că
        putem realiza numele mirilor, inițialele sau un mesaj pentru invitați.
        Trimiteți-ne textul, dimensiunile dorite și fișierul de design, dacă îl
        aveți, și vă pregătim oferta.
      </p>
    ),
  },
  {
    question: 'Realizați litere volumetrice și pentru firme?',
    answer: (
      <p>
        Da. Plexiglasul este ideal pentru semnalistică și aplicații comerciale,
        iar tăierea laser oferă margini curate și lustruite. Lucrăm atât piese
        unice, cât și producție de serie. Pentru logo sau design custom,
        contactați-ne pentru o ofertă.
      </p>
    ),
  },
  {
    question: 'În cât timp sunt gata literele?',
    answer: (
      <p>
        Pentru comenzi urgente, termenele de execuție încep de la 24 de ore.
        Pentru nunți și evenimente cu dată fixă vă recomandăm să ne contactați
        din timp și să menționați data evenimentului când cereți oferta.
      </p>
    ),
  },
  {
    question: 'Ce informații trebuie să trimit pentru o ofertă?',
    answer: (
      <p>
        Tipul materialului dorit, dimensiunile și cantitatea, fișierele de
        design (dacă există) și termenul de execuție dorit. Oferta este
        gratuită și răspundem în maximum 24 de ore lucrătoare.
      </p>
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
      >
        <p>
          Realizăm litere volumetrice din plexiglas în atelierul nostru de
          tăiere laser din Craiova: nume și inscripții pentru nuntă, decor de
          eveniment și litere 3D pentru firme. Literele sunt tăiate laser din
          plexiglas (acril), cu margini curate și lustruite.
        </p>
        <p>
          Lucrăm atât piese unice, cât și producție de serie, cu reduceri pentru
          cantități mari. Oferta și consultanța pentru alegerea materialului
          potrivit sunt gratuite.
        </p>
      </PageHero>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <figure className="lg:col-span-2 w-full max-w-md mx-auto lg:max-w-none">
              <ResponsiveImage
                name={roselleImages[0]}
                alt="Panouri arcuite cu litere volumetrice din plexiglas alb „Nuntă de probă” și „Roselle”, lângă un aranjament floral"
                sizes="(min-width: 1280px) 458px, (min-width: 1024px) 36vw, (min-width: 480px) 448px, 100vw"
                className="w-full h-auto rounded-2xl"
              />
              <figcaption className="mt-3 text-sm text-zinc-500">
                Litere decorative din plexiglas alb, tăiate laser și montate
                volumetric pe panouri arcuite — decor de eveniment pentru
                locația Roselle.
              </figcaption>
            </figure>

            <div className="lg:col-span-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-4">
                Studiu de caz
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
                Decor de eveniment pentru locația Roselle
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  Pentru decorul unui eveniment la locația Roselle am tăiat
                  laser litere decorative din plexiglas alb, montate volumetric
                  pe panouri arcuite. Inscripțiile „Nuntă de probă” și „Roselle” ies în
                  relief față de fundalul crem, iar umbrele fine dau adâncime
                  textului.
                </p>
                <p>
                  Albul plexiglasului se potrivește cu panourile în nuanțe
                  deschise și cu aranjamentele florale, pentru un decor elegant
                  și unitar. Aceeași abordare se aplică pentru numele mirilor,
                  inițiale sau un mesaj de bun venit. Mai multe lucrări găsiți
                  în{' '}
                  <Link to="/portofoliu" className={linkClass}>
                    portofoliul nostru de proiecte laser
                  </Link>
                  .
                </p>
              </div>

              <figure className="mt-8">
                <ResponsiveImage
                  name={roselleImages[1]}
                  alt="Litere 3D din plexiglas alb „Nuntă de probă” tăiate laser, montate pe panou crem, cu flori albe în prim-plan"
                  sizes="(min-width: 1280px) 710px, (min-width: 1024px) 56vw, 100vw"
                  className="w-full h-auto rounded-2xl"
                />
                <figcaption className="mt-3 text-sm text-zinc-500">
                  Litere 3D „Nuntă de probă”, tăiate laser din plexiglas alb și
                  montate pe un panou crem.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Ce litere volumetrice putem realiza
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Literele din plexiglas pot fi tăiate laser în orice formă, după
              designul dorit de dumneavoastră, de la o singură piesă la
              producție de serie. Câteva exemple de utilizare:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200"
              >
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                Materiale și finisaje
              </h3>
              <ul className="space-y-3">
                {materials.map((material) => (
                  <li
                    key={material}
                    className="flex items-start gap-2 text-zinc-700"
                  >
                    <CheckIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 text-zinc-600 leading-relaxed">
              <p>
                Mai multe detalii tehnice și exemple de preț găsiți pe pagina
                despre{' '}
                <Link to="/taiere-laser-plexiglas" className={linkClass}>
                  tăierea laser a plexiglasului
                </Link>
                . Pentru un logo sau un text fin, tăierea se poate completa cu{' '}
                <Link to="/gravura-laser-craiova" className={linkClass}>
                  gravura laser pe plexiglas
                </Link>
                , ca la semnul de business din plexiglas cu logo gravat și
                iluminare LED din portofoliu.
              </p>
              <p>
                Aveți nevoie de litere și cifre pentru casă? Vedeți{' '}
                <Link to="/placute-adresa" className={linkClass}>
                  plăcuțele de adresă din plexiglas
                </Link>
                , realizate pe două straturi, cu litere și cifre aplicate pe
                fundal, la prețuri de la {PLAQUE_FROM}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
                Cât costă literele volumetrice
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Pentru piesele din plexiglas, reperul de preț este tariful de
                tăiere pe suprafață. Prețul final pentru un set de litere îl
                primiți printr-o ofertă gratuită și depinde de:
              </p>
              <ul className="space-y-2 text-zinc-700 mb-6">
                {priceFactors.map((factor) => (
                  <li key={factor} className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    {factor}
                  </li>
                ))}
              </ul>
              <p className="text-zinc-600 leading-relaxed">
                Vedeți toate{' '}
                <Link to="/servicii" className={linkClass}>
                  serviciile și prețurile de tăiere și gravură laser
                </Link>
                .
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Reper de preț — plexiglas
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                  {PRICE_PER_CM2.replace(' lei', '')}
                </span>
                <span className="text-base sm:text-lg text-zinc-300 font-medium">
                  lei / cm²
                </span>
              </div>
              <p className="mt-4 text-sm text-zinc-400">
                Exemplu: o piesă de {EXAMPLE.widthMm} × {EXAMPLE.heightMm} mm (
                {EXAMPLE_AREA_CM2} cm²) ≈{' '}
                <span className="text-amber-400 font-semibold">
                  {formatLei(EXAMPLE_AREA_CM2 * ACRYLIC_PRICE_PER_CM2)}
                </span>
              </p>
              <p className="mt-6 text-xs text-zinc-500 leading-relaxed">
                * Tariful este orientativ, pentru tăierea sau gravarea pieselor
                din plexiglas. Prețul final al literelor volumetrice se
                stabilește prin ofertă, în funcție de dimensiuni, material,
                design și cantitate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-10">
            Termene de execuție și comandă
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 text-zinc-600 leading-relaxed">
              <h3 className="text-lg font-semibold text-zinc-900">
                Planificați din timp pentru evenimente
              </h3>
              <p>
                Pentru comenzi urgente, termenele de execuție încep de la 24 de
                ore. Pentru nunți și alte evenimente cu dată fixă vă recomandăm
                totuși să ne contactați din timp, ca să alegem împreună, fără
                grabă, materialele potrivite.
              </p>
              <p>
                Ne puteți suna la{' '}
                <a href={PHONE_HREF} className={linkClass}>
                  {PHONE_DISPLAY}
                </a>{' '}
                sau ne puteți scrie la{' '}
                <a href={`mailto:${EMAIL}`} className={linkClass}>
                  {EMAIL}
                </a>
                . Atelierul din Craiova are program de luni până vineri, între
                08:00 și 17:00, și sâmbăta, între 09:00 și 14:00. Toate
                variantele de contact sunt pe{' '}
                <Link to="/contact" className={linkClass}>
                  pagina de contact LaserCraft
                </Link>
                .
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-200">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                Ce ne trimiteți pentru ofertă
              </h3>
              <ol className="space-y-3">
                {quoteChecklist.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-zinc-700"
                  >
                    <span className="flex w-7 h-7 rounded-full bg-amber-500/10 text-amber-700 text-sm font-bold items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-zinc-500">
                Oferta este gratuită și răspundem în maximum 24 de ore
                lucrătoare.
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
