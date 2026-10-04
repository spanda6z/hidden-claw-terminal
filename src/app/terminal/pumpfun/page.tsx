"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PumpEvent = {
  id: string;
  time: string;
  ageSec: number;
  symbol: string;
  name: string;
  mcap: string;
  volume: string;
  liquidity: string;
  holders: number;
  curve: number;
  dev: string;
  devTier: "PROVEN" | "WATCH" | "RISKY" | "UNKNOWN";
  security: "PASS" | "WARNING" | "PENDING";
  elite: number;
  signal: "CRITICAL" | "HIGH" | "WATCH" | "INFO";
  note: string;
};

const SEED: PumpEvent[] = [
  { id: "p1", time: "13:04:31", ageSec: 12, symbol: "$CLAW", name: "Hidden Claw", mcap: "$842K", volume: "$128K", liquidity: "$184K", holders: 412, curve: 96.4, dev: "DEV_7F3A", devTier: "PROVEN", security: "PASS", elite: 3, signal: "CRITICAL", note: "3 elite buyers · curve 96% · proven dev" },
  { id: "p2", time: "13:04:18", ageSec: 28, symbol: "$WOLF", name: "Night Wolf", mcap: "$411K", volume: "$64K", liquidity: "$92K", holders: 218, curve: 83.2, dev: "DEV_91AB", devTier: "WATCH", security: "PASS", elite: 1, signal: "HIGH", note: "Strong early volume · 1 elite entry" },
  { id: "p3", time: "13:03:55", ageSec: 47, symbol: "$GRID", name: "Grid Runner", mcap: "$96K", volume: "$22K", liquidity: "$38K", holders: 89, curve: 41.0, dev: "DEV_4D21", devTier: "RISKY", security: "WARNING", elite: 0, signal: "WATCH", note: "Risky developer · concentration check" },
  { id: "p4", time: "13:03:41", ageSec: 61, symbol: "$PULSE", name: "Pulse", mcap: "$210K", volume: "$48K", liquidity: "$71K", holders: 156, curve: 67.5, dev: "DEV_7F3A", devTier: "PROVEN", security: "PASS", elite: 2, signal: "HIGH", note: "Proven dev · 2 elite · clean security" },
  { id: "p5", time: "13:03:12", ageSec: 88, symbol: "$NODE", name: "NodeX", mcap: "$54K", volume: "$9K", liquidity: "$18K", holders: 41, curve: 22.1, dev: "DEV_X9K2", devTier: "UNKNOWN", security: "PENDING", elite: 0, signal: "INFO", note: "New launch · security pending" },
  { id: "p6", time: "13:02:48", ageSec: 112, symbol: "$ARC", name: "Arc", mcap: "$310K", volume: "$71K", liquidity: "$95K", holders: 287, curve: 78.9, dev: "DEV_91AB", devTier: "WATCH", security: "PASS", elite: 1, signal: "HIGH", note: "Volume acceleration · holder growth" },
  { id: "p7", time: "13:02:21", ageSec: 139, symbol: "$SEED", name: "Seed", mcap: "$18K", volume: "$3K", liquidity: "$8K", holders: 22, curve: 9.4, dev: "DEV_UNK", devTier: "UNKNOWN", security: "PENDING", elite: 0, signal: "INFO", note: "Early stage · insufficient volume" },
  { id: "p8", time: "13:01:58", ageSec: 162, symbol: "$BOLT", name: "Bolt", mcap: "$520K", volume: "$95K", liquidity: "$140K", holders: 334, curve: 91.2, dev: "DEV_7F3A", devTier: "PROVEN", security: "PASS", elite: 4, signal: "CRITICAL", note: "4 elite · curve 91% · imminent graduation" },
];

const signalClass: Record<string, string> = {
  CRITICAL: "text-[var(--red)]",
  HIGH: "text-[var(--amber)]",
  WATCH: "text-[var(--cyan)]",
  INFO: "text-[var(--text-dim)]",
};

const tierClass: Record<string, string> = {
  PROVEN: "text-[var(--green)]",
  WATCH: "text-[var(--amber)]",
  RISKY: "text-[var(--red)]",
  UNKNOWN: "text-[var(--text-dim)]",
};

