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
  '/img/products/breloc-nume-plexiglas-doua-straturi',
  '/img/products/breloc-gravat-mesaj-personalizat',
  '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
  '/img/products/decor-love-pisici-plexiglas-roz',
] as const satisfies ReadonlyArray<ImageName>

const largestVariantUrl = (name: ImageName) =>
  absoluteUrl(`${name}-${images[name].width}.webp`)

export const Route = createFileRoute('/cadouri-personalizate')({
  component: CadouriPersonalizatePage,
  head: () => ({
    ...seo({
      title: 'Cadouri Personalizate din Plexiglas – Craiova | LaserCraft',
      description:
        'Cadouri personalizate din plexiglas, tăiate și gravate laser în Craiova: brelocuri cu nume sau mesaj și decor cu suport. Preț la cerere, ofertă gratuită.',
      path: '/cadouri-personalizate',
      image: '/img/og/og-cadouri-personalizate.jpg',
    }),
    scripts: [
      breadcrumbs([
        { name: 'Servicii', path: '/servicii' },
        { name: 'Cadouri personalizate', path: '/cadouri-personalizate' },
      ]),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Cadouri personalizate din plexiglas',
        serviceType: 'Cadouri personalizate tăiate și gravate laser',
        description:
          'Cadouri personalizate din plexiglas tăiate și gravate laser — brelocuri cu nume sau mesaj, decoruri cu suport și forme decorative — realizate în atelierul LaserCraft din Craiova.',
        url: `${SITE_URL}/cadouri-personalizate`,
        provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'City', name: 'Craiova' },
        image: schemaImages.map(largestVariantUrl),
      }),
    ],
  }),
})

const linkClass =
  'font-semibold text-amber-700 underline decoration-amber-500/40 underline-offset-2 hover:text-amber-800 transition-colors'

type Gift = {
  image: ImageName
  alt: string
  title: string
  description: string
  material: string
}

const keychains: Gift[] = [
  {
    image: '/img/products/breloc-nume-plexiglas-doua-straturi',
    alt: 'Breloc cu numele „Jonut” din plexiglas pe două straturi, cu litere albe aplicate pe fundal roz, ținut în palmă',
    title: 'Nume pe două straturi',
    description:
      'Numele „Jonut” în litere albe, aplicate pe un fundal roz tăiat pe contur, cu orificiu pentru inel — breloc sau etichetă cu nume.',
    material: 'Plexiglas roz + alb',
  },
  {
    image: '/img/products/breloc-gravat-mesaj-personalizat',
    alt: 'Breloc rotund din plexiglas negru gravat laser cu mesajul „you are INDISPENSABLE”, un personaj zâmbitor cu o pancartă „THANK YOU” și inimioare, cu inel metalic',
    title: 'Breloc gravat cu mesaj',
    description:
      'Breloc rotund din plexiglas negru, gravat laser cu mesajul „you are INDISPENSABLE”, un desen amuzant cu o pancartă „THANK YOU” și inimioare, cu inel metalic.',
    material: 'Plexiglas negru gravat',
  },
]

const standDecor: Gift[] = [
  {
    image: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
    alt: 'Decor din plexiglas cu suport: arcadă magenta cu trandafiri gravați, fundal galben și siluetele unei mame și a unui copil cu balon',
    title: 'Mamă și copil, în două culori',
    description:
      'Arcadă roz-magenta cu trandafiri gravați, pe fundal galben, cu siluetele unei mame sau bunici și a unui copil cu balon.',
    material: 'Plexiglas magenta + galben',
  },
  {
    image: '/img/products/icoana-isus-plexiglas-negru-cu-suport',
    alt: 'Icoană decorativă cu chipul lui Isus din plexiglas negru decupat laser pe fundal alb, cu suport pentru masă sau raft',
    title: 'Icoană decorativă',
    description:
      'Chipul lui Isus decupat laser din plexiglas negru, pe fundal alb, cu suport pentru așezare pe masă sau pe raft.',
    material: 'Plexiglas negru, fundal alb',
  },
]

const petGifts: Gift[] = [
  {
    image: '/img/products/decor-love-pisici-plexiglas-roz',
    alt: 'Decor „LOVE” din plexiglas roz tăiat laser, cu siluete de pisici integrate în litere',
    title: 'Decor „LOVE” cu pisici',
    description:
      'Cuvântul „LOVE” tăiat laser din plexiglas roz, cu siluete de pisici integrate în litere.',
    material: 'Plexiglas roz',
  },
  {
    image: '/img/products/ornament-pisica-inger-plexiglas-roz',
    alt: 'Pisicuță-înger din plexiglas roz, așezată pe un nor, cu aureolă, aripi și detalii conturate în negru',
    title: 'Pisicuță-înger',
    description:
      'Pisicuță roz așezată pe un nor, cu aureolă, aripi și detalii conturate în negru.',
    material: 'Plexiglas roz',
  },
  {
    image: '/img/products/ornament-os-caine-plexiglas-roz',
    alt: 'Os din plexiglas roz cu orificiu în formă de inimă, agățat cu o panglică roșie',
    title: 'Os pentru iubitorii de câini',
    description:
      'Os din plexiglas roz, cu orificiu în formă de inimă, agățat cu o panglică roșie.',
    material: 'Plexiglas roz',
  },
]

