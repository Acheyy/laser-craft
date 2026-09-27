import type * as React from 'react'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { Section, SectionHeader, buttonClass } from '~/components/ui'
import { whatsappHref } from '~/data/business'

// Questions on the right, a sticky heading with a WhatsApp prompt on the left
// (desktop). On phones the prompt follows the list instead of preceding it.
// Deliberately no FAQPage JSON-LD (owner decision).
export function Faq({
  title = 'Întrebări frecvente',
  items,
  tone = 'muted',
  whatsappMessage,
}: {
  title?: string
  items: Array<{ question: string; answer: React.ReactNode }>
  tone?: 'white' | 'muted'
  // Pass the page's product orderMessage; undefined sends the generic one.
  whatsappMessage?: string
}) {
  const prompt = (className: string, size: 'sm' | 'md') => (
    <div className={className}>
      <p className="text-zinc-600">Nu găsiți răspunsul?</p>
      <a
        href={whatsappHref(whatsappMessage)}
        target="_blank"
        rel="noopener"
        data-placement="faq"
        className={buttonClass('primary', size, 'mt-4')}
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
        Scrieți-ne pe WhatsApp
      </a>
    </div>
  )

  return (
    <Section tone={tone}>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div className="self-start lg:sticky lg:top-24">
          <SectionHeader title={title} className="lg:mb-0" />
          {prompt('mt-2 hidden lg:block', 'sm')}
        </div>
        <div className="min-w-0">
          <div className="space-y-3">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-paper-line bg-white transition-shadow open:border-amber-300 open:shadow-sm"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base">{item.question}</h3>
                  <Icon
                    name="chevronDown"
                    className="w-5 h-5 shrink-0 text-amber-600 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 leading-relaxed text-zinc-600">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
          {prompt('mt-8 lg:hidden', 'md')}
        </div>
      </div>
    </Section>
  )
}
