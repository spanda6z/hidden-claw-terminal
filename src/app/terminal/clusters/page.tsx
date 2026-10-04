"use client";
import { TICKER_CLUSTERS } from "@/lib/mock-data";
export default function ClustersPage() {
  const claw = TICKER_CLUSTERS[0];
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)]">TICKER CLUSTERS</h1>
          <p className="text-[11px] text-[var(--text-dim)] mt-0.5">3+ unique sources within 60s · Simulation</p>
        </div>
        <span className="sim-badge">SIMULATION</span>
      </div>
      <div className="bg-[var(--bg-panel)] border border-[var(--border)] rounded p-5 max-w-md">
        <div className="text-lg mono font-semibold mb-4">{claw.ticker}</div>
        <div className="space-y-2 text-[12px]">
          {[
            ["3+ UNIQUE SOURCES", "YES"],
            ["TRUSTED SOURCE", "YES"],
            ["BLACKLISTED", "NO"],
            ["NEW TOKEN", "YES"],
            ["STATUS", "FIRE"],
          ].map(([l, v]) => (
            <div key={l} className="flex justify-between border-b border-[var(--border)] pb-2">
              <span className="text-[var(--text-muted)]">{l}</span>
              <span className={v === "FIRE" ? "text-[var(--red)] font-medium tracking-wider" : "mono"}>{v}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[var(--text-dim)] mt-4">
          Detection rule (simulated): 3+ unique sources · within 60 seconds · at least one trusted source · ticker not blacklisted · token is new
        </p>
      </div>
    </div>
  );
}
