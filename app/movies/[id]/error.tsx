'use client'
import Link from 'next/link'

export default function MovieDetailError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text)' }}>
          Movie not found
        </h2>
        <p className="font-body text-sm mb-6" style={{ color: 'var(--muted)' }}>
          This movie might have been removed or the ID is invalid.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl font-body font-semibold text-sm text-white"
            style={{ backgroundColor: 'var(--accent-2)' }}
          >
            Try Again
          </button>
          <Link
            href="/movies"
            className="px-5 py-2.5 rounded-xl font-body font-semibold text-sm"
            style={{ backgroundColor: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border)' }}
          >
            Find Movies
          </Link>
        </div>
      </div>
    </div>
  )
}
