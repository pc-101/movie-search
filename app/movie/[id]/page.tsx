import Image from "next/image";
import { TMDB, imageUrl } from "@/lib/tmdb";

type Props = { params: { id: string } };

export default async function MovieDetail({ params }: Props) {
  const movie = await TMDB.movie(params.id);
  return (
    <article className="grid gap-6 md:grid-cols-[200px,1fr]">
      <div className="overflow-hidden rounded-xl border dark:border-slate-800">
        <Image
          src={imageUrl(movie.poster_path, "w300")}
          alt={movie.title}
          width={300}
          height={450}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold">{movie.title}</h1>
        <p className="text-sm text-slate-500">
          {movie.release_date} • ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
        </p>
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{movie.overview}</p>
      </div>
    </article>
  );
}
