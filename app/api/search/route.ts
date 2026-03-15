import { NextRequest, NextResponse } from 'next/server'
import { searchMovies, getMoviesByGenre, getPopularMovies } from '@/lib/tmdb'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const genre = searchParams.get('genre') || ''
  const page = parseInt(searchParams.get('page') || '1')

  try {
    let data
    if (query.trim()) {
      data = await searchMovies(query.trim(), page)
    } else if (genre) {
      data = await getMoviesByGenre(genre, page)
    } else {
      data = await getPopularMovies(page)
    }
    return NextResponse.json(data)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch movies'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
