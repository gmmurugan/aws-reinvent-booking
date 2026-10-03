"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SessionCard from "@/components/SessionCard";
import { loadProfile, type Profile } from "@/lib/profile";
import { groupByDay, scoreCatalog } from "@/lib/suggest";
import { useFavorites } from "@/lib/favorites";

export default function SuggestPage() {
  const router = useRouter();
  const { has, toggle, addMany } = useFavorites();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    if (!p) {
      router.replace("/onboarding");
      return;
    }
    setProfile(p);
    setReady(true);
  }, [router]);

  const groups = useMemo(
    () => (profile ? groupByDay(scoreCatalog(profile)) : []),
    [profile]
  );
  const allCodes = useMemo(
    () => groups.flatMap((g) => g.sessions.map((s) => s.session.code)),
    [groups]
  );

  if (!ready) {
    return <p className="text-slate-400">Loading your profile…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Your top 30 sessions</h1>
          <p className="mt-1 text-sm text-slate-400">
            For a {profile?.role} in {profile?.industry} · interests:{" "}
            {profile?.interests.join(", ")}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/onboarding"
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
          >
            Edit profile
          </Link>
          <button
            onClick={() => addMany(allCodes)}
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
          >
            Add all 30 to favorites
          </button>
        </div>
      </div>

      {groups.map((g) => (
        <section key={g.day ?? "tbd"} className="space-y-3">
          <div className="border-b border-slate-800 pb-2">
            <h2 className="text-lg font-semibold text-white">{g.label}</h2>
            <p className="text-sm text-amber-400/90">Theme: {g.theme}</p>
          </div>
          <div className="grid gap-3">
            {g.sessions.map(({ session, reasons }) => (
              <SessionCard
                key={session.code}
                session={session}
                reasons={reasons}
                action={
                  <button
                    onClick={() => toggle(session.code)}
                    className={`rounded-lg border px-3 py-1.5 text-sm ${
                      has(session.code)
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                        : "border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {has(session.code) ? "★ Favorited" : "☆ Add to favorites"}
                  </button>
                }
              />
            ))}
          </div>
        </section>
      ))}

      <p className="text-xs text-slate-500">
        Sessions marked “Day/time TBD” come from the AWS FSI Attendee Guide,
        which doesn&apos;t publish schedules — verify them in the official
        catalog before Oct 6.
      </p>
    </div>
  );
}
