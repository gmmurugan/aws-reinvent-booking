// Session data seeded from research — no invented sessions.
// Source 1: ~/workspace/research_notes/reinvent-2026-sessions-day-by-day-20261001-1424/report.md
//   (26 catalog-verified sessions: code, title, type, level, day/time PT, venue)
// Source 2: ~/workspace/research_notes/reinvent-fsi-guide-foldin/report.md
//   (20 AWS FSI Attendee Guide picks — the guide publishes NO day/times, so those are TBD)

export type SessionType =
  | "Workshop"
  | "Builders' session"
  | "Chalk talk"
  | "Code talk"
  | "Breakout"
  | "Lab"
  | "Lightning talk"
  | "Keynote"
  | "Event";

export type ThemeDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export type Urgency = "first" | "second" | "none";

export type Interest =
  | "Legacy modernization"
  | "AI dev / Kiro"
  | "FinOps / cost"
  | "Open source"
  | "Serverless"
  | "AI agents";

export interface SessionEntry {
  code: string;
  title: string;
  type: SessionType;
  level?: string;
  time: string; // display label, PT
  venue?: string;
  note?: string;
  fsi?: boolean; // also recommended by the AWS FSI Attendee Guide
  interests?: Interest[];
}

export interface DaySlot {
  time: string;
  primary?: SessionEntry;
  backup?: SessionEntry;
  label?: string; // for non-session blocks like lunch
}

export interface DayPlan {
  day: ThemeDay;
  date: string;
  theme: string;
  themeWhy: string;
  slots: DaySlot[];
}

export interface FsiPick {
  code: string;
  title: string;
  type: SessionType;
  themeDay: ThemeDay;
  interests: Interest[];
  why: string;
}

/** 2026 rule: only interactive sessions take reserved seating. */
export function urgencyOf(type: SessionType): Urgency {
  if (type === "Workshop" || type === "Lab" || type === "Builders' session") return "first";
  if (type === "Chalk talk" || type === "Code talk") return "second";
  return "none";
}

export function isInteractive(type: SessionType): boolean {
  return urgencyOf(type) !== "none";
}

// ---------------------------------------------------------------------------
// His itinerary (primary + backup per slot), grouped by day.
// ---------------------------------------------------------------------------

