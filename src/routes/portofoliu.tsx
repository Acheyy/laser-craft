import { createFileRoute, Link } from '@tanstack/react-router'
import { useId } from 'react'
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
      title: 'Portofoliu lucrări laser Craiova – plăcuțe, litere | LaserCraft',
      description:
        'Lucrări laser realizate în Craiova: plăcuțe de adresă, globuri de Crăciun personalizate din plexiglas și lemn, brelocuri cu nume, litere volumetrice și decor.',
      path: '/portofoliu',
      image: '/img/og/og-portofoliu-2.jpg',
    }),
    scripts: [breadcrumbs([{ name: 'Portofoliu', path: '/portofoliu' }])],
  }),
})

const WHATSAPP_MESSAGE = PORTFOLIO_WHATSAPP_MESSAGE

type ProjectLink = {
  to: ProductPath
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
  // A landscape photo spanning two grid columns (not in masonry)
  wide?: boolean
}

type Category = {
  id: string
  chip: string
  title: string
  link: { to: ProductPath; label: string }
  // Question on the WhatsApp tile that fills the grid's empty slots
  idea?: string
  seasonal?: boolean
  // CSS columns for categories that mix square, landscape and portrait
  // photos, so each keeps its own aspect ratio without gaps. The default is
  // a grid of 3:4 cards: 2 columns, 4 from lg.
  masonry?: boolean
  projects: Project[]
}

