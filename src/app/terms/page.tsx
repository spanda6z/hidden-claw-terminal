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

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-8 py-4 border-b border-[var(--border)] flex items-center gap-3">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <span className="text-[10px] text-[var(--text-dim)] tracking-wider">PRIVATE SYSTEM ACCESS</span>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <h1 className="text-lg font-semibold tracking-wide mb-2">PRIVATE SYSTEM ACCESS</h1>
          <p className="text-[13px] text-[var(--text-muted)] mb-8">Accept the following before entering the intelligence terminal.</p>
          <div className="space-y-3 mb-8">
            {CHECKS.map((label, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer text-[13px] text-[var(--text-muted)] hover:text-[var(--text)]">
                <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} className="mt-0.5 accent-[var(--cyan)]" />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <button disabled={!allChecked} onClick={() => router.push("/access")} className={`w-full py-3 text-[12px] font-semibold tracking-wider transition-opacity ${allChecked ? "bg-[var(--cyan)] text-black hover:opacity-90" : "bg-[var(--border)] text-[var(--text-dim)] cursor-not-allowed"}`}>
            VERIFY ACCESS
          </button>
          <p className="text-[11px] text-[var(--text-dim)] mt-4 text-center">Simulation environment · No real transactions</p>
        </div>
      </main>
    </div>
  );
}
