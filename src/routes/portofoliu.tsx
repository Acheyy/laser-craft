import { createFileRoute, Link } from '@tanstack/react-router'
import { OrderBlock } from '~/components/Contact'
import { Icon } from '~/components/Icon'
import { Highlight, PageHero } from '~/components/PageHero'
import { IdeaCard } from '~/components/ProductCards'
import {
  ResponsiveImage,
  imageMeta,
  type ImageName,
} from '~/components/ResponsiveImage'
import { Section, textLink } from '~/components/ui'
import { SHOW_CHRISTMAS_PROMO } from '~/data/business'
import {
  PORTFOLIO_WHATSAPP_MESSAGE,
  getProduct,
  type ProductPath,
} from '~/data/products'
import { breadcrumbs, seo } from '~/utils/seo'

export const Route = createFileRoute('/portofoliu')({
  component: PortofoliuPage,
  head: () => ({
    ...seo({
      title: 'Portofoliu Lucrări Laser Craiova – Plăcuțe, Litere | LaserCraft',
      description:
        'Lucrări laser realizate în Craiova: plăcuțe de adresă, globuri de Crăciun personalizate, brelocuri cu nume, litere volumetrice, decor și gravuri pe plexiglas.',
      path: '/portofoliu',
      image: '/img/og/og-portofoliu.jpg',
    }),
    scripts: [breadcrumbs([{ name: 'Portofoliu', path: '/portofoliu' }])],
  }),
})

const WHATSAPP_MESSAGE = PORTFOLIO_WHATSAPP_MESSAGE

type ProjectLink = {
  to: ProductPath | '/servicii'
  hash?: string
}

type Project = {
  title: string
  material: string
  // Only when it adds a fact the title and material don't already give
  description?: string
  image: ImageName
  alt: string
  // Overrides the category's landing page
  link?: ProjectLink
}

type Category = {
  id: string
  chip: string
  title: string
  link: { to: ProductPath; label: string }
  // Question on the WhatsApp tile that fills the grid's empty slots
  idea?: string
  seasonal?: boolean
  // masonry: CSS columns for categories that mix square, landscape and
  // portrait photos, so each keeps its own aspect ratio without gaps.
  // feature: the first (portrait) photo spans two rows beside the others.
  layout?: 'masonry' | 'feature'
  projects: Project[]
}

