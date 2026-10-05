"use client";

import { useEffect, useState } from "react";

export function TopBar() {
  const [sol, setSol] = useState<{ usd: number | null; change24h: number | null }>({
    usd: null,
    change24h: null,
  });

  useEffect(() => {
    const load = () =>
      fetch("/api/signals/sol")
        .then((r) => r.json())
        .then((d) => setSol({ usd: d.usd ?? null, change24h: d.change24h ?? null }))
        .catch(() => {});
    load();
    const t = setInterval(load, 45000);
    return () => clearInterval(t);
  }, []);

  const ch = sol.change24h;
  const chColor =
    ch == null ? "text-[var(--text-dim)]" : ch >= 0 ? "text-[var(--green)]" : "text-[var(--red)]";

  return (
    <header className="bg-[var(--bg-elevated)]/95 border-b border-[var(--border)] flex items-center px-4 gap-5 text-[11px] mono h-full backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <span className="label !text-[9px]">SOL</span>
        <span className="font-semibold text-[var(--text)]">
          {sol.usd != null ? `$${sol.usd.toFixed(2)}` : "\u2014"}
        </span>
        {ch != null && (
          <span className={`text-[10px] ${chColor}`}>
            {ch >= 0 ? "+" : ""}
            {ch.toFixed(2)}%
          </span>
        )}
      </div>
      <div className="w-px h-3 bg-[var(--border)]" />
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
        <span className="text-[var(--text-muted)]">Mainnet</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[var(--text-dim)]">Pump.fun</span>
        <span className="text-[var(--green)] font-medium">Live</span>
      </div>
      <div className="ml-auto text-[var(--text-dim)] tracking-[0.08em] text-[9px] uppercase hidden md:inline">
        Watch \u00b7 Detect \u00b7 Explain
      </div>
    </header>
  );
}
