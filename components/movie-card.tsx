import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/lib/tmdb";
import type { Movie } from "@/lib/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        <Image
          src={imageUrl(movie.poster_path, "w300")}
          alt={movie.title}
          width={300}
          height={450}
          className="h-auto w-full object-cover"
        />
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-medium text-slate-900 group-hover:underline dark:text-slate-100">
        {movie.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</p>
    </Link>
  );
}
