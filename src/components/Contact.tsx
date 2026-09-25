import type * as React from 'react'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Icon, WhatsAppIcon } from '~/components/Icon'
import { CheckList, Container, Steps, buttonClass, textLinkDark } from '~/components/ui'
import {
  DELIVERY,
  EMAIL,
  HOURS_SHORT,
  PHONE_DISPLAY,
  PHONE_HREF,
  RESPONSE_TIME,
  emailHref,
  whatsappHref,
} from '~/data/business'
import { trackEvent } from '~/utils/analytics'

// Primary actions: WhatsApp first, phone second. On narrow screens the two
// buttons sit side by side with short labels.
export function ContactActions({
  message,
  dark = true,
  size = 'md',
  stacked = false,
  className = '',
}: {
  message?: string
  dark?: boolean
  size?: 'md' | 'lg'
  stacked?: boolean
  className?: string
}) {
  return (
    <div
      className={`grid gap-3 ${
        stacked ? 'grid-cols-1' : 'grid-cols-2 sm:flex sm:flex-wrap'
      } ${className}`}
    >
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener"
        className={buttonClass('primary', size)}
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span className={stacked ? '' : 'sm:hidden'}>
          {stacked ? 'Scrieți-ne pe WhatsApp' : 'WhatsApp'}
        </span>
        {!stacked && <span className="hidden sm:inline">Scrieți-ne pe WhatsApp</span>}
      </a>
      <a
        href={PHONE_HREF}
        className={buttonClass(dark ? 'outlineDark' : 'outlineLight', size)}
      >
        <Icon name="phone" className="w-5 h-5" />
        <span className={stacked ? '' : 'sm:hidden'}>
          {stacked ? `Sunați: ${PHONE_DISPLAY}` : 'Sunați'}
        </span>
        {!stacked && <span className="hidden sm:inline">Sunați: {PHONE_DISPLAY}</span>}
      </a>
    </div>
  )
}

const [emailUser, emailDomain] = EMAIL.split('@')

// Email as visible text plus a copy button: mailto: opens nothing on many
// desktops (webmail users), so the address itself must stay readable.
export function CopyEmail({
  subject,
  body,
  dark = true,
}: {
  subject?: string
  body?: string
  dark?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // In-app browsers (Facebook, Instagram) often lack the clipboard API.
      const field = document.createElement('textarea')
      field.value = EMAIL
      field.setAttribute('readonly', '')
      field.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(field)
      field.select()
      const ok = document.execCommand('copy')
      field.remove()
      if (!ok) {
        window.location.href = emailHref(subject, body)
        return
      }
    }
    setCopied(true)
    trackEvent('copy_email')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border p-1.5 pl-3 ${
        dark ? 'border-white/15 bg-white/5' : 'border-zinc-200 bg-white'
      }`}
    >
      <Icon
        name="mail"
        className={`w-5 h-5 shrink-0 ${dark ? 'text-amber-400' : 'text-amber-600'}`}
      />
      {/* Wraps at "@" on narrow rows instead of being cut off. */}
      <a
        href={emailHref(subject, body)}
        className={`min-w-0 flex-1 py-1 text-sm font-medium [overflow-wrap:anywhere] sm:text-base ${
          dark ? 'text-white hover:text-amber-300' : 'text-zinc-900 hover:text-amber-700'
        }`}
      >
        {emailUser}
        <wbr />@{emailDomain}
      </a>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition-colors ${
          dark
            ? 'bg-white/10 text-white hover:bg-white/15'
            : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
        }`}
      >
        <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
        <span aria-live="polite">{copied ? 'Copiat' : 'Copiați'}</span>
      </button>
    </div>
  )
}

export function ContactFacts({
  dark = true,
  className = '',
}: {
  dark?: boolean
  className?: string
}) {
  const iconClass = `w-5 h-5 shrink-0 mt-0.5 ${dark ? 'text-amber-400' : 'text-amber-600'}`
  return (
    <ul
      className={`space-y-2.5 text-sm ${dark ? 'text-zinc-300' : 'text-zinc-600'} ${className}`}
    >
      <li className="flex gap-2.5">
        <Icon name="clock" className={iconClass} />
        <span>{HOURS_SHORT}, duminică închis. {RESPONSE_TIME}</span>
      </li>
      <li className="flex gap-2.5">
        <Icon name="truck" className={iconClass} />
        <span>{DELIVERY}</span>
      </li>
    </ul>
  )
}

export const defaultOrderChecklist = [
  'Ce produs doriți (o poză cu un model ne ajută)',
  'Dimensiunile și cantitatea',
  'Textul, numele sau fișierul de design',
  'Termenul până la care aveți nevoie',
]

// The single "how to order + contact" block per page. It replaces the old
// per-page contact cards and the generic CTA section.
export function OrderBlock({
  id = 'comanda',
  title = 'Cereți o ofertă gratuită',
  intro,
  steps,
  checklist = defaultOrderChecklist,
  checklistTitle = 'Ce ne trimiteți pentru ofertă',
  whatsappMessage,
  emailSubject,
  showContactPageLink = true,
  children,
}: {
  id?: string
  title?: React.ReactNode
  intro?: React.ReactNode
  steps?: Array<{ title: React.ReactNode; description?: React.ReactNode }>
  checklist?: string[]
  // null when the intro already leads into the list
  checklistTitle?: string | null
  whatsappMessage?: string
  emailSubject?: string
  showContactPageLink?: boolean
  children?: React.ReactNode
}) {
  return (
    <section
      id={id}
      data-placement="order-block"
      className="bg-slate-900 py-12 sm:py-16 lg:py-20"
    >
      <Container>
        {/* grid-cols-1 (minmax(0,1fr)) keeps the email row from widening the
            column past the screen on phones. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              {title}
            </h2>
            {intro && (
              <div className="mt-3 text-base sm:text-lg leading-relaxed text-zinc-300">
                {intro}
              </div>
            )}
            {steps ? (
              <Steps steps={steps} dark className="mt-8" />
            ) : (
              <>
                {checklistTitle && (
                  <p className="mt-8 font-semibold text-white">{checklistTitle}:</p>
                )}
                <CheckList items={checklist} dark className={checklistTitle ? 'mt-4' : 'mt-6'} />
              </>
            )}
            {children}
          </div>

          <div className="min-w-0 rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10 sm:p-8 lg:self-start">
            <ContactActions message={whatsappMessage} stacked size="lg" />
            <div className="mt-3">
              <CopyEmail subject={emailSubject} />
            </div>
            <ContactFacts className="mt-6" />
            {showContactPageLink && (
              <p className="mt-4 text-sm">
                <Link to="/contact" className={`inline-block py-3 ${textLinkDark}`}>
                  Toate datele de contact
                </Link>
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
