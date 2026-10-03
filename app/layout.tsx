import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { FavoritesProvider } from "@/lib/favorites";

export const metadata: Metadata = {
  title: "re:Invent 2026 booking",
  description: "Session shortlist, FSI picks, and the Oct 6 reservation plan for AWS re:Invent 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <FavoritesProvider>
          <Nav />
          <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
