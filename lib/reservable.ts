import type { CatalogSession } from "./catalog";

// 2026 rule (verified via the AWS FSI Attendee Guide email + guide):
// reserved seating is ONLY for interactive sessions. Keynotes and
// lecture-style breakouts are walk-up — no reservation needed.
const RESERVABLE_TYPES = new Set([
  "workshop",
  "chalk talk",
  "code talk",
  "lab",
  "builders' session",
  "builders session",
  "bootcamp",
  "technical session",
  "exam prep",
  "gamified learning",
  "hands-on",
]);

export function isReservable(session: CatalogSession): boolean {
  return RESERVABLE_TYPES.has(session.type.trim().toLowerCase());
}

export type Urgency = "first" | "second" | "none";

/** Booking urgency tier: hands-on formats fill first. */
export function urgencyOf(session: CatalogSession): Urgency {
  const t = session.type.trim().toLowerCase();
  if (
    t === "workshop" ||
    t === "lab" ||
    t === "builders' session" ||
    t === "builders session" ||
    t === "bootcamp" ||
    t === "hands-on"
  ) {
    return "first";
  }
  if (isReservable(session)) return "second";
  return "none";
}
