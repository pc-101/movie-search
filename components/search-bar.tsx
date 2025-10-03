"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar({ placeholder = "Search movies…" }: { placeholder?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");

  useEffect(() => setQ(params.get("q") ?? ""), [params]);

  return (
    <form role="search" className="relative w-full max-w-md"
      onSubmit={(e) => { e.preventDefault(); router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/"); }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border bg-white/90 px-4 py-2 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-900"
      />
      <button className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5">
        Go
      </button>
    </form>
  );
}
