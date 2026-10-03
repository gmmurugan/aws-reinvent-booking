"use client";

import { catalogUrl } from "@/lib/catalog";
import { isInteractive, urgencyOf, type SessionEntry } from "@/data/sessions";

const typeStyles: Record<string, string> = {
  Workshop: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "Builders' session": "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Lab: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  "Chalk talk": "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "Code talk": "bg-sky-500/15 text-sky-300 border-sky-500/30",
  Breakout: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Keynote: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  "Lightning talk": "bg-slate-500/15 text-slate-300 border-slate-500/30",
  Event: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export default function SessionCard({
  entry,
  badge,
  action,
}: {
  entry: SessionEntry;
  /** e.g. "Primary" / "Backup" */
  badge?: string;
  /** optional right-side action (e.g. add/remove favorite button) */
  action?: React.ReactNode;
}) {
  const urgency = urgencyOf(entry.type);
  const reserve = isInteractive(entry.type);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-sm font-bold text-amber-300">{entry.code}</span>
        <span
          className={`rounded-full border px-2 py-0.5 text-xs ${typeStyles[entry.type] ?? "bg-slate-500/15 text-slate-300 border-slate-500/30"}`}
        >
          {entry.type}
          {entry.level ? ` ${entry.level}` : ""}
        </span>
        {badge && (
          <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-200">{badge}</span>
        )}
        {entry.fsi && (
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
        {urgency === "none" && entry.type !== "Keynote" && entry.type !== "Event" && (
          <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
            No reservation needed — walk up
          </span>
        )}
      </div>
      <h3 className="mt-2 font-semibold text-white">{entry.title}</h3>
      <p className="mt-1 text-sm text-slate-400">
        {entry.time}
        {entry.venue ? ` · ${entry.venue}` : ""} · all times PT
      </p>
      {entry.note && <p className="mt-1 text-sm text-slate-500">{entry.note}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {reserve ? (
          <a
            href={catalogUrl(entry.code)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            Reserve in official portal
          </a>
        ) : (
          entry.type !== "Event" && (
            <a
              href={catalogUrl(entry.code)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
            >
              View in catalog
            </a>
          )
        )}
        {action}
      </div>
    </div>
  );
}
