"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import SessionCard, { whenLabel } from "@/components/SessionCard";
import {
  WAVE_1_ISO,
  WAVE_1_LABEL,
  WAVE_2_ISO,
  WAVE_2_LABEL,
  catalogUrl,
  getSession,
} from "@/lib/catalog";
import { isReservable, urgencyOf, type Urgency } from "@/lib/reservable";
import { useFavorites } from "@/lib/favorites";

const RESERVED_KEY = "reinvent-booking-reserved-v1";

function loadReserved(): string[] {
  try {
    const raw = localStorage.getItem(RESERVED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export default function BookingPage() {
  const { added } = useFavorites();
  const [reserved, setReserved] = useState<string[]>([]);
  const [runIndex, setRunIndex] = useState<number | null>(null);

  useEffect(() => {
    setReserved(loadReserved());
  }, []);

  const persistReserved = (next: string[]) => {
    setReserved(next);
    try {
      localStorage.setItem(RESERVED_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const toggleReserved = (code: string) =>
    persistReserved(
      reserved.includes(code) ? reserved.filter((c) => c !== code) : [...reserved, code]
    );

  const sessions = useMemo(
    () =>
      added
        .map((c) => getSession(c))
        .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [added]
  );

  const reservable = useMemo(() => {
    const rank: Record<Urgency, number> = { first: 0, second: 1, none: 2 };
    return sessions
      .filter(isReservable)
      .sort((a, b) => rank[urgencyOf(a)] - rank[urgencyOf(b)]);
  }, [sessions]);

  const walkup = useMemo(() => sessions.filter((s) => !isReservable(s)), [sessions]);

  const done = reservable.filter((s) => reserved.includes(s.code)).length;
  const current = runIndex !== null ? reservable[runIndex] : null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
        <p className="font-semibold text-amber-200">How reserving works</p>
        <p className="mt-1">
          Reservations are completed on the official re:Invent portal — sign in
          there with your AWS Builder login in your own browser, then use the
          Reserve links below. This app never asks for your password; AWS
          provides no booking API.
        </p>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white">Reserve run — Oct 6</h1>
        <p className="mt-1 text-sm text-slate-400">
          {reservable.length} reservable session
          {reservable.length === 1 ? "" : "s"} · {walkup.length} walk-up ·{" "}
          {done} marked reserved
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Countdown targetIso={WAVE_1_ISO} label={WAVE_1_LABEL} />
        <Countdown targetIso={WAVE_2_ISO} label={WAVE_2_LABEL} />
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-center">
          <p className="text-slate-400">Your reserve run is empty.</p>
          <Link
            href="/suggest"
            className="mt-2 inline-block text-sm font-medium text-amber-400 hover:text-amber-300"
          >
            Get your top 30 and add favorites →
          </Link>
        </div>
      ) : (
        <>
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-white">
                Needs a reservation ({reservable.length})
              </h2>
              {reservable.length > 0 && (
                <button
                  onClick={() => setRunIndex(0)}
                  className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
                >
                  Start guided run
                </button>
              )}
            </div>

            {current && runIndex !== null && (
              <div className="rounded-xl border border-amber-500/40 bg-slate-900 p-5">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                  <span>
                    Step {runIndex + 1} of {reservable.length}
                  </span>
                  <button
                    onClick={() => setRunIndex(null)}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    Exit run
                  </button>
                </div>
                <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{ width: `${(done / Math.max(1, reservable.length)) * 100}%` }}
                  />
                </div>
                <p className="font-mono text-sm font-bold text-amber-300">{current.code}</p>
                <h3 className="mt-1 text-xl font-semibold text-white">{current.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{whenLabel(current)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={catalogUrl(current.code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
                  >
                    Open reserve page
                  </a>
                  <button
                    onClick={() => {
                      if (!reserved.includes(current.code)) toggleReserved(current.code);
                      setRunIndex(runIndex + 1 < reservable.length ? runIndex + 1 : null);
                    }}
                    className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20"
                  >
                    Mark reserved & next →
                  </button>
                  <button
                    onClick={() =>
                      setRunIndex(runIndex + 1 < reservable.length ? runIndex + 1 : null)
                    }
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-3">
              {reservable.map((s) => (
                <SessionCard
                  key={s.code}
                  session={s}
                  action={
                    <button
                      onClick={() => toggleReserved(s.code)}
                      className={`rounded-lg border px-3 py-1.5 text-sm ${
                        reserved.includes(s.code)
                          ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                          : "border-slate-700 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {reserved.includes(s.code) ? "✓ Reserved" : "Mark reserved"}
                    </button>
                  }
                />
              ))}
            </div>
          </section>

          {walkup.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">
                Walk-up — no reservation needed ({walkup.length})
              </h2>
              <p className="-mt-1 text-sm text-slate-500">
                Breakouts and keynotes: just show up (arrive early for popular ones).
              </p>
              <div className="grid gap-3">
                {walkup.map((s) => (
                  <SessionCard key={s.code} session={s} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
