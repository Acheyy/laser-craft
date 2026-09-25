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

const sortedPricing = [...plaquePricing].sort((a, b) => a.price - b.price)
const cheapest = sortedPricing[0]
const priciest = sortedPricing[sortedPricing.length - 1]
const standardSizes = sortedPricing.map((item) => item.size)

const productImages: ImageName[] = [
  '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
  '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
  '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
]

export const Route = createFileRoute('/placute-adresa')({
  component: PlacuteAdresaPage,
  head: () => ({
    ...seo({
      title: `Plăcuțe de Adresă din Plexiglas Craiova – de la ${formatLei(cheapest.price)}`,
      description: `Plăcuțe de adresă din plexiglas pe 2 straturi, cu litere și cifre aplicate, realizate în Craiova. De la ${formatLei(cheapest.price)} pentru ${cheapest.size}. Cereți o ofertă gratuită.`,
      path: '/placute-adresa',
      image: '/img/og/og-servicii.jpg',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        { name: 'Plăcuțe de adresă', path: '/placute-adresa' },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Plăcuță de adresă din plexiglas pe 2 straturi',
        url: `${SITE_URL}/placute-adresa`,
        image: productImages.map((name) =>
          absoluteUrl(`${name}-${images[name].width}.webp`),
        ),
        description:
          'Plăcuță de adresă personalizată din plexiglas, construită pe 2 straturi (fundal + litere/cifre aplicate), tăiată și gravată laser în atelierul LaserCraft din Craiova.',
        brand: { '@type': 'Brand', name: 'LaserCraft' },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: cheapest.price,
          highPrice: priciest.price,
          priceCurrency: 'RON',
          offerCount: plaquePricing.length,
          availability: 'https://schema.org/MadeToOrder',
          seller: { '@id': BUSINESS_ID },
          offers: sortedPricing.map((item) => ({
            '@type': 'Offer',
            name: `Plăcuță de adresă din plexiglas ${item.size}`,
            price: item.price,
            priceCurrency: 'RON',
            availability: 'https://schema.org/MadeToOrder',
          })),
        },
      }),
    ],
  }),
})

const linkClass =
  'font-medium text-amber-700 underline decoration-amber-500/40 underline-offset-4 hover:text-amber-800 hover:decoration-amber-600 transition-colors'

const models: Array<{
  image: ImageName
  alt: string
  title: string
  description: string
  material: string
}> = [
  {
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
    alt: 'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii volumetrice, prinsă cu distanțiere din inox',
    title: 'Litere și cifre aurii volumetrice',
    description:
      'Fundal din plexiglas negru, cu numele străzii și numărul casei în litere și cifre aurii volumetrice. Montaj cu distanțiere din inox.',
    material: 'Plexiglas negru + auriu',
  },
  {
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
    alt: 'Plăcuță de adresă orizontală din plexiglas negru lucios cu cifre aurii și distanțiere aurii',
    title: 'Format orizontal, negru lucios',
    description:
      'Plăcuță orizontală din plexiglas negru lucios, cu numărul casei în cifre aurii și distanțiere aurii asortate.',
    material: 'Plexiglas negru lucios + auriu',
  },
  {
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
    alt: 'Plăcuță de adresă din plexiglas negru lucios cu pictogramă de casă și text auriu',
    title: 'Pictogramă de casă și text auriu',
    description:
      'Plexiglas negru lucios cu pictograma unei case și textul adresei în auriu, montaj cu distanțiere.',
    material: 'Plexiglas negru lucios + auriu',
  },
  {
    image: '/img/products/placuta-adresa-metal-decupat',
    alt: 'Plăcuță de adresă din oțel vopsit negru mat, decupată laser, cu siluetă de casă și text personalizat',
    title: 'Plăcuță din metal decupată laser',
    description:
      'Un proiect special din portofoliu: plăcuță din oțel vopsit mat, cu pictograma casei și textul personalizat decupate laser.',
    material: 'Oțel vopsit mat',
  },
  {
    image: '/img/products/numar-casa-plexiglas-negru-model-floral',
    alt: 'Număr de casă 32 din plexiglas negru, cu cifre decupate și model floral tăiat laser',
    title: 'Număr de casă cu model floral',
    description:
      'Design personalizat: cifrele casei decupate într-o bandă din plexiglas negru, completate de un model floral tăiat laser.',
    material: 'Plexiglas negru',
  },
]

