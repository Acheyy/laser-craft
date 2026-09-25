export const SITE_URL = 'https://laser-craft.ro'
export const SITE_NAME = 'LaserCraft'
export const BUSINESS_ID = `${SITE_URL}/#business`

export function absoluteUrl(path: string) {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`
}

// Every page gets exactly one self-referencing canonical. It must only be set
// from leaf routes: TanStack concatenates `links` from all matched routes, so a
// canonical in the root route would be duplicated on every page.
export function seo({
  title,
  description,
  path,
  image = '/img/og/og-home.jpg',
  imageAlt,
}: {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
}) {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'ro_RO' },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: imageAlt ?? title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}

export function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Acasă', path: '/' }, ...items].map(
      (item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      }),
    ),
  })
}
