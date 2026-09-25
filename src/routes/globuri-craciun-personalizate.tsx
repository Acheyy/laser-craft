import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { CTASection } from '~/components/CTASection'
import { Faq } from '~/components/Faq'
import { Highlight, PageHero } from '~/components/PageHero'
import {
  ResponsiveImage,
  type ImageName,
} from '~/components/ResponsiveImage'
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from '~/data/business'
import images from '~/data/images.gen.json'
import {
  BUSINESS_ID,
  SITE_URL,
  absoluteUrl,
  breadcrumbs,
  jsonLd,
  seo,
} from '~/utils/seo'

const schemaImages = [
  '/img/products/glob-craciun-cu-nume-personalizat',
  '/img/products/glob-craciun-personalizat-craiova',
  '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
  '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
] as const satisfies ReadonlyArray<ImageName>

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

export const Route = createFileRoute('/globuri-craciun-personalizate')({
  component: GloburiCraciunPage,
  head: () => ({
    ...seo({
      title: 'Globuri de Crăciun Personalizate cu Nume – Craiova',
      description:
        'Globuri de Crăciun personalizate din plexiglas, tăiate laser în Craiova: cu nume, oraș, an sau mesaj, în culoarea dorită. Preț la cerere, ofertă gratuită.',
      path: '/globuri-craciun-personalizate',
      image: '/img/og/og-globuri-craciun.jpg',
    }),
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
        name: 'Globuri de Crăciun personalizate din plexiglas',
        serviceType: 'Ornamente de Crăciun personalizate tăiate laser',
        description:
          'Globuri și ornamente de Crăciun din plexiglas colorat, tăiate laser și personalizate cu nume, oraș, an sau mesaj, realizate în atelierul LaserCraft din Craiova.',
        url: `${SITE_URL}/globuri-craciun-personalizate`,
        provider: { '@id': BUSINESS_ID },
        areaServed: [{ '@type': 'City', name: 'Craiova' }],
        image: schemaImages.map(largestVariantUrl),
      }),
    ],
  }),
})

const linkClass =
  'font-medium text-amber-700 underline decoration-amber-500/40 underline-offset-4 hover:text-amber-800 hover:decoration-amber-600 transition-colors'

