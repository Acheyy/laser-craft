// The /magazin catalogue: the owner's fixed per-piece prices (price list of
// 2026-09-28). Only these products are sold at a fixed price; everything else
// on the site stays "ofertă gratuită" on WhatsApp.
//
// Copy rule, as for the landing pages: only facts the owner has given or the
// site already publishes. Unknown so far, so never stated: courier cost,
// payment methods, lead time, and whether ribbons or key rings are included.

import type { ImageName } from '~/components/ResponsiveImage'
import { SHOW_CHRISTMAS_PROMO, formatLei } from '~/data/business'
import type { ProductPath } from '~/data/products'

export type ShopCategoryId = 'craciun' | 'brelocuri' | 'decor'

export type ShopCategory = {
  id: ShopCategoryId
  // Category nav and section heading on /magazin, and the /cadouri
  // price-table rows
  label: string
  intro: string
  // Landing page with the wider range and the made-to-order options
  landing: ProductPath
  seasonal?: boolean
}

const categoryData: ShopCategory[] = [
  {
    id: 'craciun',
    label: 'Globuri și ornamente de Crăciun',
    intro: 'Din plexiglas colorat sau din lemn, cu orificiu pentru agățare în brad.',
    landing: '/globuri-craciun-personalizate',
    seasonal: true,
  },
  {
    id: 'brelocuri',
    label: 'Brelocuri',
    intro: 'Din plexiglas colorat, cu nume sau cu o formă decupată laser.',
    landing: '/cadouri-personalizate',
  },
  {
    id: 'decor',
    label: 'Decor și cadouri',
    // Only some pieces have a stand (see `stand`): the LOVE decor has none.
    intro: 'Piese pe două straturi sau decupate pe contur, unele cu suport pentru masă sau raft.',
    landing: '/cadouri-personalizate',
  },
]

// Christmas leads while the promo is on, like the product menu.
export const shopCategories: ShopCategory[] = SHOW_CHRISTMAS_PROMO
  ? categoryData
  : [...categoryData.filter((c) => !c.seasonal), ...categoryData.filter((c) => c.seasonal)]

export type Personalization = {
  // Field label on the product page, and the label in the order message
  label: string
  // The text on the photo: the placeholder, and what an empty optional
  // field means ("ca în poză")
  example: string
  // A name product can't be made without its name; a city product falls
  // back to the text on the photo.
  required: boolean
  // Longest accepted text. Longer names still fit a piece at a smaller
  // size, so the field hint asks for short text and the owner confirms.
  maxLength: number
}

export type ShopProduct = {
  // URL segment under /magazin; never change a published one
  slug: string
  // H1, card title and order line, as the owner named the product (with
  // diacritics, in Romanian)
  name: string
  // Page <title> in place of the name, where the name alone doesn't say
  // what the piece is ("Fulg de nea" matches far more than ornaments)
  seoTitle?: string
  category: ShopCategoryId
  image: ImageName
  alt: string
  // Lei per piece, personalisation included
  price: number
  material: 'plexiglas' | 'lemn'
  // Material and colour as shown on the photo: the card meta line and the
  // order message ("plexiglas roșu")
  finish: string
  // In cm, in the order the owner gave them
  size: [number, number]
  layers?: 2
  // Stands on a table or shelf (the photo shows the stand)
  stand?: boolean
  // Hangs in the tree: the ornaments have a hanging hole at the top
  hangs?: boolean
  personalization?: Personalization
  // One sentence for the card
  summary: string
  // Product page body, one paragraph each
  details: string[]
}

const NAME_MAX = 20

