"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  INDUSTRIES,
  INTERESTS,
  ROLES,
  SAMPLE_PROFILE,
  loadProfile,
  saveProfile,
  type Industry,
  type InterestTag,
  type Profile,
  type Role,
} from "@/lib/profile";

const MAX_INTERESTS = 6;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm transition ${
        active
          ? "border-amber-500/60 bg-amber-500/15 text-amber-200"
          : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
      }`}
    >
      {children}
    </button>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(() => loadProfile()?.role ?? "Frontend Engineer");
  const [industry, setIndustry] = useState<Industry>(
    () => loadProfile()?.industry ?? "Financial Services"
  );
  const [interests, setInterests] = useState<InterestTag[]>(
    () => loadProfile()?.interests ?? []
  );

  const toggleInterest = (tag: InterestTag) => {
    setInterests((cur) => {
      if (cur.includes(tag)) return cur.filter((t) => t !== tag);
      if (cur.length >= MAX_INTERESTS) return cur;
      return [...cur, tag];
    });
  };

  const useSample = () => {
    setRole(SAMPLE_PROFILE.role);
    setIndustry(SAMPLE_PROFILE.industry);
    setInterests(SAMPLE_PROFILE.interests);
  };

  const submit = () => {
    const profile: Profile = { role, industry, interests };
    saveProfile(profile);
    router.push("/suggest");
  };

  const valid = interests.length > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Your attendee profile</h1>
        <p className="mt-1 text-sm text-slate-400">
          We use this to pick your top 30 sessions. It stays in your browser —
          no account, no password, nothing leaves your device.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white"
        >
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Industry / company domain
        </label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value as Industry)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white"
        >
          {INDUSTRIES.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-200">
          Interests <span className="font-normal text-slate-500">(pick up to {MAX_INTERESTS})</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((tag) => (
            <Chip key={tag} active={interests.includes(tag)} onClick={() => toggleInterest(tag)}>
              {tag}
            </Chip>
          ))}
        </div>
        {!valid && (
          <p className="mt-2 text-sm text-slate-500">Pick at least one interest to continue.</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={submit}
          disabled={!valid}
          className="rounded-lg bg-amber-500 px-5 py-2.5 font-semibold text-slate-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Show my top 30
        </button>
        <button
          onClick={useSample}
          className="rounded-lg border border-slate-700 px-5 py-2.5 text-slate-200 hover:bg-slate-800"
        >
          Try a sample profile
        </button>
      </div>
      <p className="text-xs text-slate-500">
        Sample: Financial Services · Frontend Engineer · Kiro &amp; AI dev tools,
        Legacy modernization, FinOps, Open source, Serverless, AI agents.
      </p>
    </div>
  );
}