const ornaments: Array<{
  image: ImageName
  alt: string
  title: string
  description: string
  material: string
}> = [
  {
    image: '/img/products/glob-craciun-cu-nume-personalizat',
    alt: 'Glob de Crăciun personalizat din plexiglas roșu cu numele „Cristina”, Moș Crăciun în sanie cu reni și fulgi de nea, tăiat laser',
    title: 'Glob personalizat cu nume',
    description:
      'Numele „Cristina” pe o bandă centrală, cu Moș Crăciun în sanie cu reni și fulgi de nea.',
    material: 'Plexiglas roșu',
  },
  {
    image: '/img/products/glob-craciun-personalizat-craiova',
    alt: 'Glob de Crăciun din plexiglas verde personalizat cu textul „Craiova 26”, cu sanie, reni și fulgi de nea decupați laser',
    title: 'Glob cu numele orașului și anul',
    description:
      'Inscripția „Craiova” și anul „26”, cu sanie, reni și fulgi de nea. Orașul și anul se pot schimba.',
    material: 'Plexiglas verde',
  },
  {
    image: '/img/products/glob-craciun-fericit-plexiglas-verde',
    alt: 'Ornament rotund de Crăciun din plexiglas verde cu textul „Crăciun Fericit” și fulgi de nea, tăiat laser',
    title: 'Ornament „Crăciun Fericit”',
    description:
      'Ornament rotund cu urarea „Crăciun Fericit” în litere cursive și trei fulgi de nea decupați.',
    material: 'Plexiglas verde',
  },
  {
    image: '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
    alt: 'Glob de Crăciun din plexiglas negru cu sat de iarnă decupat laser: case, biserică, brazi și stea în vârf',
    title: 'Glob cu sat de iarnă',
    description:
      'Case, o biserică și brazi pe dealuri înzăpezite, cu o stea în vârful globului.',
    material: 'Plexiglas negru',
  },
  {
    image: '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
    alt: 'Glob de Crăciun din plexiglas verde cu Moș Crăciun în sanie trasă de un ren, stele și brazi decupați laser',
    title: 'Glob cu sanie și ren',
    description:
      'Moș Crăciun în sanie trasă de un ren, sub un cer cu stele, deasupra unui șir de brazi.',
    material: 'Plexiglas verde',
  },
  {
    image: '/img/products/ornament-craciun-bastoane-rosii',
    alt: 'Ornament de Crăciun din plexiglas roșu cu două bastoane legate cu fundă și fulgi de nea decupați laser',
    title: 'Bastoane de Crăciun',
    description:
      'Două bastoane cu dungi, legate cu o fundă, cu câte un fulg de nea decupat în fiecare.',
    material: 'Plexiglas roșu',
  },
  {
    image: '/img/products/ornament-craciun-fulg-de-nea-alb',
    alt: 'Ornament fulg de nea din plexiglas alb tăiat laser, cu orificiu pentru agățare în brad',
    title: 'Fulg de nea',
    description:
      'Fulg de nea cu brațe ramificate și un mic orificiu în vârf pentru agățare.',
    material: 'Plexiglas alb',
  },
  {
    image: '/img/products/ornament-craciun-inima-geometrica-roz',
    alt: 'Ornament inimă geometrică din plexiglas roz tăiat laser, agățat cu o panglică roșie',
    title: 'Inimă geometrică',
    description:
      'Inimă cu model geometric decupat și o inimioară plină în interior, agățată aici cu o panglică roșie.',
    material: 'Plexiglas roz',
  },
  {
    image: '/img/products/ornament-craciun-spiridus-luna',
    alt: 'Ornament de Crăciun din plexiglas verde cu un spiriduș pe o semilună și stele decupate laser',
    title: 'Spiriduș pe lună',
    description:
      'Un spiriduș cu căciulă și pantofi cu vârful răsucit, pe o semilună cu stele și puncte decupate.',
    material: 'Plexiglas verde',
  },
]

const personalizationOptions = [
  {
    title: 'Un nume',
    description:
      'Numele celui care primește globul, ca pe modelul „Cristina”.',
  },
  {
    title: 'Orașul și anul',
    description:
      'Numele orașului și anul, ca pe globul verde din galerie.',
  },
  {
    title: 'Un mesaj de sărbători',
    description:
      'O urare precum „Crăciun Fericit” sau textul ales de dumneavoastră.',
  },
  {
    title: 'Culoarea plexiglasului',
    description:
      'Plexiglas transparent, colorat sau oglindă; în galerie: roșu, verde, negru, alb și roz.',
  },
  {
    title: 'Motivul decorativ',
    description:
      'Sanie cu reni, fulgi de nea, sat de iarnă sau un design trimis de dumneavoastră.',
  },
  {
    title: 'Detalii gravate',
    description:
      'Gravură laser pe plexiglas, până la 1200 DPI, pentru texte și detalii fine.',
  },
]

const useIdeas = [
  {
    title: 'Pentru bradul dumneavoastră',
    description:
      'Câte un glob cu numele fiecărui membru al familiei, într-un set de aceeași culoare.',
  },
  {
    title: 'Cadouri pentru familie și prieteni',
    description:
      'Un glob cu numele celui drag, o idee de cadou personal pentru sărbători.',
  },
  {
    title: 'Cadouri pentru colegi și clienți',
    description:
      'Ornamente cu numele firmei sau cu o urare, cu reduceri pentru cantități mari.',
  },
]

