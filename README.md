# Movie Search

A Next.js 14 application for browsing movies from The Movie Database (TMDB). It ships with a clean UI, dark/light theme toggle, and infinite-scrolling search results backed by the TMDB API.

## Features

- Browse weekly trending movies fetched from TMDB.
- Search by title with automatic infinite scrolling as you reach the end of the results list.
- View individual movie details including poster, synopsis, release date, and rating.
- Toggle light/dark themes with state preserved between visits.
- Server-side data fetching with caching plus a lightweight API proxy for paginated search.

## Prerequisites

- Node.js 18+ (matching the Next.js 14 requirements).
- `pnpm` package manager (you can substitute `npm` or `yarn` if you prefer, updating the commands accordingly).
- A TMDB **Bearer** API token. Create one from the TMDB developer dashboard.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy the environment template and add your TMDB token:
   ```bash
   cp .env.local.example .env.local
   # edit .env.local and replace READ_ONLY_KEY with your TMDB Bearer token
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open `http://localhost:3000` to explore the app. Try typing in the search bar and scroll to see infinite loading in action.

## Available Scripts

- `pnpm dev` – start the Next.js development server with hot reloading.
- `pnpm build` – create an optimized production build.
- `pnpm start` – run the compiled app in production mode.
- `pnpm lint` – run ESLint (on first run you may be prompted to finish the Next.js ESLint configuration).

## Project Structure

```
app/
  layout.tsx        # Global layout, header, and theme provider
  page.tsx          # Trending movies landing page
  search/page.tsx   # Search page shell that renders infinite results
  movie/[id]/       # Movie detail route
components/
  search-bar.tsx    # Search input wired to Next.js router
  search-results.tsx# Client component with infinite scrolling logic
  movie-card.tsx    # Card used across grids
lib/
  tmdb.ts           # TMDB fetch helpers and proxy
  types.ts          # Shared TypeScript types
```

## Environment Variables

| Name             | Required | Description                                                   |
|------------------|----------|---------------------------------------------------------------|
| `TMDB_API_KEY`   | Yes      | TMDB Bearer token used for all API requests.                  |
| `TMDB_API_BASE`  | No       | Override for the TMDB REST API base URL (defaults to official).|
| `TMDB_IMAGE_BASE`| No       | Override for TMDB image CDN base (defaults to official).       |

The app includes `app/api/search` as a proxy endpoint to keep the API key on the server while supporting client-side infinite scrolling.

## Notes

- Search results are cached per page server-side for ten minutes, reducing TMDB rate-limit usage.
- Infinite scrolling uses an `IntersectionObserver` and sentinel element to prefetch the next page before the user reaches the bottom.
- Production deployments should provide environment variables through your hosting platform (e.g., Vercel project settings).

Happy movie hunting!
