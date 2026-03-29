'use client'

import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

interface ReviewBoxProps {
  movieId: number
}

export function ReviewBox({ movieId }: ReviewBoxProps) {
  const [reviews, setReviews] = useLocalStorage<Record<number, string>>('movie-reviews', {})
  const [draft, setDraft] = useState('')
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    setDraft(reviews[movieId] ?? '')
    setEditing(!reviews[movieId])
  }, [movieId, reviews])

  const save = () => {
    setReviews(prev => ({ ...prev, [movieId]: draft }))
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const clear = () => {
    setReviews(prev => { const n = { ...prev }; delete n[movieId]; return n })
    setDraft('')
    setEditing(true)
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-lg" style={{ color: 'var(--text)' }}>
          Your Review
        </h3>
        {reviews[movieId] && !editing && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-xs font-body px-3 py-1 rounded-lg transition-opacity hover:opacity-70"
              style={{ color: 'var(--accent-3)' }}
            >
              Edit
            </button>
            <button
              onClick={clear}
              className="text-xs font-body px-3 py-1 rounded-lg transition-opacity hover:opacity-70"
              style={{ color: 'var(--muted)' }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div>
          <textarea
            value={draft}
            onChange={e => setDraft(e.target.value)}
            placeholder="Write your thoughts about this movie…"
            rows={4}
            className="w-full rounded-xl p-4 font-body text-sm leading-relaxed resize-none outline-none transition-all duration-200 focus:ring-2"
            style={{
              backgroundColor: 'var(--card)',
              color: 'var(--text)',
              border: '1.5px solid rgba(255,255,255,0.08)',
              // @ts-ignore
              '--tw-ring-color': 'var(--accent-2)',
            }}
          />
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={save}
              disabled={!draft.trim()}
              className="px-5 py-2 rounded-xl font-body font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40"
              style={{ backgroundColor: 'var(--accent-2)' }}
            >
              {saved ? '✓ Saved!' : 'Save Review'}
            </button>
            {reviews[movieId] && (
              <button
                onClick={() => { setDraft(reviews[movieId]); setEditing(false) }}
                className="px-4 py-2 rounded-xl font-body text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--muted)' }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl p-4 font-body text-sm leading-relaxed"
          style={{
            backgroundColor: 'var(--card)',
            color: 'var(--text)',
            borderLeft: '3px solid var(--accent-2)',
          }}
        >
          {reviews[movieId]}
        </div>
      )}
    </div>
  )
}
