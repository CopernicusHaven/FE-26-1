import type { Metadata } from 'next'
import { getPopularMovies, getGenres } from '@/lib/tmdb'
import { MoviesClientSection } from './MoviesClientSection'

export const metadata: Metadata = {
  title: 'Movies',
}

export default async function MoviesPage() {
  const [moviesData, genresData] = await Promise.all([
    getPopularMovies(1),
    getGenres(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <MoviesClientSection
        initialMovies={moviesData.results}
        genres={genresData.genres}
      />
    </div>
  )
}
