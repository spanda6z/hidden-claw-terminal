"use client";

import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<LaunchSignal[]>([]);
  const [mode, setMode] = useState("loading");

  useEffect(() => {
    const load = () =>
      fetch("/api/signals/pumpfun?limit=40")
        .then((r) => r.json())
        .then((d) => {
          const list = (d.signals || []) as LaunchSignal[];
          setAlerts(list.filter((s) => s.signal === "CRITICAL" || s.signal === "HIGH"));
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
          <h1 className="h-title">Alerts</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">CRITICAL and HIGH signals from the live stream</p>
        </div>
        <span className={mode === "live" ? "live-badge" : "sim-badge"}>
          {mode === "live" ? "LIVE" : mode.toUpperCase()}
        </span>
      </div>
      {alerts.length === 0 && (
        <div className="card p-8 text-center text-[13px] text-[var(--text-dim)]">
          No high-priority signals in the current sample. Scanner is still watching.
        </div>
      )}
      <div className="space-y-3">
        {alerts.map((s) => (
          <a
            key={s.id}
            href={`https://pump.fun/coin/${s.mint}`}
            target="_blank"
            rel="noreferrer"
            className={`block p-4 alert-card ${s.signal === "CRITICAL" ? "border-[var(--red)]/30" : ""}`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <span className={`text-[10px] tracking-wider font-semibold ${s.signal === "CRITICAL" ? "text-[var(--red)]" : "text-[var(--amber)]"}`}>
                  {s.signal}
                </span>
                <div className="mono text-[15px] font-semibold mt-0.5">{s.symbol}</div>
                <div className="text-[12px] text-[var(--text-muted)]">{s.note}</div>
              </div>
              <span className="mono text-[11px] text-[var(--text-dim)]">{formatAge(s.ageSec)}</span>
            </div>
            <div className="flex gap-4 text-[11px] mono text-[var(--text-dim)]">
              <span>{formatUsd(s.mcapUsd)}</span>
              <span>{s.curvePercent != null ? `${s.curvePercent}% curve` : "\u2014"}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
