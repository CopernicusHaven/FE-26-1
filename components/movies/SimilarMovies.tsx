import { MovieCard } from '@/components/movies/MovieCard'
import type { Movie } from '@/types/tmdb'

interface SimilarMoviesProps {
  movies: Movie[]  // pass results from getSimilarMovies(movieId) TMDB endpoint
}

export function SimilarMovies({ movies }: SimilarMoviesProps) {
  const display = movies.slice(0, 6)
  if (display.length === 0) return null

  return (
    <section className="mt-10">
      <h2
        className="font-display font-bold text-2xl mb-5"
        style={{ color: 'var(--text)' }}
      >
        Similar Movies
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {display.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} index={i} />
        ))}
      </div>
    </section>
  )
}
