'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'
import { MovieGrid } from '@/components/movies/MovieGrid'
import type { Movie } from '@/types/tmdb'

type Watchlists = Record<string, number[]>

// This is a Client Component page — create app/watchlist/page.tsx and render <WatchlistPage />
export function WatchlistPage() {
  const [watchlists, setWatchlists] = useLocalStorage<Watchlists>('watchlists', {
    'Want to Watch': [],
    'Favorites': [],
  })
  const [activeList, setActiveList] = useState<string>('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [newName, setNewName] = useState('')

  // Set default active list
  useEffect(() => {
    const lists = Object.keys(watchlists)
    if (lists.length > 0 && !activeList) setActiveList(lists[0])
  }, [watchlists])

  // Fetch movies for the active list
  useEffect(() => {
    const ids = watchlists[activeList] ?? []
    if (ids.length === 0) { setMovies([]); return }
    setLoading(true)
    Promise.all(
      ids.map(id =>
        fetch(`/api/movies/${id}`).then(r => r.json()).catch(() => null)
      )
    ).then(results => {
      setMovies(results.filter(Boolean) as Movie[])
      setLoading(false)
    })
  }, [activeList, watchlists])

  const createList = (e: React.FormEvent) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name || watchlists[name]) return
    setWatchlists(prev => ({ ...prev, [name]: [] }))
    setActiveList(name)
    setNewName('')
  }

  const deleteList = (name: string) => {
    if (!confirm(`Delete "${name}"?`)) return
    setWatchlists(prev => {
      const n = { ...prev }
      delete n[name]
      return n
    })
    const remaining = Object.keys(watchlists).filter(k => k !== name)
    setActiveList(remaining[0] ?? '')
  }

  const removeFromList = (movieId: number) => {
    setWatchlists(prev => ({
      ...prev,
      [activeList]: (prev[activeList] ?? []).filter(id => id !== movieId),
    }))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display font-bold text-3xl mb-8" style={{ color: 'var(--text)' }}>
        My Watchlists
      </h1>

      <div className="flex gap-8 flex-wrap lg:flex-nowrap">
        {/* Sidebar */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <div className="space-y-1 mb-4">
            {Object.entries(watchlists).map(([name, ids]) => (
              <div key={name} className="flex items-center gap-1">
                <button
                  onClick={() => setActiveList(name)}
                  className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-150"
                  style={{
                    backgroundColor: activeList === name ? 'var(--accent-2)' : 'transparent',
                    color: activeList === name ? 'white' : 'var(--muted)',
                  }}
                >
                  <span className="truncate">{name}</span>
                  <span className="text-xs opacity-70 ml-2">{ids.length}</span>
                </button>
                <button
                  onClick={() => deleteList(name)}
                  className="p-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--muted)' }}
                  title="Delete list"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M5.28 4.22a.75.75 0 00-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 101.06 1.06L8 9.06l2.72 2.72a.75.75 0 101.06-1.06L9.06 8l2.72-2.72a.75.75 0 00-1.06-1.06L8 6.94 5.28 4.22z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={createList} className="flex gap-2">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="New list…"
              className="flex-1 px-3 py-2 rounded-xl font-body text-sm outline-none"
              style={{
                backgroundColor: 'var(--card)',
                color: 'var(--text)',
                border: '1.5px solid rgba(255,255,255,0.08)',
              }}
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl font-body text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--accent-2)' }}
            >
              +
            </button>
          </form>
        </aside>

        {/* Movie Grid */}
        <div className="flex-1 min-w-0">
          {!activeList ? (
            <p className="font-body text-center py-20" style={{ color: 'var(--muted)' }}>
              Create a list to get started.
            </p>
          ) : loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] rounded-2xl animate-pulse" style={{ backgroundColor: 'var(--card)' }} />
              ))}
            </div>
          ) : movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="text-5xl">🎬</div>
              <p className="font-body" style={{ color: 'var(--muted)' }}>
                No movies in "{activeList}" yet.
              </p>
              <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                Open any movie and click "+ Watchlist" to add it here.
              </p>
            </div>
          ) : (
            <MovieGrid
              movies={movies}
              emptyMessage={`No movies in "${activeList}" yet.`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
