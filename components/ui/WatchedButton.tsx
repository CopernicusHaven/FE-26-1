'use client'

import { useLocalStorage } from '@/app/hooks/useLocalStorage'

type WatchedStatus = 'watched' | 'want' | null

interface WatchedButtonProps {
  movieId: number
  compact?: boolean // compact=true for use inside MovieCard
}

export function WatchedButton({ movieId, compact = false }: WatchedButtonProps) {
  const [statuses, setStatuses] = useLocalStorage<Record<number, WatchedStatus>>('watched-statuses', {})
  const current = statuses[movieId] ?? null

  const cycle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const next: WatchedStatus = current === null ? 'want' : current === 'want' ? 'watched' : null
  }

  if (compact) {
    // Small badge shown on MovieCard hover overlay
    if (!current) return (
      <button
        onClick={cycle}
        title="Mark as Want to Watch"
        className="flex items-center justify-center w-7 h-7 rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
          <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
        </svg>
      </button>
    )

    return (
      <button
        onClick={cycle}
        title={current === 'watched' ? 'Watched — click to clear' : 'Want to Watch — click to mark watched'}
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body font-semibold backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          backgroundColor: current === 'watched' ? 'rgba(34,197,94,0.85)' : 'rgba(234,179,8,0.85)',
          color: 'white',
        }}
      >
        {current === 'watched' ? '✓ Watched' : '⊕ Watchlist'}
      </button>
    )
  }

  // Full-size version for movie detail page
  return (
    <div className="flex gap-2">
      {(['want', 'watched'] as WatchedStatus[]).map(s => (
        <button
          key={s!}
          onClick={cycle}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-body font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            backgroundColor: current === s
              ? s === 'watched' ? '#22c55e' : '#eab308'
              : 'var(--card)',
            color: current === s ? 'white' : 'var(--muted)',
            border: `1.5px solid ${current === s ? 'transparent' : 'var(--border, rgba(255,255,255,0.1))'}`,
          }}
        >
          {s === 'watched' ? '✓ Watched' : '⊕ Want to Watch'}
        </button>
      ))}
    </div>
  )
}
