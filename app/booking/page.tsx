import Countdown from "@/components/Countdown";
import {
  WAVE_1_ISO,
  WAVE_1_LABEL,
  WAVE_2_ISO,
  WAVE_2_LABEL,
  CATALOG_HOME,
  catalogUrl,
} from "@/lib/catalog";
import {
  dayPlans,
  fsiPicks,
  isInteractive,
  urgencyOf,
  type SessionEntry,
  type SessionType,
} from "@/data/sessions";

interface BookingEntry {
  code: string;
  title: string;
  type: SessionType;
  when: string;
  repeats?: string;
}

// DVT305-R1 is an alternate at the Tue 3 PM slot (report-sourced), not a card elsewhere.
const extraEntries: (SessionEntry & { day: string; date: string })[] = [
  {
    code: "DVT305-R1",
    title: "Modernize your CI/CD pipeline with AWS",
    type: "Workshop",
    level: "300",
    time: "3:00 PM",
    venue: "MGM Grand",
    note: "Repeat of Mon 12:00 PM CI/CD workshop.",
    day: "Tuesday",
    date: "Dec 1",
  },
];

function collect(): BookingEntry[] {
  const byCode = new Map<string, { first: BookingEntry; repeats: string[] }>();
  const add = (e: SessionEntry, day: string, date: string) => {
    const when = `${day} ${date}, ${e.time}${e.venue ? ` · ${e.venue}` : ""}`;
    const existing = byCode.get(e.code);
    if (existing) {
      existing.repeats.push(when);
    } else {
      byCode.set(e.code, {
        first: { code: e.code, title: e.title, type: e.type, when },
        repeats: [],
      });
    }
  };
  for (const d of dayPlans) {
    for (const s of d.slots) {
      if (s.primary) add(s.primary, d.day, d.date);
      if (s.backup) add(s.backup, d.day, d.date);
    }
  }
  for (const e of extraEntries) add(e, e.day, e.date);
  return Array.from(byCode.values()).map(({ first, repeats }) => ({
    ...first,
    repeats: repeats.length ? `Also: ${repeats.join("; ")}` : undefined,
  }));
}

const entries = collect();
const first = entries.filter((e) => urgencyOf(e.type) === "first");
const second = entries.filter((e) => urgencyOf(e.type) === "second");
const walkup = entries.filter((e) => urgencyOf(e.type) === "none" && e.type !== "Event");
const fsiInteractive = fsiPicks.filter((p) => isInteractive(p.type));

function TierList({ items }: { items: BookingEntry[] }) {
  return (
    <ul className="space-y-2">
      {items.map((e) => (
        <li key={e.code} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-sm font-bold text-amber-300">{e.code}</span>
              <span className="ml-2 text-sm text-slate-400">{e.type}</span>
              <p className="mt-0.5 text-sm font-medium text-white">{e.title}</p>
              <p className="text-xs text-slate-500">{e.when}</p>
              {e.repeats && <p className="text-xs text-slate-500">{e.repeats}</p>}
            </div>
            <a
              href={catalogUrl(e.code)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
            >
              Reserve
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function BookingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Oct 6 booking checklist</h1>
        <p className="mt-1 text-slate-400">Reserved seating opens Tue Oct 6 in two waves.</p>
      </div>

      <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
        <p className="font-semibold text-amber-200">How booking works</p>
        <p className="mt-1">
          Reservations are completed on the official re:Invent portal — sign in with your AWS
          Builder login, then use the Reserve links below. AWS has no public booking API, so
          this app prepares everything and hands you off to the official flow.
        </p>
        <a
          href={CATALOG_HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block rounded-lg bg-amber-500 px-3 py-1.5 font-semibold text-slate-950 hover:bg-amber-400"
        >
          Open the official session catalog
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Countdown targetIso={WAVE_1_ISO} label={WAVE_1_LABEL} />
        <Countdown targetIso={WAVE_2_ISO} label={WAVE_2_LABEL} />
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-red-300">
            Book first — interactive hands-on <span className="text-sm font-normal text-slate-400">({first.length})</span>
          </h2>
          <p className="text-sm text-slate-400">
            Workshops, labs, and builders&apos; sessions fill fastest. Hit these at Wave 1.
          </p>
        </div>
        <TierList items={first} />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-yellow-300">
            Book second — chalk talks &amp; code talks <span className="text-sm font-normal text-slate-400">({second.length})</span>
          </h2>
          <p className="text-sm text-slate-400">
            Interactive discussions and live coding. Wave 1 if you have time, otherwise Wave 2.
          </p>
        </div>
        <TierList items={second} />
      </section>

      {fsiInteractive.length > 0 && (
        <section className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-emerald-300">
              FSI picks needing reservation — day/time TBD <span className="text-sm font-normal text-slate-400">({fsiInteractive.length})</span>
            </h2>
            <p className="text-sm text-slate-400">
              The FSI guide publishes no day/times. Verify each in the catalog first, then add it
              to your wave plan.
            </p>
          </div>
          <ul className="space-y-2">
            {fsiInteractive.map((p) => (
              <li key={p.code} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-sm font-bold text-amber-300">{p.code}</span>
                    <span className="ml-2 text-sm text-slate-400">
                      {p.type} · {p.themeDay} theme · day/time TBD
                    </span>
                    <p className="mt-0.5 text-sm font-medium text-white">{p.title}</p>
                  </div>
                  <a
                    href={catalogUrl(p.code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-amber-400"
                  >
                    Reserve
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-200">
            No reservation needed <span className="text-sm font-normal text-slate-400">({walkup.length})</span>
          </h2>
          <p className="text-sm text-slate-400">
            Keynotes and lecture-style breakouts are walk-up in 2026 — no seats to reserve. Arrive
            20–30 min early.
          </p>
        </div>
        <ul className="space-y-2">
          {walkup.map((e) => (
            <li key={e.code} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="font-mono text-sm font-bold text-slate-300">{e.code}</span>
              <span className="ml-2 text-sm text-slate-500">{e.type}</span>
              <p className="mt-0.5 text-sm text-slate-200">{e.title}</p>
              <p className="text-xs text-slate-500">{e.when}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
