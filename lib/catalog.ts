import catalogJson from "@/data/catalog.json";

// One entry in the app's session catalog. Fields come from verified sources:
// day/time/venue are present only when confirmed in the official catalog or the
// AWS FSI Attendee Guide follow-ups; otherwise they are null ("TBD").
// tags are derived from title+abstract via keyword matching (see build script).
export interface CatalogSession {
  code: string;
  title: string;
  type: string; // "Workshop" | "Chalk talk" | "Breakout" | ...
  level: string | null;
  day: string | null; // ISO date "2026-11-30" or null
  time: string | null; // "8:00 AM" PT start, or null
  venue: string | null;
  abstract: string | null;
  tags: string[];
  fsi: boolean; // recommended by the AWS FSI Attendee Guide
  repeatOf: string | null; // base code for -R repeat instances
}

export const CATALOG: CatalogSession[] = catalogJson as CatalogSession[];

const byCode = new Map<string, CatalogSession>(CATALOG.map((s) => [s.code.toUpperCase(), s]));

export function getSession(code: string): CatalogSession | undefined {
  return byCode.get(code.trim().toUpperCase());
}

/** Base code for dedupe: "SVS303-R1" -> "SVS303". */
export function baseCode(code: string): string {
  const s = byCode.get(code.trim().toUpperCase());
  return s?.repeatOf ?? code.trim().toUpperCase();
}

// Official re:Invent 2026 session catalog (browsable without sign-in).
// Reservations are completed here — AWS has no public booking API, so every
// Reserve action hands off to this portal.
const CATALOG_BASE =
  "https://registration.awsevents.com/flow/awsevents/reinvent2026/eventcatalog/page/eventcatalog";

export function catalogUrl(code: string): string {
  return `${CATALOG_BASE}?search=${encodeURIComponent(code)}`;
}

export const CATALOG_HOME = CATALOG_BASE;

// Reserved-seating waves, Tuesday Oct 6, 2026.
// 11 AM / 7 PM CT == 9 AM / 5 PM PT.
export const WAVE_1_ISO = "2026-10-06T09:00:00-07:00";
export const WAVE_2_ISO = "2026-10-06T17:00:00-07:00";
export const WAVE_1_LABEL = "Wave 1 — Tue Oct 6, 11:00 AM CT (9:00 AM PT)";
export const WAVE_2_LABEL = "Wave 2 — Tue Oct 6, 7:00 PM CT (5:00 PM PT)";

export const CONFERENCE_LABEL = "AWS re:Invent 2026 — Nov 30 – Dec 4, Las Vegas";

export const DAY_LABELS: Record<string, string> = {
  "2026-11-30": "Monday, Nov 30",
  "2026-12-01": "Tuesday, Dec 1",
  "2026-12-02": "Wednesday, Dec 2",
  "2026-12-03": "Thursday, Dec 3",
  "2026-12-04": "Friday, Dec 4",
};

export const CONFERENCE_DAYS = Object.keys(DAY_LABELS).sort();
