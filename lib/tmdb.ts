// lib/tmdb.ts

const API = process.env.TMDB_API_BASE || "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY;
const IMG = process.env.TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p";

export function imageUrl(
  path: string | null,
  size: "w200" | "w300" | "w500" | "original" = "w500"
) {
  return path ? `${IMG}/${size}${path}` : "/placeholder.svg";
}

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  if (!KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[TMDB] Missing TMDB_API_KEY in .env.local. Copy .env.local.example and add your Bearer token."
      );
    }
    // Return empty object to avoid crashing builds or pages
    return {} as T;
  }

  const endpoint = `${API}${url}${url.includes("?") ? "&" : "?"}language=en-US`;
  const res = await fetch(endpoint, {
    ...init,
    headers: {
      Authorization: `Bearer ${KEY}`,
      accept: "application/json",
    },
    next: { revalidate: 600 }, // cache for 10 minutes
  });

  if (!res.ok) {
    console.error(`[TMDB] Request failed ${res.status} ${res.statusText}`);
    throw new Error(`TMDB error ${res.status}`);
  }

  return res.json();
}

export const TMDB = {
  trending: () => api(`/trending/movie/week`),
  search: (q: string, page = 1) =>
    api(`/search/movie?query=${encodeURIComponent(q)}&page=${page}&include_adult=false`),
  movie: (id: string | number) => api(`/movie/${id}`),
};