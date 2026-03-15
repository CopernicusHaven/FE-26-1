import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { FavoritesProvider } from '@/components/providers/FavoritesProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'CinemaTrack — Discover Movies & TV Shows',
    template: '%s | CinemaTrack',
  },
  description:
    'Discover trending movies, browse by genre, and save your favorites. Powered by TMDB.',
  keywords: ['movies', 'tv shows', 'film', 'cinema', 'TMDB'],
  openGraph: {
    type: 'website',
    title: 'CinemaTrack',
    description: 'Discover trending movies and save your favorites.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg)' }}>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
