'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { Movie } from '@/types/tmdb'

interface FavoritesContextValue {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
  toggleFavorite: (movie: Movie) => void
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  toggleFavorite: () => {},
})

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])

  // Load from sessionStorage on mount (persists during session)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('cinematrack-favorites')
      if (saved) setFavorites(JSON.parse(saved))
    } catch {
      // ignore parse errors
    }
  }, [])

  // Persist to sessionStorage on change
  useEffect(() => {
    try {
      sessionStorage.setItem('cinematrack-favorites', JSON.stringify(favorites))
    } catch {
      // ignore storage errors
    }
  }, [favorites])

  const addFavorite = useCallback((movie: Movie) => {
    setFavorites(prev =>
      prev.find(m => m.id === movie.id) ? prev : [...prev, movie]
    )
  }, [])

  const removeFavorite = useCallback((id: number) => {
    setFavorites(prev => prev.filter(m => m.id !== id))
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.some(m => m.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      if (favorites.some(m => m.id === movie.id)) {
        removeFavorite(movie.id)
      } else {
        addFavorite(movie)
      }
    },
    [favorites, addFavorite, removeFavorite]
  )

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
