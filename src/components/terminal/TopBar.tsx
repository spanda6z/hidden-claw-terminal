"use client";

export function TopBar() {
  const s = {
    solPrice: 182.41,
    network: "MAINNET-BETA [SIM]",
    rpcMs: 38,
    slot: 312984221,
    tokens: 1284,
    eliteActive: 47,
    system: "ONLINE",
    time: "13:04:31",
  };
  return (
    <header className="bg-[var(--bg-elevated)] border-b border-[var(--border)] flex items-center px-4 gap-6 text-[11px] mono h-full">
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">SOL</span><span className="text-[var(--text)] font-medium">${s.solPrice.toFixed(2)}</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">NETWORK</span><span className="text-[var(--amber)]">{s.network}</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">RPC</span><span className="text-[var(--green)]">{s.rpcMs}ms</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">SLOT</span><span className="text-[var(--text)]">{s.slot.toLocaleString()}</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">TOKENS</span><span className="text-[var(--text)]">{s.tokens.toLocaleString()}</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">ELITE</span><span className="text-[var(--green)]">{s.eliteActive} ACTIVE</span></div>
      <div className="flex items-center gap-1.5"><span className="text-[var(--text-dim)]">SYSTEM</span><span className="text-[var(--green)]">{s.system}</span></div>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-[var(--text-dim)]">{s.time}</span>
        <span className="sim-badge">SIM</span>
      </div>
    </header>
  );
}
