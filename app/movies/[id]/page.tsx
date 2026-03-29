import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMovieDetail, getImageUrl, getBackdropUrl } from '@/lib/tmdb'
import { GenreBadge } from '@/components/ui/GenreBadge'
import { FavoriteButton } from '@/components/ui/FavoriteButton'
import { MovieCard } from '@/components/movies/MovieCard'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const movie = await getMovieDetail(params.id)
    return {
      title: movie.title,
      description: movie.overview?.slice(0, 160) || `Details for ${movie.title}`,
      openGraph: {
        title: movie.title,
        description: movie.overview?.slice(0, 160),
        images: movie.poster_path
          ? [{ url: getImageUrl(movie.poster_path, 'w780'), alt: movie.title }]
          : [],
      },
    }
  } catch {
    return { title: 'Movie Is Not Found' }
  }
}

function formatCurrency(n: number) {
  if (!n) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

function formatRuntime(mins: number | null) {
  if (!mins) return '—'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export default async function MovieDetailPage({ params }: Props) {
  let movie
  try {
    movie = await getMovieDetail(params.id)
  } catch {
    notFound()
  }

  const director = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 8) || []
  const similar = movie.similar?.results?.slice(0, 6) || []

  const ratingColor =
    movie.vote_average >= 7.5 ? '#22c55e' : movie.vote_average >= 6 ? '#eab308' : '#ef4444'

  const movieForFav = {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
    release_date: movie.release_date,
    genre_ids: movie.genres?.map(g => g.id) || [],
    popularity: movie.popularity,
    adult: movie.adult,
    original_language: movie.original_language,
    original_title: movie.original_title,
  }

  return (
    <div>
      <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
        {movie.backdrop_path ? (
          <Image
            src={getBackdropUrl(movie.backdrop_path)}
            alt={`${movie.title} backdrop`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div style={{ backgroundColor: 'var(--card)', position: 'absolute', inset: 0 }} />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-shrink-0 w-48 sm:w-56 md:w-64 mx-auto sm:mx-0">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={`${movie.title} poster`}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-1 pt-4 sm:pt-20">
            <Link
            href="/movies"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-body font-semibold mb-4 hover:opacity-80 transition-all"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: 'var(--text)',
              backdropFilter: 'blur(8px)',
              }}
            >
                Back to Movies
            </Link>
            <div className="flex items-start gap-3 flex-wrap">
              <h1
                className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight"
                style={{ color: 'var(--text)' }}
              >
                {movie.title}
              </h1>
              <FavoriteButton movie={movieForFav} className="mt-2 flex-shrink-0" />
            </div>

            {movie.tagline && (
              <p className="font-body italic text-sm mt-1" style={{ color: 'var(--muted)' }}>
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 mt-4 mb-4">
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-sm"
                style={{ backgroundColor: 'var(--card)', color: ratingColor }}
              >
                ★ {movie.vote_average.toFixed(1)}
                <span className="text-xs font-normal" style={{ color: 'var(--muted)' }}>
                  ({movie.vote_count.toLocaleString()})
                </span>
              </span>

              {movie.release_date && (
                <span className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}

              {movie.runtime && (
                <span className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                  {formatRuntime(movie.runtime)}
                </span>
              )}

              <span
                className="font-body text-xs px-2 py-1 rounded-md"
                style={{ backgroundColor: 'var(--card)', color: 'var(--muted)', border: '1px solid var(--border)' }}
              >
                {movie.status}
              </span>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map(g => (
                  <GenreBadge key={g.id} genre={g} />
                ))}
              </div>
            )}

            <p
              className="font-body text-sm leading-relaxed max-w-2xl"
              style={{ color: 'var(--text)', opacity: 0.85 }}
            >
              {movie.overview || 'No overview available.'}
            </p>

            {director && (
              <p className="mt-4 text-sm font-body" style={{ color: 'var(--muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--text)' }}>Directed by </span>
                {director.name}
              </p>
            )}

            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="flex gap-6 mt-4">
                {movie.budget > 0 && (
                  <div>
                    <p className="text-xs font-body uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>Budget</p>
                    <p className="font-mono font-bold text-sm" style={{ color: 'var(--text)' }}>{formatCurrency(movie.budget)}</p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <p className="text-xs font-body uppercase tracking-wider mb-0.5" style={{ color: 'var(--muted)' }}>Revenue</p>
                    <p className="font-mono font-bold text-sm" style={{ color: 'var(--text)' }}>{formatCurrency(movie.revenue)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {cast.length > 0 && (
          <section className="mt-14">
            <h2
              className="font-display font-bold text-2xl mb-5"
              style={{ color: 'var(--text)' }}
            >
              Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {cast.map(member => (
                <div key={member.id} className="text-center">
                  <div
                    className="relative w-16 h-16 mx-auto rounded-full overflow-hidden mb-2"
                    style={{ backgroundColor: 'var(--card)' }}
                  >
                    {member.profile_path ? (
                      <Image
                        src={getImageUrl(member.profile_path, 'w185')}
                        alt={member.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">
                        👤
                      </div>
                    )}
                  </div>
                  <p className="font-body text-xs font-semibold leading-tight" style={{ color: 'var(--text)' }}>
                    {member.name}
                  </p>
                  <p className="font-body text-xs leading-tight mt-0.5" style={{ color: 'var(--muted)' }}>
                    {member.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="mt-14 mb-12">
            <h2
              className="font-display font-bold text-2xl mb-5"
              style={{ color: 'var(--text)' }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {similar.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
