import type { Metadata } from 'next'
import { FavoritesPageClient } from './FavoritesPageClient'

export const metadata: Metadata = {
  title: 'My Favorites',
  description: 'Your saved favorite movies, kept during this session.',
}

export default function FavoritesPage() {
  return <FavoritesPageClient />
}
