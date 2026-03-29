'use client'

import { useFavorites } from '@/components/providers/FavoritesProvider'
import { MovieGrid } from '@/components/movies/MovieGrid'
import Link from 'next/link'

export function FavoritesPageClient() {
  const { favorites, favorites: favMovies } = useFavorites()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="text-center">
            <h2
              className="font-display font-bold text-xl mb-2"
              style={{ color: 'var(--text)' }}
            >
              You don't have any favorites yet.
            </h2>
            <p
              className="font-body text-sm mb-6 max-w-xs"
              style={{ color: 'var(--muted)' }}
            >
              You can find movies you like and click the heart button to save.
            </p>
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body
                font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Find Movies
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
              Find More Movies
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
