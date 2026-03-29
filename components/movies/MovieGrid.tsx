import { MovieCard } from './MovieCard'
import type { Movie } from '@/types/tmdb'

interface MovieGridProps {
  movies: Movie[]
  emptyMessage?: string
}

export function MovieGrid({ movies, emptyMessage = 'No movies found.' }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-5xl">😿</div>
        <p className="font-body text-lg" style={{ color: 'var(--muted)' }}>
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {movies.map((movie, i) => (
        <MovieCard key={movie.id} movie={movie} index={i} />
      ))}
    </div>
  )
}
