import { Link } from '@tanstack/react-router'
import { ResponsiveImage, type ImageName } from '~/components/ResponsiveImage'

const works: Array<{
  image: ImageName
  alt: string
  label: string
  to:
    | '/globuri-craciun-personalizate'
    | '/placute-adresa'
    | '/cadouri-personalizate'
    | '/litere-volumetrice'
    | '/gravura-laser-craiova'
}> = [
  {
    image: '/img/products/glob-craciun-cu-nume-personalizat',
    alt: 'Glob de Crăciun roșu din plexiglas personalizat cu numele Cristina',
    label: 'Glob de Crăciun cu nume',
    to: '/globuri-craciun-personalizate',
  },
  {
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
    alt: 'Plăcuță de adresă din plexiglas negru lucios cu pictogramă de casă și text auriu',
    label: 'Plăcuță de adresă',
    to: '/placute-adresa',
  },
  {
    image: '/img/products/breloc-nume-plexiglas-doua-straturi',
    alt: 'Breloc cu numele Jonut din plexiglas alb pe fundal roz, pe două straturi',
    label: 'Breloc cu nume',
    to: '/cadouri-personalizate',
  },
  {
    image: '/img/products/litere-volumetrice-decor-eveniment-2',
    alt: 'Litere volumetrice din plexiglas alb pe panou crem, decor de eveniment',
    label: 'Litere volumetrice',
    to: '/litere-volumetrice',
  },
  {
    image: '/img/products/glob-craciun-personalizat-craiova',
    alt: 'Glob de Crăciun verde din plexiglas cu textul Craiova 26',
    label: 'Glob „Craiova 26”',
    to: '/globuri-craciun-personalizate',
  },
  {
    image: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
    alt: 'Decor din plexiglas roz și galben cu siluetele unei mame și a unui copil, pe suport',
    label: 'Decor personalizat',
    to: '/cadouri-personalizate',
  },
  {
    image: '/img/products/numar-casa-plexiglas-negru-model-floral',
    alt: 'Număr de casă din plexiglas negru cu model floral decupat laser',
    label: 'Număr de casă',
    to: '/placute-adresa',
  },
  {
    image: '/img/products/breloc-gravat-mesaj-personalizat',
    alt: 'Breloc rotund din plexiglas negru gravat laser cu mesaj personalizat',
    label: 'Breloc gravat',
    to: '/gravura-laser-craiova',
  },
]

export function RecentWork() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
            Lucrări Recente din Atelier
          </h2>
          <p className="mt-4 text-lg text-zinc-600">
            Piese reale tăiate și gravate laser în atelierul nostru din
            Craiova — de la globuri de Crăciun cu nume la plăcuțe de adresă.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {works.map((work) => (
            <Link key={work.image} to={work.to} className="group block">
              <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-100">
                <ResponsiveImage
                  name={work.image}
                  alt={work.alt}
                  sizes="(min-width: 1280px) 296px, (min-width: 640px) 25vw, 50vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                {work.label}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/portofoliu"
            className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
          >
            Vezi tot portofoliul →
          </Link>
        </div>
      </div>
    </section>
  )
}
