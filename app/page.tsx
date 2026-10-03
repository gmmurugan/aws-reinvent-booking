import Link from "next/link";
import Countdown from "@/components/Countdown";
import {
  WAVE_1_ISO,
  WAVE_1_LABEL,
  WAVE_2_ISO,
  WAVE_2_LABEL,
  CONFERENCE_LABEL,
} from "@/lib/catalog";
import { allItineraryEntries, distinctCodes, fsiPicks, isInteractive } from "@/data/sessions";

const interactiveToReserve = distinctCodes().filter((code) => {
  const e = allItineraryEntries().find((x) => x.code === code);
  return e && isInteractive(e.type);
}).length;

const cards = [
  {
    href: "/favorites",
    title: "My sessions",
    desc: "The full Mon–Fri itinerary: primary + backup per slot, with venues and times.",
  },
  {
    href: "/suggest",
    title: "Suggested for you",
    desc: "FSI guide picks filtered by your interests — legacy modernization, Kiro, FinOps, open source, serverless, agents.",
  },
  {
    href: "/booking",
    title: "Oct 6 booking checklist",
    desc: "Two reservation waves, urgency tiers, and Reserve links for every interactive session.",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-10">
        <p className="text-sm font-medium uppercase tracking-widest text-amber-400">{CONFERENCE_LABEL}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your re:Invent booking companion
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Your catalog-verified itinerary and the AWS FSI guide picks, with a plan for reserved
          seating on Oct 6. Reservations happen on the official re:Invent portal with your AWS
          Builder login — this app gets everything ready so booking takes minutes.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Countdown targetIso={WAVE_1_ISO} label={WAVE_1_LABEL} />
          <Countdown targetIso={WAVE_2_ISO} label={WAVE_2_LABEL} />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-3xl font-bold text-white">{allItineraryEntries().length}</p>
          <p className="mt-1 text-sm text-slate-400">itinerary slots saved</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-3xl font-bold text-white">{interactiveToReserve}</p>
          <p className="mt-1 text-sm text-slate-400">interactive sessions needing reservation</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-3xl font-bold text-white">{fsiPicks.length}</p>
          <p className="mt-1 text-sm text-slate-400">FSI guide picks to explore</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-3xl font-bold text-white">5</p>
          <p className="mt-1 text-sm text-slate-400">theme days, Mon–Fri</p>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-amber-500/50 hover:bg-slate-800"
          >
            <h2 className="font-semibold text-white">{c.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
            <p className="mt-3 text-sm font-medium text-amber-400">Open →</p>
          </Link>
        ))}
      </section>

      <section className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
        <h2 className="font-semibold text-white">Daily learning themes</h2>
        <ul className="mt-2 space-y-1">
          <li><span className="text-slate-200">Mon:</span> Legacy modernization foundations</li>
          <li><span className="text-slate-200">Tue:</span> AI-assisted development with Kiro</li>
          <li><span className="text-slate-200">Wed:</span> Open source &amp; AI agents</li>
          <li><span className="text-slate-200">Thu:</span> Serverless &amp; event-driven architectures</li>
          <li><span className="text-slate-200">Fri:</span> Cost optimization &amp; FinOps</li>
        </ul>
      </section>
    </div>
  );
}
