"use client";

export function TopBar() {
  return (
    <header className="bg-[var(--bg-elevated)]/90 border-b border-[var(--border)] flex items-center px-4 gap-6 text-[11px] mono h-full backdrop-blur">
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">SOL</span><span className="text-[var(--text)] font-medium">$182.40</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">NETWORK</span><span className="text-[var(--green)]">MAINNET</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">PUMP.FUN</span><span className="text-[var(--green)]">LIVE</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">MODE</span><span className="text-[var(--cyan)]">INTELLIGENCE</span></div>
      <div className="ml-auto text-[var(--text-dim)]">WATCH → DETECT → EXPLAIN</div>
    </header>
  );
}
