import type * as React from 'react'

export function Faq({
  title = 'Întrebări frecvente',
  items,
}: {
  title?: string
  items: Array<{ question: string; answer: React.ReactNode }>
}) {
  return (
    <section className="py-16 sm:py-24 bg-zinc-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-8 text-center">
          {title}
        </h2>
        <div className="space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group bg-white rounded-xl border border-zinc-200 open:border-amber-500/50"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-semibold text-zinc-900 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base">{item.question}</h3>
                <span
                  aria-hidden="true"
                  className="text-amber-600 text-xl leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-zinc-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