export const dayPlans: DayPlan[] = [
  {
    day: "Monday",
    date: "Nov 30",
    theme: "Legacy modernization foundations",
    themeWhy: "Start the week with AWS Transform-based modernization, Kiro, and CI/CD — the top themes.",
    slots: [
      {
        time: "8:00 AM",
        primary: {
          code: "MAM313-R",
          title: "Migrate and modernize infrastructure from your IDE with agentic AI",
          type: "Code talk",
          level: "300",
          time: "8:00 AM",
          venue: "MGM Grand",
          interests: ["Legacy modernization", "AI dev / Kiro"],
        },
        backup: {
          code: "DVT207",
          title: "Learn new AI development skills with Kiro",
          type: "Builders' session",
          level: "200",
          time: "8:00 AM",
          venue: "Caesars Forum",
          note: "Hands-on Kiro skills.",
          interests: ["AI dev / Kiro"],
        },
      },
      {
        time: "10:00 AM",
        primary: {
          code: "MAM211-R",
          title: "How to assess your environment to migrate & modernize with confidence",
          type: "Chalk talk",
          level: "200",
          time: "10:00 AM",
          venue: "Caesars Palace",
          note: "AWS Transform agentic assessment; license-optimization angle.",
          interests: ["Legacy modernization"],
        },
      },
      {
        time: "12:00 PM",
        primary: {
          code: "DVT305-R",
          title: "Modernize your CI/CD pipeline with AWS",
          type: "Workshop",
          level: "300",
          time: "12:00 PM",
          venue: "Caesars Forum",
          note: "Hands-on CI/CD modernization.",
          interests: ["Legacy modernization"],
        },
        backup: {
          code: "SVS303-R1",
          title: "AI-driven serverless development with Kiro",
          type: "Workshop",
          level: "300",
          time: "12:00 PM",
          venue: "Caesars Palace",
          note: "Kiro + serverless, hands-on.",
          interests: ["Serverless", "AI dev / Kiro"],
        },
      },
      { time: "~2:00 PM", label: "Lunch + rest (12 PM workshops typically run ~2 hrs)" },
      {
        time: "12:00 PM (also at this hour)",
        primary: {
          code: "MAM331-R",
          title: "Guide to deploying landing zones & modernized networks in hours",
          type: "Chalk talk",
          level: "300",
          time: "12:00 PM",
          venue: "Caesars Palace",
          interests: ["Legacy modernization"],
        },
        backup: {
          code: "DVT316",
          title: "What's new in full-stack AWS app development",
          type: "Breakout",
          level: "",
          time: "12:00 PM",
          venue: "Caesars Forum",
        },
      },
      {
        time: "4:00–7:00 PM",
        primary: {
          code: "EXPO",
          title: "Welcome reception in the Expo",
          type: "Event",
          time: "4:00–7:00 PM",
          venue: "The Venetian",
          note: "Talk to the Kiro, AWS Transform, and Pulumi booths.",
        },
      },
    ],
  },
  {
    day: "Tuesday",
    date: "Dec 1",
    theme: "AI-assisted development with Kiro",
    themeWhy: "Keynote morning, then a full day of Kiro / agent-assisted delivery plus the frontend Amplify workshop.",
    slots: [
      {
        time: "8:30–10:30 AM",
        primary: {
          code: "KEYNOTE-TUE",
          title: "Opening Keynote — AWS CEO Matt Garman",
          type: "Keynote",
          time: "8:30–10:30 AM",
          venue: "The Venetian (+ virtual)",
        },
        backup: {
          code: "TNC315",
          title: "Modernize .NET Applications with AWS Transform and Kiro",
          type: "Lab",
          level: "300",
          time: "10:00 AM",
          venue: "Caesars Palace",
          note: "If skipping the keynote tail. Legacy .NET, hands-on.",
          interests: ["Legacy modernization", "AI dev / Kiro"],
        },
      },
      {
        time: "11:00 AM",
        primary: {
          code: "MAM327",
          title: "5 steps to faster data center exits with AWS Transform",
          type: "Breakout",
          level: "300",
          time: "11:00 AM",
          venue: "Caesars Palace",
          interests: ["Legacy modernization"],
        },
        backup: {
          code: "MAM211-R1",
          title: "How to assess your environment to migrate & modernize with confidence",
          type: "Chalk talk",
          level: "200",
          time: "11:00 AM",
          venue: "Caesars Palace",
          note: "Same venue, no travel.",
          interests: ["Legacy modernization"],
        },
      },
      {
        time: "1:00 PM",
        primary: {
          code: "MAM331-R1",
          title: "Guide to deploying landing zones & modernized networks in hours",
          type: "Chalk talk",
          level: "300",
          time: "1:00 PM",
          venue: "Wynn/Encore",
          note: "AWS Transform agentic landing zones via Control Tower.",
          interests: ["Legacy modernization"],
        },
      },
      {
        time: "2:00 PM",
        primary: {
          code: "DVT207-R1",
          title: "Learn new AI development skills with Kiro",
          type: "Builders' session",
          level: "200",
          time: "2:00 PM",
          venue: "MGM Grand",
          note: "Repeat of Mon 8:00 AM.",
          interests: ["AI dev / Kiro"],
        },
      },
      {
        time: "3:00 PM",
        primary: {
          code: "DVT313",
          title: "Build real-time applications with AWS Amplify",
          type: "Workshop",
          level: "300",
          time: "3:00 PM",
          venue: "Caesars Forum",
          note: "Frontend pick: real-time full-stack on Amplify.",
        },
        backup: {
          code: "MAM322-R",
          title: "Build an AI testing safety net before you modernize",
          type: "Workshop",
          level: "300",
          time: "3:00 PM",
          venue: "Wynn/Encore",
          fsi: true,
          note: "Also recommended by the AWS FSI guide. (DVT305-R1 repeats Monday's CI/CD workshop at MGM Grand.)",
          interests: ["Legacy modernization", "AI dev / Kiro"],
        },
      },
      {
        time: "4:00 PM",
        primary: {
          code: "SVS341-R1",
          title: "Lambda performance tuning and cost optimization",
          type: "Chalk talk",
          level: "300",
          time: "4:00 PM",
          venue: "Caesars Palace",
          note: "Serverless cost tuning.",
          interests: ["Serverless", "FinOps / cost"],
        },
      },
    ],
  },
  {
    day: "Wednesday",
    date: "Dec 2",
    theme: "Open source & AI agents on AWS",
    themeWhy: "Strands Agents SDK, OpenTelemetry/Langfuse observability, and IaC-from-your-IDE — the open-source pillar of his priorities.",
    slots: [
      {
        time: "8:00 AM",
        primary: {
          code: "SVS303-R",
          title: "AI-driven serverless development with Kiro",
          type: "Workshop",
          level: "300",
          time: "8:00 AM",
          venue: "Wynn/Encore",
          note: "Repeat of Mon 12:00 PM.",
          interests: ["Serverless", "AI dev / Kiro"],
        },
      },
      {
        time: "8:30–10:00 AM",
        primary: {
          code: "KEYNOTE-WED-AM",
          title: "Keynote (topic TBA in catalog)",
          type: "Keynote",
          time: "8:30–10:00 AM",
          venue: "Las Vegas",
        },
      },
      {
        time: "10:00 AM",
        primary: {
          code: "MAM313-R1",
          title: "Migrate and modernize infrastructure from your IDE with agentic AI",
          type: "Code talk",
          level: "300",
          time: "10:00 AM",
          venue: "Caesars Palace",
          note: "Repeat of Mon 8:00 AM — take it if you chose DVT207 on Monday.",
          interests: ["Legacy modernization", "AI dev / Kiro"],
        },
      },
      {
        time: "12:00 PM",
        primary: {
          code: "OPN307-R",
          title: "Build multi-agent workflows with Strands Agents SDK on AWS",
          type: "Workshop",
          level: "300",
          time: "12:00 PM",
          venue: "Caesars Forum",
          note: "Open-source agents framework, hands-on.",
          interests: ["Open source", "AI agents"],
        },
        backup: {
          code: "OPN304-R",
          title: "Observability for AI agents: Strands, OpenTelemetry, and Langfuse",
          type: "Workshop",
          level: "300",
          time: "12:00 PM",
          venue: "Caesars Forum",
          note: "Same venue. Open-source observability for agents.",
          interests: ["Open source", "AI agents"],
        },
      },
      {
        time: "3:00–4:30 PM",
        primary: {
          code: "KEYNOTE-WED-PM",
          title: "Keynote (topic TBA in catalog)",
          type: "Keynote",
          time: "3:00–4:30 PM",
          venue: "Las Vegas",
        },
      },
      {
        time: "4:00 PM",
        primary: {
          code: "CON329",
          title: "Accelerate application development with Amazon ECS Express Mode",
          type: "Breakout",
          level: "300",
          time: "4:00 PM",
          venue: "Caesars Palace",
          note: "Conflicts with the PM keynote — attend only if skipping it or watching the replay.",
        },
      },
    ],
  },
  {
    day: "Thursday",
    date: "Dec 3",
    theme: "Serverless & event-driven architectures",
    themeWhy: "Lambda, event-driven modernization, ECS, and full-stack Q&A — his architectural core.",
    slots: [
      {
        time: "8:00 AM",
        primary: {
          code: "IND372",
          title: "Modernize a Legacy Telecom Billing App with AWS Transform Custom",
          type: "Builders' session",
          level: "300",
          time: "8:00 AM",
          venue: "Caesars Forum",
          note: "Legacy app modernization, hands-on. Overlaps the 8:30 AM keynote — recommended: attend the keynote, treat this as a keynote-skip alternative.",
          interests: ["Legacy modernization"],
        },
        backup: {
          code: "DVT333",
          title: "Full stack development on AWS: bring your questions",
          type: "Chalk talk",
          level: "300",
          time: "8:00 AM",
          venue: "Caesars Forum",
          note: "Same venue. Frontend/full-stack Q&A.",
        },
      },
      {
        time: "8:30–10:00 AM",
        primary: {
          code: "KEYNOTE-THU",
          title: "Keynote (topic TBA in catalog)",
          type: "Keynote",
          time: "8:30–10:00 AM",
          venue: "Las Vegas",
        },
      },
      {
        time: "11:00 AM",
        primary: {
          code: "API201",
          title: "Modernize legacy applications into serverless event-driven systems",
          type: "Breakout",
          level: "200",
          time: "11:00 AM",
          venue: "Caesars Palace",
          interests: ["Serverless", "Legacy modernization"],
        },
      },
      {
        time: "12:00 PM",
        primary: {
          code: "MAM322-R1",
          title: "Build an AI testing safety net before you modernize",
          type: "Workshop",
          level: "300",
          time: "12:00 PM",
          venue: "Caesars Palace",
          fsi: true,
          note: "Also recommended by the AWS FSI guide. Same venue as API201.",
          interests: ["Legacy modernization", "AI dev / Kiro"],
        },
        backup: {
          code: "ARC330",
          title: "Pitfalls of SaaS: Return of the agent",
          type: "Chalk talk",
          level: "300",
          time: "12:00 PM",
          venue: "Wynn/Encore",
          interests: ["AI agents"],
        },
      },
      {
        time: "1:00 PM",
        primary: {
          code: "SVS341-R",
          title: "Lambda performance tuning and cost optimization",
          type: "Chalk talk",
          level: "300",
          time: "1:00 PM",
          venue: "Caesars Forum",
          note: "Repeat of Tue 4:00 PM — take whichever fits. Overlaps the 12 PM workshop, so choose one track.",
          interests: ["Serverless", "FinOps / cost"],
        },
      },
      {
        time: "3:00 PM",
        primary: {
          code: "OPN307-R1",
          title: "Build multi-agent workflows with Strands Agents SDK on AWS",
          type: "Workshop",
          level: "300",
          time: "3:00 PM",
          venue: "MGM Grand",
          note: "Repeat of Wed 12:00 PM.",
          interests: ["Open source", "AI agents"],
        },
        backup: {
          code: "OPN304-R1",
          title: "Observability for AI agents: Strands, OpenTelemetry, and Langfuse",
          type: "Workshop",
          level: "300",
          time: "3:00 PM",
          venue: "Wynn/Encore",
          note: "Repeat of Wed 12:00 PM backup.",
          interests: ["Open source", "AI agents"],
        },
      },
      {
        time: "7:30 PM",
        primary: {
          code: "REPLAY",
          title: "re:Play — the official re:Invent party",
          type: "Event",
          time: "7:30 PM",
          venue: "Las Vegas",
        },
      },
    ],
  },
  {
    day: "Friday",
    date: "Dec 4",
    theme: "Cost optimization & efficient compute",
    themeWhy: "End the week on the FinOps priority — EKS/Karpenter/APerf cost workshops, a serverless-agents deep dive, and a Kiro modernization customer story.",
    slots: [
      {
        time: "8:00 AM",
        primary: {
          code: "CMP314-R1",
          title: "Optimize smarter: EKS performance with APerf and AI-powered analysis",
          type: "Workshop",
          level: "300",
          time: "8:00 AM",
          venue: "Wynn/Encore",
          note: "Cost + AI + open source (APerf).",
          interests: ["FinOps / cost", "Open source"],
        },
        backup: {
          code: "CON301-R1",
          title: "Running compute-efficient workloads on Amazon EKS Auto Mode",
          type: "Workshop",
          level: "300",
          time: "8:00 AM",
          venue: "Wynn/Encore",
          note: "Same venue. Open-source Karpenter, Graviton, Spot cost optimization.",
          interests: ["FinOps / cost", "Open source"],
        },
      },
      {
        time: "8:00 AM (alt)",
        primary: {
          code: "STG328-R1",
          title: "Optimize performance and cost of Amazon EBS at massive scale",
          type: "Chalk talk",
          level: "300",
          time: "8:00 AM",
          venue: "Wynn/Encore",
          interests: ["FinOps / cost"],
        },
      },
      {
        time: "9:00 AM (alt)",
        primary: {
          code: "COP408",
          title: "Correlate database query latency to user impact",
          type: "Code talk",
          level: "400",
          time: "9:00 AM",
          venue: "Wynn/Encore",
          note: "OpenTelemetry → CloudWatch. Attend instead of the 10 AM slot if preferred.",
        },
      },
      {
        time: "10:00 AM",
        primary: {
          code: "SVS401-R1",
          title: "Orchestrating agentic applications with Lambda durable functions",
          type: "Workshop",
          level: "400",
          time: "10:00 AM",
          venue: "Wynn/Encore",
          note: "Serverless + agents + MCP. Hands-on, laptop required. (Catalog card labels it Builders' session; detail page says Workshop.)",
          interests: ["Serverless", "AI agents"],
        },
        backup: {
          code: "CMP355-R1",
          title: "Auto Scaling meets Capacity Reservations: Patterns that work",
          type: "Chalk talk",
          level: "300",
          time: "10:00 AM",
          venue: "Wynn/Encore",
          note: "Same venue. Cost-optimization patterns.",
          interests: ["FinOps / cost"],
        },
      },
      {
        time: "11:00 AM",
        primary: {
          code: "MAM224",
          title: "How FINRA automated dependency lifecycle management with AI agents",
          type: "Breakout",
          level: "200",
          time: "11:00 AM",
          venue: "The Venetian",
          note: "Kiro + AWS Transform custom upgrade agents; 1,800 eng hours reclaimed.",
          interests: ["AI dev / Kiro", "Legacy modernization"],
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// 20 AWS FSI Attendee Guide picks.
// The guide publishes NO day/times — shown as "day/time TBD — verify in catalog".
// ---------------------------------------------------------------------------

export const fsiPicks: FsiPick[] = [
  // Monday — legacy modernization foundations
  {
    code: "IND3335",
    title: "DTCC: Rethinking mainframe modernization with spec-driven development",
    type: "Breakout",
    themeDay: "Monday",
    interests: ["Legacy modernization"],
    why: "Matches your Monday theme: legacy modernization foundations.",
  },
  {
    code: "MAM207",
    title: "Using AI to scale legacy app modernization with Experian & Itaú",
    type: "Breakout",
    themeDay: "Monday",
    interests: ["Legacy modernization"],
    why: "Matches your Monday theme: legacy modernization foundations.",
  },
  {
    code: "MAM346",
    title: "Your playbook for modernizing 988K lines of .NET in 2 days",
    type: "Breakout",
    themeDay: "Monday",
    interests: ["Legacy modernization"],
    why: "Matches your Monday theme: legacy modernization foundations.",
  },
  {
    code: "MAM324",
    title: "Transforming legacy core to agentic AI with Nissan & Bread Financial",
    type: "Breakout",
    themeDay: "Monday",
    interests: ["Legacy modernization"],
    why: "Matches your Monday theme: legacy modernization foundations.",
  },
  // Tuesday — AI-assisted development with Kiro
  {
    code: "DVT204",
    title: "Beyond the pilot: How customers scaled Kiro and proved the value (featuring NatWest and FINRA)",
    type: "Breakout",
    themeDay: "Tuesday",
    interests: ["AI dev / Kiro"],
    why: "Flagship Kiro pick: how NatWest and FINRA scaled Kiro in production — your exact AI-dev priority, on your Tuesday Kiro day.",
  },
  {
    code: "DVT307",
    title: "Beyond code generation: accelerating the entire SDLC on AWS (featuring Transamerica)",
    type: "Breakout",
    themeDay: "Tuesday",
    interests: ["AI dev / Kiro"],
    why: "Matches your Tuesday theme: AI-assisted development with Kiro.",
  },
  {
    code: "IND3326",
    title: "How Bridgewater Associates uses agentic SDLC to accelerate change",
    type: "Breakout",
    themeDay: "Tuesday",
    interests: ["AI dev / Kiro"],
    why: "Matches your Tuesday theme: AI-assisted development with Kiro.",
  },
  {
    code: "IND374",
    title: "Don't ban it, broker it: Govern AI coding agents with Amazon Bedrock",
    type: "Chalk talk",
    themeDay: "Tuesday",
    interests: ["AI dev / Kiro", "AI agents"],
    why: "Matches your Tuesday theme: AI-assisted development with Kiro. Interactive — needs an Oct 6 reservation.",
  },
  // Wednesday — open source & AI agents
  {
    code: "IND318",
    title: "Right tool, right layer: Combining ML models and autonomous agents",
    type: "Chalk talk",
    themeDay: "Wednesday",
    interests: ["AI agents", "Open source"],
    why: "Matches your Wednesday theme: open source & AI agents. Interactive — needs an Oct 6 reservation.",
  },
  {
    code: "IND332",
    title: "Unifying fragmented data: A lakehouse for the agentic AI era",
    type: "Chalk talk",
    themeDay: "Wednesday",
    interests: ["Open source", "AI agents"],
    why: "Matches your Wednesday theme: open source & AI agents. Interactive — needs an Oct 6 reservation.",
  },
  {
    code: "IND330",
    title: "Patterns for mitigating AI-powered security threats in financial services",
    type: "Chalk talk",
    themeDay: "Wednesday",
    interests: ["AI agents"],
    why: "Matches your Wednesday theme: open source & AI agents. Interactive — needs an Oct 6 reservation.",
  },
  {
    code: "IND327",
    title: "Build self-healing agents from diagnosis to disaster recovery",
    type: "Workshop",
    themeDay: "Wednesday",
    interests: ["AI agents"],
    why: "Matches your Wednesday theme: open source & AI agents. Hands-on workshop — book in the first Oct 6 wave.",
  },
  {
    code: "IND329",
    title: "Build a multi-agent system for hyper-personalized customer journeys",
    type: "Workshop",
    themeDay: "Wednesday",
    interests: ["AI agents"],
    why: "Matches your Wednesday theme: open source & AI agents. Hands-on workshop — book in the first Oct 6 wave.",
  },
  // Thursday — serverless & event-driven architectures
  {
    code: "IND313",
    title: "Event-driven AI agents for security triage with AWS Continuum",
    type: "Chalk talk",
    themeDay: "Thursday",
    interests: ["Serverless", "AI agents"],
    why: "Matches your Thursday theme: serverless & event-driven architectures. Interactive — needs an Oct 6 reservation.",
  },
  {
    code: "IND356",
    title: "From static to self-improving agents with Amazon Bedrock AgentCore",
    type: "Chalk talk",
    themeDay: "Thursday",
    interests: ["AI agents"],
    why: "Matches your Thursday theme: serverless & event-driven architectures. Interactive — needs an Oct 6 reservation.",
  },
  {
    code: "DAT412",
    title: "Migrate to Amazon DynamoDB with AI-powered schema design",
    type: "Code talk",
    themeDay: "Thursday",
    interests: ["Serverless"],
    why: "Matches your Thursday theme: serverless & event-driven architectures. Interactive — needs an Oct 6 reservation.",
  },
  {
    code: "IND347",
    title: "Build a governed semantic layer with Amazon Bedrock AgentCore and MCP",
    type: "Lab",
    themeDay: "Thursday",
    interests: ["AI agents"],
    why: "Matches your Thursday theme: serverless & event-driven architectures. Hands-on lab — book in the first Oct 6 wave.",
  },
  // Friday — cost optimization & efficient compute
  {
    code: "IND3306",
    title: "How Ramp tracks and governs AI spend down to the team, model, and API key",
    type: "Breakout",
    themeDay: "Friday",
    interests: ["FinOps / cost"],
    why: "Flagship FinOps pick: AI spend governance — your exact cost-optimization priority, on your Friday FinOps day.",
  },
  {
    code: "IND307",
    title: "Mastering LLM tokenomics: From token costs to business outcomes",
    type: "Chalk talk",
    themeDay: "Friday",
    interests: ["FinOps / cost"],
    why: "Matches your Friday theme: cost optimization & FinOps. Interactive — needs an Oct 6 reservation.",
  },
  {
    code: "COM312",
    title: "Giving your AI agent a wallet: The architecture of spend control",
    type: "Breakout",
    themeDay: "Friday",
    interests: ["FinOps / cost", "AI agents"],
    why: "Matches your Friday theme: cost optimization & FinOps.",
  },
];

// All itinerary entries flattened (primary + backup), for stats and booking tiers.
export function allItineraryEntries(): SessionEntry[] {
  const out: SessionEntry[] = [];
  for (const day of dayPlans) {
    for (const slot of day.slots) {
      if (slot.primary) out.push(slot.primary);
      if (slot.backup) out.push(slot.backup);
    }
  }
  return out;
}

// Distinct session codes across the itinerary.
export function distinctCodes(): string[] {
  const seen = new Set<string>();
  for (const e of allItineraryEntries()) {
    if (!seen.has(e.code)) seen.add(e.code);
  }
  return Array.from(seen);
}
