# re:Invent 2026 booking companion

A small Next.js app that turns a personal AWS re:Invent 2026 shortlist into an actionable
booking plan: the day-by-day itinerary, FSI guide picks filtered by interest, and an
Oct 6 reserved-seating checklist with deep links into the official session catalog.

**Conference:** AWS re:Invent 2026, Las Vegas, Mon Nov 30 – Fri Dec 4, 2026 (all times PT).
**Reserved seating opens:** Tue Oct 6, 2026, in two waves — 11:00 AM and 7:00 PM CT
(9:00 AM / 5:00 PM PT). Only interactive sessions take reservations; keynotes and
lecture-style breakouts are walk-up in 2026.

## Pages

- `/` — Home: hero, countdowns to both Oct 6 waves, quick stats, daily learning themes.
- `/favorites` — "My sessions": the catalog-verified itinerary grouped by day (primary + backup per slot), plus FSI picks you saved from the suggestions page.
- `/suggest` — "Suggested for you": 20 picks from the AWS FSI Attendee Guide filtered by interest chips (legacy modernization, AI dev / Kiro, FinOps / cost, open source, serverless, AI agents). Add to favorites persists in the browser (localStorage).
- `/booking` — "Oct 6 booking checklist": urgency tiers (Book first / Book second / No reservation needed), both wave countdowns, and Reserve links for every interactive session.

## Data sources

Session data lives in `data/sessions.ts` and comes from research notes, not the live
catalog: 26 catalog-verified sessions with day/time/venue, plus 20 AWS FSI Attendee Guide
picks. The FSI guide publishes no day/times, so those picks are honestly marked
"day/time TBD — verify in catalog". No session data was invented.

## The honest AWS Builder login note

AWS has no public booking API. Reservations can only be made on the official re:Invent
portal, signed in with an AWS Builder login. This app never asks for credentials — every
"Reserve" button is a deep link into the official session catalog
(`registration.awsevents.com/.../eventcatalog?search=<SESSION_CODE>`), which hands you
off to the official flow at exactly the right session.

## Run locally

Requires Node 18.17+ (tested with Node 24).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploy to Vercel

The repo ships with `vercel.json` (`{"framework":"nextjs"}`) — Vercel auto-detects the
Next.js app, so importing the GitHub repo into Vercel deploys it with no extra config:

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo.
3. Accept the defaults (Framework preset: Next.js) and deploy.

## Tech

Next.js 14 (App Router) + TypeScript + Tailwind CSS. No backend, no auth, no database.
Favorites are browser-local (localStorage).
