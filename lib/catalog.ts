// Official re:Invent 2026 session catalog. Reservations are completed here —
// AWS has no public booking API, so every Reserve action hands off to this portal.
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
