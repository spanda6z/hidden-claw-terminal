"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_STRATEGY,
  loadStrategy,
  saveStrategy,
  type ExecutionStrategy,
} from "@/lib/execution";

export default function ExecutionPage() {
  const [s, setS] = useState<ExecutionStrategy>(DEFAULT_STRATEGY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setS(loadStrategy());
  }, []);

  function update<K extends keyof ExecutionStrategy>(key: K, value: ExecutionStrategy[K]) {
    setS((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    setS(saveStrategy(s));
    setSaved(true);
  }

  function handleReset() {
    setS(saveStrategy({ ...DEFAULT_STRATEGY, enabled: false }));
    setSaved(true);
  }

  return (
    <div className="p-5 space-y-5 max-w-3xl">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="h-title">Execution strategy</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-xl">
            Define rules for optional execution. Stored in this browser. Live trading stays off until you connect infrastructure later.
          </p>
        </div>
        <span className={`badge ${s.enabled ? "badge-amber" : "badge-cyan"}`}>
          {s.enabled ? "ARMED (LOCAL)" : "DISARMED"}
        </span>
      </div>

      <div className="alert-card p-4 text-[13px] text-[var(--text-muted)] leading-relaxed">
        <span className="text-[var(--amber)] font-semibold">No on-chain orders in this build. </span>
        Saving only configures local rules. Intelligence never requires execution.
      </div>

      <div className="card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] font-semibold">Enable strategy (local)</div>
            <div className="text-[11px] text-[var(--text-dim)] mt-0.5">When off, no rule is considered active</div>
          </div>
          <button type="button" onClick={() => update("enabled", !s.enabled)}
            className={`relative w-11 h-6 rounded-full transition-colors ${s.enabled ? "bg-[var(--amber)]" : "bg-[var(--border)]"}`}>
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${s.enabled ? "left-5" : "left-0.5"}`} />
          </button>
        </div>
        <div>
          <div className="label mb-2">Mode</div>
          <div className="flex flex-wrap gap-2">
            {([["manual_confirm", "Manual confirm"], ["rules_only", "Rules only (no send)"], ["auto", "Auto (future)"]] as const).map(([val, label]) => (
              <button key={val} type="button" onClick={() => update("mode", val)}
                className={`text-[11px] tracking-wider px-3 py-1.5 rounded border ${s.mode === val ? "border-[var(--cyan)] text-[var(--cyan)] bg-[var(--cyan-dim)]" : "border-[var(--border)] text-[var(--text-dim)]"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <div className="h-section">Position size</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {([["buyAmountSol", "Buy amount (SOL)"], ["maxBuyAmountSol", "Max buy (SOL)"], ["maxOpenPositions", "Max open positions"], ["maxDailyTrades", "Max daily trades"]] as const).map(([key, label]) => (
            <label key={key} className="block">
              <span className="label">{label}</span>
              <input type="number" step="0.01" min={0} value={s[key] as number}
                onChange={(e) => update(key, Number(e.target.value) as never)}
                className="mt-1 w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2 text-[13px] mono outline-none focus:border-[var(--cyan)]/40" />
            </label>
          ))}
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <div className="h-section">Risk exits</div>
        <div className="grid sm:grid-cols-2 gap-4">
          {([["takeProfitPercent", "Take profit %"], ["stopLossPercent", "Stop loss %"], ["trailingStopPercent", "Trailing stop %"], ["maxDailyLossSol", "Max daily loss (SOL)"], ["slippageBps", "Slippage (bps)"]] as const).map(([key, label]) => (
            <label key={key} className="block">
              <span className="label">{label}</span>
              <input type="number" value={s[key] as number}
                onChange={(e) => update(key, Number(e.target.value) as never)}
                className="mt-1 w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2 text-[13px] mono outline-none focus:border-[var(--cyan)]/40" />
            </label>
          ))}
        </div>
      </div>

      <div className="card p-5 space-y-4">
        <div className="h-section">Entry filters (from intelligence)</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="label mb-2">Min signal tier</div>
            <div className="flex gap-2">
              {(["CRITICAL", "HIGH", "WATCH"] as const).map((t) => (
                <button key={t} type="button" onClick={() => update("minSignal", t)}
                  className={`text-[10px] tracking-wider px-2.5 py-1.5 rounded border ${s.minSignal === t ? "border-[var(--cyan)] text-[var(--cyan)] bg-[var(--cyan-dim)]" : "border-[var(--border)] text-[var(--text-dim)]"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <label className="block">
            <span className="label">Max token age (sec)</span>
            <input type="number" value={s.maxAgeSec} onChange={(e) => update("maxAgeSec", Number(e.target.value))}
              className="mt-1 w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2 text-[13px] mono outline-none focus:border-[var(--cyan)]/40" />
          </label>
          <label className="block">
            <span className="label">Min curve %</span>
            <input type="number" value={s.minCurvePercent} onChange={(e) => update("minCurvePercent", Number(e.target.value))}
              className="mt-1 w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2 text-[13px] mono outline-none focus:border-[var(--cyan)]/40" />
          </label>
          <label className="flex items-center gap-2 cursor-pointer pt-6">
            <input type="checkbox" checked={s.requireCreatorKnown} onChange={(e) => update("requireCreatorKnown", e.target.checked)} />
            <span className="text-[12px] text-[var(--text-muted)]">Prefer known / repeat creator wallets</span>
          </label>
        </div>
      </div>

      <div className="card p-4 mono text-[11px] text-[var(--text-dim)] space-y-1">
        <div>Buy <span className="text-[var(--text)]">{s.buyAmountSol} SOL</span> \u00b7 max <span className="text-[var(--text)]">{s.maxBuyAmountSol}</span></div>
        <div>TP {s.takeProfitPercent}% \u00b7 SL {s.stopLossPercent}% \u00b7 trail {s.trailingStopPercent}%</div>
        <div>Entry \u2265 {s.minSignal} \u00b7 age \u2264 {s.maxAgeSec}s \u00b7 curve \u2265 {s.minCurvePercent}%</div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleSave} className="btn-primary">{saved ? "SAVED \u2713" : "SAVE STRATEGY"}</button>
        <button type="button" onClick={handleReset} className="btn-ghost">RESET DEFAULTS</button>
        <Link href="/terminal/wallets" className="btn-ghost">Wallet creations</Link>
        <Link href="/terminal/scanner" className="btn-ghost">Scanner</Link>
      </div>
    </div>
  );
}
