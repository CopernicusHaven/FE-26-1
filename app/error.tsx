'use client'

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="text-6xl">😿</div>
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text)' }}>
          Something went wrong
        </h2>
        <p className="font-body text-sm mb-6 max-w-sm" style={{ color: 'var(--muted)' }}>
          {error.message?.includes('TMDB_API_KEY')
            ? 'TMDB API key is missing. Please add TMDB_API_KEY to your .env.local file.'
            : 'Failed to load movies. Please check your internet connection and try again.'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 rounded-xl font-body font-semibold text-sm text-white
            transition-all hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
