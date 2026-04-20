import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { seo } from '~/utils/seo'

const submitContact = createServerFn({ method: 'POST' })
  .validator(
    (data: {
      name: string
      email: string
      phone: string
      message: string
    }) => {
      if (!data.name || !data.email || !data.message) {
        throw new Error('Toate câmpurile obligatorii trebuie completate.')
      }
      return data
    },
  )
  .handler(async ({ data }) => {
    console.log('Contact form submission:', data)
    return { success: true }
  })

export const Route = createFileRoute('/contact')({
  component: ContactPage,
  head: () => ({
    meta: seo({
      title: 'Contact - LaserCraft | Solicită o Ofertă Gratuită',
      description:
        'Contactați LaserCraft pentru o ofertă gratuită. Telefon, email sau formularul de contact — răspundem în 24 de ore. Craiova, România.',
      keywords:
        'contact LaserCraft, oferta taiere laser, pret taiere laser, contact servicii laser Craiova, cerere oferta laser',
      image: '/img/og/og-contact.png',
      url: '/contact',
    }),
  }),
})

function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    }

    try {
      await submitContact({ data })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'A apărut o eroare. Vă rugăm încercați din nou.',
      )
    }
  }

  return (
    <>
      <section className="bg-slate-900 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Contactați-
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                ne
              </span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
              Suntem aici pentru a vă ajuta cu proiectul dumneavoastră.
              Completați formularul sau folosiți datele de contact de mai jos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-8 h-8 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Mesajul a fost trimis!
                  </h3>
                  <p className="text-green-700">
                    Vă mulțumim! Vă vom contacta în cel mult 24 de ore.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2 text-sm font-medium text-green-700 border border-green-300 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    Trimite alt mesaj
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                    Trimiteți-ne un mesaj
                  </h2>
                  <p className="text-zinc-600 mb-6">
                    Completați formularul și vă vom răspunde cât mai curând
                    posibil.
                  </p>

                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-zinc-700 mb-2"
                      >
                        Nume complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-zinc-900"
                        placeholder="Ion Popescu"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-zinc-900"
                        placeholder="ion@exemplu.ro"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-zinc-900"
                      placeholder="+40 754 497 243"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-zinc-700 mb-2"
                    >
                      Mesaj *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-zinc-900 resize-none"
                      placeholder="Descrieți proiectul dumneavoastră, materialele dorite, cantitățile și termenele..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading'
                      ? 'Se trimite...'
                      : 'Trimite Mesajul'}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Date de Contact
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Adresă
                      </div>
                      <div className="text-sm text-zinc-400 mt-1">
                        Craiova, România
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Telefon
                      </div>
                      <a
                        href="tel:+40754497243"
                        className="text-sm text-zinc-400 mt-1 hover:text-amber-400 transition-colors"
                      >
                        +40 754 497 243
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Email
                      </div>
                      <a
                        href="mailto:lasercraft.contact@gmail.com"
                        className="text-sm text-zinc-400 mt-1 hover:text-amber-400 transition-colors"
                      >
                        lasercraft.contact@gmail.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Program de Lucru
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Luni - Vineri</span>
                    <span className="text-white font-medium">
                      08:00 - 17:00
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Sâmbătă</span>
                    <span className="text-white font-medium">
                      09:00 - 14:00
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-zinc-400">Duminică</span>
                    <span className="text-zinc-500">Închis</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                  Răspuns Rapid
                </h3>
                <p className="text-sm text-zinc-600">
                  Garantăm un răspuns la mesajul dumneavoastră în maximum 24 de
                  ore lucrătoare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
