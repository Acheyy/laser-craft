import type * as React from 'react'
import { Icon } from '~/components/Icon'
import { Section, SectionHeader } from '~/components/ui'

export function Faq({
  title = 'Întrebări frecvente',
  items,
  tone = 'muted',
}: {
  title?: string
  items: Array<{ question: string; answer: React.ReactNode }>
  tone?: 'white' | 'muted'
}) {
  return (
    <Section tone={tone} containerClassName="max-w-3xl">
      <SectionHeader title={title} />
      <div className="space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-zinc-200 bg-white open:border-amber-300"
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
    </Section>
  )
}
