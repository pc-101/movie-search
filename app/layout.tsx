import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import SearchBar from "@/components/search-bar";

export const metadata: Metadata = {
  title: "Movie Search",
  description: "Discover and save your favorite movies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
            <div className="container-hero flex h-14 items-center justify-between gap-3">
              <Link href="/" className="font-semibold tracking-tight">🎬 MovieSearch</Link>
              <div className="flex flex-1 items-center justify-end gap-3">
                <SearchBar />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="container-hero py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
