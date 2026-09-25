import type * as React from 'react'
import { Icon } from '~/components/Icon'

// Shared UI recipes. Palette: slate-900 surfaces, amber/orange accents,
// white / zinc-50 light sections. Text on amber is always slate-950 (AA).
//
// Button labels use the formal register used across the site:
// 'Scrieți-ne pe WhatsApp' / 'WhatsApp', 'Sunați', 'Cereți ofertă',
// 'Scrieți-ne' (email), 'Vreau acest model' (product cards).

type ButtonVariant = 'primary' | 'dark' | 'outlineDark' | 'outlineLight'
type ButtonSize = 'sm' | 'md' | 'lg'

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-center transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] select-none'

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/20 hover:from-amber-300 hover:to-orange-400',
  dark: 'bg-slate-900 text-white hover:bg-slate-800',
  outlineDark:
    'border border-white/20 text-white hover:bg-white/10 hover:border-white/30',
  outlineLight:
    'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400',
}

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-12 px-5 text-base',
  lg: 'min-h-14 px-7 text-base sm:text-lg',
}

export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  extra = '',
) {
  return `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]} ${extra}`
}

// Inline text links inside body copy (amber-700 on white = 5:1).
export const textLink =
  'font-medium text-amber-700 underline decoration-amber-600/40 underline-offset-4 hover:text-amber-800 hover:decoration-amber-700'

// Same, for dark backgrounds.
export const textLinkDark =
  'font-medium text-amber-300 underline decoration-amber-400/40 underline-offset-4 hover:text-amber-200'

export function Container({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  // A max-w-* in className replaces the default width instead of competing
  // with it in the cascade.
  const width = /(^|\s)max-w-/.test(className) ? '' : 'max-w-7xl'
  return (
    <div className={`mx-auto ${width} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

const sectionTones = {
  white: 'bg-white',
  muted: 'bg-zinc-50',
  dark: 'bg-slate-900 text-white',
}

export function Section({
  id,
  tone = 'white',
  className = '',
  containerClassName = '',
  children,
}: {
  id?: string
  tone?: keyof typeof sectionTones
  className?: string
  containerClassName?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-16 lg:py-20 ${sectionTones[tone]} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-wider ${
        dark ? 'text-amber-400' : 'text-amber-700'
      }`}
    >
      {children}
    </p>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  dark = false,
  className = '',
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  intro?: React.ReactNode
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}) {
  return (
    <div
      className={`max-w-3xl mb-8 sm:mb-10 ${
        align === 'center' ? 'mx-auto text-center' : ''
      } ${className}`}
    >
      {eyebrow && (
        <div className="mb-2">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl font-bold tracking-tight text-balance ${
          dark ? 'text-white' : 'text-zinc-900'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <div
          className={`mt-3 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-zinc-300' : 'text-zinc-600'
          }`}
        >
          {intro}
        </div>
      )}
    </div>
  )
}

export function Chip({
  children,
  dark = false,
  icon,
}: {
  children: React.ReactNode
  dark?: boolean
  icon?: React.ReactNode
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset ${
        dark
          ? 'bg-amber-400/10 text-amber-300 ring-amber-400/30'
          : 'bg-amber-50 text-amber-800 ring-amber-200'
      }`}
    >
      {icon}
      {children}
    </span>
  )
}

export function CheckList({
  items,
  dark = false,
  columns = 1,
  className = '',
}: {
  items: React.ReactNode[]
  dark?: boolean
  columns?: 1 | 2
  className?: string
}) {
  return (
    <ul
      className={`grid gap-x-6 gap-y-2.5 ${
        columns === 2 ? 'sm:grid-cols-2' : ''
      } ${className}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex items-start gap-2.5 ${
            dark ? 'text-zinc-200' : 'text-zinc-700'
          }`}
        >
          <Icon
            name="check"
            strokeWidth={2.25}
            className={`mt-0.5 w-5 h-5 shrink-0 ${
              dark ? 'text-amber-400' : 'text-amber-600'
            }`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function Steps({
  steps,
  dark = false,
  className = '',
}: {
  steps: Array<{ title: React.ReactNode; description?: React.ReactNode }>
  dark?: boolean
  className?: string
}) {
  return (
    <ol className={`space-y-5 ${className}`}>
      {steps.map((step, index) => (
        <li key={index} className="flex gap-4">
          <span
            aria-hidden="true"
            className={`flex w-9 h-9 shrink-0 items-center justify-center rounded-full font-bold ${
              dark ? 'bg-amber-400/15 text-amber-300' : 'bg-amber-100 text-amber-800'
            }`}
          >
            {index + 1}
          </span>
          <div className="pt-1">
            <h3 className={`font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>
              {step.title}
            </h3>
            {step.description && (
              <p
                className={`mt-1 leading-relaxed ${
                  dark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                {step.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

// Price card used for the 0,09 lei/cm² rate and similar single figures.
export function RateCard({
  label,
  value,
  unit,
  note,
  dark = false,
}: {
  label: React.ReactNode
  value: React.ReactNode
  unit: React.ReactNode
  note?: React.ReactNode
  dark?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 ${
        dark
          ? 'bg-slate-900 text-white'
          : 'bg-white border border-zinc-200'
      }`}
    >
      <Eyebrow dark={dark}>{label}</Eyebrow>
      <div className="mt-2 flex items-baseline gap-2 flex-wrap">
        <span
          className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
            dark ? 'text-white' : 'text-zinc-900'
          }`}
        >
          {value}
        </span>
        <span
          className={`text-base sm:text-lg font-medium ${
            dark ? 'text-zinc-300' : 'text-zinc-600'
          }`}
        >
          {unit}
        </span>
      </div>
      {note && (
        <div
          className={`mt-3 text-sm ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}
        >
          {note}
        </div>
      )}
    </div>
  )
}
