'use client'
import { useWatchlist } from '@/components/providers/WatchlistProviders'
import { MovieGrid } from '@/components/movies/MovieGrid'
import Link from 'next/link'

export default function WatchlistPage() {
  const { watchlist } = useWatchlist()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="font-display font-bold text-3xl sm:text-4xl mb-2"
          style={{ color: 'var(--text)' }}
        >
          My Watchlist
        </h1>
        <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>
          {watchlist.length > 0
            ? `${watchlist.length} movie${watchlist.length !== 1 ? 's' : ''} saved to watch later.`
            : 'Movies you want to watch will appear here.'}
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="text-7xl">🎬</div>
          <div className="text-center">
            <h2
              className="font-display font-bold text-xl mb-2"
              style={{ color: 'var(--text)' }}
            >
              No movies yet
            </h2>
            <p
              className="font-body text-sm mb-6 max-w-xs"
              style={{ color: 'var(--muted)' }}
            >
              Browse movies and tap the 🔖 button to save them here.
            </p>
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body
                font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent-2)' }}
            >
              Browse Movies
            </Link>
          </div>
        </div>
      ) : (
        <>
          <MovieGrid movies={watchlist} />
          <div className="mt-10 flex justify-center">
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body
                font-semibold text-sm transition-all hover:opacity-80"
              style={{
                backgroundColor: 'var(--card)',
                color: 'var(--text)',
                border: '1px solid var(--border)',
              }}
            >
              Discover More Movies
            </Link>
          </div>
        </>
      )}
    </div>
  )
}