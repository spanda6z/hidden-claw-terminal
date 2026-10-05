"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TerminalOverview() {
  const [liveCount, setLiveCount] = useState<number | null>(null);
  useEffect(() => {
    fetch("/api/signals/pumpfun?limit=20").then((r) => r.json()).then((d) => setLiveCount(d.count ?? d.signals?.length ?? null)).catch(() => {});
  }, []);

  return (
    <div className="p-5 space-y-5 grid-bg min-h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Market intelligence</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-xl">
            Watch the market. Find the footprints. Connect the wallets. Study the developers. Measure the acceleration. Understand the pattern \u2014 then decide.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <span className="live-badge">PUMP.FUN LIVE</span>
          {liveCount != null && <span className="sim-badge">{liveCount} launches</span>}
        </div>
      </div>

      <section>
        <div className="text-[11px] tracking-[0.12em] text-[var(--text-dim)] mb-3">PRIMARY ALERTS</div>
        <div className="alert-card p-4">
          <div className="text-[10px] tracking-[0.1em] text-[var(--cyan)] mb-1">ACCELERATION + STREAM</div>
          <div className="text-[15px] font-semibold">Live Pump.fun activity</div>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 mb-3">Launches streaming with heuristic scores. Something unusual may be forming \u2014 investigate before reacting.</p>
          <ul className="text-[12px] text-[var(--text-muted)] space-y-1 mb-3">
            <li>\u2192 Pump.fun stream is live</li>
            <li>\u2192 Scoring active (age + curve + mcap)</li>
            <li>\u2192 Open Scanner or Pump.fun for current tokens</li>
          </ul>
          <div className="flex gap-3">
            <Link href="/terminal/scanner" className="text-[11px] text-[var(--cyan)] hover:underline">OPEN SCANNER \u2192</Link>
            <Link href="/terminal/pumpfun" className="text-[11px] text-[var(--cyan)] hover:underline">PUMP.FUN FEED \u2192</Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { href: "/terminal/scanner", title: "Scanner", desc: "New launches, volume, holder growth" },
          { href: "/terminal/detection", title: "Detection", desc: "Acceleration, coordination, patterns" },
          { href: "/terminal/smart-money", title: "Smart Wallets", desc: "Evidence-based wallet behavior" },
          { href: "/terminal/top-wallets", title: "Top Wallets", desc: "Relevant wallets with context" },
          { href: "/terminal/developers", title: "Dev Reputation", desc: "How this developer operates" },
          { href: "/terminal/investigation", title: "Investigate", desc: "Full story and risk" },
        ].map((m) => (
          <Link key={m.href} href={m.href} className="panel p-4 hover:border-[var(--border-strong)] transition-colors group">
            <div className="text-[13px] font-semibold group-hover:text-[var(--cyan)]">{m.title}</div>
            <p className="text-[12px] text-[var(--text-muted)] mt-1.5">{m.desc}</p>
          </Link>
        ))}
      </div>

      <div className="panel p-4 text-[12px] text-[var(--text-muted)]">
        <span className="text-[var(--text)] font-medium">Philosophy: </span>
        Don&apos;t blindly chase the move. Understand what created it. Evidence over prediction. Execution is optional.
      </div>
    </div>
  );
}
