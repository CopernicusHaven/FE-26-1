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
/Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/api
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/api/search
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/api/search/api-routes.ts
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/api/search/route.ts
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/favorites
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/favorites/FavoritesPageClient.tsx
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/favorites/page.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/hooks
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/hooks/useLocalStorage.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/[id]
│ │ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/[id]/error.tsx
│ │ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/[id]/loading.tsx
│ │ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/[id]/page.tsx
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/error.tsx
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/loading.tsx
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/MoviesClientSection.tsx
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/movies/page.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/error.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/globals.css
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/layout.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/loading.tsx
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/app/page.tsx
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/layout
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/layout/Footer.tsx
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/layout/Navbar.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/movies
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/movies/MovieCard.tsx
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/movies/MovieGrid.tsx
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/movies/SimilarMovies.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/providers
│ │ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/providers/FavoritesProvider.tsx
│ │ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/providers/ThemeProvider.tsx
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui/FavoriteButton.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui/GenreBadge.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui/GenreFilter.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui/ScrollToTop.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui/SearchBar.tsx
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui/SkeletonCard.tsx
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/components/ui/ThemeToggle.tsx
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/lib
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/lib/tmdb.ts
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public/fonts
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public/fonts/GoogleSans-Bold.ttf
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public/fonts/GoogleSans-Italic.ttf
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public/fonts/GoogleSans-Medium.ttf
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public/fonts/GoogleSans-MediumItalic.ttf
│ ├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public/fonts/GoogleSans-Regular.ttf
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/public/fonts/GoogleSansFlex.ttf
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/types
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/types/tmdb.ts
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/{app
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/{app/{api
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/{app/{api/search,movies
│ └── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/{app/{api/search,movies/[id],favorites},components
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/.env.local
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/.env.local.example
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/.gitignore
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/next-env.d.ts
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/next.config.js
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/package-lock.json
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/package.json
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/postcss.config.js
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/README.md
├── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/tailwind.config.ts
└── /Users/daffaramaditya/Documents/Codes/UGM-BCC Project/ATTEMPT 1/DaffaCinema/tsconfig.json
```

# 05. Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode by `class` strategy)
- **TMDB API** (free tier)
- **React Context API** (favorites + theme)
- **Fonts**: Google Sans
