"use client";

import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatUsd } from "@/lib/signals";

export default function CurvesPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);

  useEffect(() => {
    fetch("/api/signals/trending?limit=40")
      .then((r) => r.json())
      .then((d) => {
        const list = (d.signals || []) as LaunchSignal[];
        setSignals([...list].sort((a, b) => (b.curvePercent ?? 0) - (a.curvePercent ?? 0)));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="h-title">Bonding curves</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">
            Live Pump.fun curve progress (from virtual SOL reserves)
          </p>
        </div>
        <span className="live-badge">LIVE</span>
      </div>
      <div className="space-y-3">
        {signals.map((s) => {
          const pct = s.curvePercent ?? 0;
          return (
            <a
              key={s.id}
              href={`https://pump.fun/coin/${s.mint}`}
              target="_blank"
              rel="noreferrer"
              className="card p-4 block hover:border-[var(--border-strong)]"
            >
              <div className="flex justify-between mb-2">
                <span className="mono text-[var(--cyan)] font-medium">{s.symbol}</span>
                <span className="mono text-[13px] font-semibold">{pct.toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden border border-[var(--border)]">
                <div className="h-full rounded-full bg-[var(--cyan)]/70" style={{ width: `${Math.min(100, pct)}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-[11px] text-[var(--text-dim)]">
                <span>{formatUsd(s.mcapUsd)} mcap</span>
                <span>{s.realSolReserves != null ? `${s.realSolReserves.toFixed(1)} SOL real` : "\u2014"}</span>
              </div>
            </a>
          );
        })}
        {signals.length === 0 && (
          <div className="text-[13px] text-[var(--text-dim)] py-8 text-center">Loading curves\u2026</div>
        )}
      </div>
    </div>
  );
}