const orderSteps = [
  {
    title: 'Modelul și textul',
    description:
      'Modelul ales din galerie sau ideea dumneavoastră, plus numele, orașul, anul sau mesajul dorit.',
  },
  {
    title: 'Materialul și culoarea',
    description:
      'Tipul de plexiglas și culoarea dorită. Dacă aveți nelămuriri, vă ajutăm gratuit să alegeți materialul potrivit.',
  },
  {
    title: 'Dimensiunile și cantitatea',
    description:
      'Mărimea dorită și numărul de bucăți, de la un singur glob la producție de serie.',
  },
  {
    title: 'Fișierele de design și termenul',
    description:
      'Fișierele de design, dacă există, și data până la care aveți nevoie de ornamente.',
  },
]

const priceFactors = [
  'modelul ales sau designul propriu;',
  'dimensiunile ornamentelor;',
  'numărul de bucăți.',
]

const offerIncludes = [
  'Consultanță gratuită pentru alegerea materialului',
  'Reduceri pentru cantități mari',
]

const faqItems = [
  {
    question: 'Ce se poate scrie pe un glob de Crăciun personalizat?',
    answer:
      'Un nume, numele orașului și anul, o urare precum „Crăciun Fericit” sau textul dorit de dumneavoastră, decupat laser în plexiglas.',
  },
  {
    question: 'Cât costă un glob de Crăciun personalizat?',
    answer:
      'Prețul este la cerere și depinde de model, dimensiuni și cantitate. Oferta este gratuită, iar pentru cantități mari oferim reduceri.',
  },
  {
    question: 'Pot comanda globuri personalizate pentru colegi sau clienți?',
    answer:
      'Da. Lucrăm de la piese unice la producție de serie, iar pentru cantități mari oferim reduceri. Trimiteți-ne textul pentru fiecare glob și numărul de bucăți.',
  },
  {
    question: 'Pot trimite propriul design?',
    answer:
      'Da, personalizarea este completă. Ne puteți trimite fișierele de design, dacă le aveți, sau puteți porni de la un model din galerie.',
  },
  {
    question: 'Când ar trebui să comand globurile?',
    answer:
      'Vă recomandăm să ne contactați din timp înainte de sărbători. Pentru comenzi urgente, termenele de execuție pornesc de la 24 de ore.',
  },
  {
    question: 'Cum se agață globurile în brad?',
    answer:
      'Modelele din galerie au în partea de sus un mic orificiu pentru agățare, prin care puteți trece o panglică sau un șnur.',
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

function GloburiCraciunPage() {
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
            plexiglas, în Craiova
          </>
        }
      >
        <p>
          Realizăm globuri de Crăciun personalizate din plexiglas în atelierul
          nostru de tăiere laser din Craiova: ornamente pentru brad cu un nume,
          cu numele orașului și anul sau cu un mesaj de sărbători, în culoarea
          dorită de dumneavoastră.
        </p>
        <p>
          Globurile sunt tăiate laser din plexiglas colorat, cu margini curate
          și lustruite, iar modelele din galerie au în partea de sus un
          orificiu pentru agățare. Lucrăm atât piese unice, cât și producție de
          serie, iar oferta este gratuită.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-base font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25"
          >
            Solicitați o ofertă gratuită
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 text-zinc-300 text-base font-semibold rounded-xl hover:bg-white/5 hover:border-zinc-600 transition-all"
          >
            Sunați: {PHONE_DISPLAY}
          </a>
        </div>
      </PageHero>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Modele de globuri și ornamente de Crăciun din plexiglas
            </h2>
            <p className="mt-4 text-zinc-600 leading-relaxed">
              Lucrări reale, tăiate laser în atelierul nostru. Pornind de la
              oricare model, putem adapta textul, culoarea sau motivul
              decorativ. Alte proiecte găsiți în{' '}
              <Link to="/portofoliu" className={linkClass}>
                portofoliul LaserCraft
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ornaments.map((ornament, index) => (
              <article
                key={ornament.image}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
              >
                <div className="aspect-square bg-zinc-100 overflow-hidden">
                  <ResponsiveImage
                    name={ornament.image}
                    alt={ornament.alt}
                    sizes="(min-width: 1280px) 389px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </div>
                <div className="p-6 border-t border-zinc-100">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {ornament.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {ornament.description}
                  </p>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-amber-600">
                    {ornament.material}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Ce puteți personaliza pe un glob de Crăciun
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Pe globurile personalizate cu nume, textul este decupat laser
              direct în plexiglas, ca parte a ornamentului. Personalizarea este
              completă, iar dumneavoastră alegeți:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {personalizationOptions.map((option) => (
              <div
                key={option.title}
                className="bg-white rounded-2xl p-6 border border-zinc-200"
              >
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-zinc-600 leading-relaxed">
            Mai multe detalii tehnice găsiți pe pagina despre{' '}
            <Link to="/taiere-laser-plexiglas" className={linkClass}>
              tăierea laser a plexiglasului
            </Link>
            , iar pentru texte fine sau un logo, vedeți{' '}
            <Link to="/gravura-laser-craiova" className={linkClass}>
              gravura laser pe plexiglas
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Idei pentru ornamentele de brad personalizate
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Decorațiunile de Crăciun din plexiglas pot împodobi bradul sau pot
              deveni un cadou. Câteva sugestii:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {useIdeas.map((idea) => (
              <div
                key={idea.title}
                className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200"
              >
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {idea.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {idea.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-zinc-600 leading-relaxed">
            Căutați și alte idei? Vedeți{' '}
            <Link to="/cadouri-personalizate" className={linkClass}>
              cadourile personalizate din plexiglas
            </Link>
            , de la brelocuri cu nume la decoruri pe suport.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Cum comandați globuri de Crăciun personalizate
              </h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                Oferta este gratuită. Pentru a o primi cât mai rapid,
                trimiteți-ne:
              </p>
              <ol className="mt-8 space-y-6">
                {orderSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-zinc-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-zinc-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-zinc-900">
                  Comandați din timp înainte de sărbători
                </h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                  Vă recomandăm să ne contactați din timp, mai ales pentru
                  comenzile cu multe bucăți. Pentru comenzi urgente, termenele
                  de execuție pornesc de la 24 de ore.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8">
                <h3 className="text-lg font-bold text-zinc-900">
                  Contactați-ne
                </h3>
                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-zinc-500">Telefon</dt>
                    <dd>
                      <a
                        href={PHONE_HREF}
                        className="font-semibold text-zinc-900 hover:text-amber-700 transition-colors"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="font-semibold text-zinc-900 hover:text-amber-700 transition-colors break-all"
                      >
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Program</dt>
                    <dd className="text-zinc-900">
                      Luni–Vineri 08:00–17:00, Sâmbătă 09:00–14:00, Duminică
                      închis
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm text-zinc-600 leading-relaxed">
                  Atelierul nostru este în Craiova și vă răspundem în maximum
                  24 de ore lucrătoare. Puteți folosi și{' '}
                  <Link to="/contact" className={linkClass}>
                    pagina de contact
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
                Cât costă globurile de Crăciun personalizate
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                Pentru ornamentele de Crăciun din plexiglas, prețul este la
                cerere. Vă pregătim o ofertă gratuită, în funcție de:
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
                Pe lângă decorațiunile de sărbători, realizăm și{' '}
                <Link to="/placute-adresa" className={linkClass}>
                  plăcuțe de adresă din plexiglas
                </Link>{' '}
                și{' '}
                <Link to="/litere-volumetrice" className={linkClass}>
                  litere volumetrice pentru evenimente
                </Link>
                . Vedeți toate{' '}
                <Link to="/servicii" className={linkClass}>
                  serviciile de tăiere și gravură laser
                </Link>
                .
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Preț la cerere
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ofertă gratuită
              </div>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                Vă răspundem în maximum 24 de ore lucrătoare.
              </p>
              <ul className="mt-6 space-y-3 text-zinc-300">
                {offerIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                Solicitați oferta pentru globuri →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Faq items={faqItems} />

      <CTASection />
    </>
  )
}
