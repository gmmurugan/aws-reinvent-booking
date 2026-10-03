"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return { days, hours, mins, secs };
}

export default function Countdown({ targetIso, label }: { targetIso: string; label: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = new Date(targetIso).getTime();

  if (now === null) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold text-slate-200">—</p>
      </div>
    );
  }

  const diff = target - now;
  const { days, hours, mins, secs } = parts(diff);
  const live = diff <= 0;

  return (
    <div className="rounded-xl border border-amber-500/30 bg-slate-900 p-4">
      <p className="text-sm font-medium text-amber-300">{label}</p>
      {live ? (
        <p className="mt-1 text-2xl font-bold text-amber-300">Wave is live — reserve now</p>
      ) : (
        <p className="mt-1 text-2xl font-bold tabular-nums text-white">
          {days}d : {String(hours).padStart(2, "0")}h : {String(mins).padStart(2, "0")}m :{" "}
          {String(secs).padStart(2, "0")}s
        </p>
      )}
    </div>
  );
}
