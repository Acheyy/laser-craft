import type { ImageName } from '~/components/ResponsiveImage'
import {
  ACRYLIC_PRICE_PER_CM2,
  PLAQUE_MIN_PRICE,
  SHOW_CHRISTMAS_PROMO,
  formatLei,
} from '~/data/business'
import { type ShopProduct, getShopProduct, minPriceIn } from '~/data/shop'

export type ProductPath =
  | '/placute-adresa'
  | '/globuri-craciun-personalizate'
  | '/cadouri-personalizate'
  | '/litere-volumetrice'
  | '/taiere-laser-plexiglas'
  | '/gravura-laser-craiova'

export type Product = {
  to: ProductPath
  label: string
  // Short price/status hint shown next to the label (menu, tiles)
  hint: string
  description: string
  image: ImageName
  alt: string
  // object-position for the cropped tile frame, when the subject is off-centre
  imagePosition?: string
  group: 'home' | 'business'
  // Short request, used as is by the model and idea cards
  whatsappMessage: string
  // One sentence telling the visitor what to send next
  whatsappHint: string
  // whatsappMessage + whatsappHint: header, hero, sticky bar, order block, FAQ
  orderMessage: string
  // Starting price per piece in lei: the cheapest piece of the product's
  // shop categories (shop.ts), so the hints, the hero chip and the /servicii
  // offer follow the price list.
  fromPrice?: number
  // Owner slot, unset until the owner confirms it: the usual turnaround as
  // one sentence ('O plăcuță este gata de obicei în N zile lucrătoare.').
  leadTime?: string
  seasonal?: boolean
}

// Ornaments and gifts are priced per piece. Both have a shop price now; the
// "preț la cerere" fallback (like the hero chips' and the /servicii one) is
// kept for a future per-piece product without one.
function pieceHint(fromPrice?: number) {
  return fromPrice ? `de la ${formatLei(fromPrice)}/buc.` : 'preț la cerere'
}

type ProductData = Omit<Product, 'orderMessage' | 'hint'> & { hint?: string }

const productData: ProductData[] = [
  {
    to: '/placute-adresa',
    label: 'Plăcuțe de adresă',
    hint: `de la ${formatLei(PLAQUE_MIN_PRICE)}`,
    description: 'Plexiglas pe 2 straturi, 4 mărimi standard.',
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
    alt: 'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii volumetrice',
    group: 'home',
    whatsappMessage: 'Bună ziua! Aș dori o plăcuță de adresă din plexiglas.',
    whatsappHint: 'Vă trimit mărimea, textul de pe plăcuță și culorile dorite.',
  },
  {
    to: '/globuri-craciun-personalizate',
    label: 'Globuri de Crăciun cu nume',
    description: 'Ornamente din plexiglas și lemn, cu nume, an sau mesaj.',
    image: '/img/products/glob-craciun-cu-nume-personalizat',
    alt: 'Glob de Crăciun roșu din plexiglas personalizat cu numele Cristina',
    group: 'home',
    whatsappMessage: 'Bună ziua! Aș dori globuri de Crăciun personalizate.',
    whatsappHint:
      'Vă trimit textul pentru fiecare glob, numărul de bucăți și data dorită.',
    fromPrice: minPriceIn('craciun'),
    seasonal: true,
  },
  {
    to: '/cadouri-personalizate',
    label: 'Cadouri personalizate',
    description: 'Brelocuri cu nume, decor cu suport, cadouri gravate.',
    image: '/img/products/breloc-nume-plexiglas-doua-straturi',
    alt: 'Breloc cu numele Jonut din plexiglas alb pe fundal roz, pe două straturi',
    group: 'home',
    whatsappMessage: 'Bună ziua! Aș dori un cadou personalizat.',
    whatsappHint: 'Vă trimit numele sau textul dorit și numărul de bucăți.',
    // The page sells both the keychains and the decor pieces.
    fromPrice: Math.min(minPriceIn('brelocuri'), minPriceIn('decor')),
  },
  {
    to: '/litere-volumetrice',
    label: 'Litere volumetrice',
    hint: 'decor pentru evenimente și firme',
    description: 'Nume și inscripții 3D pentru evenimente și firme.',
    image: '/img/products/litere-volumetrice-decor-eveniment-1',
    alt: 'Litere volumetrice din plexiglas alb pe panou crem, decor de eveniment',
    imagePosition: '50% 0%',
    group: 'business',
    whatsappMessage: 'Bună ziua! Aș dori o ofertă pentru litere volumetrice.',
    whatsappHint:
      'Vă trimit textul, înălțimea literelor și data evenimentului sau termenul dorit.',
  },
  {
    to: '/taiere-laser-plexiglas',
    label: 'Tăiere laser plexiglas',
    hint: `${formatLei(ACRYLIC_PRICE_PER_CM2)}/cm²`,
    description: 'Piese la comandă, semnalistică, margini lustruite.',
    image: '/img/products/numar-casa-plexiglas-negru-model-floral',
    alt: 'Număr de casă din plexiglas negru cu model floral decupat laser',
    group: 'business',
    whatsappMessage: 'Bună ziua! Aș dori o ofertă pentru tăiere laser plexiglas.',
    whatsappHint:
      'Vă trimit tipul și grosimea plexiglasului, dimensiunile și cantitatea.',
  },
  {
    to: '/gravura-laser-craiova',
    label: 'Gravură laser',
    hint: 'lemn, sticlă, piele, acril',
    description: 'Personalizare pe lemn, sticlă, piele și acril.',
    image: '/img/products/breloc-gravat-mesaj-personalizat',
    alt: 'Breloc rotund din plexiglas negru gravat laser cu mesaj personalizat',
    group: 'business',
    whatsappMessage: 'Bună ziua! Aș dori o ofertă pentru gravură laser.',
    whatsappHint:
      'Vă trimit obiectul sau materialul, textul ori desenul de gravat și cantitatea.',
  },
]

