"use client";

export function TopBar() {
  return (
    <header className="bg-[var(--bg-elevated)]/95 border-b border-[var(--border)] flex items-center px-4 gap-5 text-[11px] mono h-full backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <span className="label !text-[9px]">SOL</span>
        <span className="font-semibold text-[var(--text)]">$182.40</span>
        <span className="text-[var(--green)] text-[10px]">+1.2%</span>
      </div>
      <div className="w-px h-3 bg-[var(--border)]" />
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
        <span className="text-[var(--text-muted)]">Mainnet</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[var(--text-dim)]">Pump.fun</span>
        <span className="text-[var(--green)] font-medium">Streaming</span>
      </div>
      <div className="ml-auto flex items-center gap-4 text-[var(--text-dim)]">
        <span className="hidden md:inline tracking-[0.08em] text-[9px] uppercase">Watch \u00b7 Detect \u00b7 Explain</span>
        <kbd className="text-[9px] border border-[var(--border)] rounded px-1.5 py-0.5 text-[var(--text-muted)]">\u2318K</kbd>
      </div>
    </header>
  );
}
