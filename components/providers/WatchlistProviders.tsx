'use client'
import { createContext, useContext, useState } from 'react'
import type { Movie } from '@/types/tmdb'

interface WatchlistContextValue {
  watchlist: Movie[]
  isInWatchlist: (id: number) => boolean
  toggleWatchlist: (movie: Movie) => void
}

const WatchlistContext = createContext<WatchlistContextValue>({
  watchlist: [],
  isInWatchlist: () => false,
  toggleWatchlist: () => {},
})

export function useWatchlist() {
  return useContext(WatchlistContext)
}

export function WatchlistProviders({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([])

  const isInWatchlist = (id: number) => watchlist.some(m => m.id === id)

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist(prev =>
      isInWatchlist(movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    )
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, isInWatchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}