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
        className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />
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
                ${isSelected ? 'text-white shadow-lg' : 'hover:opacity-80'}`}
              style={
                isSelected
                  ? {
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 4px 14px color-mix(in srgb, var(--accent) 40%, transparent)',
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
