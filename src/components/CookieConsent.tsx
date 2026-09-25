import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { buttonClass, textLinkDark } from '~/components/ui'
import {
  type ConsentChoice,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
} from '~/utils/analytics'

// Analytics stays off until the visitor accepts (Consent Mode v2 defaults are
// set in the head script). "Accept" and "Refuz" get equal weight.
export function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (readConsent() === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.consent = open ? 'pending' : 'done'
  }, [open])

  if (!open) return null

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice)
    setOpen(false)
  }

  return (
    <div
      role="region"
      aria-label="Setări cookie"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-slate-900 p-4 text-sm text-zinc-300 shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:flex sm:items-center sm:gap-6 sm:p-5">
        <p className="leading-relaxed">
          Folosim cookie-uri Google Analytics doar dacă sunteți de acord, ca să
          vedem ce pagini sunt utile.{' '}
          <Link to="/politica-de-confidentialitate" className={textLinkDark}>
            Detalii
          </Link>
        </p>
        <div className="mt-3 grid shrink-0 grid-cols-2 gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => choose('denied')}
            className={buttonClass('outlineDark', 'md')}
          >
            Refuz
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className={buttonClass('outlineDark', 'md')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
