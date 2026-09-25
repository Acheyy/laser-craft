import { Link } from '@tanstack/react-router'
import { Icon } from '~/components/Icon'
import { ResponsiveImage, type ImageName } from '~/components/ResponsiveImage'
import { Section, SectionHeader, buttonClass } from '~/components/ui'
import type { ProductPath } from '~/data/products'

// Real 3:4 workshop photos, none of them repeated from the product tiles, the
// hero collage or the Christmas strip. Phones show the first 4 (2 × 2), larger
// screens all 6.
const works: Array<{
  image: ImageName
  alt: string
  label: string
  to: ProductPath
}> = [
  {
    image: '/img/products/icoana-isus-plexiglas-negru-cu-suport',
    alt: 'Icoană cu chipul lui Isus din plexiglas negru decupat laser pe fundal alb, cu suport',
    label: 'Icoană decorativă',
    to: '/cadouri-personalizate',
  },
  {
    image: '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
    alt: 'Glob de Crăciun din plexiglas negru cu sat de iarnă decupat laser: case, biserică, brazi și stea în vârf',
    label: 'Glob cu sat de iarnă',
    to: '/globuri-craciun-personalizate',
  },
  {
    image: '/img/products/decor-love-pisici-plexiglas-roz',
    alt: 'Decor „LOVE” din plexiglas roz tăiat laser, cu siluete de pisici integrate în litere',
    label: 'Decor „LOVE” cu pisici',
    to: '/cadouri-personalizate',
  },
  {
    image: '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
    alt: 'Glob de Crăciun din plexiglas verde cu Moș Crăciun în sanie trasă de un ren, stele și brazi decupați laser',
    label: 'Glob cu sanie și ren',
    to: '/globuri-craciun-personalizate',
  },
  {
    image: '/img/products/ornament-pisica-inger-plexiglas-roz',
    alt: 'Pisicuță-înger din plexiglas roz, așezată pe un nor, cu aureolă, aripi și detalii conturate în negru',
    label: 'Pisicuță-înger',
    to: '/cadouri-personalizate',
  },
  {
    image: '/img/products/ornament-craciun-spiridus-luna',
    alt: 'Ornament de Crăciun din plexiglas verde cu un spiriduș pe o semilună și stele decupate laser',
    label: 'Spiriduș pe lună',
    to: '/globuri-craciun-personalizate',
  },
]

export function RecentWork() {
  return (
    <Section tone="muted">
      <SectionHeader title="Lucrări recente din atelierul din Craiova" />

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
        {works.map((work, index) => (
          <li key={work.image} className={index >= 4 ? 'hidden sm:block' : ''}>
            <Link to={work.to} className="group block">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-200">
                <ResponsiveImage
                  name={work.image}
                  alt={work.alt}
                  sizes="(min-width: 1280px) 190px, (min-width: 1024px) 16vw, (min-width: 640px) 31vw, 50vw"
                  className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-zinc-900 group-hover:text-amber-800">
                {work.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link to="/portofoliu" className={buttonClass('outlineLight')}>
          Vedeți tot portofoliul
          <Icon name="arrowRight" className="w-5 h-5" />
        </Link>
      </div>
    </Section>
  )
}