const categories: Category[] = [
  {
    id: 'placute',
    chip: 'Plăcuțe de adresă',
    title: 'Plăcuțe de adresă și semnalistică',
    link: { to: '/placute-adresa', label: 'Prețuri plăcuțe de adresă' },
    layout: 'masonry',
    // Order balances the columns: square + 4:3 in each of the first two
    // desktop columns, portrait + landscape in the third.
    projects: [
      {
        title: 'Plăcuță de adresă — Str. Zorilor 35',
        description: 'Cifre aurii volumetrice, montaj cu distanțiere inox.',
        material: 'Plexiglas negru + auriu',
        image: '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
        alt: 'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii volumetrice, prinsă cu distanțiere din inox',
      },
      {
        title: 'Plăcuță de adresă — Str. Mihail Sadoveanu 31G',
        description: 'Un proiect special: pictograma casei și textul decupate laser.',
        material: 'Oțel vopsit mat',
        image: '/img/products/placuta-adresa-metal-decupat',
        alt: 'Plăcuță de adresă din oțel vopsit negru mat, decupată laser, cu siluetă de casă și text personalizat',
      },
      {
        title: 'Plăcuță de adresă — Str. Caisului 36',
        description: 'Format orizontal, cu distanțiere aurii.',
        material: 'Plexiglas negru + auriu',
        image: '/img/products/placuta-adresa-plexiglas-negru-auriu-2',
        alt: 'Plăcuță de adresă orizontală din plexiglas negru lucios cu cifre aurii și distanțiere aurii',
      },
      {
        title: 'Plăcuță de adresă — Str. Gloriei 1',
        description: 'Pictogramă de casă și text auriu, montaj cu distanțiere.',
        material: 'Plexiglas negru + auriu',
        image: '/img/products/placuta-adresa-plexiglas-negru-auriu-3',
        alt: 'Plăcuță de adresă din plexiglas negru lucios cu pictogramă de casă și text auriu',
      },
      {
        title: 'Număr de casă cu model floral',
        material: 'Plexiglas negru',
        image: '/img/products/numar-casa-plexiglas-negru-model-floral',
        alt: 'Număr de casă 32 din plexiglas negru, cu cifre decupate și model floral tăiat laser',
      },
      {
        title: 'Semn luminos LED din plexiglas',
        description: 'Logo gravat laser și iluminare LED pe margine.',
        material: 'Plexiglas transparent 8 mm',
        image: '/img/products/semn-luminos-plexiglas-led',
        alt: 'Semn luminos LED din plexiglas transparent cu logo gravat laser',
        link: { to: '/taiere-laser-plexiglas' },
      },
    ],
  },
  {
    id: 'globuri',
    chip: 'Globuri de Crăciun',
    title: 'Globuri și ornamente de Crăciun',
    link: {
      to: '/globuri-craciun-personalizate',
      label: 'Globuri de Crăciun personalizate',
    },
    idea: 'Vreți un glob cu alt nume sau model?',
    seasonal: true,
    projects: [
      {
        title: 'Glob de Crăciun cu nume — „Cristina”',
        material: 'Plexiglas roșu',
        image: '/img/products/glob-craciun-cu-nume-personalizat',
        alt: 'Glob de Crăciun personalizat din plexiglas roșu cu numele „Cristina”, Moș Crăciun în sanie cu reni și fulgi de nea, tăiat laser',
      },
      {
        title: 'Glob personalizat „Craiova 26”',
        material: 'Plexiglas verde',
        image: '/img/products/glob-craciun-personalizat-craiova',
        alt: 'Glob de Crăciun din plexiglas verde personalizat cu textul „Craiova 26”, cu sanie, reni și fulgi de nea decupați laser',
      },
      {
        title: 'Glob cu sat de iarnă',
        material: 'Plexiglas negru',
        image: '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
        alt: 'Glob de Crăciun din plexiglas negru cu sat de iarnă decupat laser: case, biserică, brazi și stea în vârf',
      },
      {
        title: 'Glob cu sanie și ren',
        material: 'Plexiglas verde',
        image: '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
        alt: 'Glob de Crăciun din plexiglas verde cu Moș Crăciun în sanie trasă de un ren, stele și brazi decupați laser',
      },
      {
        title: 'Bastoane de Crăciun',
        material: 'Plexiglas roșu',
        image: '/img/products/ornament-craciun-bastoane-rosii',
        alt: 'Ornament de Crăciun din plexiglas roșu cu două bastoane legate cu fundă și fulgi de nea decupați laser',
      },
      {
        title: 'Fulg de nea',
        material: 'Plexiglas alb',
        image: '/img/products/ornament-craciun-fulg-de-nea-alb',
        alt: 'Ornament fulg de nea din plexiglas alb tăiat laser, cu orificiu pentru agățare în brad',
      },
      {
        title: 'Inimă geometrică',
        material: 'Plexiglas roz',
        image: '/img/products/ornament-craciun-inima-geometrica-roz',
        alt: 'Ornament inimă geometrică din plexiglas roz tăiat laser, agățat cu o panglică roșie',
      },
      {
        title: 'Spiriduș pe lună',
        material: 'Plexiglas verde',
        image: '/img/products/ornament-craciun-spiridus-luna',
        alt: 'Ornament de Crăciun din plexiglas verde cu un spiriduș pe o semilună și stele decupate laser',
      },
      {
        title: 'Ornament „Crăciun Fericit”',
        material: 'Plexiglas verde',
        image: '/img/products/glob-craciun-fericit-plexiglas-verde',
        alt: 'Ornament rotund de Crăciun din plexiglas verde cu textul „Crăciun Fericit” și fulgi de nea, tăiat laser',
      },
    ],
  },
  {
    id: 'cadouri',
    chip: 'Cadouri',
    title: 'Cadouri personalizate',
    link: { to: '/cadouri-personalizate', label: 'Brelocuri și cadouri cu nume' },
    idea: 'Aveți o idee de cadou personalizat?',
    projects: [
      {
        title: 'Breloc cu nume pe 2 straturi — „Jonut”',
        material: 'Plexiglas alb + roz',
        image: '/img/products/breloc-nume-plexiglas-doua-straturi',
        alt: 'Breloc cu numele „Jonut” din plexiglas pe două straturi, cu litere albe aplicate pe fundal roz, ținut în palmă',
      },
      {
        title: 'Breloc gravat cu mesaj',
        material: 'Plexiglas negru',
        image: '/img/products/breloc-gravat-mesaj-personalizat',
        alt: 'Breloc rotund din plexiglas negru gravat laser cu mesajul „you are INDISPENSABLE” și un personaj zâmbitor',
      },
      {
        title: 'Decor mamă și copil',
        description: 'Pe suport, în două culori, cu trandafiri gravați.',
        material: 'Plexiglas magenta + galben',
        image: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
        alt: 'Decor din plexiglas magenta și galben cu siluetele unei mame și a unui copil cu balon, pe suport',
      },
      {
        title: 'Icoană decorativă',
        material: 'Plexiglas negru + alb',
        image: '/img/products/icoana-isus-plexiglas-negru-cu-suport',
        alt: 'Icoană decorativă cu chipul lui Isus din plexiglas negru decupat laser pe fundal alb, cu suport pentru masă sau raft',
      },
      {
        title: 'Decor „LOVE” cu pisici',
        material: 'Plexiglas roz',
        image: '/img/products/decor-love-pisici-plexiglas-roz',
        alt: 'Decor „LOVE” din plexiglas roz tăiat laser, cu siluete de pisici integrate în litere',
      },
      {
        title: 'Pisicuță-înger',
        material: 'Plexiglas roz',
        image: '/img/products/ornament-pisica-inger-plexiglas-roz',
        alt: 'Pisicuță-înger din plexiglas roz, așezată pe un nor, cu aureolă, aripi și detalii conturate în negru',
      },
      {
        title: 'Os pentru iubitorii de câini',
        material: 'Plexiglas roz',
        image: '/img/products/ornament-os-caine-plexiglas-roz',
        alt: 'Os din plexiglas roz cu orificiu în formă de inimă, agățat cu o panglică roșie',
      },
    ],
  },
  {
    id: 'gravura',
    chip: 'Gravură',
    title: 'Gravură laser',
    link: { to: '/gravura-laser-craiova', label: 'Gravură laser în Craiova' },
    idea: 'Aveți o idee de gravură?',
    projects: [
      {
        title: 'Trofee personalizate',
        description: 'Gravate laser, pentru competiții sportive.',
        material: 'Plexiglas transparent 10 mm',
        image: '/img/products/trofeu-plexiglas-gravat',
        alt: 'Trofeu din plexiglas gravat laser cu logo și text, pe bază neagră',
      },
      {
        title: 'Set de suporturi de pahar gravate',
        description: '4 bucăți, cu modele botanice și geometrice.',
        material: 'Lemn de nuc',
        image: '/img/products/suporturi-pahar-lemn-gravate',
        alt: 'Set de 4 suporturi de pahar rotunde din lemn, gravate laser cu modele botanice și geometrice',
      },
      {
        title: 'Jurnal din piele personalizat',
        description: 'Copertă gravată laser, cu monogramă.',
        material: 'Piele naturală',
        image: '/img/products/jurnal-piele-gravat',
        alt: 'Copertă de jurnal din piele naturală gravată laser cu motiv botanic și monogramă',
      },
    ],
  },
  {
    id: 'decoratiuni',
    chip: 'Litere și decor',
    title: 'Litere volumetrice și decorațiuni',
    link: { to: '/litere-volumetrice', label: 'Litere volumetrice pentru evenimente' },
    idea: 'Pregătiți o nuntă sau un eveniment?',
    layout: 'feature',
    projects: [
      {
        title: 'Decor de eveniment — Roselle',
        description: 'Litere montate volumetric pe panouri arcuite.',
        material: 'Plexiglas alb',
        image: '/img/products/litere-volumetrice-decor-eveniment-1',
        alt: 'Panouri arcuite cu litere volumetrice din plexiglas alb „Nuntă de probă” și „Roselle”, lângă un aranjament floral',
      },
      {
        title: 'Litere volumetrice — „Nuntă de probă”',
        material: 'Plexiglas alb',
        image: '/img/products/litere-volumetrice-decor-eveniment-2',
        alt: 'Litere 3D din plexiglas alb „Nuntă de probă” tăiate laser, montate pe panou crem, cu flori albe în prim-plan',
      },
      {
        title: 'Tablouri decupate laser',
        material: 'MDF 6 mm',
        image: '/img/products/tablou-lemn-taiat-laser',
        alt: 'Tablou decorativ din MDF tăiat laser',
        link: { to: '/servicii', hash: 'taiere-laser-lemn' },
      },
    ],
  },
]

