"use client";

import Link from "next/link";

export default function TerminalOverview() {
  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)]">OVERVIEW</h1>
          <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Market intelligence · Simulation</p>
        </div>
        <span className="sim-badge">SIMULATION / DEMO DATA</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "TOKENS DETECTED", value: "1,284" },
          { label: "ELITE ENTRIES", value: "47", green: true },
          { label: "TICKER CLUSTERS", value: "18" },
          { label: "PROVEN DEVELOPERS", value: "126" },
        ].map((k) => (
          <div key={k.label} className="bg-[var(--bg-panel)] border border-[var(--border)] rounded px-4 py-3">
            <div className="text-[10px] text-[var(--text-dim)] tracking-wider">{k.label}</div>
            <div className={`text-lg font-semibold mono mt-1 ${k.green ? "text-[var(--green)]" : ""}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[11px] tracking-wider text-[var(--text-muted)]">SPOTLIGHT · $CLAW</div>
          <Link href="/terminal/clusters" className="text-[11px] text-[var(--cyan)] hover:underline">VIEW CLUSTERS →</Link>
        </div>
        <div className="grid grid-cols-5 gap-4 text-[12px]">
          <div><div className="text-[10px] text-[var(--text-dim)]">PRICE</div><div className="mono">$0.000421</div></div>
          <div><div className="text-[10px] text-[var(--text-dim)]">MCAP</div><div className="mono">$842K</div></div>
          <div><div className="text-[10px] text-[var(--text-dim)]">CURVE</div><div className="mono text-[var(--amber)]">96.4%</div></div>
          <div><div className="text-[10px] text-[var(--text-dim)]">ELITE</div><div className="mono text-[var(--green)]">3</div></div>
          <div><div className="text-[10px] text-[var(--text-dim)]">SECURITY</div><div className="text-[var(--green)]">PASS</div></div>
        </div>
      </div>

      <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded divide-y divide-[var(--border)]">
        <div className="px-4 py-2 text-[11px] tracking-wider text-[var(--text-muted)]">LIVE FEED</div>
        {[
          { t: "13:04:31", m: "NEW TOKEN · $CLAW · PUMP.FUN · DEV_7F3A · PROVEN" },
          { t: "13:04:18", m: "ELITE ENTRY · 7F3A… · BUY · 0.82 SOL · $CLAW" },
          { t: "13:03:57", m: "TICKER CLUSTER · $CLAW · 7 SOURCES · FIRE" },
          { t: "13:03:42", m: "SECURITY · $CLAW · ALL CORE CHECKS PASS" },
        ].map((e, i) => (
          <div key={i} className="px-4 py-2.5 flex gap-3 text-[12px]">
            <span className="mono text-[var(--text-dim)] w-14">{e.t}</span>
            <span className="text-[var(--text-muted)]">{e.m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
