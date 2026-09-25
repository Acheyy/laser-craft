import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import {
  ResponsiveImage,
  type ImageName,
} from '~/components/ResponsiveImage'
import { breadcrumbs, seo } from '~/utils/seo'

export const Route = createFileRoute('/portofoliu')({
  component: PortofoliuPage,
  head: () => ({
    ...seo({
      title: 'Portofoliu Lucrări Laser Craiova – Plăcuțe, Litere | LaserCraft',
      description:
        'Lucrări de tăiere și gravură laser realizate în Craiova: plăcuțe de adresă din plexiglas și metal, litere volumetrice, decor pentru evenimente și gravuri.',
      path: '/portofoliu',
      image: '/img/og/og-portofoliu.jpg',
    }),
    scripts: [breadcrumbs([{ name: 'Portofoliu', path: '/portofoliu' }])],
  }),
})

const categories = [
  'Toate',
  'Plăcuțe și semnalistică',
  'Gravură',
  'Decorațiuni',
]

type ProjectLink = {
  to: '/placute-adresa' | '/litere-volumetrice' | '/gravura-laser-craiova'
  label: string
}

const plaqueLink: ProjectLink = {
  to: '/placute-adresa',
  label: 'Plăcuțe de adresă',
}
const lettersLink: ProjectLink = {
  to: '/litere-volumetrice',
  label: 'Litere volumetrice',
}
const engravingLink: ProjectLink = {
  to: '/gravura-laser-craiova',
  label: 'Gravură laser',
}

const projects: Array<{
  title: string
  category: string
  description: string
  material: string
  image: ImageName
  alt: string
  link?: ProjectLink
}> = [
  {
    title: 'Decor Eveniment — Roselle',
    category: 'Decorațiuni',
    description:
      'Litere decorative din plexiglas tăiate laser și montate volumetric pe panouri arcuite — decor de eveniment pentru locația Roselle.',
    material: 'Plexiglas alb',
    image: '/img/products/litere-volumetrice-decor-eveniment-1',
    alt: 'Litere volumetrice din plexiglas alb montate pe panouri arcuite – decor de eveniment Roselle',
    link: lettersLink,
  },
  {
    title: 'Litere Volumetrice — „Nuntă de Probă"',
    category: 'Decorațiuni',
    description:
      'Litere 3D tăiate laser, montate pe panou cream pentru un decor elegant de eveniment.',
    material: 'Plexiglas alb',
    image: '/img/products/litere-volumetrice-decor-eveniment-2',
    alt: 'Litere volumetrice din plexiglas alb „Nuntă de probă” pe panou crem, cu aranjament floral',
    link: lettersLink,
  },
  {
    title: 'Plăcuță Adresă — Str. Zorilor 35',
    category: 'Plăcuțe și semnalistică',
    description:
      'Plăcuță elegantă din plexiglas negru cu litere și cifre aurii volumetrice, montaj cu distanțiere inox.',
    material: 'Plexiglas negru + auriu',
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
    alt: 'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii volumetrice',
    link: plaqueLink,
  },
  {
    title: 'Plăcuță Adresă — Str. Caisului 36',
    category: 'Plăcuțe și semnalistică',
    description:
      'Plăcuță de adresă orizontală din plexiglas negru lucios, cu cifre aurii și distanțiere aurii.',
    material: 'Plexiglas negru + auriu',
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
    alt: 'Plăcuță de adresă orizontală din plexiglas negru lucios cu cifre aurii',
    link: plaqueLink,
  },
  {
    title: 'Plăcuță Adresă — Mihail Sadoveanu 31G',
    category: 'Plăcuțe și semnalistică',
    description:
      'Plăcuță din metal vopsit mat cu decupaj laser — icon casă și text personalizat.',
    material: 'Oțel vopsit mat',
    image: '/img/products/placuta-adresa-metal-decupat',
    alt: 'Plăcuță de adresă din metal vopsit negru mat, decupată laser, cu siluetă de casă',
    link: plaqueLink,
  },
  {
    title: 'Plăcuță Adresă — Strada Gloriei Nr. 1',
    category: 'Plăcuțe și semnalistică',
    description:
      'Plăcuță din plexiglas negru lucios cu icon casă și text auriu, montaj cu distanțiere.',
    material: 'Plexiglas negru + auriu',
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
    alt: 'Plăcuță de adresă din plexiglas negru lucios cu icon casă și text auriu',
    link: plaqueLink,
  },
  {
    title: 'Trofee Personalizate',
    category: 'Gravură',
    description: 'Trofee din plexiglas cu gravură laser pentru competiții sportive',
    material: 'Plexiglas transparent 10mm',
    image: '/img/products/trofeu-plexiglas-gravat',
    alt: 'Trofeu din plexiglas transparent gravat laser',
    link: engravingLink,
  },
  {
    title: 'Tablouri Laser Cut',
    category: 'Decorațiuni',
    description: 'Tablouri artistice din lemn realizate prin tăiere laser',
    material: 'MDF 6mm',
    image: '/img/products/tablou-lemn-taiat-laser',
    alt: 'Tablou decorativ din MDF tăiat laser',
  },
  {
    title: 'Set Coastere Gravate',
    category: 'Gravură',
    description:
      'Set de 4 coastere din lemn cu modele botanice și geometrice gravate laser.',
    material: 'Lemn de nuc',
    image: '/img/products/suporturi-pahar-lemn-gravate',
    alt: 'Set de 4 suporturi de pahar din lemn de nuc gravate laser',
    link: engravingLink,
  },
  {
    title: 'Jurnal Piele Personalizat',
    category: 'Gravură',
    description:
      'Copertă de jurnal din piele naturală cu gravură laser — artă botanică și monogramă.',
    material: 'Piele naturală',
    image: '/img/products/jurnal-piele-gravat',
    alt: 'Copertă de jurnal din piele naturală gravată laser',
    link: engravingLink,
  },
  {
    title: 'Semn LED Acril Business',
    category: 'Plăcuțe și semnalistică',
    description:
      'Semn de business din plexiglas edge-lit cu logo gravat laser, iluminare LED.',
    material: 'Plexiglas transparent 8mm',
    image: '/img/products/semn-luminos-plexiglas-led',
    alt: 'Semn luminos LED din plexiglas transparent cu logo gravat laser',
  },
]

function PortofoliuPage() {
  const [activeCategory, setActiveCategory] = useState('Toate')

  const filteredProjects =
    activeCategory === 'Toate'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <>
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Portofoliu: lucrări de tăiere și gravură{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                laser
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Explorați o selecție din proiectele noastre recente din atelierul
              din Craiova — plăcuțe de adresă, litere volumetrice, decor pentru
              evenimente și gravuri. Fiecare lucrare reflectă angajamentul
              nostru pentru calitate și precizie.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={category === activeCategory}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === activeCategory
                    ? 'bg-amber-500 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-zinc-100 overflow-hidden">
                  {project.image ? (
                    <ResponsiveImage
                      name={project.image}
                      alt={project.alt}
                      sizes="(min-width: 1280px) 395px, (min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                      priority={index === 0}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-center p-6">
                      <div>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1}
                          className="w-12 h-12 mx-auto mb-2 text-zinc-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5z"
                          />
                        </svg>
                        <p className="text-xs">Foto proiect</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-600 mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                      />
                    </svg>
                    {project.material}
                  </div>
                  {project.link && (
                    <Link
                      to={project.link.to}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      {project.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Vă place ce vedeți?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Contactați-ne pentru a discuta despre proiectul dumneavoastră.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25"
          >
            Începe un Proiect
          </Link>
        </div>
      </section>
    </>
  )
}
