// ─── app/api/search/route.ts ──────────────────────────────────────────────────
// Add this file so SearchBar.tsx can call /api/search?q=...

import { NextRequest, NextResponse } from 'next/server'

const BASE = 'https://api.themoviedb.org/3'
const KEY = process.env.TMDB_API_KEY  // already in your .env.local

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (!q.trim()) return NextResponse.json({ results: [] })

  const res = await fetch(
    `${BASE}/search/movie?api_key=${KEY}&query=${encodeURIComponent(q)}&page=1`,
    { next: { revalidate: 60 } }
  )
  const data = await res.json()
  return NextResponse.json(data)
}


// ─── app/api/movies/[id]/route.ts ─────────────────────────────────────────────
// Used by WatchlistPage to fetch full Movie objects from stored IDs.
// Create this as a separate file: app/api/movies/[id]/route.ts

/*
import { NextRequest, NextResponse } from 'next/server'

const BASE = 'https://api.themoviedb.org/3'
const KEY = process.env.TMDB_API_KEY

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const res = await fetch(`${BASE}/movie/${params.id}?api_key=${KEY}`, {
    next: { revalidate: 3600 }
  })
  const data = await res.json()
  return NextResponse.json(data)
}
*/
