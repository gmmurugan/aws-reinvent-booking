"use client";

import { useState } from "react";
import Link from "next/link";
import SessionCard from "@/components/SessionCard";
import { CATALOG, getSession } from "@/lib/catalog";
import { useFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const { added, toggle } = useFavorites();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const sessions = added
    .map((c) => getSession(c))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const addByCode = () => {
    const clean = code.trim().toUpperCase();
    setError(null);
    if (!clean) return;
    const found = getSession(clean);
    if (!found) {
      setError(
        `“${clean}” isn't in this app's catalog of ${CATALOG.length} verified sessions. ` +
          "Double-check the code, or find it in the official catalog and favorite it there."
      );
      return;
    }
    if (!added.includes(found.code)) toggle(found.code);
    setCode("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Your favorites</h1>
          <p className="mt-1 text-sm text-slate-400">
            Saved in this browser only. {sessions.length} session
            {sessions.length === 1 ? "" : "s"} saved.
          </p>
        </div>
        <Link
          href="/booking"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
        >
          Go to reserve run →
        </Link>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Add by session code
        </label>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addByCode()}
            placeholder="e.g. SVS303-R1"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-sm text-white placeholder:text-slate-600"
          />
          <button
            onClick={addByCode}
            className="shrink-0 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
          >
            Add
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
          <p className="text-slate-400">No favorites yet.</p>
          <Link href="/suggest" className="mt-2 inline-block text-sm font-medium text-amber-400 hover:text-amber-300">
            Get your top 30 →
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {sessions.map((s) => (
            <SessionCard
              key={s.code}
              session={s}
              action={
                <button
                  onClick={() => toggle(s.code)}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Remove
                </button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
