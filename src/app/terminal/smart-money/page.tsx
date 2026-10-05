"use client";

import Link from "next/link";

const WALLETS = [
  { address: "7F3A\u20269k2p", label: "Tracked behavior", launches: 14, earlyEntries: 12, pattern: "Frequently appears before volume expansion on new launches.", activity: "Active", evidence: ["Early entry timing", "Repeated participation", "Exit consistency tracked"] },
  { address: "91AB\u20263m7x", label: "Tracked behavior", launches: 9, earlyEntries: 7, pattern: "Often present in first minutes; selective token set.", activity: "Active", evidence: ["Sub-60s entries", "Limited token frequency", "Historical timing"] },
  { address: "B8C2\u20261n5r", label: "Under observation", launches: 6, earlyEntries: 3, pattern: "Mixed outcomes; insufficient sample for strong classification.", activity: "Quiet", evidence: ["Limited sample", "No strong coordination signal"] },
];

export default function SmartWalletsPage() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Smart wallets</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
          A smart wallet is not simply a large balance. Classification is based on historical behavior, timing, and repeated participation \u2014 evidence, not certainty.
        </p>
      </div>
      <div className="panel p-4 text-[12px] text-[var(--text-muted)]">
        <span className="text-[var(--text)] font-medium">Definition: </span>
        Wallet classified from historical behavior and timing \u2014 not simply its balance.
      </div>
      <div className="space-y-3">
        {WALLETS.map((w) => (
          <div key={w.address} className="panel p-4">
            <div className="flex justify-between mb-3">
              <div>
                <div className="mono text-[14px] text-[var(--cyan)]">{w.address}</div>
                <div className="text-[11px] text-[var(--text-dim)]">{w.label}</div>
              </div>
              <span className="text-[11px] text-[var(--text-muted)]">{w.activity}</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-[12px] mb-3">
              <div><div className="text-[10px] text-[var(--text-dim)]">TRACKED LAUNCHES</div><div className="mono font-medium">{w.launches}</div></div>
              <div><div className="text-[10px] text-[var(--text-dim)]">EARLY ENTRIES</div><div className="mono font-medium">{w.earlyEntries}</div></div>
              <div><div className="text-[10px] text-[var(--text-dim)]">PATTERN</div><div className="text-[11px] text-[var(--text-muted)]">{w.pattern}</div></div>
            </div>
            <ul className="flex flex-wrap gap-2">{w.evidence.map((e) => (<li key={e} className="text-[11px] border border-[var(--border)] rounded px-2 py-1 text-[var(--text-muted)]">{e}</li>))}</ul>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-[var(--text-dim)]">Illustrative until full wallet graph is live. <Link href="/terminal/pumpfun" className="text-[var(--cyan)] hover:underline">Pump.fun feed</Link></p>
    </div>
  );
}
