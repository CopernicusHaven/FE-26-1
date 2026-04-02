# DaffaCinema
Built by Daffa Ramaditya by using **Next.js 14**, **TMDB API**, and **Tailwind CSS**.

# 01. Starting Points
1. Clone or extract the project.
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
6. Open [http://localhost:3000](http://localhost:3000).

# 02. Deploy to Vercel
1. Push it to GitHub.
2. Import the repo in [Vercel](https://vercel.com).
3. Add `TMDB_API_KEY` in Project Settings.
4. Deploy.

# 03. Features Explanation
- Find movies and tv shows that are trending and top rated.
- Search by movie title users want to find.
- Filter by genre of movies users want to find.
- Favorites page to save users' favorite movies.
- Dark and light mode toggle to make users feel comfortable to visit and scroll.
- suitable grid, example: 2 cols for mobile, 3 for tablet or pad, and 4-5 for desktop.
- SSR and ISR for initial data and Route Handlers for search or filter.
- Image for all posters with proper `alt`, `width`, and `height`.
- Static & dynamic metadata (SEO) per page.
- `loading.tsx` skeleton loaders and `error.tsx` on every route.

# 04. Project Structure
```
app/
  layout.tsx           # Root layout (Navbar, ThemeProvider, FavoritesProvider)
  page.tsx             # Home (Trending + top rated)
  loading.tsx / error.tsx
  movies/
    page.tsx           # Movies list (Initial data)
    MoviesClientSection.tsx  # Search + filter
    loading.tsx / error.tsx
    [id]/
      page.tsx         # Movie detail (Dynamic metadata)
      loading.tsx / error.tsx
  favorites/
    page.tsx           # Favorites page
    FavoritesPageClient.tsx
  api/search/route.ts  # Route Handler

components/
  providers/
    ThemeProvider.tsx    # Context: dark/light mode
    FavoritesProvider.tsx  # Context: favorites list
  layout/
    Navbar.tsx           # Sticky nav with logo, links, theme toggle
    Footer.tsx
  ui/
    SearchBar.tsx        # Debounced input 
    GenreFilter.tsx      # Genre chips 
    GenreBadge.tsx       # Read-only badge
    FavoriteButton.tsx   # Heart toggle 
    ThemeToggle.tsx      # Sun/moon toggle 
    SkeletonCard.tsx     # Loading skeleton
  movies/
    MovieCard.tsx        # Poster + title + rating + favorite button
    MovieGrid.tsx        # Responsive grid wrapper

lib/
  tmdb.ts              # All TMDB API fetch functions

types/
  tmdb.ts              # TypeScript interfaces
```

# 05. Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode by `class` strategy)
- **TMDB API** (free tier)
- **React Context API** (favorites + theme)
- **Fonts**: Google Sans
