"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { LaunchSignal, SignalTier } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

const TIERS: (SignalTier | "ALL")[] = ["ALL", "CRITICAL", "HIGH", "WATCH", "INFO"];

export default function ScannerPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);
  const [mode, setMode] = useState("loading");
  const [filter, setFilter] = useState<(typeof TIERS)[number]>("ALL");
  const [q, setQ] = useState("");
  const [updated, setUpdated] = useState<string | null>(null);

  useEffect(() => {
    const load = () =>
      fetch("/api/signals/pumpfun?limit=40")
        .then((r) => r.json())
        .then((d) => {
          setSignals(d.signals || []);
          setMode(d.mode || "live");
          setUpdated(d.updatedAt || new Date().toISOString());
        })
        .catch(() => setMode("degraded"));
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, []);

  const rows = useMemo(() => {
    return signals.filter((s) => {
      if (filter !== "ALL" && s.signal !== filter) return false;
      if (q) {
        const needle = q.toLowerCase();
        return (
          s.symbol.toLowerCase().includes(needle) ||
          s.name.toLowerCase().includes(needle) ||
          s.mint.toLowerCase().includes(needle)
        );
      }
      return true;
    });
  }, [signals, filter, q]);

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="h-title">Scanner</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-xl">
            Live launches with age, mcap, curve, and why the signal fired. Auto-refresh every 10s.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={mode === "live" ? "live-badge" : "sim-badge"}>
            {mode === "live" ? "LIVE" : mode.toUpperCase()}
          </span>
          <span className="text-[10px] mono text-[var(--text-dim)]">
            {updated ? new Date(updated).toLocaleTimeString() : "\u2014"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {TIERS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={`text-[10px] tracking-wider px-2.5 py-1.5 rounded border transition-colors ${
              filter === t
                ? "border-[var(--cyan)] text-[var(--cyan)] bg-[var(--cyan-dim)]"
                : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]"
            }`}
          >
            {t}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search symbol / mint\u2026"
          className="ml-auto bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-1.5 text-[12px] mono outline-none focus:border-[var(--cyan)]/40 min-w-[180px]"
        />
      </div>

      <div className="card overflow-x-auto">
        <table className="data-table min-w-[780px]">
          <thead>
            <tr>
              <th>Age</th>
              <th>Token</th>
              <th className="!text-right">Mcap</th>
              <th className="!text-right">Curve</th>
              <th className="!text-right">SOL</th>
              <th>Signal</th>
              <th>Why</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-[var(--text-dim)] py-8">
                  {signals.length === 0 ? "Connecting to Pump.fun\u2026" : "No rows for this filter"}
                </td>
              </tr>
            )}
            {rows.map((s) => (
              <tr key={s.id}>
                <td className="mono text-[var(--text-dim)]">{formatAge(s.ageSec)}</td>
                <td>
                  <div className="mono text-[var(--cyan)] font-medium">{s.symbol}</div>
                  <div className="text-[10px] text-[var(--text-dim)] truncate max-w-[140px]">{s.name}</div>
                </td>
                <td className="text-right mono">{formatUsd(s.mcapUsd)}</td>
                <td className="text-right mono">{s.curvePercent != null ? `${s.curvePercent}%` : "\u2014"}</td>
                <td className="text-right mono text-[var(--text-muted)]">
                  {s.realSolReserves != null ? s.realSolReserves.toFixed(1) : "\u2014"}
                </td>
                <td>
                  <span
                    className={`text-[10px] tracking-wider font-semibold ${
                      s.signal === "CRITICAL"
                        ? "text-[var(--red)]"
                        : s.signal === "HIGH"
                          ? "text-[var(--amber)]"
                          : s.signal === "WATCH"
                            ? "text-[var(--cyan)]"
                            : "text-[var(--text-dim)]"
                    }`}
                  >
                    {s.signal}
                  </span>
                </td>
                <td className="text-[11px] text-[var(--text-muted)] max-w-[200px] truncate">{s.note}</td>
                <td>
                  <a href={`https://pump.fun/coin/${s.mint}`} target="_blank" rel="noreferrer" className="text-[var(--cyan)] text-[12px] hover:underline">
                    \u2192
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-[var(--text-dim)]">
        {rows.length} shown \u00b7{" "}
        <Link href="/terminal/launches" className="text-[var(--cyan)] hover:underline">Launches view</Link>
      </p>
    </div>
  );
}
