'use client'
import { useWatchlist } from '@/components/providers/WatchlistProviders'
import type { Movie } from '@/types/tmdb'

interface WatchlistButtonProps {
  movie: Movie
  className?: string
}

export function WatchlistButton({ movie, className = '' }: WatchlistButtonProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist()
  const active = isInWatchlist(movie.id)

  return (
    <button
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        toggleWatchlist(movie)
      }}
      aria-label={active ? 'Remove from watchlist' : 'Add to watchlist'}
      title={active ? 'Remove from watchlist' : 'Add to watchlist'}
      className={`group flex items-center justify-center w-9 h-9 rounded-full
        transition-all duration-200 active:scale-90 text-white
        outline-none border-none ${className}`}
      style={{
        backgroundColor: active ? 'var(--accent-2)' : 'rgba(0,0,0,0.4)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="white"
        strokeWidth="2"
        className="w-4 h-4 transition-transform group-hover:scale-110"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
    </button>
  )
}