export const shopProducts: ShopProduct[] = [
  {
    slug: 'glob-craciun-cu-nume',
    name: 'Glob de Crăciun personalizat cu nume',
    category: 'craciun',
    image: '/img/products/glob-craciun-cu-nume-personalizat',
    alt: 'Glob de Crăciun din plexiglas roșu personalizat cu numele „Cristina”, cu Moș Crăciun în sanie, reni și fulgi de nea',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas roșu',
    size: [9, 9],
    hangs: true,
    personalization: {
      label: 'Numele de pe glob',
      example: 'Cristina',
      required: true,
      maxLength: NAME_MAX,
    },
    summary: 'Numele dorit pe banda centrală, cu Moș Crăciun în sanie.',
    details: [
      'Glob din plexiglas roșu tăiat laser, cu numele dorit decupat pe banda centrală, cu Moș Crăciun în sanie, reni și fulgi de nea.',
      'Un cadou pentru fiecare membru al familiei, pentru colegi sau pentru copiii din grupă: adăugați în coș câte un glob pentru fiecare nume.',
    ],
  },
  {
    slug: 'glob-craciun-lemn-cu-nume',
    name: 'Glob de Crăciun din lemn cu nume',
    category: 'craciun',
    image: '/img/products/glob-craciun-lemn-nume-nicolas',
    alt: 'Glob de Crăciun rotund din lemn baițuit, gravat laser cu numele „Nicolas”, un om de zăpadă cu joben și mătură, o căsuță cu horn și fulgi de nea',
    price: 8,
    material: 'lemn',
    finish: 'lemn baițuit',
    size: [9, 9],
    hangs: true,
    personalization: {
      label: 'Numele de pe glob',
      example: 'Nicolas',
      required: true,
      maxLength: NAME_MAX,
    },
    summary: 'Numele dorit gravat în lemn, cu un om de zăpadă și o căsuță.',
    details: [
      'Glob rotund din lemn baițuit, gravat laser cu numele dorit, un om de zăpadă cu joben și mătură, o căsuță cu horn și fulgi de nea.',
    ],
  },
  {
    slug: 'glob-craciun-craiova',
    name: 'Glob de Crăciun „Craiova”',
    category: 'craciun',
    image: '/img/products/glob-craciun-personalizat-craiova',
    alt: 'Glob de Crăciun din plexiglas verde personalizat cu textul „Craiova 26”, cu sanie, reni și fulgi de nea decupați laser',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas verde',
    size: [9, 9],
    hangs: true,
    personalization: {
      label: 'Orașul și anul',
      example: 'Craiova 26',
      required: false,
      maxLength: NAME_MAX,
    },
    summary: 'Cu „Craiova” și anul, sau cu orașul dumneavoastră.',
    details: [
      'Glob din plexiglas verde tăiat laser, cu textul „Craiova 26”, sanie, reni și fulgi de nea.',
      'Orașul și anul se pot schimba: scrieți-le în câmpul de mai sus sau lăsați-l gol pentru „Craiova 26”, ca în poză.',
    ],
  },
  {
    slug: 'glob-craciun-lemn-craiova',
    name: 'Glob de Crăciun din lemn „Craiova”',
    category: 'craciun',
    image: '/img/products/glob-craciun-lemn-craiova-brad',
    alt: 'Glob de Crăciun din placaj de lemn natur tăiat laser, cu textul „Craiova”, un brad cu model dantelat de fulgi de nea și două stele',
    price: 8,
    material: 'lemn',
    finish: 'placaj de lemn natur',
    size: [9, 9],
    hangs: true,
    personalization: {
      label: 'Orașul',
      example: 'Craiova',
      required: false,
      maxLength: NAME_MAX,
    },
    summary: 'Un brad dantelat și numele orașului, în lemn natur.',
    details: [
      'Glob din placaj de lemn natur tăiat laser, cu textul „Craiova”, un brad cu model dantelat de fulgi de nea și două stele.',
      'Orașul se poate schimba: scrieți-l în câmpul de mai sus sau lăsați-l gol pentru „Craiova”, ca în poză.',
    ],
  },
  {
    slug: 'glob-craciun-sanie-si-ren',
    name: 'Glob de Crăciun cu sanie și ren',
    category: 'craciun',
    image: '/img/products/glob-craciun-sanie-reni-plexiglas-verde',
    alt: 'Glob de Crăciun din plexiglas verde cu Moș Crăciun în sanie trasă de un ren, stele și brazi decupați laser',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas verde',
    size: [9, 9],
    hangs: true,
    summary: 'Moș Crăciun în sanie, trasă de un ren, printre brazi și stele.',
    details: [
      'Glob din plexiglas verde tăiat laser, cu Moș Crăciun în sanie trasă de un ren, stele și brazi.',
    ],
  },
  {
    slug: 'glob-craciun-sat-de-iarna',
    name: 'Glob de Crăciun cu sat de iarnă',
    category: 'craciun',
    image: '/img/products/glob-craciun-plexiglas-negru-sat-iarna',
    alt: 'Glob de Crăciun din plexiglas negru cu sat de iarnă decupat laser: case, biserică, brazi și stea în vârf',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas negru',
    size: [9, 9],
    hangs: true,
    summary: 'Case, o biserică și brazi, cu o stea în vârf.',
    details: [
      'Glob din plexiglas negru tăiat laser, cu un sat de iarnă decupat: case, o biserică, brazi și o stea în vârf.',
    ],
  },
  {
    slug: 'glob-craciun-fericit',
    name: 'Glob „Crăciun Fericit”',
    category: 'craciun',
    image: '/img/products/glob-craciun-fericit-plexiglas-verde',
    alt: 'Ornament rotund de Crăciun din plexiglas verde cu textul „Crăciun Fericit” și fulgi de nea, tăiat laser',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas verde',
    size: [9, 9],
    hangs: true,
    summary: 'Urarea „Crăciun Fericit”, între fulgi de nea.',
    details: [
      'Glob rotund din plexiglas verde tăiat laser, cu urarea „Crăciun Fericit” și fulgi de nea.',
    ],
  },
  {
    slug: 'bastoane-de-craciun',
    name: 'Bastoane de Crăciun',
    category: 'craciun',
    image: '/img/products/ornament-craciun-bastoane-rosii',
    alt: 'Ornament de Crăciun din plexiglas roșu cu două bastoane legate cu fundă și fulgi de nea decupați laser',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas roșu',
    size: [10, 8],
    hangs: true,
    summary: 'Două bastoane de Crăciun legate cu fundă.',
    details: [
      'Ornament din plexiglas roșu tăiat laser, cu două bastoane de Crăciun legate cu fundă și fulgi de nea.',
    ],
  },
  {
    slug: 'spiridus-pe-luna',
    name: 'Spiriduș pe lună',
    seoTitle: 'Spiriduș pe lună, ornament de Crăciun',
    category: 'craciun',
    image: '/img/products/ornament-craciun-spiridus-luna',
    alt: 'Ornament de Crăciun din plexiglas verde cu un spiriduș pe o semilună și stele decupate laser',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas verde',
    size: [9, 9],
    hangs: true,
    summary: 'Un spiriduș așezat pe o semilună, printre stele.',
    details: [
      'Ornament din plexiglas verde tăiat laser, cu un spiriduș pe o semilună și stele.',
    ],
  },
  {
    slug: 'fulg-de-nea',
    name: 'Fulg de nea',
    seoTitle: 'Fulg de nea, ornament de Crăciun',
    category: 'craciun',
    image: '/img/products/ornament-craciun-fulg-de-nea-alb',
    alt: 'Ornament fulg de nea din plexiglas alb tăiat laser, cu orificiu pentru agățare în brad',
    price: 10,
    material: 'plexiglas',
    finish: 'plexiglas alb',
    size: [9, 9],
    hangs: true,
    summary: 'Un fulg de nea alb, cu decupaje fine.',
    details: ['Ornament fulg de nea din plexiglas alb tăiat laser.'],
  },
  {
    slug: 'breloc-cu-nume',
    name: 'Breloc cu nume pe două straturi',
    category: 'brelocuri',
    image: '/img/products/breloc-nume-plexiglas-doua-straturi',
    alt: 'Breloc cu numele „Jonut” din plexiglas pe două straturi, cu litere albe aplicate pe fundal roz',
    price: 12,
    material: 'plexiglas',
    finish: 'plexiglas alb și roz',
    size: [8, 5],
    layers: 2,
    personalization: {
      label: 'Numele de pe breloc',
      example: 'Jonut',
      required: true,
      maxLength: NAME_MAX,
    },
    summary: 'Litere albe aplicate pe un fundal roz tăiat pe contur.',
    details: [
      'Breloc din plexiglas pe două straturi: numele dorit, cu litere albe aplicate pe un fundal roz tăiat pe conturul lor.',
    ],
  },
  {
    slug: 'breloc-inima-geometrica',
    name: 'Breloc inimă geometrică',
    category: 'brelocuri',
    image: '/img/products/ornament-craciun-inima-geometrica-roz',
    alt: 'Inimă geometrică din plexiglas roz tăiată laser, agățată cu o panglică roșie',
    price: 8,
    material: 'plexiglas',
    finish: 'plexiglas roz',
    size: [6, 5],
    summary: 'O inimă cu model geometric, decupată laser.',
    details: ['Breloc din plexiglas roz tăiat laser, în formă de inimă cu model geometric.'],
  },
  {
    slug: 'breloc-os-caine',
    name: 'Breloc os pentru iubitorii de câini',
    category: 'brelocuri',
    image: '/img/products/ornament-os-caine-plexiglas-roz',
    alt: 'Os din plexiglas roz cu orificiu în formă de inimă, agățat cu o panglică roșie',
    price: 7,
    material: 'plexiglas',
    finish: 'plexiglas roz',
    size: [5, 4],
    summary: 'Un os cu orificiu în formă de inimă.',
    details: ['Breloc din plexiglas roz tăiat laser, în formă de os, cu orificiu în formă de inimă.'],
  },
  {
    slug: 'icoana-decorativa',
    name: 'Icoană decorativă pe două straturi',
    category: 'decor',
    image: '/img/products/icoana-isus-plexiglas-negru-cu-suport',
    alt: 'Icoană decorativă cu chipul lui Isus din plexiglas negru decupat laser pe fundal alb, cu suport pentru masă sau raft',
    price: 25,
    material: 'plexiglas',
    finish: 'plexiglas negru și alb',
    size: [12, 14],
    layers: 2,
    stand: true,
    summary: 'Chipul lui Isus decupat în plexiglas negru, pe fundal alb.',
    details: [
      'Icoană decorativă din plexiglas pe două straturi: chipul lui Isus decupat laser în plexiglas negru, pe un fundal alb, cu suport pentru masă sau raft.',
    ],
  },
  {
    slug: 'decor-mama-si-copil',
    name: 'Decor mamă și copil, cu suport',
    category: 'decor',
    image: '/img/products/decor-mama-si-copil-plexiglas-cu-suport',
    alt: 'Decor din plexiglas magenta și galben cu suport: arcadă cu trandafiri gravați și siluetele unei mame și a unui copil',
    price: 15,
    material: 'plexiglas',
    finish: 'plexiglas magenta și galben',
    size: [10, 8],
    layers: 2,
    stand: true,
    summary: 'Siluetele unei mame și a unui copil, sub o arcadă cu trandafiri.',
    details: [
      'Decor din plexiglas pe două straturi, magenta și galben: siluetele unei mame și a unui copil cu balon, sub o arcadă cu trandafiri gravați, cu suport.',
      'Un cadou de Ziua Mamei sau pentru o proaspătă mamă.',
    ],
  },
  {
    slug: 'decor-love-pisici',
    name: 'Decor „LOVE” cu pisici',
    category: 'decor',
    image: '/img/products/decor-love-pisici-plexiglas-roz',
    alt: 'Decor „LOVE” din plexiglas roz tăiat laser, cu siluete de pisici integrate în litere',
    price: 15,
    material: 'plexiglas',
    finish: 'plexiglas roz',
    size: [14, 6],
    summary: 'Cuvântul „LOVE”, cu siluete de pisici în litere.',
    details: [
      'Decor din plexiglas roz tăiat laser: cuvântul „LOVE”, cu siluete de pisici integrate în litere. Un cadou pentru iubitorii de pisici.',
    ],
  },
]

