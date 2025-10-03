export const API = process.env.TMDB_API_BASE || "https://api.themoviedb.org/3";
export const KEY = process.env.TMDB_API_KEY as string;
export const IMG = process.env.TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p";

export function imageUrl(path: string | null, size: "w200"|"w300"|"w500"|"original" = "w500") {
  return path ? `${IMG}/${size}${path}` : "/placeholder.svg";
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  if (!KEY) throw new Error("TMDB_API_KEY missing. Copy .env.local.example to .env.local and add your key.");
  const res = await fetch(`${API}${url}${url.includes("?") ? "&" : "?"}language=en-US`, {
    ...init,
    headers: { Authorization: `Bearer ${KEY}`, accept: "application/json" },
    next: { revalidate: 60 * 10 },
  });
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
}

export const TMDB = {
  trending: () => api(`/trending/movie/week`),
  search: (q: string, page = 1) => api(`/search/movie?query=${encodeURIComponent(q)}&page=${page}&include_adult=false`),
  movie: (id: string | number) => api(`/movie/${id}`),
};
