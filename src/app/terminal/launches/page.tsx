"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

export default function LaunchesPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);
  const [mode, setMode] = useState("loading");

  useEffect(() => {
    const load = () =>
      fetch("/api/signals/pumpfun?limit=40")
        .then((r) => r.json())
        .then((d) => {
          setSignals(d.signals || []);
          setMode(d.mode || "live");
        })
        .catch(() => setMode("degraded"));
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="h-title">New launches</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">Live from Pump.fun \u00b7 newest first</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/terminal/pumpfun" className="arrow-link">Full feed</Link>
          <span className={mode === "live" ? "live-badge" : "sim-badge"}>
            {mode === "live" ? "LIVE" : mode.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="card overflow-x-auto">
        <table className="data-table min-w-[800px]">
          <thead>
            <tr>
              <th>Age</th>
              <th>Token</th>
              <th className="!text-right">Mcap</th>
              <th className="!text-right">Curve</th>
              <th className="!text-right">SOL res</th>
              <th>Creator</th>
              <th>Signal</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            {signals.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-[var(--text-dim)] py-8">Loading live launches\u2026</td>
              </tr>
            )}
            {signals.map((s) => (
              <tr key={s.id}>
                <td className="mono text-[var(--text-dim)]">{formatAge(s.ageSec)}</td>
                <td>
                  <a href={`https://pump.fun/coin/${s.mint}`} target="_blank" rel="noreferrer" className="mono text-[var(--cyan)] hover:underline">{s.symbol}</a>
                  <div className="text-[10px] text-[var(--text-dim)] truncate max-w-[120px]">{s.name}</div>
                </td>
                <td className="text-right mono">{formatUsd(s.mcapUsd)}</td>
                <td className="text-right mono">{s.curvePercent != null ? `${s.curvePercent}%` : "\u2014"}</td>
                <td className="text-right mono text-[var(--text-muted)]">{s.realSolReserves != null ? s.realSolReserves.toFixed(1) : "\u2014"}</td>
                <td className="mono text-[10px] text-[var(--text-dim)]">{s.creator ? `${s.creator.slice(0, 4)}\u2026${s.creator.slice(-4)}` : "\u2014"}</td>
                <td className="text-[10px] tracking-wider text-[var(--amber)]">{s.signal}</td>
                <td className="text-[11px] text-[var(--text-muted)] max-w-[180px] truncate">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
