"use client";

import { useMemo, useState } from "react";
import SessionCard from "@/components/SessionCard";
import { allItineraryEntries, fsiPicks, type Interest } from "@/data/sessions";
import { useFavorites } from "@/lib/favorites";

const chips: Interest[] = [
  "Legacy modernization",
  "AI dev / Kiro",
  "FinOps / cost",
  "Open source",
  "Serverless",
  "AI agents",
];

export default function SuggestPage() {
  const [selected, setSelected] = useState<Interest[]>([]);
  const { has, toggle } = useFavorites();

  const toggleChip = (chip: Interest) =>
    setSelected((s) => (s.includes(chip) ? s.filter((c) => c !== chip) : [...s, chip]));

  const picks = useMemo(
    () =>
      selected.length === 0
        ? fsiPicks
        : fsiPicks.filter((p) => p.interests.some((i) => selected.includes(i))),
    [selected]
  );

  const itineraryMatches = useMemo(
    () =>
      selected.length === 0
        ? []
        : allItineraryEntries().filter(
            (e) =>
              e.interests?.some((i) => selected.includes(i)) &&
              !fsiPicks.some((p) => p.code === e.code)
          ),
    [selected]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Suggested for you</h1>
        <p className="mt-1 text-slate-400">
          20 picks from the AWS FSI Attendee Guide, matched to your learning themes. Tap an
          interest to filter — add what fits to your favorites.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => toggleChip(chip)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              selected.includes(chip)
                ? "border-amber-500 bg-amber-500/20 text-amber-200"
                : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
            }`}
          >
            {chip}
          </button>
        ))}
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="rounded-full px-4 py-1.5 text-sm text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-white">
          FSI guide picks <span className="text-sm font-normal text-slate-400">({picks.length})</span>
        </h2>
        {picks.length === 0 && (
          <p className="text-sm text-slate-400">No picks match those interests yet — try another combination.</p>
        )}
        <div className="grid gap-3 md:grid-cols-2">
          {picks.map((p) => (
            <div key={p.code} className="space-y-2">
              <SessionCard
                entry={{
                  code: p.code,
                  title: p.title,
                  type: p.type,
                  time: "Day/time TBD — verify in catalog",
                  fsi: true,
                  note: p.why,
                }}
                badge={`${p.themeDay} theme`}
                action={
                  <button
                    onClick={() => toggle(p.code)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                      has(p.code)
                        ? "border border-emerald-500/50 bg-emerald-500/15 text-emerald-200"
                        : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {has(p.code) ? "✓ In favorites" : "Add to favorites"}
                  </button>
                }
              />
            </div>
          ))}
        </div>
      </section>

      {itineraryMatches.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Already in your itinerary <span className="text-sm font-normal text-slate-400">({itineraryMatches.length})</span>
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {itineraryMatches.map((e) => (
              <SessionCard key={`${e.code}-${e.time}`} entry={e} badge="In itinerary" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
