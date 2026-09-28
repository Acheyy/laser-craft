// Renders the designed share cards (1200×630 PNG) into images/originals/og
// from template.html, using the site's own fonts and real product photos.
//
//   bun scripts/og-cards/render.ts                  all cards
//   bun scripts/og-cards/render.ts og-contact-2     only the named cards
//   bun scripts/og-cards/render.ts --out /tmp/og    preview somewhere else
//
// Then run `bun run images` to build public/img/og/*.jpg. A card that is
// already published must get a new name when its picture changes (see the
// rename-on-replace note in scripts/optimize-images.ts).
//
// Needs playwright-core with its Chromium; it is not a project dependency, so
// set PLAYWRIGHT_FROM to any directory that has it installed.
import { createRequire } from 'node:module'
import { mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { formatLei } from '~/data/business'
import {
  SHOP_MIN_PRICE,
  SHOP_OG_IMAGE,
  type ShopProduct,
  formatPrice,
  formatSize,
  shopOgImage,
  shopProducts,
} from '~/data/shop'

const ROOT = path.resolve(import.meta.dir, '../..')
const PLAYWRIGHT_FROM = process.env.PLAYWRIGHT_FROM
if (!PLAYWRIGHT_FROM) {
  console.error('Set PLAYWRIGHT_FROM to a directory with playwright-core installed')
  process.exit(1)
}

type Tile = {
  /** Photo in images/originals/products, without extension */
  photo: string
  x: number
  y: number
  w: number
  h: number
  /** object-position, to frame the piece in a narrow tile */
  position?: string
  small?: boolean
}
type Media = { width: number; height: number; tiles: Tile[] }
type Card = {
  name: string
  /** \n breaks the line, *…* is the amber gradient part */
  title: string
  subtitle?: string
  chips: string[]
  /** Checked like the title lines; unset lets the chips wrap */
  chipRows?: number
  media: Media
}

const NB = '\u00a0'
const H = 520 // photo box height, centred in the 630px card

// Layouts. Widths leave the title column 1200 - 64 - width - 48 - 64 px.
const portrait = (photo: string): Media => ({
  width: 390,
  height: H,
  tiles: [{ photo, x: 0, y: 0, w: 390, h: H }],
})
const wide = (photo: string): Media => ({
  width: 496,
  height: H,
  tiles: [{ photo, x: 0, y: 0, w: 496, h: H }],
})

// The shop cards take their file name from the URL the pages publish
const ogName = (url: string) => path.parse(url).name

// Where each shop product name breaks: this first line, then the rest in
// amber. Chosen by eye so every title fits two lines in the portrait layout.
const FIRST_LINE: Record<string, string> = {
  'glob-craciun-cu-nume': 'Glob de Crăciun',
  'glob-craciun-lemn-cu-nume': 'Glob de Crăciun',
  'glob-craciun-craiova': 'Glob de Crăciun',
  'glob-craciun-lemn-craiova': 'Glob de Crăciun',
  'glob-craciun-sanie-si-ren': 'Glob de Crăciun',
  'glob-craciun-sat-de-iarna': 'Glob de Crăciun',
  'glob-craciun-fericit': 'Glob',
  'bastoane-de-craciun': 'Bastoane',
  'spiridus-pe-luna': 'Spiriduș',
  'fulg-de-nea': 'Fulg',
  'breloc-cu-nume': 'Breloc cu nume',
  'breloc-inima-geometrica': 'Breloc',
  'breloc-os-caine': 'Breloc os pentru',
  'icoana-decorativa': 'Icoană decorativă',
  'decor-mama-si-copil': 'Decor mamă și copil,',
  'decor-love-pisici': 'Decor „LOVE”',
}

// One card per /magazin product, with the name and price from the catalogue.
// Link previews are cached by image URL, so when a product's name or price
// changes, give its card a new name in shopOgImage (src/data/shop.ts, e.g.
// og-magazin-<slug>-2; rename on replace, see scripts/optimize-images.ts) and
// render it again under that name.
function productCard(product: ShopProduct): Card {
  const first = FIRST_LINE[product.slug]
  if (!first || !product.name.startsWith(`${first} `)) {
    throw new Error(`Pick a title break for ${product.slug} in FIRST_LINE`)
  }
  return {
    name: ogName(shopOgImage(product)),
    title: `${first}\n*${product.name.slice(first.length + 1)}*`,
    chips: [
      `${formatPrice(product)}/buc.`,
      formatSize(product.size),
      product.finish[0].toUpperCase() + product.finish.slice(1),
    ],
    chipRows: 1,
    media: portrait(product.image.replace('/img/products/', '')),
  }
}

const CARDS: Card[] = [
  {
    name: 'og-home-2',
    title: `Tăiere și gravură\nlaser *în Craiova*`,
    chips: [`Plăcuțe de la 55${NB}lei`, `Plexiglas 0,09${NB}lei/cm²`, 'Livrare în toată România'],
    // The four photos of the home hero collage, staggered the same way
    media: {
      width: 446,
      height: H,
      tiles: [
        { photo: 'placuta-adresa-plexiglas-negru-auriu-2', x: 0, y: 0, w: 215, h: 215, small: true },
        { photo: 'decor-mama-si-copil-plexiglas-cu-suport', x: 0, y: 231, w: 215, h: 289, small: true, position: '50% 62%' },
        { photo: 'glob-craciun-personalizat-craiova', x: 231, y: 0, w: 215, h: 330, small: true, position: '50% 45%' },
        { photo: 'litere-volumetrice-decor-eveniment-2', x: 231, y: 346, w: 215, h: 174, small: true, position: '30% 50%' },
      ],
    },
  },
  {
    name: 'og-servicii-2',
    title: `*Prețuri* tăiere și\ngravură laser`,
    chips: [`Plăcuțe 55–70${NB}lei`, `Plexiglas 0,09${NB}lei/cm²`, 'Craiova'],
    // One cut piece, one engraved piece
    media: {
      width: 446,
      height: H,
      tiles: [
        { photo: 'numar-casa-plexiglas-negru-model-floral', x: 0, y: 0, w: 215, h: 440, small: true },
        { photo: 'breloc-gravat-mesaj-personalizat', x: 231, y: 80, w: 215, h: 440, small: true },
      ],
    },
  },
  {
    name: 'og-contact-2',
    title: `Cereți o\n*ofertă gratuită*`,
    // RESPONSE_TIME in src/data/business.ts, word for word
    subtitle: `Răspundem în maximum 24${NB}de${NB}ore lucrătoare.`,
    chips: [`WhatsApp 0754${NB}497${NB}243`, 'Craiova'],
    media: wide('placuta-adresa-plexiglas-negru-auriu-1'),
  },
  {
    name: 'og-despre-noi-2',
    title: `Despre *LaserCraft*`,
    subtitle: 'Atelier de tăiere și gravură laser din Craiova',
    chips: ['10+ ani', '2000+ proiecte', '500+ clienți fideli', '99% clienți mulțumiți'],
    media: portrait('glob-craciun-cu-nume-personalizat'),
  },
  {
    name: 'og-portofoliu-2',
    title: `Portofoliu\n*lucrări din atelier*`,
    // The /portofoliu category chips of the three photos
    chips: ['Globuri de Crăciun', 'Plăcuțe de adresă', 'Cadouri', 'Craiova'],
    media: {
      width: 496,
      height: H,
      tiles: [
        { photo: 'glob-craciun-cu-nume-personalizat', x: 0, y: 0, w: 300, h: H, position: '52% 50%' },
        { photo: 'placuta-adresa-plexiglas-negru-auriu-1', x: 316, y: 0, w: 180, h: 252, small: true },
        { photo: 'breloc-nume-plexiglas-doua-straturi', x: 316, y: 268, w: 180, h: 252, small: true, position: '50% 45%' },
      ],
    },
  },
  // The earlier cards in this layout, re-rendered with the Bricolage headings
  {
    name: 'og-placute-adresa-2',
    title: `Plăcuțe de adresă\n*din plexiglas*`,
    chips: ['Craiova', `de la 55${NB}lei`, '4 mărimi standard'],
    media: wide('placuta-adresa-plexiglas-negru-auriu-1'),
  },
  {
    name: 'og-gravura-laser-2',
    title: `Gravură laser\n*în Craiova*`,
    chips: ['Lemn', 'Sticlă', 'Piele', 'Plexiglas'],
    media: portrait('breloc-gravat-mesaj-personalizat'),
  },
  {
    name: 'og-taiere-laser-plexiglas-2',
    title: `Tăiere laser\n*plexiglas*`,
    chips: ['Craiova', `0,09${NB}lei/cm²`, `Precizie ±0,05${NB}mm`],
    media: portrait('numar-casa-plexiglas-negru-model-floral'),
  },
  {
    name: 'og-litere-volumetrice-2',
    title: `Litere volumetrice\n*din plexiglas*`,
    chips: ['Craiova', 'Evenimente și firme', 'Ofertă gratuită'],
    media: portrait('litere-volumetrice-decor-eveniment-1'),
  },
  // Shows the lowest shop price: a new one needs a new name in SHOP_OG_IMAGE
  {
    name: ogName(SHOP_OG_IMAGE),
    title: `Magazin online\n*globuri și cadouri*`,
    chips: [`de la ${formatLei(SHOP_MIN_PRICE)}/buc.`, 'Livrare în toată România', 'Comandă pe WhatsApp'],
    // Three name pieces from the shop, in the /portofoliu card layout. The
    // small tiles are 3:4 like the photos, since the wooden globe fills its
    // photo edge to edge.
    media: {
      width: 496,
      height: H,
      tiles: [
        { photo: 'glob-craciun-cu-nume-personalizat', x: 0, y: 0, w: 290, h: H, position: '48% 50%' },
        { photo: 'breloc-nume-plexiglas-doua-straturi', x: 306, y: 0, w: 190, h: 252, small: true },
        { photo: 'glob-craciun-lemn-nume-nicolas', x: 306, y: 268, w: 190, h: 252, small: true },
      ],
    },
  },
  ...shopProducts.map(productCard),
]

const args = process.argv.slice(2)
const outFlag = args.indexOf('--out')
const outDir =
  outFlag >= 0 ? path.resolve(args.splice(outFlag, 2)[1]) : path.join(ROOT, 'images/originals/og')
const unknown = args.filter((name) => !CARDS.some((card) => card.name === name))
if (unknown.length) throw new Error(`Unknown card: ${unknown.join(', ')}`)
const cards = args.length ? CARDS.filter((card) => args.includes(card.name)) : CARDS

// Photos may be .jpg or .png; resolve each to a URL under the repo root
const photoUrl = async (name: string) => {
  for (const ext of ['jpg', 'png', 'webp']) {
    const file = `images/originals/products/${name}.${ext}`
    if (await Bun.file(path.join(ROOT, file)).exists()) return `/${file}`
  }
  throw new Error(`No original for ${name}`)
}

// Fonts load over CORS, which file:// pages don't allow, so serve the repo
const server = Bun.serve({
  port: 0,
  hostname: '127.0.0.1',
  async fetch(req) {
    const file = path.join(ROOT, decodeURIComponent(new URL(req.url).pathname))
    if (!file.startsWith(ROOT + path.sep)) return new Response('Forbidden', { status: 403 })
    const body = Bun.file(file)
    return (await body.exists()) ? new Response(body) : new Response('Not found', { status: 404 })
  },
})

const { chromium } = createRequire(PLAYWRIGHT_FROM)('playwright-core')
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  page.on('console', (msg: { type(): string; text(): string }) => {
    if (msg.type() === 'error') console.error(`  console: ${msg.text()}`)
  })
  await mkdir(outDir, { recursive: true })

  for (const card of cards) {
    const tiles = await Promise.all(
      card.media.tiles.map(async ({ photo, ...tile }) => ({ ...tile, src: await photoUrl(photo) })),
    )
    await page.goto(`http://127.0.0.1:${server.port}/scripts/og-cards/template.html`)
    const problems: string[] = await page.evaluate(
      async ({ card, lines, chipRows }: { card: unknown; lines: number; chipRows?: number }) => {
        ;(window as unknown as { renderCard(card: unknown): void }).renderCard(card)
        await document.fonts.ready
        await Promise.all(
          [...document.images].map((img) =>
            img.complete ? img.decode().catch(() => {}) : new Promise((r) => (img.onload = img.onerror = r)),
          ),
        )
        // A title that wraps more than its \n breaks, chips on more rows than
        // asked for, a missing font or photo
        const found: string[] = []
        const h1 = document.querySelector('h1')!
        const rendered = Math.round(h1.offsetHeight / parseFloat(getComputedStyle(h1).lineHeight))
        if (rendered !== lines) found.push(`title has ${rendered} lines, expected ${lines}`)
        const rows = new Set([...document.querySelectorAll<HTMLElement>('.chip')].map((c) => c.offsetTop)).size
        if (chipRows && rows > chipRows) found.push(`chips on ${rows} rows, expected ${chipRows}`)
        for (const face of document.fonts) {
          if (face.status !== 'loaded') found.push(`font ${face.family} ${face.status}`)
        }
        for (const img of document.images) if (!img.naturalWidth) found.push(`image failed: ${img.src}`)
        return found
      },
      {
        card: {
          ...card,
          media: { ...card.media, tiles },
          textWidth: 1200 - 64 - card.media.width - 48 - 64,
        },
        lines: card.title.split('\n').length,
        chipRows: card.chipRows,
      },
    )
    // A failed check leaves the committed original alone: that render goes
    // to the system temp folder for inspection (not into images/originals,
    // where `bun run images` would publish it).
    const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } })
    if (problems.length) {
      const draft = path.join(tmpdir(), `${card.name}.png`)
      await Bun.write(draft, png)
      console.log(`${draft}  !! ${problems.join('; ')}`)
      process.exitCode = 1
    } else {
      const file = path.join(outDir, `${card.name}.png`)
      await Bun.write(file, png)
      console.log(path.relative(ROOT, file))
    }
  }
} finally {
  await browser.close()
  server.stop(true)
}
