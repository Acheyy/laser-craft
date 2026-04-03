import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '~/components/Hero'
import { ServicesPreview } from '~/components/ServicesPreview'
import { WhyUs } from '~/components/WhyUs'
import { CTASection } from '~/components/CTASection'

export const Route = createFileRoute('/')({
  component: HomePage,
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
