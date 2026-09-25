import type { ImageName } from '~/components/ResponsiveImage'
import {
  ACRYLIC_PRICE_PER_CM2,
  PLAQUE_MIN_PRICE,
  SHOW_CHRISTMAS_PROMO,
  formatLei,
} from '~/data/business'

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
  whatsappMessage: string
  seasonal?: boolean
}

const allProducts: Product[] = [
  {
    to: '/placute-adresa',
    label: 'Plăcuțe de adresă',
    hint: `de la ${formatLei(PLAQUE_MIN_PRICE)}`,
    description: 'Plexiglas pe 2 straturi, 4 mărimi standard.',
    image: '/img/products/placuta-adresa-plexiglas-negru-auriu-1',
    alt: 'Plăcuță de adresă din plexiglas negru cu litere și cifre aurii volumetrice',
    group: 'home',
    whatsappMessage: 'Bună ziua! Aș dori o plăcuță de adresă din plexiglas.',
  },
  {
    to: '/globuri-craciun-personalizate',
    label: 'Globuri de Crăciun cu nume',
    hint: 'preț la cerere',
    description: 'Ornamente din plexiglas cu nume, an sau mesaj.',
    image: '/img/products/glob-craciun-cu-nume-personalizat',
    alt: 'Glob de Crăciun roșu din plexiglas personalizat cu numele Cristina',
    group: 'home',
    whatsappMessage:
      'Bună ziua! Aș dori globuri de Crăciun personalizate din plexiglas.',
    seasonal: true,
  },
  {
    to: '/cadouri-personalizate',
    label: 'Cadouri personalizate',
    hint: 'preț la cerere',
    description: 'Brelocuri cu nume, decor cu suport, cadouri gravate.',
    image: '/img/products/breloc-nume-plexiglas-doua-straturi',
    alt: 'Breloc cu numele Jonut din plexiglas alb pe fundal roz, pe două straturi',
    group: 'home',
    whatsappMessage: 'Bună ziua! Aș dori un cadou personalizat din plexiglas.',
  },
  {
    to: '/litere-volumetrice',
    label: 'Litere volumetrice',
    hint: 'decor evenimente și firme',
    description: 'Nume și inscripții 3D pentru evenimente și firme.',
    image: '/img/products/litere-volumetrice-decor-eveniment-1',
    alt: 'Litere volumetrice din plexiglas alb pe panou crem, decor de eveniment',
    imagePosition: '50% 0%',
    group: 'business',
    whatsappMessage: 'Bună ziua! Aș dori o ofertă pentru litere volumetrice.',
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
  },
]

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

// The WhatsApp message that fits the current page (header, sticky bar);
// undefined falls back to the generic message.
export function whatsappMessageFor(pathname: string) {
  if (pathname === '/servicii') return SERVICES_WHATSAPP_MESSAGE
  if (pathname === '/portofoliu') return PORTFOLIO_WHATSAPP_MESSAGE
  return allProducts.find((p) => p.to === pathname)?.whatsappMessage
}
