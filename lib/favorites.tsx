"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

// Favorites = FSI picks (or any session code) the user added from /suggest.
// The itinerary sessions are pre-seeded favorites shown on /favorites; this store
// tracks additions so they persist in the browser only (no backend).
const STORAGE_KEY = "reinvent-booking-favorites-v1";

interface FavoritesCtx {
  added: string[];
  toggle: (code: string) => void;
  has: (code: string) => boolean;
}

const Ctx = createContext<FavoritesCtx>({ added: [], toggle: () => {}, has: () => false });

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [added, setAdded] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAdded(JSON.parse(raw) as string[]);
    } catch {
      // private mode etc. — favorites just won't persist
    }
  }, []);

  const persist = (next: string[]) => {
    setAdded(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const toggle = useCallback(
    (code: string) => {
      persist(added.includes(code) ? added.filter((c) => c !== code) : [...added, code]);
    },
    [added]
  );

  const has = useCallback((code: string) => added.includes(code), [added]);

  return <Ctx.Provider value={{ added, toggle, has }}>{children}</Ctx.Provider>;
}

export function useFavorites(): FavoritesCtx {
  return useContext(Ctx);
}
