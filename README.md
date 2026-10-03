# re:Invent 2026 booking helper

A small Next.js app that helps any AWS re:Invent 2026 attendee go from
"what should I attend?" to "seats reserved":

1. **Profile** (`/onboarding`) — pick a role, industry/company domain, and up
   to 6 interest topics. Stored in the browser only.
2. **Top 30** (`/suggest`) — the app scores its session catalog against the
   profile and groups the top 30 into five daily learning themes (Mon–Fri).
3. **Reserve run** (`/booking`) — favorites split into reservable vs. walk-up,
   with a guided step-by-step mode, urgency tiers, and deep links into the
   official portal for Oct 6.

## The honest AWS limitation

AWS provides **no sign-in API and no booking API** for re:Invent. This app
therefore has no login, never asks for a password or Builder ID, and cannot
reserve seats itself. Every Reserve action opens the official session catalog
(`registration.awsevents.com`), where the attendee signs in with their AWS
Builder login in their own browser and completes the reservation.

## Session data

`data/catalog.json` holds 126 sessions: 49 with day/time/venue verified from
the official catalog (Oct 1–2, 2026), plus AWS FSI Attendee Guide picks whose
day/times the guide doesn't publish (marked TBD — verify in the catalog).
Topic tags are derived from titles/abstracts via keyword matching. The full
re:Invent 2026 catalog holds 2,000+ sessions; anything not in the app can be
added by session code on the Favorites page.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Designed for Vercel: `vercel.json` sets the Next.js framework preset.
Pushing to the connected GitHub repo auto-deploys.