const allProducts: Product[] = productData.map((product) => ({
  ...product,
  hint: product.hint ?? pieceHint(product.fromPrice),
  orderMessage: `${product.whatsappMessage} ${product.whatsappHint}`,
}))

// Seasonal products go first while the promo is on and stay listed afterwards.
export const products: Product[] = SHOW_CHRISTMAS_PROMO
  ? [...allProducts.filter((p) => p.seasonal), ...allProducts.filter((p) => !p.seasonal)]
  : allProducts

export const productGroups = [
  { label: 'Pentru casă și cadouri', items: products.filter((p) => p.group === 'home') },
  { label: 'Pentru firme și evenimente', items: products.filter((p) => p.group === 'business') },
]

export function getProduct(to: ProductPath) {
  return allProducts.find((p) => p.to === to)!
}

export const SERVICES_WHATSAPP_MESSAGE =
  'Bună ziua! Aș dori o ofertă pentru tăiere sau gravură laser.'
export const PORTFOLIO_WHATSAPP_MESSAGE =
  'Bună ziua! Am văzut portofoliul dumneavoastră și aș dori o ofertă pentru un proiect asemănător.'
export const SHOP_WHATSAPP_MESSAGE =
  'Bună ziua! Am o întrebare despre produsele din magazinul online.'

// A question about one shop product, or about the shop when there is none.
// Quotes inside the name become «…», the Romanian quote within a quote:
// „Glob «Crăciun Fericit»”.
export function shopWhatsappMessage(product?: ShopProduct) {
  if (!product) return SHOP_WHATSAPP_MESSAGE
  const name = product.name.replace(/„([^”]*)”/g, '«$1»')
  return `Bună ziua! Am o întrebare despre produsul „${name}” din magazin.`
}

// /magazin, /magazin/ and /magazin/<slug>
const SHOP_PATH = /^\/magazin(?:\/([^/]+))?\/?$/

// The WhatsApp message that fits the current page (header, sticky bar,
// footer); undefined falls back to the generic message.
export function whatsappMessageFor(pathname: string) {
  if (pathname === '/servicii') return SERVICES_WHATSAPP_MESSAGE
  if (pathname === '/portofoliu') return PORTFOLIO_WHATSAPP_MESSAGE
  if (pathname === '/cos') return SHOP_WHATSAPP_MESSAGE
  // An unknown slug gets the shop question
  const shop = SHOP_PATH.exec(pathname)
  if (shop) return shopWhatsappMessage(shop[1] ? getShopProduct(shop[1]) : undefined)
  return allProducts.find((p) => p.to === pathname)?.orderMessage
}
