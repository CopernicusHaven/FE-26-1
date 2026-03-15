import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/tmdb'
import { FavoriteButton } from '@/components/ui/FavoriteButton'
import type { Movie } from '@/types/tmdb'

interface MovieCardProps {
  movie: Movie
  index?: number
}

export function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const rating = movie.vote_average.toFixed(1)
  const ratingColor =
    movie.vote_average >= 7.5
      ? '#22c55e'
      : movie.vote_average >= 6
      ? '#eab308'
      : '#ef4444'

  const year = movie.release_date?.split('-')[0] ?? ''

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group block rounded-2xl overflow-hidden transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl"
      style={{
        backgroundColor: 'var(--card)',
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] overflow-hidden bg-[var(--card)]">
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          }}
        />

        {/* Rating badge */}
        <div
          className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-1
            rounded-lg text-xs font-mono font-bold backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: ratingColor,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
          {rating}
        </div>

        {/* Favorite button */}
        <div className="absolute top-2.5 right-2.5">
          <FavoriteButton movie={movie} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3
          className="font-body font-semibold text-sm leading-snug line-clamp-2 mb-1"
          style={{ color: 'var(--text)' }}
        >
          {movie.title}
        </h3>
        {year && (
          <p className="text-xs font-body" style={{ color: 'var(--muted)' }}>
            {year}
          </p>
        )}
      </div>
    </Link>
  )
}
