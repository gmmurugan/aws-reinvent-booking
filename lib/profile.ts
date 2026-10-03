// Attendee profile for the suggestion engine. Stored in the browser only
// (localStorage) — the app never asks for a password or AWS credentials.

export const ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Platform/DevOps Engineer",
  "Data Engineer",
  "ML/AI Engineer",
  "Security Engineer",
  "Solutions Architect",
  "Engineering Manager",
  "FinOps Practitioner",
  "Other",
] as const;
export type Role = (typeof ROLES)[number];

export const INDUSTRIES = [
  "Financial Services",
  "Healthcare & Life Sciences",
  "Retail & CPG",
  "Media & Entertainment",
  "Public Sector",
  "SaaS & Technology",
  "Manufacturing & Automotive",
  "Travel & Hospitality",
  "Other",
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const INTERESTS = [
  "AI agents",
  "Generative AI",
  "Kiro & AI dev tools",
  "Legacy modernization",
  "Serverless",
  "Containers & Kubernetes",
  "FinOps & cost optimization",
  "Open source",
  "Data engineering",
  "Security & compliance",
  "Networking",
  "Storage",
  "Databases",
  "IoT & Edge",
] as const;
export type InterestTag = (typeof INTERESTS)[number];

export interface Profile {
  role: Role;
  industry: Industry;
  interests: InterestTag[];
}

// The repo owner's own plan, as a one-tap sample:
// Financial Services + frontend/cloud engineer + his six focus topics.
export const SAMPLE_PROFILE: Profile = {
  role: "Frontend Engineer",
  industry: "Financial Services",
  interests: [
    "Kiro & AI dev tools",
    "Legacy modernization",
    "FinOps & cost optimization",
    "Open source",
    "Serverless",
    "AI agents",
  ],
};

const STORAGE_KEY = "reinvent-booking-profile-v1";

export function loadProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Profile;
    if (!p.role || !p.industry || !Array.isArray(p.interests)) return null;
    return p;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // private mode — profile just won't persist
  }
}

export function clearProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
