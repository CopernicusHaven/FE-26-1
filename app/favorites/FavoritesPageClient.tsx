'use client'

import { useFavorites } from '@/components/providers/FavoritesProvider'
import { MovieGrid } from '@/components/movies/MovieGrid'
import Link from 'next/link'

export function FavoritesPageClient() {
  const { favorites, favorites: favMovies } = useFavorites()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="font-display font-bold text-3xl sm:text-4xl mb-2"
          style={{ color: 'var(--text)' }}
        >
          ❤️ My Favorites
        </h1>
        <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>
          {favorites.length > 0
            ? `${favorites.length} movie${favorites.length !== 1 ? 's' : ''} saved this session.`
            : 'Your saved movies will appear here.'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="text-7xl">🍿</div>
          <div className="text-center">
            <h2
              className="font-display font-bold text-xl mb-2"
              style={{ color: 'var(--text)' }}
            >
              No favorites yet
            </h2>
            <p
              className="font-body text-sm mb-6 max-w-xs"
              style={{ color: 'var(--muted)' }}
            >
              Browse movies and tap the ♥ button to save them here.
            </p>
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body
                font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Browse Movies
            </Link>
          </div>
        </div>
      ) : (
        <>
          <MovieGrid movies={favMovies} />

          <div className="mt-10 flex justify-center">
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body
                font-semibold text-sm transition-all hover:opacity-80"
              style={{
                backgroundColor: 'var(--card)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              }}
            >
              Discover More Movies
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
