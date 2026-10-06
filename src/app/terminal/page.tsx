"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

export default function TerminalOverview() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);
  const [mode, setMode] = useState("loading");
  const [sol, setSol] = useState<number | null>(null);

  useEffect(() => {
    const load = () => {
      fetch("/api/signals/pumpfun?limit=12")
        .then((r) => r.json())
        .then((d) => {
          setSignals(d.signals || []);
          setMode(d.mode || "live");
        })
        .catch(() => setMode("degraded"));
      fetch("/api/signals/sol")
        .then((r) => r.json())
        .then((d) => setSol(d.usd ?? null))
        .catch(() => {});
    };
    load();
    const t = setInterval(load, 12000);
    return () => clearInterval(t);
  }, []);

  const critical = signals.filter((s) => s.signal === "CRITICAL" || s.signal === "HIGH");

  return (
    <div className="p-5 md:p-6 space-y-5 min-h-full">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="label mb-1.5">Command center</div>
          <h1 className="h-title">Market intelligence</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1.5 max-w-xl leading-relaxed">
            Live Pump.fun stream. Watch footprints, measure acceleration, then decide.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span className={mode === "live" ? "live-badge" : "sim-badge"}>
            {mode === "live" ? "LIVE" : mode.toUpperCase()}
          </span>
          {sol != null && <span className="badge badge-cyan mono">SOL ${sol.toFixed(2)}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Stream", value: String(signals.length || "\u2014"), sub: "launches" },
          { label: "Priority", value: String(critical.length || "0"), sub: "high / critical" },
          { label: "Source", value: "Pump.fun", sub: "public API" },
          { label: "Refresh", value: "12s", sub: "auto poll" },
        ].map((k) => (
          <div key={k.label} className="kpi">
            <div className="label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="text-[10px] text-[var(--text-dim)] mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {critical[0] && (
        <section>
          <div className="h-section mb-3">Priority signal</div>
          <div className="alert-card p-5">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="label mb-1" style={{ color: "var(--cyan)" }}>
                  {critical[0].signal} \u00b7 {formatAge(critical[0].ageSec)}
                </div>
                <div className="text-[16px] font-semibold tracking-tight mono">{critical[0].symbol}</div>
                <p className="text-[13px] text-[var(--text-muted)] mt-1">{critical[0].note}</p>
              </div>
              <span className="badge badge-amber">{critical[0].signal}</span>
            </div>
            <div className="flex flex-wrap gap-4 text-[12px] mono text-[var(--text-dim)] mb-3">
              <span>Mcap {formatUsd(critical[0].mcapUsd)}</span>
              <span>Curve {critical[0].curvePercent != null ? `${critical[0].curvePercent}%` : "\u2014"}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href={`https://pump.fun/coin/${critical[0].mint}`} target="_blank" rel="noreferrer" className="arrow-link">View on Pump.fun</a>
              <Link href="/terminal/scanner" className="arrow-link">Open scanner</Link>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="h-section">Latest launches</div>
          <Link href="/terminal/launches" className="arrow-link">All launches</Link>
        </div>
        <div className="card overflow-x-auto">
          <table className="data-table min-w-[640px]">
            <thead>
              <tr>
                <th>Age</th>
                <th>Token</th>
                <th className="!text-right">Mcap</th>
                <th className="!text-right">Curve</th>
                <th>Signal</th>
              </tr>
            </thead>
            <tbody>
              {signals.slice(0, 8).map((s) => (
                <tr key={s.id}>
                  <td className="mono text-[var(--text-dim)]">{formatAge(s.ageSec)}</td>
                  <td>
                    <a href={`https://pump.fun/coin/${s.mint}`} target="_blank" rel="noreferrer" className="mono text-[var(--cyan)] hover:underline">{s.symbol}</a>
                  </td>
                  <td className="text-right mono">{formatUsd(s.mcapUsd)}</td>
                  <td className="text-right mono">{s.curvePercent != null ? `${s.curvePercent}%` : "\u2014"}</td>
                  <td className="text-[10px] tracking-wider text-[var(--amber)]">{s.signal}</td>
                </tr>
              ))}
              {signals.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-[var(--text-dim)] py-6">Loading live stream\u2026</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { href: "/terminal/scanner", title: "Scanner", desc: "Full launch table + reasons" },
          { href: "/terminal/pumpfun", title: "Pump.fun", desc: "Filtered live feed" },
          { href: "/terminal/developers", title: "Dev reputation", desc: "Creator wallets in sample" },
          { href: "/terminal/curves", title: "Curves", desc: "Bonding progress bars" },
          { href: "/terminal/feed", title: "Live feed", desc: "By last trade activity" },
          { href: "/terminal/detection", title: "Detection", desc: "Signal framing engine" },
        ].map((m) => (
          <Link key={m.href} href={m.href} className="card-interactive p-4 block">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[13px] font-semibold">{m.title}</div>
              <span className="text-[var(--cyan)]">\u2192</span>
            </div>
            <p className="text-[12px] text-[var(--text-muted)]">{m.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
