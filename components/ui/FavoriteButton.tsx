'use client'
import { useFavorites } from '@/components/providers/FavoritesProvider'
import type { Movie } from '@/types/tmdb'

interface FavoriteButtonProps {
  movie: Movie
  className?: string
}

export function FavoriteButton({ movie, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(movie.id)

  return (
    <button
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(movie)
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
      className={`group flex items-center justify-center w-9 h-9 rounded-full
        transition-all duration-200 active:scale-90 text-white
        outline-none border-none
        ${className}`}
      style={{
        backgroundColor: active ? 'var(--accent)' : 'rgba(0,0,0,0.4)',
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
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  )
}