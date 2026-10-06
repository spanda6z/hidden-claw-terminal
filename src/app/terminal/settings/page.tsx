"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  const [status, setStatus] = useState<{
    mode?: string;
    pumpfun?: { ok?: boolean; count?: number; sample?: string };
    sol?: { ok?: boolean; usd?: number; change24h?: number };
  } | null>(null);

  useEffect(() => {
    fetch("/api/signals/status").then((r) => r.json()).then(setStatus).catch(() => {});
  }, []);

  return (
    <div className="p-5 space-y-5 max-w-2xl">
      <div>
        <h1 className="h-title">Settings</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1">System health and data sources. No account required.</p>
      </div>
      <div className="card p-5 space-y-4">
        <div className="h-section">Data sources</div>
        <div className="flex justify-between text-[13px]">
          <span className="text-[var(--text-muted)]">Mode</span>
          <span className="mono text-[var(--green)]">{status?.mode || "\u2026"}</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-[var(--text-muted)]">Pump.fun</span>
          <span className="mono">
            {status?.pumpfun?.ok ? (
              <span className="text-[var(--green)]">OK \u00b7 {status.pumpfun.count} \u00b7 {status.pumpfun.sample}</span>
            ) : (
              <span className="text-[var(--amber)]">Checking\u2026</span>
            )}
          </span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-[var(--text-muted)]">SOL price</span>
          <span className="mono">
            {status?.sol?.usd != null ? (
              <span>
                ${status.sol.usd.toFixed(2)}
                {status.sol.change24h != null && (
                  <span className={status.sol.change24h >= 0 ? " text-[var(--green)]" : " text-[var(--red)]"}>
                    {" "}{status.sol.change24h >= 0 ? "+" : ""}{status.sol.change24h.toFixed(2)}%
                  </span>
                )}
              </span>
            ) : "\u2014"}
          </span>
        </div>
      </div>
      <div className="card p-5 space-y-2 text-[13px] text-[var(--text-muted)]">
        <div className="h-section mb-2">API</div>
        {["/api/signals/status", "/api/signals/pumpfun", "/api/signals/trending", "/api/signals/creators"].map((p) => (
          <Link key={p} href={p} className="block text-[var(--cyan)] hover:underline mono text-[12px]">{p}</Link>
        ))}
      </div>
      <div className="card p-4 text-[12px] text-[var(--text-dim)] leading-relaxed">
        Execution remains optional and disconnected by default. Intelligence does not move funds.
      </div>
    </div>
  );
}
