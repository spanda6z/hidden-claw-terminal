"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CHECKS = [
  "I understand that HIDDEN CLAW provides intelligence, not guaranteed outcomes.",
  "I understand that markets move fast and losses are possible.",
  "I understand that execution is optional and separate from intelligence.",
  "I understand live data is informational and not financial advice.",
  "I agree to the HIDDEN CLAW terms.",
];

export default function TermsPage() {
  const [checked, setChecked] = useState<boolean[]>(CHECKS.map(() => false));
  const router = useRouter();
  const allChecked = checked.every(Boolean);

  return (
    <div className="min-h-screen">
      <header className="px-8 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
      </header>
      <main className="max-w-lg mx-auto px-8 py-16">
        <div className="label mb-3">TERMS</div>
        <h1 className="h-title text-2xl mb-4">Accept before entering</h1>
        <p className="text-[13px] text-[var(--text-muted)] mb-8">
          Accept the following to open the intelligence terminal. No account required.
        </p>
        <div className="space-y-3 mb-8 card p-5">
          {CHECKS.map((c, i) => (
            <label key={i} className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={(e) => {
                  const next = [...checked];
                  next[i] = e.target.checked;
                  setChecked(next);
                }}
                className="mt-1"
              />
              <span className="text-[13px] text-[var(--text-muted)]">{c}</span>
            </label>
          ))}
        </div>
        <button
          disabled={!allChecked}
          onClick={() => router.push("/access")}
          className="btn-primary disabled:opacity-40"
        >
          CONTINUE TO TERMINAL \u2192
        </button>
      </main>
    </div>
  );
}