export function getShopProduct(slug: string) {
  return shopProducts.find((p) => p.slug === slug)
}

export function getShopCategory(id: ShopCategoryId) {
  return categoryData.find((c) => c.id === id)!
}

export function shopProductsIn(id: ShopCategoryId) {
  return shopProducts.filter((p) => p.category === id)
}

// The shop product a landing-page card sells, named by the card's shopSlug.
// Not matched by photo: one photo can show a piece sold under another name
// (the heart on the old Christmas pages is the shop's keychain). An unknown
// slug is a typo, so it fails the render instead of quietly dropping the
// price.
export function linkedShopProduct(slug: string | undefined) {
  if (!slug) return undefined
  const product = getShopProduct(slug)
  if (!product) throw new Error(`Unknown shop product: ${slug}`)
  return product
}

export const SHOP_MIN_PRICE = Math.min(...shopProducts.map((p) => p.price))

export function minPriceIn(id: ShopCategoryId) {
  return Math.min(...shopProductsIn(id).map((p) => p.price))
}

// "9 × 9 cm"
// (non-breaking, like the plaque sizes in business.ts)
export function formatSize([a, b]: [number, number]) {
  return `${a}\u00a0×\u00a0${b}\u00a0cm`
}

export function formatPrice(product: ShopProduct) {
  return formatLei(product.price)
}

// Share card per product (scripts/og-cards), 1200×630
export function shopOgImage(product: ShopProduct) {
  return `/img/og/og-magazin-${product.slug}.jpg`
}

export const SHOP_OG_IMAGE = '/img/og/og-magazin.jpg'
