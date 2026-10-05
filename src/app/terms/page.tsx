"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CHECKS = [
  "I understand that HIDDEN CLAW provides intelligence, not guaranteed outcomes.",
  "I understand that automated execution can result in financial loss.",
  "I understand that I am responsible for my configured execution parameters.",
  "I understand that simulation data in this mockup is not real market data.",
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
        <div className="text-[10px] tracking-[0.2em] text-[var(--cyan)] mb-3">TERMS</div>
        <h1 className="text-2xl font-semibold mb-4">Accept before creating access</h1>
        <p className="text-[13px] text-[var(--text-muted)] mb-8">Accept the following before creating access to the intelligence terminal.</p>
        <div className="space-y-3 mb-8">
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
          onClick={() => router.push("/signup")}
          className="bg-[var(--cyan)] text-[var(--bg-deep)] text-[12px] font-semibold tracking-wider px-6 py-3 rounded-md disabled:opacity-40 hover:opacity-90"
        >
          CONTINUE TO SIGN UP \u2192
        </button>
      </main>
    </div>
  );
}
