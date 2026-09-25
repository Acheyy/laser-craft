import { Link } from '@tanstack/react-router'
import type * as React from 'react'

type Crumb = {
  label: string
  to?: '/' | '/servicii' | '/portofoliu'
}

export function PageHero({
  crumbs,
  title,
  children,
}: {
  crumbs: Crumb[]
  title: React.ReactNode
  children?: React.ReactNode
}) {
  const trail: Crumb[] = [{ label: 'Acasă', to: '/' }, ...crumbs]

  return (
    <section className="bg-slate-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            {trail.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">›</span>}
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-zinc-300">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          {children && (
            <div className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed space-y-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
      {children}
    </span>
  )
}
