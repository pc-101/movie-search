"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Grid from "@/components/grid";
import MovieCard from "@/components/movie-card";
import type { Movie, Paged } from "@/lib/types";

type Props = {
  query: string;
  initial: Paged<Movie>;
};

export default function SearchResults({ query, initial }: Props) {
  const [pages, setPages] = useState<Paged<Movie>[]>([initial]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPages([initial]);
    setError(null);
    setIsFetching(false);
  }, [initial]);

  const flattened = useMemo(() => pages.flatMap((page) => page.results), [pages]);
  const currentPage = pages[pages.length - 1]?.page ?? 1;
  const totalPages = pages[pages.length - 1]?.total_pages ?? 1;
  const hasMore = currentPage < totalPages;

  const loadMore = useCallback(async () => {
    if (isFetching || !hasMore) {
      return;
    }

    setIsFetching(true);
    setError(null);

    const nextPage = currentPage + 1;

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${nextPage}`);
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = (await res.json()) as Paged<Movie>;

      // If the page is already loaded, do not add it again
      setPages((prev) => {
        const alreadyLoaded = prev.some((page) => page.page === data.page);
        return alreadyLoaded ? prev : [...prev, data];
      });
    } catch (err) {
      console.error("Failed to load more results", err);
      setError("Could not load more results. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }, [currentPage, hasMore, isFetching, query]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    if (!hasMore) {
      return () => undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      // Trigger a bit before the sentinel is in view
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div className="space-y-4">
      <Grid>
        {flattened.map((movie) => (
          <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} />
        ))}
      </Grid>
      <div ref={sentinelRef} aria-hidden className="h-1" />
      {isFetching && <p className="text-sm text-slate-500">Loading more results…</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!hasMore && !isFetching && (
        <p className="text-sm text-slate-500">You&apos;ve reached the end of the results.</p>
      )}
    </div>
  );
}
