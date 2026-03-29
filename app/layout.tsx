import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { FavoritesProvider } from '@/components/providers/FavoritesProvider'
import { WatchlistProviders } from '@/components/providers/WatchlistProviders'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

export const metadata: Metadata = {
  title: {
    default: 'DaffaCinema',
    template: '%s | DaffaCinema',
  },
  keywords: ['movies', 'tv shows', 'film', 'cinema', 'TMDB'],
  openGraph: {
    type: 'website',
    title: 'DaffaCinema',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            <WatchlistProviders>
              <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <ScrollToTop />
              </div>
            </WatchlistProviders>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}