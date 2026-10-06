"use client";

import Link from "next/link";

export default function ExecutionPage() {
  return (
    <div className="p-5 space-y-5 max-w-3xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="h-title">Execution</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-xl">
            Optional layer. Intelligence runs without it. No wallet is connected and no trades are placed from this build.
          </p>
        </div>
        <span className="badge badge-amber">OFFLINE</span>
      </div>
      <div className="alert-card p-5">
        <div className="text-[11px] tracking-wider text-[var(--amber)] mb-2 font-semibold">EXECUTION DISABLED</div>
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
          HIDDEN CLAW is intelligence-first. Auto-buy, auto-sell, and position management are not enabled. Use Scanner, Detection, and Investigate to understand the market \u2014 then decide elsewhere if you choose to trade.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { t: "Fixed size rules", d: "Future: max SOL per entry, daily caps" },
          { t: "Risk limits", d: "Future: max loss, max open positions" },
          { t: "Kill switch", d: "Future: halt all automated activity" },
          { t: "Manual only", d: "Today: you act outside the terminal" },
        ].map((x) => (
          <div key={x.t} className="card p-4">
            <div className="text-[13px] font-semibold mb-1">{x.t}</div>
            <p className="text-[12px] text-[var(--text-muted)]">{x.d}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href="/terminal/scanner" className="arrow-link">Open scanner</Link>
        <Link href="/terminal/investigation" className="arrow-link">Investigate</Link>
        <Link href="/risk" className="arrow-link">Risk disclosure</Link>
      </div>
    </div>
  );
}
