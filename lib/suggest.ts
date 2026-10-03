import { CATALOG, CONFERENCE_DAYS, DAY_LABELS, baseCode, type CatalogSession } from "./catalog";
import { isReservable } from "./reservable";
import type { Industry, InterestTag, Profile, Role } from "./profile";

// Role -> topic affinities, strongest first. Used as a soft signal alongside
// the attendee's explicit interests.
const ROLE_WEIGHTS: Record<Role, InterestTag[]> = {
  "Frontend Engineer": ["Kiro & AI dev tools", "Generative AI", "Serverless", "AI agents"],
  "Backend Engineer": ["Serverless", "Containers & Kubernetes", "Databases", "Data engineering"],
  "Platform/DevOps Engineer": [
    "Containers & Kubernetes",
    "Legacy modernization",
    "Security & compliance",
    "Networking",
  ],
  "Data Engineer": ["Data engineering", "Databases", "Generative AI", "Storage"],
  "ML/AI Engineer": ["AI agents", "Generative AI", "Kiro & AI dev tools", "Data engineering"],
  "Security Engineer": [
    "Security & compliance",
    "Networking",
    "Databases",
    "FinOps & cost optimization",
  ],
  "Solutions Architect": [
    "Legacy modernization",
    "Serverless",
    "AI agents",
    "Containers & Kubernetes",
  ],
  "Engineering Manager": [
    "Kiro & AI dev tools",
    "AI agents",
    "FinOps & cost optimization",
    "Legacy modernization",
  ],
  "FinOps Practitioner": [
    "FinOps & cost optimization",
    "Containers & Kubernetes",
    "Serverless",
    "Storage",
  ],
  Other: [],
};

// Industry -> keyword hits in title+abstract (lowercase substrings).
const INDUSTRY_KEYWORDS: Record<Industry, string[]> = {
  "Financial Services": [
    "bank", "payment", "fintech", "insurance", "capital market", "trading",
    "finra", "kyc", "fraud", "underwrit", "wealth", "credit",
  ],
  "Healthcare & Life Sciences": ["healthcare", "life sciences", "hipaa", "clinical", "genomics"],
  "Retail & CPG": ["retail", "commerce", "cpg", "store"],
  "Media & Entertainment": ["media", "entertainment", "streaming", "broadcast"],
  "Public Sector": ["government", "public sector", "federal", "defense"],
  "SaaS & Technology": ["saas", "multi-tenant", "tenant"],
  "Manufacturing & Automotive": ["manufacturing", "automotive", "factory", "industrial"],
  "Travel & Hospitality": ["travel", "hospitality", "hotel", "airline"],
  Other: [],
};

const THEME_LABELS: Record<string, string> = {
  "Legacy modernization": "Legacy modernization foundations",
  "Kiro & AI dev tools": "AI-assisted development",
  "AI agents": "AI agents in production",
  "Open source": "Open source on AWS",
  "Serverless": "Serverless & event-driven architectures",
  "FinOps & cost optimization": "Cost optimization & efficient compute",
  "Generative AI": "Generative AI in practice",
  "Security & compliance": "Security & compliance",
  "Data engineering": "Data & analytics engineering",
  "Containers & Kubernetes": "Containers & Kubernetes",
  Databases: "Databases & storage",
  Networking: "Networking & resilience",
  Storage: "Storage at scale",
  "IoT & Edge": "IoT & edge",
};

export interface Scored {
  session: CatalogSession;
  score: number;
  reasons: string[];
}

export const TOP_N = 30;

/** Score every catalog session against the profile; return the top 30. */
export function scoreCatalog(profile: Profile): Scored[] {
  const roleTags = ROLE_WEIGHTS[profile.role] ?? [];
  const industryKws = INDUSTRY_KEYWORDS[profile.industry] ?? [];

  const scored: Scored[] = CATALOG.map((session) => {
    let score = 0;
    const reasons: string[] = [];

    for (const tag of profile.interests) {
      if (session.tags.includes(tag)) {
        score += 4;
        reasons.push(`Interest: ${tag}`);
      }
    }

    roleTags.forEach((tag, i) => {
      if (session.tags.includes(tag) && !profile.interests.includes(tag)) {
        const w = [3, 2, 1.5, 1][Math.min(i, 3)];
        score += w;
        if (i < 2) reasons.push(`Matches your role: ${profile.role}`);
      }
    });

    if (industryKws.length > 0) {
      const text = `${session.title} ${session.abstract ?? ""}`.toLowerCase();
      if (industryKws.some((k) => text.includes(k))) {
        score += 3;
        reasons.push(`${profile.industry} use case`);
      }
    }

    if (profile.industry === "Financial Services" && session.fsi) {
      score += 2;
      if (!reasons.includes("Financial Services use case")) {
        reasons.push("Recommended in the AWS FSI Attendee Guide");
      }
    }

    if (isReservable(session)) {
      score += 1;
      // reason intentionally omitted — reservation info shown via pills
    }

    return { session, score, reasons: Array.from(new Set(reasons)) };
  });

  // Dedupe repeat instances: keep the highest-scoring slot per base session.
  const best = new Map<string, Scored>();
  for (const s of scored) {
    const key = baseCode(s.session.code);
    const cur = best.get(key);
    if (!cur || s.score > cur.score) best.set(key, s);
  }

  return Array.from(best.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_N);
}

export interface DayGroup {
  day: string | null; // ISO date or null for TBD
  label: string;
  theme: string;
  sessions: Scored[];
}

/** Group the top 30 into the 5 conference days (plus a TBD group). */
export function groupByDay(scored: Scored[]): DayGroup[] {
  const groups: DayGroup[] = CONFERENCE_DAYS.map((day) => ({
    day,
    label: DAY_LABELS[day],
    theme: "",
    sessions: [],
  }));
  const tbd: DayGroup = { day: null, label: "Day TBD", theme: "Verify day/time in the catalog", sessions: [] };

  for (const s of scored) {
    const g = s.session.day
      ? groups.find((x) => x.day === s.session.day)
      : undefined;
    (g ?? tbd).sessions.push(s);
  }

  for (const g of groups) {
    g.theme = themeFor(g.sessions);
  }

  const out = groups.filter((g) => g.sessions.length > 0);
  if (tbd.sessions.length > 0) out.push(tbd);
  return out;
}

function themeFor(sessions: Scored[]): string {
  const counts = new Map<string, number>();
  for (const s of sessions) {
    for (const t of s.session.tags) counts.set(t, (counts.get(t) ?? 0) + s.score);
  }
  let best: string | null = null;
  let bestN = 0;
  counts.forEach((n, t) => {
    if (n > bestN) {
      bestN = n;
      best = t;
    }
  });
  return best ? (THEME_LABELS[best] ?? best) : "General sessions";
}
