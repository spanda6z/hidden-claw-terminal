"use client";

import Link from "next/link";

const LAUNCHES = [
  { token: "$CLAW", platform: "PUMP.FUN", age: "42s", mcap: "$842K", vol: "$128K", curve: "96.4%", dev: "PROVEN", security: "PASS", elite: 3, priority: "CRITICAL" },
  { token: "$BOLT", platform: "PUMP.FUN", age: "2m", mcap: "$520K", vol: "$95K", curve: "91.2%", dev: "PROVEN", security: "PASS", elite: 4, priority: "CRITICAL" },
  { token: "$WOLF", platform: "PUMP.FUN", age: "28s", mcap: "$411K", vol: "$64K", curve: "83.2%", dev: "WATCH", security: "PASS", elite: 1, priority: "HIGH" },
  { token: "$ARC", platform: "PUMP.FUN", age: "1m", mcap: "$310K", vol: "$71K", curve: "78.9%", dev: "WATCH", security: "PASS", elite: 1, priority: "HIGH" },
  { token: "$PULSE", platform: "PUMP.FUN", age: "61s", mcap: "$210K", vol: "$48K", curve: "67.5%", dev: "PROVEN", security: "PASS", elite: 2, priority: "HIGH" },
  { token: "$GRID", platform: "PUMP.FUN", age: "47s", mcap: "$96K", vol: "$22K", curve: "41.0%", dev: "RISKY", security: "WARNING", elite: 0, priority: "WATCH" },
  { token: "$NODE", platform: "PUMP.FUN", age: "88s", mcap: "$54K", vol: "$9K", curve: "22.1%", dev: "UNKNOWN", security: "PENDING", elite: 0, priority: "INFO" },
];

export default function LaunchesPage() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)]">NEW LAUNCHES</h1>
          <p className="text-[11px] text-[var(--text-dim)] mt-0.5">Pump.fun detected launches · Simulation</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/terminal/pumpfun" className="text-[11px] text-[var(--cyan)] hover:underline">PUMP.FUN FEED →</Link>
          <span className="sim-badge">SIMULATION</span>
        </div>
      </div>
      <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded overflow-hidden">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-[var(--border)] text-[10px] tracking-wider text-[var(--text-dim)]">
              <th className="text-left px-4 py-2.5">TOKEN</th>
              <th className="text-left px-4 py-2.5">PLATFORM</th>
              <th className="text-right px-4 py-2.5">AGE</th>
              <th className="text-right px-4 py-2.5">MCAP</th>
              <th className="text-right px-4 py-2.5">VOL</th>
              <th className="text-right px-4 py-2.5">CURVE</th>
              <th className="text-left px-4 py-2.5">DEV</th>
              <th className="text-left px-4 py-2.5">SECURITY</th>
              <th className="text-right px-4 py-2.5">ELITE</th>
              <th className="text-left px-4 py-2.5">PRIORITY</th>
            </tr>
          </thead>
          <tbody>
            {LAUNCHES.map((l) => (
              <tr key={l.token} className="border-b border-[var(--border)] hover:bg-[var(--bg-hover)]">
                <td className="px-4 py-2.5">
                  <Link href={`/terminal/token/${l.token.replace("$","")}`} className="mono text-[var(--cyan)] hover:underline">{l.token}</Link>
                </td>
                <td className="px-4 py-2.5 text-[var(--text-muted)]">{l.platform}</td>
                <td className="px-4 py-2.5 text-right mono text-[var(--text-dim)]">{l.age}</td>
                <td className="px-4 py-2.5 text-right mono">{l.mcap}</td>
                <td className="px-4 py-2.5 text-right mono">{l.vol}</td>
                <td className="px-4 py-2.5 text-right mono text-[var(--amber)]">{l.curve}</td>
                <td className="px-4 py-2.5 text-[11px] tracking-wider">{l.dev}</td>
                <td className="px-4 py-2.5 text-[11px] text-[var(--green)]">{l.security}</td>
                <td className="px-4 py-2.5 text-right mono text-[var(--green)]">{l.elite || "—"}</td>
                <td className="px-4 py-2.5 text-[11px] tracking-wider font-medium text-[var(--amber)]">{l.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-[var(--text-dim)]">Simulated launches · Not live Pump.fun data</p>
    </div>
  );
}
