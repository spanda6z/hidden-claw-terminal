"use client";

import Link from "next/link";

export default function AlertsPage() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Alerts</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1">Every alert must have a reason. No noise. Click through to investigate.</p>
      </div>
      <div className="alert-card p-4">
        <div className="text-[10px] tracking-[0.1em] text-[var(--cyan)] mb-1">SYSTEM</div>
        <div className="text-[15px] font-semibold mb-1">Pump.fun stream connected</div>
        <p className="text-[13px] text-[var(--text-muted)] mb-3">Live launches are scored by age, curve progress, and market cap heuristics.</p>
        <ul className="text-[12px] text-[var(--text-muted)] space-y-1 mb-3">
          <li>\u2192 Public Pump.fun API responding</li>
          <li>\u2192 Signal layer active at /api/signals/pumpfun</li>
        </ul>
        <Link href="/terminal/pumpfun" className="text-[11px] text-[var(--cyan)] hover:underline">OPEN FEED \u2192</Link>
      </div>
    </div>
  );
}
