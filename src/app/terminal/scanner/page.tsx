"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

export default function ScannerPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);
  const [mode, setMode] = useState("loading");
  useEffect(() => {
    fetch("/api/signals/pumpfun?limit=25").then((r) => r.json()).then((d) => { setSignals(d.signals || []); setMode(d.mode || "live"); }).catch(() => setMode("degraded"));
  }, []);

  return (
    <div className="p-5 space-y-5">
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-semibold">Scanner</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-xl">Watches launches and early activity. Bundling is not required for a signal.</p>
        </div>
        <span className={mode === "live" ? "live-badge" : "sim-badge"}>{mode === "live" ? "LIVE" : mode.toUpperCase()}</span>
      </div>
      <div className="panel overflow-x-auto">
        <table className="w-full text-[12px] min-w-[700px]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[10px] text-[var(--text-dim)] tracking-wider">
              <th className="text-left px-3 py-2.5">AGE</th>
              <th className="text-left px-3 py-2.5">TOKEN</th>
              <th className="text-right px-3 py-2.5">MCAP</th>
              <th className="text-right px-3 py-2.5">CURVE</th>
              <th className="text-left px-3 py-2.5">SIGNAL</th>
              <th className="text-left px-3 py-2.5">WHY</th>
            </tr>
          </thead>
          <tbody>
            {signals.length === 0 && <tr><td colSpan={6} className="px-3 py-8 text-center text-[var(--text-dim)]">Connecting\u2026</td></tr>}
            {signals.map((s) => (
              <tr key={s.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)]">
                <td className="px-3 py-2 mono text-[var(--text-dim)]">{formatAge(s.ageSec)}</td>
                <td className="px-3 py-2"><a href={`https://pump.fun/coin/${s.mint}`} target="_blank" rel="noreferrer" className="mono text-[var(--cyan)] hover:underline">{s.symbol}</a></td>
                <td className="px-3 py-2 text-right mono">{formatUsd(s.mcapUsd)}</td>
                <td className="px-3 py-2 text-right mono">{s.curvePercent != null ? `${s.curvePercent}%` : "\u2014"}</td>
                <td className="px-3 py-2 text-[10px] text-[var(--amber)]">{s.signal}</td>
                <td className="px-3 py-2 text-[11px] text-[var(--text-muted)] max-w-[220px] truncate">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link href="/terminal/pumpfun" className="text-[12px] text-[var(--cyan)] hover:underline">Full Pump.fun feed \u2192</Link>
    </div>
  );
}