const orderSteps = [
  {
    title: 'Dimensiunea și cantitatea',
    description:
      'Unul dintre formatele standard sau dimensiunea exactă de care aveți nevoie, plus numărul de bucăți.',
  },
  {
    title: 'Materialul și culorile',
    description:
      'Tipul de plexiglas și combinația de culori dorite. Dacă aveți nelămuriri, vă ajutăm gratuit să alegeți materialul și tehnica potrivite.',
  },
  {
    title: 'Textul și fișierele de design',
    description:
      'Textul care va apărea pe plăcuță și, dacă există, fișierele de design sau logo-ul.',
  },
  {
    title: 'Termenul de execuție dorit',
    description:
      'Spuneți-ne până când aveți nevoie de plăcuță. Pentru comenzile urgente, termenele pornesc de la 24 de ore.',
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

function PlacuteAdresaPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Plăcuțe de adresă' },
        ]}
        title={
          <>
            Plăcuțe de adresă din plexiglas,{' '}
            <Highlight>personalizate</Highlight> în Craiova
          </>
        }
      >
        <p>
          Realizăm plăcuțe de adresă din plexiglas în atelierul nostru din
          Craiova, tăiate și gravate laser cu textul dorit de dumneavoastră:
          numărul casei, numele străzii și, la cerere, un simbol grafic.
          Plăcuțele din pachetele standard au o construcție pe 2 straturi —
          fundal și litere/cifre aplicate — pentru un efect de relief și un
          contrast elegant.
        </p>
        <p>
          Pachetele standard pornesc de la {formatLei(cheapest.price)}, iar
          pentru dimensiuni speciale, logo sau design custom vă pregătim o
          ofertă gratuită.
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

      <section id="preturi" className="py-16 sm:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Prețuri plăcuțe de adresă
              </h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                Pentru plăcuțele de adresă din plexiglas oferim{' '}
                {plaquePricing.length} dimensiuni standard, cu prețuri fixe.
                Alegeți formatul potrivit, iar noi ne ocupăm de tăiere și
                gravare.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200">
                <table className="w-full text-left">
                  <caption className="sr-only">
                    Prețuri plăcuțe de adresă din plexiglas pe 2 straturi
                  </caption>
                  <thead className="bg-zinc-50 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    <tr>
                      <th scope="col" className="px-5 py-3">
                        Dimensiune
                      </th>
                      <th scope="col" className="px-5 py-3 text-right">
                        Preț
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    {sortedPricing.map((item) => (
                      <tr key={item.size}>
                        <th
                          scope="row"
                          className="px-5 py-4 font-semibold text-zinc-900 whitespace-nowrap"
                        >
                          {item.size}
                        </th>
                        <td className="px-5 py-4 text-right font-bold text-zinc-900 whitespace-nowrap">
                          {formatLei(item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold">
                Ce include prețul
              </h3>
              <ul className="mt-5 space-y-3 text-zinc-300">
                {[
                  'Ambele straturi de plexiglas (fundal + litere/cifre)',
                  'Tăierea laser',
                  'Gravarea textului',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-zinc-400 leading-relaxed">
                Pentru logo sau design custom, prețul se stabilește prin
                ofertă. Pentru cantități mari oferim reduceri.
              </p>
              <Link
                to="/servicii"
                className="mt-6 inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                Vedeți toate serviciile și prețurile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Construcția pe 2 straturi: fundal și litere aplicate
          </h2>
          <p className="mt-4 text-zinc-600 leading-relaxed">
            Plăcuțele de adresă din pachetele standard sunt realizate din
            plexiglas — material cunoscut și sub numele de acril — și sunt
            construite din două straturi suprapuse.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                Stratul 1
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">Fundalul</h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                Placa de bază, tăiată laser la dimensiunea aleasă, care dă
                culoarea de fond a plăcuței — în modelele din portofoliu,
                negru.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                Stratul 2
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Literele și cifrele
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                Numărul casei, numele străzii și eventualele simboluri, tăiate
                laser din plexiglas de altă culoare și aplicate pe fundal
                pentru un efect volumetric.
              </p>
            </div>
          </div>
          <p className="mt-8 text-zinc-600 leading-relaxed">
            Tăierea cu laser oferă margini curate, lustruite și toleranțe de
            ±0,05 mm, astfel încât și cifrele sau literele cu detalii fine au
            contururi precise. Prelucrăm plexiglas transparent, colorat sau
            oglindă, așa că, dacă vă doriți o altă combinație de culori decât
            negru cu auriu, menționați-o în cererea de ofertă. Aflați mai multe
            despre{' '}
            <Link to="/taiere-laser-plexiglas" className={linkClass}>
              tăierea laser a plexiglasului
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Modele de plăcuțe de adresă din portofoliu
            </h2>
            <p className="mt-4 text-zinc-600 leading-relaxed">
              Câteva plăcuțe realizate în atelierul din Craiova. Pentru mai
              multe lucrări, vizitați{' '}
              <Link to="/portofoliu" className={linkClass}>
                portofoliul LaserCraft
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {models.map((model) => (
              <article
                key={model.image}
                className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
              >
                <div className="aspect-[4/3] bg-white">
                  <ResponsiveImage
                    name={model.image}
                    alt={model.alt}
                    sizes="(min-width: 1280px) 592px, (min-width: 640px) 50vw, 100vw"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 border-t border-zinc-100">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {model.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                    {model.description}
                  </p>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-amber-600">
                    {model.material}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Dimensiuni la comandă, logo sau design personalizat
              </h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                Dacă formatele standard nu vi se potrivesc, realizăm și plăcuțe
                de adresă personalizate, în orice formă și cu dimensiuni la
                comandă. Ca reper, tăierea și gravura în plexiglas pentru
                proiectele custom se calculează pe suprafață; prețul final
                pentru o plăcuță cu dimensiuni speciale, cu logo sau cu
                designul dumneavoastră îl stabilim prin ofertă.
              </p>
              <p className="mt-4 text-zinc-600 leading-relaxed">
                Pentru inscripții decorative din plexiglas, vedeți și{' '}
                <Link to="/litere-volumetrice" className={linkClass}>
                  literele volumetrice pentru decor de evenimente
                </Link>
                . Dacă doriți un logo gravat pe lemn, sticlă sau piele, aflați
                mai multe despre{' '}
                <Link to="/gravura-laser-craiova" className={linkClass}>
                  gravura laser în Craiova
                </Link>
                .
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
                Proiecte custom din plexiglas
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
                  {formatLei(ACRYLIC_PRICE_PER_CM2).replace(' lei', '')}
                </span>
                <span className="text-base sm:text-lg text-zinc-600 font-medium">
                  lei / cm²
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-600">
                Exemplu: 100 × 50 mm (50 cm²) ≈{' '}
                <span className="font-semibold text-amber-700">
                  {formatLei(50 * ACRYLIC_PRICE_PER_CM2)}
                </span>
              </p>
              <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
                Consultanța pentru alegerea materialelor și a tehnicilor optime
                este gratuită.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Cum comandați o plăcuță de adresă
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
            <div className="lg:col-span-2">
              <div className="bg-zinc-50 rounded-2xl border border-zinc-200 p-6 sm:p-8">
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
                  Vă răspundem în maximum 24 de ore lucrătoare. Puteți folosi
                  și{' '}
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

      <Faq
        items={[
          {
            question: 'Cât costă o plăcuță de adresă din plexiglas?',
            answer: `Pachetele standard costă între ${formatLei(cheapest.price)} (${cheapest.size}) și ${formatLei(priciest.price)} (${priciest.size}). Prețul include ambele straturi de plexiglas, tăierea și gravarea textului.`,
          },
          {
            question: 'Ce dimensiuni sunt disponibile?',
            answer: `Formatele standard sunt ${standardSizes.slice(0, -1).join(', ')} și ${standardSizes[standardSizes.length - 1]}. Pentru alte dimensiuni cereți o ofertă; ca reper, proiectele custom din plexiglas se calculează pe suprafață, la ${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm².`,
          },
          {
            question: 'Pot adăuga un logo sau un design propriu?',
            answer:
              'Da. Plăcuțele cu logo sau design custom se realizează pe bază de ofertă. Trimiteți-ne fișierele de design, dacă le aveți, împreună cu dimensiunile dorite.',
          },
          {
            question: 'În cât timp este gata plăcuța?',
            answer:
              'Lucrăm cu termene de execuție scurte; pentru comenzile urgente, de la 24 de ore. Menționați termenul dorit în cererea de ofertă.',
          },
          {
            question: 'Ce culori de plexiglas pot alege?',
            answer:
              'Prelucrăm plexiglas transparent, colorat sau oglindă. Modelele din portofoliu combină fundalul negru lucios cu litere și cifre aurii; pentru o altă combinație, menționați-o în cererea de ofertă.',
          },
          {
            question: 'Oferiți reduceri pentru mai multe plăcuțe?',
            answer:
              'Da, pentru cantități mari oferim reduceri. Precizați numărul de bucăți în cererea de ofertă și vă răspundem în maximum 24 de ore lucrătoare.',
          },
        ]}
      />

      <CTASection />
    </>
  )
}
