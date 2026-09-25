import { Link, createFileRoute } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Icon, type IconName } from '~/components/Icon'
import { Highlight, PageHero } from '~/components/PageHero'
import { Section, SectionHeader, textLink } from '~/components/ui'
import { PRECISION } from '~/data/business'
import { breadcrumbs, seo } from '~/utils/seo'

export const Route = createFileRoute('/despre-noi')({
  component: DespreNoiPage,
  head: () => ({
    ...seo({
      title: 'Despre LaserCraft – Atelier de Tăiere și Gravură Laser Craiova',
      description:
        'Descoperiți povestea LaserCraft, atelier de tăiere și gravare laser din Craiova — peste 10 ani de experiență și peste 2000 de proiecte realizate.',
      path: '/despre-noi',
      image: '/img/og/og-despre-noi.jpg',
    }),
    scripts: [breadcrumbs([{ name: 'Despre noi', path: '/despre-noi' }])],
  }),
})

const stats = [
  { value: '10+', label: 'Ani de experiență' },
  { value: '2000+', label: 'Proiecte realizate' },
  { value: '500+', label: 'Clienți fideli' },
  { value: '99%', label: 'Clienți mulțumiți' },
]

// Concrete, checkable facts only (they replace the old generic values).
// Wording follows the canonical facts in ~/data/business. The free quote,
// reply time and delivery are stated by the OrderBlock right below.
const howWeWork: Array<{ icon: IconName; lead: string; rest: string }> = [
  { icon: 'shieldCheck', lead: `Precizie de ${PRECISION}`, rest: ' la tăiere' },
  { icon: 'bolt', lead: 'Execuție urgentă', rest: ' de la 24 de ore' },
  { icon: 'layers', lead: 'De la o singură piesă', rest: ' la serii mari' },
]

function DespreNoiPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Despre noi' }]}
        title={
          <>
            Despre <Highlight>LaserCraft</Highlight>
          </>
        }
        intro={
          <p>
            Suntem o echipă din Craiova cu peste 10 ani de experiență în tăierea
            și gravura laser.
          </p>
        }
        media={[
          {
            name: '/img/products/litere-volumetrice-decor-eveniment-1',
            alt: 'Panouri arcuite cu litere volumetrice din plexiglas alb „Nuntă de probă” și „Roselle”, lângă un aranjament floral',
          },
          {
            name: '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
            alt: 'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii volumetrice, prinsă cu distanțiere din inox',
          },
          {
            name: '/img/products/glob-craciun-cu-nume-personalizat',
            alt: 'Glob de Crăciun personalizat din plexiglas roșu cu numele „Cristina”, Moș Crăciun în sanie cu reni și fulgi de nea, tăiat laser',
          },
        ]}
      >
        <dl className="grid max-w-xl grid-cols-4 gap-3 border-t border-white/10 pt-5 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-xs leading-snug text-zinc-400 sm:text-sm">
                {stat.label}
              </dt>
              <dd className="text-xl font-bold text-amber-400 min-[400px]:text-2xl sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <SectionHeader title="Povestea noastră" />
            <div className="max-w-2xl space-y-4 leading-relaxed text-zinc-700 sm:text-lg">
              <p>
                LaserCraft a pornit de la o idee simplă: tăiere și gravură laser
                făcute cu grijă, la comandă, pentru clienții din Craiova și din
                toată România. Am început cu un singur echipament laser.
              </p>
              <p>
                Astăzi realizăm în atelierul din Craiova{' '}
                <Link to="/placute-adresa" className={textLink}>
                  plăcuțe de adresă din plexiglas
                </Link>
                ,{' '}
                <Link to="/litere-volumetrice" className={textLink}>
                  litere volumetrice pentru nunți și evenimente
                </Link>{' '}
                (ca decorul pentru locația Roselle),{' '}
                <Link to="/cadouri-personalizate" className={textLink}>
                  cadouri personalizate
                </Link>{' '}
                și{' '}
                <Link to="/globuri-craciun-personalizate" className={textLink}>
                  globuri de Crăciun cu nume
                </Link>
                .
              </p>
              <p>
                Pentru persoane fizice și pentru firme facem{' '}
                <Link to="/gravura-laser-craiova" className={textLink}>
                  gravură laser pe lemn, sticlă, piele și plexiglas
                </Link>{' '}
                și{' '}
                <Link to="/taiere-laser-plexiglas" className={textLink}>
                  tăiere laser plexiglas la comandă
                </Link>
                . O parte din lucrări sunt în{' '}
                <Link to="/portofoliu" className={textLink}>
                  portofoliul nostru
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-inset ring-zinc-200 sm:p-6 lg:col-span-2 lg:self-start">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              Cum lucrăm
            </h2>
            <ul className="mt-4 space-y-3">
              {howWeWork.map((item) => (
                <li key={item.lead} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Icon name={item.icon} className="w-5 h-5" />
                  </span>
                  <p className="min-w-0 leading-snug text-zinc-700">
                    <strong className="font-semibold text-zinc-900">{item.lead}</strong>
                    {item.rest}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <OrderBlock />
    </>
  )
}
