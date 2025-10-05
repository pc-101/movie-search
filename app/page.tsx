import Grid from "@/components/grid";
import MovieCard from "@/components/movie-card";
import { TMDB } from "@/lib/tmdb";
import type { Movie, Paged } from "@/lib/types";

export const revalidate = 600;

export default async function Home() {
  let data: Paged<Movie>;
  try {
    data = await TMDB.trending() as Paged<Movie>;
  } catch (e) {
    // Show a minimal offline/empty state if no API key yet
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Trending</h1>
        <p className="text-sm text-slate-500">
          Add your TMDB API key in <code>.env.local</code> (see <code>.env.local.example</code>) to load movies.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Trending</h1>
      <Grid>
        {data.results.map((m) => <MovieCard key={m.id} movie={m} />)}
      </Grid>
    </section>
  );
}