const personalizationOptions = [
  'Numele, inițialele sau un mesaj scurt, tăiate din plexiglas sau gravate laser.',
  'Un desen, un simbol sau un logo, gravat cu o rezoluție de până la 1200 DPI.',
  'Tipul plexiglasului: transparent, colorat sau oglindă, inclusiv combinații de culori pe două straturi.',
  'Forma piesei: breloc, decor cu suport, ornament de agățat sau un contur după designul dumneavoastră.',
]

const occasions = [
  {
    title: 'Ziua Mamei',
    description:
      'Un decor cu suport, cu siluete sau cu un mesaj, poate fi o idee de cadou de Ziua Mamei sau pentru bunici.',
  },
  {
    title: 'Zile de naștere',
    description:
      'Un breloc cu numele sărbătoritului sau un decor într-o formă care îi place.',
  },
  {
    title: 'Botez',
    description:
      'O icoană decorativă cu suport sau un decor cu numele copilului, ca amintire.',
  },
  {
    title: 'Colegi și clienți',
    description:
      'Brelocuri gravate cu un mesaj de mulțumire sau cu logo-ul firmei, realizate în serie.',
  },
]

const orderSteps = [
  {
    title: 'Ideea și textul',
    description:
      'Ce doriți să realizăm și numele sau mesajul care va apărea pe piesă.',
  },
  {
    title: 'Materialul și culorile',
    description:
      'Tipul și culoarea plexiglasului; vă ajutăm gratuit să le alegeți.',
  },
  {
    title: 'Dimensiunile și cantitatea',
    description: 'Dimensiunea aproximativă și numărul de bucăți.',
  },
  {
    title: 'Fișierele de design și termenul',
    description:
      'Desenul sau logo-ul, dacă există, și termenul dorit. Pentru comenzile urgente, termenele pornesc de la 24 de ore.',
  },
]

const priceIncludes = [
  'Ofertă gratuită, cu răspuns în maximum 24 de ore lucrătoare',
  'Consultanță gratuită pentru alegerea materialelor',
  'De la piese unice la producție de serie',
  'Reduceri pentru cantități mari',
]

