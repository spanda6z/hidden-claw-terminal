"use client";
export default function SettingsPage() {
  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold tracking-[0.08em] text-[var(--text-muted)]">SETTINGS</h1>
          <p className="text-[11px] text-[var(--text-dim)] mt-0.5">System configuration · Simulation only</p>
        </div>
        <span className="sim-badge">SIMULATION</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["SYSTEM", "ALERTS", "WATCHLIST", "EXECUTION", "RISK", "DISPLAY", "ACCESS"].map((s) => (
          <div key={s} className="bg-[var(--bg-panel)] border border-[var(--border)] rounded px-4 py-3">
            <div className="text-[12px] tracking-wider text-[var(--text-muted)]">{s}</div>
            <div className="text-[11px] text-[var(--text-dim)] mt-1">Not connected in mockup</div>
          </div>
        ))}
      </div>
    </div>
  );
}
