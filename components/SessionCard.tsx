"use client";

import { DAY_LABELS, catalogUrl, type CatalogSession } from "@/lib/catalog";
import { isReservable, urgencyOf } from "@/lib/reservable";

const typeStyles: Record<string, string> = {
  workshop: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "builders' session": "bg-orange-500/15 text-orange-300 border-orange-500/30",
  lab: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "chalk talk": "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "code talk": "bg-sky-500/15 text-sky-300 border-sky-500/30",
  breakout: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  keynote: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "lightning talk": "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

export function whenLabel(s: CatalogSession): string {
  if (s.day && s.time) {
    const day = DAY_LABELS[s.day] ?? s.day;
    return `${day}, ${s.time}${s.venue ? ` · ${s.venue}` : ""} · PT`;
  }
  return "Day/time TBD — verify in the official catalog";
}

export default function SessionCard({
  session,
  reasons,
  action,
}: {
  session: CatalogSession;
  reasons?: string[];
  action?: React.ReactNode;
}) {
  const urgency = urgencyOf(session);
  const reserve = isReservable(session);
  const t = session.type.toLowerCase();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm font-bold text-amber-300">{session.code}</span>
        <span
          className={`rounded-full border px-2 py-0.5 text-xs ${
            typeStyles[t] ?? "bg-slate-500/15 text-slate-300 border-slate-500/30"
          }`}
        >
          {session.type}
          {session.level ? ` ${session.level}` : ""}
        </span>
        {session.fsi && (
          <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
            FSI recommended
          </span>
        )}
        {urgency === "first" && (
          <span className="rounded-full border border-red-500/40 bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-300">
            Book first (fills fast)
          </span>
        )}
        {urgency === "second" && (
          <span className="rounded-full border border-yellow-500/40 bg-yellow-500/15 px-2 py-0.5 text-xs font-medium text-yellow-300">
            Book second
          </span>
        )}
        {urgency === "none" && (
          <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
            No reservation needed — walk up
          </span>
        )}
      </div>
      <h3 className="mt-2 font-semibold text-white">{session.title}</h3>
      <p className="mt-1 text-sm text-slate-400">{whenLabel(session)}</p>
      {session.abstract && <p className="mt-1 text-sm text-slate-500">{session.abstract}</p>}
      {reasons && reasons.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {reasons.map((r) => (
            <li key={r} className="text-xs text-emerald-300/90">
              ✓ {r}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={catalogUrl(session.code)}
          target="_blank"
          rel="noopener noreferrer"
          className={
            reserve
              ? "rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
              : "rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
          }
        >
          {reserve ? "Reserve in official portal" : "View in catalog"}
        </a>
        {action}
      </div>
    </div>
  );
}
