"use client";

import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

export default function FeedPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);
  const [mode, setMode] = useState("loading");

  useEffect(() => {
    const load = () =>
      fetch("/api/signals/trending?limit=35")
        .then((r) => r.json())
        .then((d) => {
          setSignals(d.signals || []);
          setMode(d.mode || "live");
        })
        .catch(() => setMode("degraded"));
    load();
    const t = setInterval(load, 12000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="h-title">Live feed</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">Most recently traded Pump.fun tokens \u00b7 live</p>
        </div>
        <span className={mode === "live" ? "live-badge" : "sim-badge"}>
          {mode === "live" ? "LIVE" : mode.toUpperCase()}
        </span>
      </div>
      <div className="space-y-2">
        {signals.map((s) => (
          <a
            key={s.id}
            href={`https://pump.fun/coin/${s.mint}`}
            target="_blank"
            rel="noreferrer"
            className="card-interactive p-3 flex items-center gap-4 block"
          >
            <div className="mono text-[11px] text-[var(--text-dim)] w-12">{formatAge(s.ageSec)}</div>
            <div className="flex-1 min-w-0">
              <div className="mono text-[var(--cyan)] font-medium">{s.symbol}</div>
              <div className="text-[11px] text-[var(--text-dim)] truncate">{s.name}</div>
            </div>
            <div className="text-right mono text-[12px]">{formatUsd(s.mcapUsd)}</div>
            <div className="text-[10px] tracking-wider text-[var(--amber)] w-16 text-right">{s.signal}</div>
          </a>
        ))}
        {signals.length === 0 && (
          <div className="text-[13px] text-[var(--text-dim)] py-8 text-center">Loading live feed\u2026</div>
        )}
      </div>
    </div>
  );
}
