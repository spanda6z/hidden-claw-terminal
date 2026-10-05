"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TerminalOverview() {
  const [liveCount, setLiveCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/signals/pumpfun?limit=20").then((r) => r.json()).then((d) => setLiveCount(d.count ?? d.signals?.length ?? null)).catch(() => {});
  }, []);

  return (
    <div className="p-5 md:p-6 space-y-5 grid-bg min-h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="label mb-1.5">Command center</div>
          <h1 className="h-title">Market intelligence</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1.5 max-w-xl leading-relaxed">
            Watch footprints before the crowd. Connect wallets and developers. Measure acceleration. Then decide.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <span className="live-badge">Pump.fun live</span>
          {liveCount != null && <span className="badge badge-cyan">{liveCount} launches</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Stream", value: liveCount != null ? String(liveCount) : "\u2014", sub: "launches" },
          { label: "Scanner", value: "Active", sub: "watching" },
          { label: "Detection", value: "Multi", sub: "signals" },
          { label: "Access", value: "Paid", sub: "3 SOL" },
        ].map((k) => (
          <div key={k.label} className="kpi">
            <div className="label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="text-[10px] text-[var(--text-dim)] mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="h-section mb-3">Primary alerts</div>
        <div className="alert-card p-5">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="label mb-1" style={{ color: "var(--cyan)" }}>Acceleration \u00b7 stream</div>
              <div className="text-[16px] font-semibold tracking-tight">Live Pump.fun activity</div>
              <p className="text-[13px] text-[var(--text-muted)] mt-1.5 max-w-lg leading-relaxed">
                Launches streaming with heuristic scores. Investigate before reacting \u2014 intelligence, not a buy call.
              </p>
            </div>
            <span className="badge badge-amber">High</span>
          </div>
          <div className="text-[11px] text-[var(--text-dim)] mb-2 font-medium tracking-wide">WHY THIS MATTERS</div>
          <ul className="space-y-1.5 mb-4">
            {["Pump.fun stream connected", "Scoring on age, curve progress, and mcap", "Open scanner for current tokens with reasons"].map((r) => (
              <li key={r} className="text-[12px] text-[var(--text-muted)] flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> {r}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Link href="/terminal/scanner" className="arrow-link">Open scanner</Link>
            <Link href="/terminal/pumpfun" className="arrow-link">Pump.fun feed</Link>
            <Link href="/terminal/detection" className="arrow-link">Detection engine</Link>
          </div>
        </div>
      </section>

      <div className="h-section">Modules</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { href: "/terminal/scanner", title: "Scanner", desc: "Launches, volume, holder growth, reactivation" },
          { href: "/terminal/detection", title: "Detection", desc: "Acceleration, coordination, multi-signal stacks" },
          { href: "/terminal/smart-money", title: "Smart Wallets", desc: "Evidence-based behavior \u2014 not balance alone" },
          { href: "/terminal/top-wallets", title: "Top Wallets", desc: "Relevant wallets on an event, with context" },
          { href: "/terminal/developers", title: "Dev Reputation", desc: "How this developer operates across launches" },
          { href: "/terminal/investigation", title: "Investigate", desc: "Full story: speed, history, risk, explanation" },
        ].map((m) => (
          <Link key={m.href} href={m.href} className="card-interactive p-4 block">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[13px] font-semibold tracking-tight">{m.title}</div>
              <span className="text-[var(--cyan)] text-[14px]">\u2192</span>
            </div>
            <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{m.desc}</p>
          </Link>
        ))}
      </div>

      <div className="card p-4 text-[12px] text-[var(--text-muted)] leading-relaxed">
        <span className="text-[var(--text)] font-semibold">Philosophy. </span>
        Don&apos;t blindly chase the move. Understand what created it. Evidence over prediction. Execution is optional.
      </div>
    </div>
  );
}
