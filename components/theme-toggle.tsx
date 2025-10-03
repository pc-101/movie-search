"use client";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === "dark", [resolvedTheme]);
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
    >
      <span>{isDark ? "☀️" : "🌙"}</span>
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
