export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};
export type Paged<T> = { page: number; total_pages: number; total_results: number; results: T[] };
