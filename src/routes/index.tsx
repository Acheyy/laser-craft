import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { ServicesPreview } from '~/components/ServicesPreview'
import { WhyUs } from '~/components/WhyUs'
import { CTASection } from '~/components/CTASection'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: seo({
      title: 'LaserCraft - Servicii Profesionale de Tăiere și Gravare Laser',
      description:
        'LaserCraft oferă servicii profesionale de tăiere laser și gravare laser. Acril, lemn, piele — precizie, calitate și rapiditate în Craiova, România.',
      keywords:
        'taiere laser, gravare laser, taiere acril, taiere lemn, laser craft, servicii laser, Craiova, gravura laser, plexiglas',
      image: '/img/og/og-home.png',
      url: '/',
    }),
  }),
})

function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyUs />
      <CTASection />
    </>
  )
}