export default function PumpFunFeedPage() {
  const [events, setEvents] = useState(SEED);
  const [filter, setFilter] = useState<"ALL" | "CRITICAL" | "HIGH" | "WATCH">("ALL");
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      setEvents((prev) => prev.map((e) => ({ ...e, ageSec: e.ageSec + 1 })));
    }, 1000);
    return () => clearInterval(t);
  }, [live]);

  const filtered = filter === "ALL" ? events : events.filter((e) => e.signal === filter);

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)]">PUMP.FUN FEED</h1>
          <p className="text-[11px] text-[var(--text-dim)] mt-0.5">New launches · bonding curve · early signals · Simulation</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLive((v) => !v)} className={`text-[10px] tracking-wider px-2.5 py-1 border rounded ${live ? "border-[var(--green)] text-[var(--green)]" : "border-[var(--border)] text-[var(--text-dim)]"}`}>
            {live ? "\u25CF LIVE" : "\u25CB PAUSED"}
          </button>
          <span className="sim-badge">SIMULATION</span>
        </div>
      </div>

      <div className="flex gap-1 flex-wrap">
        {(["ALL", "CRITICAL", "HIGH", "WATCH"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-[10px] tracking-wider font-medium rounded transition-colors ${filter === f ? "bg-[var(--bg-hover)] text-[var(--text)]" : "text-[var(--text-dim)] hover:text-[var(--text-muted)]"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "LAUNCHES (SIM)", value: String(events.length) },
          { label: "CRITICAL", value: String(events.filter((e) => e.signal === "CRITICAL").length), red: true },
          { label: "AVG CURVE", value: "61%" },
          { label: "ELITE HITS", value: String(events.reduce((a, e) => a + e.elite, 0)), green: true },
        ].map((k) => (
          <div key={k.label} className="bg-[var(--bg-panel)] border border-[var(--border)] rounded px-4 py-2.5">
            <div className="text-[10px] text-[var(--text-dim)] tracking-wider">{k.label}</div>
            <div className={`text-sm font-semibold mono mt-0.5 ${k.red ? "text-[var(--red)]" : ""} ${k.green ? "text-[var(--green)]" : ""}`}>{k.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[10px] tracking-wider text-[var(--text-dim)]">
              <th className="text-left px-3 py-2.5">AGE</th>
              <th className="text-left px-3 py-2.5">TOKEN</th>
              <th className="text-right px-3 py-2.5">MCAP</th>
              <th className="text-right px-3 py-2.5">VOL</th>
              <th className="text-right px-3 py-2.5">LIQ</th>
              <th className="text-right px-3 py-2.5">HOLDERS</th>
              <th className="text-right px-3 py-2.5">CURVE</th>
              <th className="text-left px-3 py-2.5">DEV</th>
              <th className="text-left px-3 py-2.5">SEC</th>
              <th className="text-right px-3 py-2.5">ELITE</th>
              <th className="text-left px-3 py-2.5">SIGNAL</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors">
                <td className="px-3 py-2.5 mono text-[var(--text-dim)]">{e.ageSec < 60 ? `${e.ageSec}s` : `${Math.floor(e.ageSec / 60)}m`}</td>
                <td className="px-3 py-2.5">
                  <Link href={`/terminal/token/${e.symbol.replace("$", "")}`} className="mono text-[var(--cyan)] hover:underline font-medium">{e.symbol}</Link>
                  <div className="text-[10px] text-[var(--text-dim)]">{e.name}</div>
                </td>
                <td className="px-3 py-2.5 text-right mono">{e.mcap}</td>
                <td className="px-3 py-2.5 text-right mono">{e.volume}</td>
                <td className="px-3 py-2.5 text-right mono">{e.liquidity}</td>
                <td className="px-3 py-2.5 text-right mono">{e.holders}</td>
                <td className={`px-3 py-2.5 text-right mono font-medium ${e.curve >= 90 ? "text-[var(--amber)]" : ""}`}>{e.curve}%</td>
                <td className={`px-3 py-2.5 text-[10px] tracking-wider font-medium ${tierClass[e.devTier]}`}>{e.devTier}</td>
                <td className={`px-3 py-2.5 text-[10px] tracking-wider ${e.security === "PASS" ? "text-[var(--green)]" : e.security === "WARNING" ? "text-[var(--amber)]" : "text-[var(--text-dim)]"}`}>{e.security}</td>
                <td className="px-3 py-2.5 text-right mono text-[var(--green)]">{e.elite || "—"}</td>
                <td className={`px-3 py-2.5 text-[10px] tracking-wider font-medium ${signalClass[e.signal]}`}>{e.signal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-[var(--text-dim)]">Simulated Pump.fun launch stream · Ages tick live · Not connected to chain · No real trades</p>
    </div>
  );
}
