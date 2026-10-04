"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

const signalClass: Record<string, string> = {
  CRITICAL: "text-[var(--red)]",
  HIGH: "text-[var(--amber)]",
  WATCH: "text-[var(--cyan)]",
  INFO: "text-[var(--text-dim)]",
};

export default function PumpFunFeedPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);
  const [filter, setFilter] = useState<"ALL" | "CRITICAL" | "HIGH" | "WATCH">("ALL");
  const [live, setLive] = useState(true);
  const [mode, setMode] = useState<"loading" | "live" | "degraded">("loading");
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/signals/pumpfun?limit=40", { cache: "no-store" });
      const data = await res.json();
      if (data.signals?.length) {
        setSignals(data.signals);
        setMode(data.mode === "live" ? "live" : "degraded");
        setError(data.error);
        setUpdatedAt(data.updatedAt);
      } else {
        setMode("degraded");
        setError(data.error || "No signals");
      }
    } catch (e) {
      setMode("degraded");
      setError(e instanceof Error ? e.message : "Fetch failed");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(load, 8000);
    return () => clearInterval(t);
  }, [live, load]);

  useEffect(() => {
    if (!live || signals.length === 0) return;
    const t = setInterval(() => {
      setSignals((prev) => prev.map((s) => ({ ...s, ageSec: s.ageSec + 1 })));
    }, 1000);
    return () => clearInterval(t);
  }, [live, signals.length]);

  const filtered = filter === "ALL" ? signals : signals.filter((e) => e.signal === filter);
  const critical = signals.filter((e) => e.signal === "CRITICAL").length;
  const high = signals.filter((e) => e.signal === "HIGH").length;

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)]">PUMP.FUN FEED</h1>
          <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Real launches from Pump.fun · Scored · Poll 8s</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLive((v) => !v)} className={`text-[10px] tracking-wider px-2.5 py-1 border rounded ${live ? "border-[var(--green)] text-[var(--green)]" : "border-[var(--border)] text-[var(--text-dim)]"}`}>
            {live ? "\u25CF LIVE" : "\u25CB PAUSED"}
          </button>
          <span className={`text-[10px] tracking-wider px-2 py-1 border rounded ${mode === "live" ? "border-[var(--green)] text-[var(--green)]" : mode === "loading" ? "border-[var(--border)] text-[var(--text-dim)]" : "border-[var(--amber)] text-[var(--amber)]"}`}>
            {mode === "live" ? "REAL SIGNALS" : mode === "loading" ? "CONNECTING\u2026" : "DEGRADED"}
          </span>
        </div>
      </div>

      {error && <div className="text-[11px] text-[var(--amber)] border border-[var(--border)] rounded px-3 py-2">{error} — retrying</div>}

      <div className="flex gap-1 flex-wrap">
        {(["ALL", "CRITICAL", "HIGH", "WATCH"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-[10px] tracking-wider font-medium rounded ${filter === f ? "bg-[var(--bg-hover)] text-[var(--text)]" : "text-[var(--text-dim)]"}`}>{f}</button>
        ))}
        <button onClick={load} className="ml-auto px-3 py-1.5 text-[10px] tracking-wider text-[var(--cyan)] hover:underline">REFRESH</button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "LAUNCHES", value: String(signals.length) },
          { label: "CRITICAL", value: String(critical), red: true },
          { label: "HIGH", value: String(high), amber: true },
          { label: "UPDATED", value: updatedAt ? new Date(updatedAt).toLocaleTimeString() : "\u2014" },
        ].map((k) => (
          <div key={k.label} className="bg-[var(--bg-panel)] border border-[var(--border)] rounded px-4 py-2.5">
            <div className="text-[10px] text-[var(--text-dim)] tracking-wider">{k.label}</div>
            <div className={`text-sm font-semibold mono mt-0.5 ${k.red ? "text-[var(--red)]" : k.amber ? "text-[var(--amber)]" : ""}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded overflow-x-auto">
        <table className="w-full text-[12px] min-w-[900px]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[10px] tracking-wider text-[var(--text-dim)]">
              <th className="text-left px-3 py-2.5">AGE</th>
              <th className="text-left px-3 py-2.5">TOKEN</th>
              <th className="text-right px-3 py-2.5">MCAP</th>
              <th className="text-right px-3 py-2.5">CURVE</th>
              <th className="text-right px-3 py-2.5">SOL RES</th>
              <th className="text-left px-3 py-2.5">CREATOR</th>
              <th className="text-left px-3 py-2.5">SEC</th>
              <th className="text-left px-3 py-2.5">SIGNAL</th>
              <th className="text-left px-3 py-2.5">NOTE</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="px-3 py-8 text-center text-[var(--text-dim)]">{mode === "loading" ? "Loading real Pump.fun launches\u2026" : "No signals match filter"}</td></tr>
            )}
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)]">
                <td className="px-3 py-2.5 mono text-[var(--text-dim)]">{formatAge(e.ageSec)}</td>
                <td className="px-3 py-2.5">
                  <a href={`https://pump.fun/coin/${e.mint}`} target="_blank" rel="noreferrer" className="mono text-[var(--cyan)] hover:underline font-medium">{e.symbol}</a>
                  <div className="text-[10px] text-[var(--text-dim)] truncate max-w-[140px]">{e.name}</div>
                </td>
                <td className="px-3 py-2.5 text-right mono">{formatUsd(e.mcapUsd)}</td>
                <td className={`px-3 py-2.5 text-right mono font-medium ${(e.curvePercent ?? 0) >= 90 ? "text-[var(--amber)]" : ""}`}>{e.curvePercent != null ? `${e.curvePercent}%` : "\u2014"}</td>
                <td className="px-3 py-2.5 text-right mono text-[var(--text-muted)]">{e.virtualSolReserves != null ? `${e.virtualSolReserves.toFixed(1)}` : "\u2014"}</td>
                <td className="px-3 py-2.5 mono text-[10px] text-[var(--text-dim)]">{e.creator ? `${e.creator.slice(0, 4)}...${e.creator.slice(-4)}` : "\u2014"}</td>
                <td className={`px-3 py-2.5 text-[10px] tracking-wider ${e.security === "PASS" ? "text-[var(--green)]" : e.security === "WARNING" ? "text-[var(--amber)]" : "text-[var(--text-dim)]"}`}>{e.security}</td>
                <td className={`px-3 py-2.5 text-[10px] tracking-wider font-medium ${signalClass[e.signal]}`}>{e.signal}</td>
                <td className="px-3 py-2.5 text-[11px] text-[var(--text-muted)] max-w-[200px] truncate">{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-[var(--text-dim)]">
        Source: Pump.fun API · Heuristic scores · No execution ·{" "}
        <Link href="/api/signals/status" className="text-[var(--cyan)] hover:underline">/api/signals/status</Link>
      </p>
    </div>
  );
}
