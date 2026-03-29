import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getTrendingMovies, getTopRatedMovies, getImageUrl, getBackdropUrl } from '@/lib/tmdb'
import { MovieCard } from '@/components/movies/MovieCard'

export const metadata: Metadata = {
  title: 'DaffaCinema',
  description:
    'Front-End Project (UGM BCC 2026) made in 26/03/26 by Daffa Ramaditya.',
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
    <div style={{ backgroundColor: 'var(--bg)' }}>
      {hero && (
        <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-black">
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
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.3) 100%), ' +
                'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 30%, transparent 60%)',
            }}
          />

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-16">
            <div
              className="max-w-xl"
              style={{ animation: 'fadeUp 0.7s ease forwards' }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold
                  uppercase tracking-widest mb-4 text-white"
                style={{ backgroundColor: 'var(--accent-3)' }}
              >
                Trending Now
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
    style={{ backgroundColor: 'var(--accent-2)' }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
    </svg>
    View Details
  </Link>
  <Link
    href="/movies"
    className="inline-flex items-center justify-center w-12 h-12 rounded-xl
      transition-all duration-200 hover:opacity-80"
    style={{
      backgroundColor: 'rgba(255,255,255,0.12)',
      color: 'white',
      backdropFilter: 'blur(8px)',
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"/>
    </svg>
  </Link>
</div>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
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
            style={{ color: 'var(--accent-3)' }}
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
              Top Rated
            </h2>
            <Link
              href="/movies"
              className="font-body text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: 'var(--accent-3)' }}
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
    </div>
  )
}
