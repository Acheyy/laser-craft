import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/portofoliu')({
  component: PortofoliuPage,
  head: () => ({
    meta: seo({
      title: 'Portofoliu - LaserCraft',
      description:
        'Explorați portofoliul LaserCraft — proiecte de tăiere laser, gravură laser și debitare CNC realizate pentru clienții noștri.',
    }),
  }),
})

const categories = [
  'Toate',
  'Tăiere Metal',
  'Tăiere Lemn',
  'Gravură',
  'Decorațiuni',
  'Industrial',
]

const projects = [
  {
    title: 'Panouri Decorative Metal',
    category: 'Tăiere Metal',
    description: 'Panouri decorative din oțel pentru fațade exterioare',
    material: 'Oțel carbon 3mm',
  },
  {
    title: 'Litere Volumetrice',
    category: 'Tăiere Metal',
    description: 'Signalistică din inox pentru spații comerciale',
    material: 'Oțel inoxidabil 2mm',
  },
  {
    title: 'Decorațiuni Nuntă',
    category: 'Tăiere Lemn',
    description: 'Elemente decorative personalizate din lemn pentru nunți',
    material: 'Placaj mesteacăn 4mm',
  },
  {
    title: 'Trofee Personalizate',
    category: 'Gravură',
    description: 'Trofee din acril cu gravură laser pentru competiții sportive',
    material: 'Acril transparent 10mm',
  },
  {
    title: 'Piese Industriale',
    category: 'Industrial',
    description: 'Componente de precizie pentru industria automotive',
    material: 'Aluminiu 6mm',
  },
  {
    title: 'Tablouri Laser Cut',
    category: 'Decorațiuni',
    description: 'Tablouri artistice din lemn realizate prin tăiere laser',
    material: 'MDF 6mm',
  },
  {
    title: 'Grătare Ventilație',
    category: 'Industrial',
    description: 'Grile de ventilație cu modele geometrice pentru clădiri',
    material: 'Aluminiu 2mm',
  },
  {
    title: 'Cadouri Personalizate',
    category: 'Gravură',
    description: 'Portofele și agende din piele cu gravură laser',
    material: 'Piele naturală',
  },
  {
    title: 'Separatoare Cameră',
    category: 'Decorațiuni',
    description: 'Panouri decorative din MDF pentru delimitarea spațiilor',
    material: 'MDF 12mm',
  },
]

function PortofoliuPage() {
  return (
    <>
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Portofoliul{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Nostru
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Explorați o selecție din proiectele noastre recente. Fiecare
              lucrare reflectă angajamentul nostru pentru calitate și precizie.
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === 'Toate'
                    ? 'bg-amber-500 text-white'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-zinc-100 flex items-center justify-center">
                  <div className="text-zinc-400 text-center p-6">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
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
