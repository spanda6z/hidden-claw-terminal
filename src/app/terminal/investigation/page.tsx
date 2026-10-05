"use client";

import Link from "next/link";

export default function InvestigationPage() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Investigate</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
          The full story: what happened, who is involved, how fast, have we seen this before, what are the risks.
        </p>
      </div>
      <div className="panel p-4">
        <div className="text-[11px] tracking-[0.1em] text-[var(--text-dim)] mb-3">INVESTIGATION CHECKLIST</div>
        <ul className="grid md:grid-cols-2 gap-2 text-[13px] text-[var(--text-muted)]">
          {["Token overview & market metrics", "Milestone / acceleration history", "Wallet activity & smart wallets", "Top wallets & concentration", "Bundle / coordination evidence", "Developer profile & prior launches", "Related wallets (careful attribution)", "Risk indicators (both sides)", "Plain-language signal explanation"].map((x) => (
            <li key={x} className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> {x}</li>
          ))}
        </ul>
      </div>
      <Link href="/terminal/pumpfun" className="inline-block bg-[var(--cyan)] text-[var(--bg-deep)] text-[12px] font-semibold tracking-wider px-5 py-2.5 rounded-md">START FROM LIVE LAUNCH \u2192</Link>
    </div>
  );
}
