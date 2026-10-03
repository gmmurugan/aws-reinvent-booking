import Link from "next/link";
import Countdown from "@/components/Countdown";
import {
  CATALOG,
  CATALOG_HOME,
  CONFERENCE_LABEL,
  WAVE_1_ISO,
  WAVE_1_LABEL,
  WAVE_2_ISO,
  WAVE_2_LABEL,
} from "@/lib/catalog";

const steps = [
  {
    n: "1",
    title: "Tell us your profile",
    text: "Pick your role, industry, and up to 6 interest topics. Nothing sensitive — no passwords, no AWS login. Your profile stays in your browser.",
    href: "/onboarding",
    cta: "Set up profile",
  },
  {
    n: "2",
    title: "Get your top 30",
    text: "We score our verified session catalog against your profile and group the top 30 into five daily learning themes, Mon–Fri.",
    href: "/suggest",
    cta: "See how it works",
  },
  {
    n: "3",
    title: "Run your reserve checklist",
    text: "Favorite the sessions you want, then walk the reserve run on Oct 6: one guided list, deep links into the official portal, progress tracking.",
    href: "/booking",
    cta: "Open reserve run",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="pt-4">
        <p className="text-sm font-medium text-amber-400">{CONFERENCE_LABEL}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your re:Invent reservation game plan
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          A booking helper for any re:Invent attendee. Build a profile, get 30
          sessions matched to it with a theme for each day, then reserve your
          seats with a guided checklist when booking opens.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/onboarding"
            className="rounded-lg bg-amber-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-amber-400"
          >
            Start with your profile
          </Link>
          <a
            href={CATALOG_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-slate-200 hover:bg-slate-800"
          >
            Browse the official catalog
          </a>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15 font-bold text-amber-300">
              {s.n}
            </p>
            <h2 className="mt-3 font-semibold text-white">{s.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{s.text}</p>
            <Link href={s.href} className="mt-3 inline-block text-sm font-medium text-amber-400 hover:text-amber-300">
              {s.cta} →
            </Link>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Reserved seating opens Oct 6</h2>
        <p className="mt-1 text-sm text-slate-400">
          Two waves. Only interactive sessions (workshops, labs, builders&apos;
          sessions, chalk talks, code talks…) need reservations — keynotes and
          lecture breakouts are walk-up.
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Countdown targetIso={WAVE_1_ISO} label={WAVE_1_LABEL} />
          <Countdown targetIso={WAVE_2_ISO} label={WAVE_2_LABEL} />
        </div>
      </section>

      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
        <h2 className="font-semibold text-white">Honest notes</h2>
        <p>
          <span className="font-medium text-slate-200">No AWS login here.</span>{" "}
          AWS provides no sign-in or booking API for re:Invent, so this app
          never asks for your password or Builder ID. Reservations are always
          completed by you on the official portal — you sign in there with your
          AWS Builder login in your own browser.
        </p>
        <p>
          <span className="font-medium text-slate-200">Catalog coverage.</span>{" "}
          This app ships with {CATALOG.length} verified sessions (codes, titles,
          types, and day/times confirmed from the official catalog or the AWS
          FSI Attendee Guide). The full re:Invent 2026 catalog holds 2,000+
          sessions and keeps growing — anything not listed here can be added by
          session code on the Favorites page, or browsed at the official
          catalog link above.
        </p>
      </section>
    </div>
  );
}
