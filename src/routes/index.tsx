import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { ServicesPreview } from '~/components/ServicesPreview'
import { WhyUs } from '~/components/WhyUs'
import { CTASection } from '~/components/CTASection'
import { seo } from '~/utils/seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () =>
    seo({
      title: 'Tăiere și Gravură Laser Craiova – Plexiglas, Lemn | LaserCraft',
      description:
        'Atelier de tăiere și gravură laser în Craiova: plăcuțe de adresă din plexiglas de la 55 lei, litere volumetrice, decor de evenimente, gravură pe lemn și sticlă.',
      path: '/',
      image: '/img/og/og-home.jpg',
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