const categories: Category[] = [
  {
    id: 'placute',
    chip: 'Plăcuțe de adresă',
    title: 'Plăcuțe de adresă și numere de casă',
    link: { to: '/placute-adresa', label: 'Prețuri plăcuțe de adresă' },
    idea: 'Vreți o plăcuță cu alt text sau model?',
    masonry: true,
    // Order balances the columns: square + 4:3 in each of the first two
    // desktop columns, the portrait photo and the idea tile in the third.
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
        title: 'Glob din lemn cu nume — „Nicolas”',
        description: 'Numele și desenul, gravate laser.',
        material: 'Lemn baițuit',
        image: '/img/products/glob-craciun-lemn-nume-nicolas',
        alt: 'Glob de Crăciun rotund din lemn baițuit, gravat laser cu numele „Nicolas”, un om de zăpadă cu joben și mătură, o căsuță cu horn și fulgi de nea',
      },
      {
        title: 'Glob din lemn „Craiova”',
        description: 'Brad cu model dantelat, tăiat laser.',
        material: 'Placaj de lemn',
        image: '/img/products/glob-craciun-lemn-craiova-brad',
        alt: 'Glob de Crăciun din placaj de lemn natur tăiat laser, cu textul „Craiova”, un brad cu model dantelat de fulgi de nea și două stele',
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
        alt: 'Breloc cu numele „Jonut” din plexiglas pe două straturi, cu litere albe aplicate pe fundal roz',
      },
      {
        title: 'Breloc gravat cu mesaj',
        material: 'Plexiglas negru',
        image: '/img/products/breloc-gravat-mesaj-personalizat',
        alt: 'Breloc rotund din plexiglas negru gravat laser cu mesajul „you are INDISPENSABLE” și un personaj zâmbitor',
        // The engraving page leads with this piece
        link: { to: '/gravura-laser-craiova' },
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
    id: 'decoratiuni',
    chip: 'Litere și decor',
    title: 'Litere volumetrice și decorațiuni',
    link: { to: '/litere-volumetrice', label: 'Litere volumetrice pentru evenimente' },
    idea: 'Pregătiți o nuntă sau un eveniment?',
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
        wide: true,
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
            Proiecte din atelierul nostru din Craiova: plăcuțe de adresă,
            globuri de Crăciun din plexiglas și lemn, brelocuri cu nume,
            obiecte gravate, litere volumetrice și decor pentru evenimente.
          </p>
        }
        whatsappMessage={WHATSAPP_MESSAGE}
      />

      <Section>
        {/* Anchor links: one tap to a category, no JS needed. The chips wrap
            on phones; from lg the bar stays under the header while the
            categories scroll past (the nav shares their wrapper, so sticky
            lasts to the last one). */}
        <nav
          aria-label="Categorii de lucrări"
          className="lg:sticky lg:top-16 lg:z-30 lg:-mx-8 lg:border-b lg:border-zinc-200 lg:bg-white/95 lg:px-8 lg:py-3 lg:backdrop-blur"
        >
          <ul className="flex flex-wrap gap-2">
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
            // html's 5rem scroll padding clears the header; from lg the
            // sticky chip bar needs another 5rem for the chip anchors, and
            // 3.75rem for links and buttons reached with (Shift+)Tab, so
            // they are never scrolled under the bar.
            className="mt-10 sm:mt-14 lg:scroll-mt-20 lg:[&_:is(a,button)]:scroll-mt-[3.75rem]"
          >
            <div className="mb-4 flex flex-col items-start sm:mb-6 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-6">
              <h2
                id={`${category.id}-titlu`}
                className="text-2xl font-bold text-zinc-900 text-balance sm:text-3xl"
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
                category.masonry
                  ? 'columns-2 gap-3 sm:gap-5 lg:columns-3'
                  : // Dense packing lets the idea tile fill the cell a wide
                    // photo leaves open on phones.
                    'grid grid-flow-row-dense grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4'
              }
            >
              {category.projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  link={project.link ?? category.link}
                  priority={sectionIndex === 0 && index === 0}
                  sizes={
                    category.masonry
                      ? '(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 50vw'
                      : project.wide
                        ? '(min-width: 1280px) 600px, (min-width: 1024px) 47vw, 100vw'
                        : '(min-width: 1280px) 290px, (min-width: 1024px) 23vw, 50vw'
                  }
                  className={
                    category.masonry
                      ? 'mb-3 break-inside-avoid sm:mb-5'
                      : project.wide
                        ? 'col-span-2 h-full'
                        : 'h-full'
                  }
                />
              ))}
              <IdeaTile category={category} />
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
  sizes,
  className,
}: {
  project: Project
  link: ProjectLink
  priority: boolean
  sizes: string
  className: string
}) {
  const meta = imageMeta(project.image)
  // The link is named by its title only; the photo alt stays readable in
  // browse mode instead of being read out with every link.
  const titleId = useId()
  return (
    <Link
      to={link.to}
      aria-labelledby={titleId}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-[border-color,box-shadow] hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/10 active:border-amber-400 ${className}`}
    >
      <div
        className="shrink-0 overflow-hidden bg-zinc-100"
        style={{ aspectRatio: `${meta.width} / ${meta.height}` }}
      >
        <ResponsiveImage
          name={project.image}
          alt={project.alt}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3
          id={titleId}
          className="text-sm font-semibold leading-snug text-zinc-900 text-pretty group-hover:text-amber-800 sm:text-base"
        >
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

const DESKTOP_SPAN: Record<number, string> = { 2: 'lg:col-span-2', 3: 'lg:col-span-3' }

// WhatsApp prompt for the category's product. In a grid it fills the empty
// cells of the last row (2 columns below lg, 4 from lg), so no card is left
// alone, and is hidden where the row is already full. In masonry it closes
// the last, shortest column.
function IdeaTile({ category }: { category: Category }) {
  if (!category.idea) return null
  let placement = 'mb-3 break-inside-avoid sm:mb-5'
  let desktopGap = 0
  if (!category.masonry) {
    const cells = category.projects.reduce((sum, p) => sum + (p.wide ? 2 : 1), 0)
    const mobileGap = cells % 2
    desktopGap = (4 - (cells % 4)) % 4
    if (!mobileGap && !desktopGap) return null
    placement = [
      mobileGap ? '' : 'max-lg:hidden',
      desktopGap === 0 ? 'lg:hidden' : (DESKTOP_SPAN[desktopGap] ?? ''),
    ].join(' ')
  }

  return (
    <IdeaCard
      title={category.idea}
      text="Trimiteți-ne o poză sau o schiță și vă spunem prețul."
      whatsappMessage={getProduct(category.link.to).whatsappMessage}
      // A tile spanning several desktop cells lies flat instead of stretching
      layout={desktopGap > 1 ? 'wide' : 'stack'}
      className={placement}
    />
  )
}
