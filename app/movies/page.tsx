import type { Metadata } from 'next'
import { getPopularMovies, getGenres } from '@/lib/tmdb'
import { MoviesClientSection } from './MoviesClientSection'

export const metadata: Metadata = {
  title: 'Movies',
  description:
    'Browse the full movie library. Filter by genre, search by title, and discover hidden gems.',
}

export default async function MoviesPage() {
  const [moviesData, genresData] = await Promise.all([
    getPopularMovies(1),
    getGenres(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="font-display font-bold text-3xl sm:text-4xl mb-2"
          style={{ color: 'var(--text)' }}
        >
          Movies
        </h1>
        <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>
          Browse, search, and filter from thousands of films.
        </p>
      </div>

      <MoviesClientSection
        initialMovies={moviesData.results}
        genres={genresData.genres}
      />
    </div>
  )
}
