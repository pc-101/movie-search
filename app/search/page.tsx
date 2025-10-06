import { TMDB } from "@/lib/tmdb";
import type { Movie, Paged } from "@/lib/types";
import SearchResults from "@/components/search-results";

type Props = { searchParams: { q?: string } };

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q || "").trim();
  if (!q) {
    return <p className="text-sm text-slate-500">Type a title in the search bar to begin.</p>;
  }
  try {
    const data = (await TMDB.search(q)) as Paged<Movie>;
    if (!data.results.length) {
      return <p className="text-sm text-slate-500">No results for “{q}”.</p>;
    }
    return (
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">Results for “{q}”</h1>
        <SearchResults key={q} query={q} initial={data} />
      </section>
    );
  } catch {
    return <p className="text-sm text-slate-500">Add your TMDB API key in <code>.env.local</code> to search.</p>;
  }
}
