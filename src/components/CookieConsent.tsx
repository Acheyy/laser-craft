import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { buttonClass, textLinkDark } from '~/components/ui'
import {
  type ConsentChoice,
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
} from '~/utils/analytics'

// Analytics stays off until the visitor accepts (Consent Mode v2 defaults are
// set in the head script). "Accept" and "Refuz" get equal weight.
//
// __root.tsx renders the banner first in <body>, so it is the first Tab stop
// after the skip link. On phones it stays compact (about 125px) so it covers
// as little of the first screen as possible.
export function CookieConsent() {
  const [open, setOpen] = useState(false)
  // Bumped when 'Setări cookie' reopens the banner: focus then moves into it,
  // since the footer button is far from the banner in the Tab order.
  const [focusRequest, setFocusRequest] = useState(0)
  const regionRef = useRef<HTMLDivElement>(null)
  const firstButtonRef = useRef<HTMLButtonElement>(null)
  // The control that reopened the banner gets focus back after a choice.
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (readConsent() === null) setOpen(true)
    const reopen = () => {
      const active = document.activeElement
      returnFocusRef.current =
        active instanceof HTMLElement && active !== document.body ? active : null
      setOpen(true)
      setFocusRequest((n) => n + 1)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, reopen)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.consent = open ? 'pending' : 'done'
  }, [open])

  useEffect(() => {
    if (focusRequest > 0) firstButtonRef.current?.focus()
  }, [focusRequest])

  // While the banner is open, focused links and buttons scroll clear of it;
  // closing it restores the app.css value.
  useEffect(() => {
    const region = regionRef.current
    if (!open || !region) return
    const root = document.documentElement
    const update = () => {
      root.style.scrollPaddingBottom = `${region.offsetHeight + 16}px`
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(region)
    return () => {
      observer.disconnect()
      root.style.scrollPaddingBottom = ''
    }
  }, [open])

  if (!open) return null

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice)
    setOpen(false)
    returnFocusRef.current?.focus()
    returnFocusRef.current = null
  }

  // The outer strip ignores the pointer, so only the card blocks the page.
  return (
    <div
      ref={regionRef}
      role="region"
      aria-label="Setări cookie"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] pb-[calc(0.5rem+env(safe-area-inset-bottom))] pl-[max(0.5rem,env(safe-area-inset-left))] pr-[max(0.5rem,env(safe-area-inset-right))] sm:pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pl-[max(1rem,env(safe-area-inset-left))] sm:pr-[max(1rem,env(safe-area-inset-right))]"
    >
      {/* The transparent border is the card's only edge in forced-colors
          mode, where the ring (a box-shadow) and the background are dropped. */}
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-transparent bg-slate-900 p-3 text-sm text-zinc-300 shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:flex sm:w-fit sm:items-center sm:gap-6 sm:p-5">
        <p className="leading-5">
          Folosim Google Analytics doar cu acordul dumneavoastră.{' '}
          <Link to="/politica-de-confidentialitate" className={textLinkDark}>
            Detalii
          </Link>
        </p>
        <div className="mt-2 grid shrink-0 grid-cols-2 gap-2 sm:mt-0">
          <button
            ref={firstButtonRef}
            type="button"
            onClick={() => choose('denied')}
            className={buttonClass('outlineDark', 'sm', 'min-h-11')}
          >
            Refuz
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className={buttonClass('outlineDark', 'sm', 'min-h-11')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
