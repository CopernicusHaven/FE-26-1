# DaffaCinema

Built by Daffa Ramaditya by using **Next.js 14**, **TMDB API**, and **Tailwind CSS**.

# 01. Starting Points

1. Clone or extract the project
2. Install this:
   ```bash
   npm install
   ```
3. Copy `.env.local.example` to `.env.local` and add your TMDB API key:
   ```bash
   cp .env.local.example .env.local
   ```
4. Get your API key at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000)

# 02. Deploy to Vercel

1. Push it to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `TMDB_API_KEY` in **Project Settings > Environment Variables**
4. Deploy

# 03. Features Explanation

- Find movies and tv shows that are trending and top rated (Server Components)
- **Debounced search** by movie title (Client Component)
- 🏷️ **Filter by genre** with scrollable chips (Client Component)
- ❤️ **Favorites** saved with Context API (persisted in session)
- 🌙 **Dark / Light mode** toggle with localStorage persistence
- 📱 **Responsive** grid: 2 cols (mobile) → 3 (tablet) → 4-5 (desktop)
- ⚡ **SSR + ISR** for initial data, Route Handlers for search/filter
- 🖼️ `next/image` for all posters with proper `alt`, `width`, `height`
- 📝 **Static & dynamic metadata** (SEO) per page
- 🔄 `loading.tsx` skeleton loaders + `error.tsx` on every route

## Project Structure

```
app/
  layout.tsx           # Root layout (Navbar, ThemeProvider, FavoritesProvider)
  page.tsx             # Home (Server Component — trending + top rated)
  loading.tsx / error.tsx
  movies/
    page.tsx           # Movies list (Server Component — initial data)
    MoviesClientSection.tsx  # Search + filter (Client Component)
    loading.tsx / error.tsx
    [id]/
      page.tsx         # Movie detail (Server Component + dynamic metadata)
      loading.tsx / error.tsx
  favorites/
    page.tsx           # Favorites page
    FavoritesPageClient.tsx
  api/search/route.ts  # Route Handler — proxies TMDB search/filter calls

components/
  providers/
    ThemeProvider.tsx    # Context: dark/light mode
    FavoritesProvider.tsx  # Context: favorites list
  layout/
    Navbar.tsx           # Sticky nav with logo, links, theme toggle
    Footer.tsx
  ui/
    SearchBar.tsx        # Debounced input (Client Component)
    GenreFilter.tsx      # Genre chips (Client Component)
    GenreBadge.tsx       # Read-only badge
    FavoriteButton.tsx   # Heart toggle (Client Component)
    ThemeToggle.tsx      # Sun/moon toggle (Client Component)
    SkeletonCard.tsx     # Loading skeleton
  movies/
    MovieCard.tsx        # Poster + title + rating + favorite button
    MovieGrid.tsx        # Responsive grid wrapper

lib/
  tmdb.ts              # All TMDB API fetch functions (server-side)

types/
  tmdb.ts              # TypeScript interfaces
```

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode via `class` strategy)
- **TMDB API** (free tier)
- **React Context API** (favorites + theme)
- Fonts: Cormorant Garamond + Outfit + JetBrains Mono (Google Fonts)
