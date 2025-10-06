import { NextRequest } from "next/server";
import { TMDB } from "@/lib/tmdb";
import type { Movie, Paged } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const pageParam = searchParams.get("page") || "1";
  const page = Number.parseInt(pageParam, 10);

  if (!q) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const safePage = Number.isFinite(page) && page > 0 ? page : 1;

  try {
    const data = (await TMDB.search(q, safePage)) as Paged<Movie>;
    return Response.json(data);
  } catch (error) {
    console.error("[API] search failed", error);
    return Response.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
