'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useFavorites } from '@/components/providers/FavoritesProvider'

export function Navbar() {
  const pathname = usePathname()
  const { favorites } = useFavorites()

  const links = [
    { href: '/', label: 'Home' },
    { href: '/movies', label: 'Movies' },
    { href: '/favorites', label: 'Favorites' },
  ]

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white text-sm"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Dc
          </div>
          <span
            className="font-display font-bold text-xl tracking-tight hidden sm:block"
            style={{ color: 'var(--text)' }}
          >
            DaffaCinema
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-body font-medium
                  transition-all duration-200 flex items-center gap-2`}
                style={
                  isActive
                   ? { color: 'var(--accent-3)' }
                   : { color: 'var(--muted)' }
                }
              >
                {link.label}
                {link.href === '/favorites' && favorites.length > 0 && (
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full
                      text-white text-xs font-bold font-mono"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    {favorites.length > 99 ? '99+' : favorites.length}
                  </span>
                )}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundColor: 'var(--accent-3)' }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
