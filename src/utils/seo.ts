export const SITE_URL = 'https://laser-craft.ro'
export const SITE_NAME = 'LaserCraft'

export function seo({
  title,
  description,
  keywords,
  image,
  url,
}: {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
}) {
  const fullImageUrl = image?.startsWith('http') ? image : image ? `${SITE_URL}${image}` : undefined
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL

  const tags: Array<Record<string, string>> = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'ro_RO' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  if (keywords) {
    tags.push({ name: 'keywords', content: keywords })
  }

  if (fullImageUrl) {
    tags.push(
      { property: 'og:image', content: fullImageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:image', content: fullImageUrl },
    )
  }

  return tags
}
