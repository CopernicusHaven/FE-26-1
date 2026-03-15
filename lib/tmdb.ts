import type { Movie, MovieDetail, Genre, TMDBResponse } from '@/types/tmdb'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function getImageUrl(path: string | null, size = 'w500'): string {
  if (!path) return '/placeholder.svg'
  return `${TMDB_IMAGE_BASE}/${size}${path}`
}

export function getBackdropUrl(path: string | null): string {
  if (!path) return ''
  return `${TMDB_IMAGE_BASE}/original${path}`
}

async function fetchTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {},
  revalidate = 3600
): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY
  if (!apiKey) {
    throw new Error(
      'TMDB_API_KEY is not set. Please add it to your .env.local file.'
    )
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', apiKey)
  url.searchParams.set('language', 'en-US')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString(), {
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const getTrendingMovies = () =>
  fetchTMDB<TMDBResponse<Movie>>('/trending/movie/week', {}, 1800)

export const getPopularMovies = (page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>('/movie/popular', { page: String(page) }, 3600)

export const getTopRatedMovies = () =>
  fetchTMDB<TMDBResponse<Movie>>('/movie/top_rated', {}, 7200)

export const getNowPlayingMovies = () =>
  fetchTMDB<TMDBResponse<Movie>>('/movie/now_playing', {}, 1800)

export const getMoviesByGenre = (genreId: string, page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>(
    '/discover/movie',
    {
      with_genres: genreId,
      page: String(page),
      sort_by: 'popularity.desc',
    },
    3600
  )

export const searchMovies = (query: string, page = 1) =>
  fetchTMDB<TMDBResponse<Movie>>(
    '/search/movie',
    { query, page: String(page) },
    300
  )

export const getMovieDetail = (id: string) =>
  fetchTMDB<MovieDetail>(
    `/movie/${id}`,
    { append_to_response: 'credits,similar' },
    3600
  )

export const getGenres = () =>
  fetchTMDB<{ genres: Genre[] }>('/genre/movie/list', {}, 86400)
