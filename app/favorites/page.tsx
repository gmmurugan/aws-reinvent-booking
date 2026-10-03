"use client";

import SessionCard from "@/components/SessionCard";
import { dayPlans, fsiPicks, type ThemeDay } from "@/data/sessions";
import { useFavorites } from "@/lib/favorites";

const dayOrder: ThemeDay[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function FavoritesPage() {
  const { added, toggle } = useFavorites();
  const addedPicks = fsiPicks.filter((p) => added.includes(p.code));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">My sessions</h1>
        <p className="mt-1 text-slate-400">
          Your catalog-verified itinerary — primary + backup per slot. All times PT.
        </p>
      </div>

      {dayPlans.map((day) => (
        <section key={day.day} className="space-y-3">
          <div className="border-l-2 border-amber-500 pl-3">
            <h2 className="text-lg font-semibold text-white">
              {day.day} <span className="text-sm font-normal text-slate-400">· {day.date}</span>
            </h2>
            <p className="text-sm text-amber-300">{day.theme}</p>
          </div>
          {day.slots.map((slot, i) =>
            slot.label ? (
              <p key={i} className="rounded-xl border border-dashed border-slate-700 p-3 text-sm text-slate-400">
                <span className="font-medium text-slate-300">{slot.time}:</span> {slot.label}
              </p>
            ) : (
              <div key={i} className="grid gap-3 md:grid-cols-2">
                {slot.primary && <SessionCard entry={slot.primary} badge={`${slot.time} · Primary`} />}
                {slot.backup && <SessionCard entry={slot.backup} badge={`${slot.time} · Backup`} />}
              </div>
            )
          )}
        </section>
      ))}

      {addedPicks.length > 0 && (
        <section className="space-y-3">
          <div className="border-l-2 border-emerald-500 pl-3">
            <h2 className="text-lg font-semibold text-white">Added from suggestions</h2>
            <p className="text-sm text-slate-400">
              FSI guide picks you saved. Day/time TBD — verify in the catalog before Oct 6.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {dayOrder.map((day) =>
              addedPicks
                .filter((p) => p.themeDay === day)
                .map((p) => (
                  <SessionCard
                    key={p.code}
                    entry={{
                      code: p.code,
                      title: p.title,
                      type: p.type,
                      time: "Day/time TBD — verify in catalog",
                      fsi: true,
                    }}
                    badge={`${day} theme`}
                    action={
                      <button
                        onClick={() => toggle(p.code)}
                        className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
                      >
                        Remove
                      </button>
                    }
                  />
                ))
            )}
          </div>
        </section>
      )}
    </div>
  );
}
