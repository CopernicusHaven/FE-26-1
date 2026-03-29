'use client'

import { useState, useCallback, useTransition } from 'react'
import { SearchBar } from '@/components/ui/SearchBar'
import { GenreFilter } from '@/components/ui/GenreFilter'
import { MovieGrid } from '@/components/movies/MovieGrid'
import { SkeletonGrid } from '@/components/ui/SkeletonCard'
import type { Movie, Genre } from '@/types/tmdb'

interface MoviesClientSectionProps {
  initialMovies: Movie[]
  genres: Genre[]
}

export function MoviesClientSection({
  initialMovies,
  genres,
}: MoviesClientSectionProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  const [selectedGenre, setSelectedGenre] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isPending, startTransition] = useTransition()

  const fetchMovies = useCallback(
    async (query: string, genre: string, p: number) => {
      const params = new URLSearchParams()
      if (query) params.set('q', query)
      if (genre) params.set('genre', genre)
      params.set('page', String(p))

      const res = await fetch(`/api/search?${params}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    []
  )

  const [currentQuery, setCurrentQuery] = useState('')

  const handleSearch = useCallback(
    (query: string) => {
      setCurrentQuery(query)
      setPage(1)
      startTransition(async () => {
        const data = await fetchMovies(query, selectedGenre, 1)
        setMovies(data.results)
        setTotalPages(data.total_pages)
      })
    },
    [fetchMovies, selectedGenre]
  )

  const handleGenre = useCallback(
    (genreId: string) => {
      setSelectedGenre(genreId)
      setPage(1)
      startTransition(async () => {
        const data = await fetchMovies(currentQuery, genreId, 1)
        setMovies(data.results)
        setTotalPages(data.total_pages)
      })
    },
    [fetchMovies, currentQuery]
  )

  const handleLoadMore = useCallback(async () => {
    const nextPage = page + 1
    startTransition(async () => {
      const data = await fetchMovies(currentQuery, selectedGenre, nextPage)
      setMovies(prev => [...prev, ...data.results])
      setPage(nextPage)
      setTotalPages(data.total_pages)
    })
  }, [page, fetchMovies, currentQuery, selectedGenre])

  return (
    <div>
      <div className="space-y-4 mb-8">
        <SearchBar />
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={handleGenre}
        />
      </div>

      {(currentQuery || selectedGenre) && (
        <p className="font-body text-sm mb-4" style={{ color: 'var(--muted)' }}>
          {isPending
            ? 'Searching...'
            : `${movies.length} result${movies.length !== 1 ? 's' : ''} found`}
        </p>
      )}

      {isPending && movies.length === 0 ? (
        <SkeletonGrid count={20} />
      ) : (
        <div className={isPending ? 'opacity-60 transition-opacity' : ''}>
          <MovieGrid
            movies={movies}
            emptyMessage={
              currentQuery
                ? `No results for "${currentQuery}"`
                : 'No movies found for this genre.'
            }
          />
        </div>
      )}

      {!isPending && movies.length > 0 && page < totalPages && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            disabled={isPending}
            className="px-8 py-3 rounded-xl font-body font-semibold text-sm
              transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50"
            style={{
              backgroundColor: 'var(--card)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
