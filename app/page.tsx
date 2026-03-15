import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getTrendingMovies, getTopRatedMovies, getImageUrl, getBackdropUrl } from '@/lib/tmdb'
import { MovieCard } from '@/components/movies/MovieCard'

export const metadata: Metadata = {
  title: 'CinemaTrack — Discover Movies & TV Shows',
  description:
    'Browse this week\'s trending movies, top-rated classics, and save your personal favorites.',
}

export default async function HomePage() {
  const [trendingData, topRatedData] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies(),
  ])

  const trending = trendingData.results.slice(0, 12)
  const topRated = topRatedData.results.slice(0, 8)
  const hero = trending[0]

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      {hero && (
        <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
          {/* Backdrop */}
          {hero.backdrop_path && (
            <Image
              src={getBackdropUrl(hero.backdrop_path)}
              alt={`${hero.title} backdrop`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-top"
            />
          )}
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.3) 70%, transparent 100%), ' +
                'linear-gradient(to top, var(--bg) 0%, transparent 40%)',
            }}
          />

          {/* Hero content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
            <div
              className="max-w-xl"
              style={{ animation: 'fadeUp 0.7s ease forwards' }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold
                  uppercase tracking-widest mb-4 text-white"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                🔥 Trending This Week
              </span>
              <h1
                className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white
                  leading-tight mb-4"
              >
                {hero.title}
              </h1>
              <p className="font-body text-white/70 text-base leading-relaxed line-clamp-3 mb-6">
                {hero.overview}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/movies/${hero.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body
                    font-semibold text-sm text-white transition-all duration-200
                    hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  View Details
                </Link>
                <Link
                  href="/movies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body
                    font-semibold text-sm transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Browse All
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Trending ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-display font-bold text-2xl sm:text-3xl"
            style={{ color: 'var(--text)' }}
          >
            Trending This Week
          </h2>
          <Link
            href="/movies"
            className="font-body text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {trending.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </section>

      {/* ── Top Rated ────────────────────────────────────────────────── */}
      <section
        className="py-12"
        style={{ backgroundColor: 'var(--card)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-display font-bold text-2xl sm:text-3xl"
              style={{ color: 'var(--text)' }}
            >
              ⭐ Top Rated
            </h2>
            <Link
              href="/movies"
              className="font-body text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: 'var(--accent)' }}
            >
              See all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {topRated.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 50%), ' +
                'radial-gradient(circle at 80% 50%, #3b82f6 0%, transparent 50%)',
            }}
          />
          <div className="relative">
            <h2
              className="font-display font-bold text-3xl sm:text-4xl mb-4"
              style={{ color: 'var(--text)' }}
            >
              Discover Your Next Favorite Film
            </h2>
            <p
              className="font-body text-base mb-8 max-w-md mx-auto"
              style={{ color: 'var(--muted)' }}
            >
              Browse thousands of movies by genre, search by title, and build your personal watchlist.
            </p>
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-body
                font-semibold text-sm text-white transition-all duration-200
                hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Explore Movies
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
