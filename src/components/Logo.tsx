import { Link } from '@tanstack/react-router'

export function Logo() {
  return (
    <Link
      to="/"
      aria-label="LaserCraft – pagina principală"
      className="flex items-center gap-2 rounded-lg"
    >
      <img src="/img/logo.svg" alt="" width={36} height={36} className="h-9 w-9" />
      <span className="text-xl font-bold tracking-tight text-white">
        Laser<span className="text-amber-400">Craft</span>
      </span>
    </Link>
  )
}