const faqItems = [
  {
    question: 'Cât costă un cadou personalizat din plexiglas?',
    answer: (
      <p>
        Prețul este la cerere și depinde de dimensiuni, material, design și
        cantitate. Oferta este gratuită, iar pentru cantități mari oferim
        reduceri.
      </p>
    ),
  },
  {
    question: 'Pot comanda un singur breloc cu nume?',
    answer: (
      <p>
        Da. Lucrăm de la piese unice până la producție de serie, așa că puteți
        comanda un singur breloc sau mai multe bucăți, de exemplu pentru colegi
        ori clienți.
      </p>
    ),
  },
  {
    question: 'Ce se poate grava pe un breloc sau pe un decor?',
    answer: (
      <p>
        Un nume, un mesaj, un desen sau un logo. Gravura laser ajunge la o
        rezoluție de până la 1200 DPI, pe plexiglas, dar și pe lemn, sticlă sau
        piele.
      </p>
    ),
  },
  {
    question: 'Pot trimite propriul design?',
    answer: (
      <p>
        Da. Trimiteți-ne fișierele de design, dacă le aveți, împreună cu
        dimensiunile și cantitatea dorite. Dacă nu aveți fișiere, descrieți-ne
        ideea în cererea de ofertă.
      </p>
    ),
  },
  {
    question: 'În cât timp este gata comanda?',
    answer: (
      <p>
        Termenele de execuție sunt scurte; pentru comenzile urgente, de la 24 de
        ore. Menționați termenul dorit în cererea de ofertă.
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

function GiftCard({ gift, sizes }: { gift: Gift; sizes: string }) {
  return (
    <article className="bg-white rounded-2xl border border-zinc-200 overflow-hidden">
      <div className="aspect-[3/4] bg-zinc-100 overflow-hidden">
        <ResponsiveImage
          name={gift.image}
          alt={gift.alt}
          sizes={sizes}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 border-t border-zinc-100">
        <h3 className="text-lg font-semibold text-zinc-900">{gift.title}</h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          {gift.description}
        </p>
        <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-amber-600">
          {gift.material}
        </div>
      </div>
    </article>
  )
}

const pairSizes =
  '(min-width: 1280px) 343px, (min-width: 1024px) 27vw, (min-width: 640px) 45vw, 100vw'
const trioSizes = '(min-width: 1280px) 389px, (min-width: 640px) 30vw, 100vw'

function CadouriPersonalizatePage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Servicii', to: '/servicii' },
          { label: 'Cadouri personalizate' },
        ]}
        title={
          <>
            <Highlight>Cadouri personalizate</Highlight> din plexiglas,
            realizate în Craiova
          </>
        }
      >
        <p>
          Realizăm cadouri personalizate din plexiglas în atelierul nostru de
          tăiere și gravură laser din Craiova: brelocuri cu nume sau cu un mesaj
          gravat, decoruri cu suport și forme decorative după ideea
          dumneavoastră.
        </p>
        <p>
          Piesele sunt tăiate laser din plexiglas (acril), cu margini curate și
          lustruite, iar numele, mesajul sau desenul pot fi gravate ori aplicate
          pe un al doilea strat, de altă culoare. Oferta și consultanța pentru
          alegerea materialelor sunt gratuite.
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

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
                Brelocuri personalizate cu nume sau mesaj
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  Un breloc cu nume sau cu un mesaj gravat este un cadou simplu,
                  dar personal. Îl realizăm din plexiglas colorat pe două
                  straturi, cu literele aplicate pe fundal, sau dintr-o singură
                  piesă gravată laser cu textul și desenul dorite.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {keychains.map((gift) => (
                <GiftCard key={gift.image} gift={gift} sizes={pairSizes} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
                Decor personalizat cu suport
              </h2>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  Pentru un cadou care se așază pe masă sau pe raft, realizăm
                  decoruri din plexiglas cu suport, în care combinăm mai multe
                  culori, siluete decupate și detalii gravate laser.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {standDecor.map((gift) => (
                <GiftCard key={gift.image} gift={gift} sizes={pairSizes} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
              Cadouri pentru iubitorii de animale
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Tăierea laser urmează conturul dorit, așa că pisicile și câinii
              pot deveni motivul unui cadou, eventual completat cu numele
              animalului de companie. Mai multe lucrări găsiți în{' '}
              <Link to="/portofoliu" className={linkClass}>
                portofoliul LaserCraft
              </Link>
              .
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {petGifts.map((gift) => (
              <GiftCard key={gift.image} gift={gift} sizes={trioSizes} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4">
                Ce puteți personaliza
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-6">
                Personalizarea este completă: pornim de la ideea dumneavoastră
                sau adaptăm unul dintre modelele de mai sus.
              </p>
              <ul className="space-y-3">
                {personalizationOptions.map((option) => (
                  <li
                    key={option}
                    className="flex items-start gap-2 text-zinc-700"
                  >
                    <CheckIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    {option}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 text-zinc-600 leading-relaxed lg:pt-14">
              <p>
                Pentru texte fine sau un logo, aflați mai multe despre{' '}
                <Link to="/gravura-laser-craiova" className={linkClass}>
                  gravura laser în Craiova
                </Link>
                , pe plexiglas, lemn, sticlă sau piele, și despre{' '}
                <Link to="/taiere-laser-plexiglas" className={linkClass}>
                  tăierea laser a plexiglasului
                </Link>
                .
              </p>
              <p>
                Aceeași tehnică stă la baza{' '}
                <Link to="/placute-adresa" className={linkClass}>
                  plăcuțelor de adresă din plexiglas
                </Link>{' '}
                și a{' '}
                <Link to="/litere-volumetrice" className={linkClass}>
                  literelor volumetrice pentru nunți și evenimente
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl text-2xl sm:text-3xl font-bold text-zinc-900 mb-10">
            Idei de ocazii pentru un cadou personalizat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {occasions.map((occasion) => (
              <div
                key={occasion.title}
                className="bg-white rounded-2xl p-6 border border-zinc-200"
              >
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  {occasion.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {occasion.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-zinc-600 leading-relaxed">
            De Crăciun, vedeți și{' '}
            <Link to="/globuri-craciun-personalizate" className={linkClass}>
              globurile de Crăciun personalizate
            </Link>
            : ornamente din plexiglas colorat, cu nume sau cu un mesaj și cu
            orificiu pentru agățat în brad.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                Cum comandați un cadou personalizat
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
              <p className="mt-8 text-zinc-600 leading-relaxed">
                Ne puteți suna la{' '}
                <a href={PHONE_HREF} className={linkClass}>
                  {PHONE_DISPLAY}
                </a>{' '}
                sau ne puteți scrie la{' '}
                <a
                  href={`mailto:${EMAIL}`}
                  className={`${linkClass} break-all`}
                >
                  {EMAIL}
                </a>
                , de luni până vineri între 08:00 și 17:00 și sâmbăta între
                09:00 și 14:00. Detalii pe{' '}
                <Link to="/contact" className={linkClass}>
                  pagina de contact
                </Link>
                .
              </p>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Preț
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Cât costă un cadou personalizat
              </h2>
              <p className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
                Preț la cerere
              </p>
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                Fiecare cadou este diferit, așa că prețul se stabilește prin
                ofertă, în funcție de dimensiuni, material, design și cantitate.
              </p>
              <ul className="mt-6 space-y-3 text-zinc-300">
                {priceIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckIcon className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/servicii"
                className="mt-6 inline-flex items-center gap-2 text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                Vedeți toate serviciile de tăiere și gravură →
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
