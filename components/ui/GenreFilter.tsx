'use client'
import { useRef } from 'react'
import type { Genre } from '@/types/tmdb'

interface GenreFilterProps {
  genres: Genre[]
  selectedGenre: string
  onSelect: (genreId: string) => void
}

export function GenreFilter({ genres, selectedGenre, onSelect }: GenreFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const all = [{ id: 0, name: 'All' }, ...genres]

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {all.map(genre => {
          const isSelected =
            genre.id === 0 ? !selectedGenre : selectedGenre === String(genre.id)
          return (
            <button
              key={genre.id}
              onClick={() => onSelect(genre.id === 0 ? '' : String(genre.id))}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-body font-semibold
                tracking-wide transition-all duration-200 active:scale-95
                ${isSelected ? 'text-white' : 'hover:opacity-80'}`}
              style={
                isSelected
                  ? {
                      backgroundColor: 'var(--accent-3)',
                    }
                  : {
                      backgroundColor: 'var(--card)',
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                    }
              }
            >
              {genre.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}