// Christmas ornaments go first while the promo is on (same rule as the menu).
const sections = SHOW_CHRISTMAS_PROMO
  ? [...categories.filter((c) => c.seasonal), ...categories.filter((c) => !c.seasonal)]
  : categories

function PortofoliuPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Portofoliu' }]}
        title={
          <>
            Portofoliu: lucrări de tăiere și gravură <Highlight>laser</Highlight>
          </>
        }
        intro={
          <p>
            Proiecte recente din atelierul nostru din Craiova: plăcuțe de adresă,
            globuri de Crăciun personalizate, brelocuri cu nume, litere
            volumetrice, decor pentru evenimente și gravuri.
          </p>
        }
        whatsappMessage={WHATSAPP_MESSAGE}
      />

      <Section>
        {/* Anchor links: one tap to a category, no JS needed */}
        <nav
          aria-label="Categorii de lucrări"
          className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0"
        >
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {sections.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-100 pl-4 pr-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-200 active:bg-zinc-200"
                >
                  {category.chip}
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-zinc-600">
                    {category.projects.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map((category, sectionIndex) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-titlu`}
            className="mt-10 sm:mt-14"
          >
            <div className="mb-4 flex flex-col items-start sm:mb-6 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
              <h2
                id={`${category.id}-titlu`}
                className="text-2xl font-bold tracking-tight text-zinc-900 text-balance sm:text-3xl"
              >
                {category.title}
              </h2>
              <Link
                to={category.link.to}
                className={`${textLink} inline-flex min-h-11 items-center gap-1.5 text-sm sm:text-base`}
              >
                {category.link.label}
                <Icon name="arrowRight" className="w-4 h-4 shrink-0" />
              </Link>
            </div>

            <div
              className={
                category.layout === 'masonry'
                  ? 'columns-2 gap-3 sm:gap-5 lg:columns-3'
                  : `grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 ${
                      // The tall feature photo stretches the idea tile's row,
                      // not the row of photo cards beside it
                      category.layout === 'feature' ? 'lg:grid-rows-[auto_1fr]' : ''
                    }`
              }
            >
              {category.projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  link={project.link ?? category.link}
                  priority={sectionIndex === 0 && index === 0}
                  className={
                    category.layout === 'masonry'
                      ? 'mb-3 break-inside-avoid sm:mb-5'
                      : category.layout === 'feature' && index === 0
                        ? 'row-span-2 h-full'
                        : 'h-full'
                  }
                />
              ))}
              {category.layout !== 'masonry' && category.idea && (
                <IdeaTile category={category} />
              )}
            </div>
          </section>
        ))}
      </Section>

      <OrderBlock
        title="Aveți un proiect asemănător?"
        intro="Trimiteți-ne poza lucrării care vă place sau ideea dumneavoastră și primiți o ofertă gratuită."
        whatsappMessage={WHATSAPP_MESSAGE}
        emailSubject="Cerere ofertă - proiect asemănător din portofoliu"
      />
    </>
  )
}

// The whole card links to the product page; the photo keeps its natural ratio.
function ProjectCard({
  project,
  link,
  priority,
  className,
}: {
  project: Project
  link: ProjectLink
  priority: boolean
  className: string
}) {
  const meta = imageMeta(project.image)
  return (
    <Link
      to={link.to}
      hash={link.hash}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 active:border-amber-400 ${className}`}
    >
      <div
        className="shrink-0 overflow-hidden bg-zinc-100"
        style={{ aspectRatio: `${meta.width} / ${meta.height}` }}
      >
        <ResponsiveImage
          name={project.image}
          alt={project.alt}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 50vw"
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="text-sm font-semibold leading-snug text-zinc-900 text-pretty group-hover:text-amber-800 sm:text-base">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-1 text-sm leading-snug text-zinc-600">
            {project.description}
          </p>
        )}
        {/* Same material style as the ModelCard meta on the product pages */}
        <p className="mt-auto flex items-end justify-between gap-2 pt-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            {project.material}
          </span>
          <Icon name="arrowRight" className="w-4 h-4 shrink-0 text-amber-600" />
        </p>
      </div>
    </Link>
  )
}

// Fills the empty cells of a category's last row (2 columns below lg, 3 from
// lg) with a WhatsApp prompt for that product, so no card is left alone.
// Hidden where the row is already full.
function IdeaTile({ category }: { category: Category }) {
  // The feature photo takes two cells
  const cells = category.projects.length + (category.layout === 'feature' ? 1 : 0)
  const mobileGap = cells % 2
  const desktopGap = (3 - (cells % 3)) % 3
  if (!mobileGap && !desktopGap) return null
  // A two-cell tile centres its text so the wide box doesn't look empty
  const placement = [
    mobileGap ? '' : 'max-lg:hidden',
    desktopGap === 0
      ? 'lg:hidden'
      : desktopGap === 2
        ? 'lg:col-span-2 lg:items-center lg:text-center'
        : '',
  ].join(' ')

  return (
    <IdeaCard
      title={category.idea}
      text="Trimiteți-ne o poză sau o schiță și vă spunem prețul."
      whatsappMessage={getProduct(category.link.to).whatsappMessage}
      className={placement}
    />
  )
}
