'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getImageUrl } from '@/lib/tmdb'
import type { Movie } from '@/types/tmdb'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Movie[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return }
    clearTimeout(debounceRef.current)
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        // Uses your existing TMDB search endpoint
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results?.slice(0, 6) ?? [])
        setOpen(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [query])

  const go = (movieId: number) => {
    router.push(`/movies/${movieId}`)
    setQuery('')
    setOpen(false)
  }

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/movies?search=${encodeURIComponent(query)}`)
      setOpen(false)
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <form onSubmit={submitSearch}>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
            style={{ color: 'var(--muted)' }}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
          >
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder="Search movies…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl font-body text-sm outline-none transition-all duration-200 focus:ring-2"
            style={{
              backgroundColor: 'var(--card)',
              color: 'var(--text)',
              border: '1.5px solid rgba(255,255,255,0.08)',
              // @ts-ignore
              '--tw-ring-color': 'var(--accent-2)',
            }}
          />
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--accent-2)', borderTopColor: 'transparent' }} />
          )}
        </div>
      </form>

      {open && results.length > 0 && (
        <div
          className="absolute top-full mt-2 left-0 right-0 rounded-2xl overflow-hidden z-50 shadow-2xl"
          style={{ backgroundColor: 'var(--card)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {results.map(movie => (
            <button
              key={movie.id}
              onClick={() => go(movie.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:opacity-80"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="relative w-8 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-black/30">
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>
                  {movie.title}
                </p>
                <p className="font-body text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                  {movie.release_date?.split('-')[0]} · ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </button>
          ))}
          <button
            onClick={submitSearch as any}
            className="w-full px-4 py-3 font-body text-sm text-center transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent-3)' }}
          >
            See all results for "{query}" →
          </button>
        </div>
      )}
    </div>
  )
}
