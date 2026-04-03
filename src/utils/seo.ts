export function seo({
  title,
  description,
  keywords,
  image,
}: {
  title: string
  description: string
  keywords?: string
  image?: string
}) {
  const tags: Array<Record<string, string>> = [
    { title },
    { name: 'description', content: description },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: 'https://laser-craft.ro' },
  ]

  if (keywords) {
    tags.push({ name: 'keywords', content: keywords })
  }

  if (image) {
    tags.push(
      { name: 'twitter:image', content: image },
      { property: 'og:image', content: image },
    )
  }

  return tags
}
