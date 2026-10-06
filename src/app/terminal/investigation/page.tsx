"use client";

import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";
import Link from "next/link";

export default function InvestigationPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);
  const [selected, setSelected] = useState<LaunchSignal | null>(null);

  useEffect(() => {
    fetch("/api/signals/pumpfun?limit=30")
      .then((r) => r.json())
      .then((d) => {
        const list = (d.signals || []) as LaunchSignal[];
        setSignals(list);
        if (list[0]) setSelected(list[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="h-title">Investigate</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
            Full story on a live token: metrics, creator, signal reason \u2014 before you act.
          </p>
        </div>
        <span className="live-badge">LIVE</span>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-4">
        <div className="card p-3 max-h-[70vh] overflow-y-auto space-y-1">
          <div className="label px-2 py-2">Select token</div>
          {signals.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelected(s)}
              className={`w-full text-left px-2 py-2 rounded text-[12px] transition-colors ${
                selected?.id === s.id
                  ? "bg-[var(--cyan-dim)] text-[var(--cyan)]"
                  : "hover:bg-[var(--bg-hover)] text-[var(--text-muted)]"
              }`}
            >
              <div className="mono font-medium">{s.symbol}</div>
              <div className="text-[10px] text-[var(--text-dim)]">{formatAge(s.ageSec)} \u00b7 {s.signal}</div>
            </button>
          ))}
          {signals.length === 0 && <p className="text-[12px] text-[var(--text-dim)] px-2 py-4">Loading\u2026</p>}
        </div>

        {selected && (
          <div className="space-y-4">
            <div className="alert-card p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="mono text-xl font-semibold">{selected.symbol}</div>
                  <div className="text-[13px] text-[var(--text-muted)]">{selected.name}</div>
                </div>
                <span className={`text-[10px] tracking-wider font-semibold ${
                  selected.signal === "CRITICAL" ? "text-[var(--red)]" : selected.signal === "HIGH" ? "text-[var(--amber)]" : "text-[var(--cyan)]"
                }`}>{selected.signal}</span>
              </div>
              <p className="text-[13px] text-[var(--text-muted)] mb-4">{selected.note}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  ["Age", formatAge(selected.ageSec)],
                  ["Mcap", formatUsd(selected.mcapUsd)],
                  ["Curve", selected.curvePercent != null ? `${selected.curvePercent}%` : "\u2014"],
                  ["SOL real", selected.realSolReserves != null ? selected.realSolReserves.toFixed(2) : "\u2014"],
                ].map(([k, v]) => (
                  <div key={k} className="kpi">
                    <div className="label">{k}</div>
                    <div className="kpi-value text-[14px]">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5 space-y-3">
              <div className="h-section">Evidence checklist</div>
              {[
                ["Creator", selected.creator || "\u2014"],
                ["Mint", selected.mint],
                ["Complete curve", selected.complete ? "Yes" : "No"],
                ["Security", selected.security],
                ["Source", selected.source],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-[12px] gap-4 border-b border-[var(--border)] pb-2">
                  <span className="text-[var(--text-dim)]">{k}</span>
                  <span className="mono text-[var(--text-muted)] text-right break-all">{v}</span>
                </div>
              ))}
              {selected.creator && (
                <a href={`https://solscan.io/account/${selected.creator}`} target="_blank" rel="noreferrer" className="arrow-link inline-flex">Creator on Solscan</a>
              )}
              <a href={`https://pump.fun/coin/${selected.mint}`} target="_blank" rel="noreferrer" className="arrow-link inline-flex ml-4">Open on Pump.fun</a>
            </div>

            <div className="card p-4 text-[12px] text-[var(--text-muted)] leading-relaxed">
              <span className="text-[var(--text)] font-semibold">Reminder. </span>
              This is intelligence context, not a recommendation. Verify before any action.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
