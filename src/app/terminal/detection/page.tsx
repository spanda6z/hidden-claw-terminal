"use client";

import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";
import Link from "next/link";

export default function DetectionPage() {
  const [signals, setSignals] = useState<LaunchSignal[]>([]);

  useEffect(() => {
    const load = () =>
      fetch("/api/signals/pumpfun?limit=40")
        .then((r) => r.json())
        .then((d) => setSignals(d.signals || []))
        .catch(() => {});
    load();
    const t = setInterval(load, 12000);
    return () => clearInterval(t);
  }, []);

  const byTier = {
    CRITICAL: signals.filter((s) => s.signal === "CRITICAL"),
    HIGH: signals.filter((s) => s.signal === "HIGH"),
    WATCH: signals.filter((s) => s.signal === "WATCH"),
    INFO: signals.filter((s) => s.signal === "INFO"),
  };
  const nearGrad = signals.filter((s) => (s.curvePercent ?? 0) >= 70 && !s.complete);
  const earlyHot = signals.filter((s) => s.ageSec < 300 && (s.mcapUsd ?? 0) > 10000);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="h-title">Detection engine</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
            Multi-signal scoring on live Pump.fun data. Combinations create stronger context \u2014 never a guaranteed outcome.
          </p>
        </div>
        <span className="live-badge">LIVE</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(
          [
            ["CRITICAL", byTier.CRITICAL.length, "var(--red)"],
            ["HIGH", byTier.HIGH.length, "var(--amber)"],
            ["WATCH", byTier.WATCH.length, "var(--cyan)"],
            ["INFO", byTier.INFO.length, "var(--text-dim)"],
          ] as const
        ).map(([label, n, color]) => (
          <div key={label} className="kpi">
            <div className="label" style={{ color }}>{label}</div>
            <div className="kpi-value">{n}</div>
            <div className="text-[10px] text-[var(--text-dim)]">in current sample</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="h-section mb-3">Near graduation (\u226570% curve)</div>
          <div className="space-y-2">
            {nearGrad.slice(0, 6).map((s) => (
              <a key={s.id} href={`https://pump.fun/coin/${s.mint}`} target="_blank" rel="noreferrer" className="flex justify-between text-[12px] hover:text-[var(--cyan)]">
                <span className="mono">{s.symbol}</span>
                <span className="mono text-[var(--text-dim)]">{s.curvePercent}% \u00b7 {formatUsd(s.mcapUsd)}</span>
              </a>
            ))}
            {nearGrad.length === 0 && <p className="text-[12px] text-[var(--text-dim)]">None in current sample</p>}
          </div>
        </div>
        <div className="card p-4">
          <div className="h-section mb-3">Early + material mcap (&lt;5m)</div>
          <div className="space-y-2">
            {earlyHot.slice(0, 6).map((s) => (
              <a key={s.id} href={`https://pump.fun/coin/${s.mint}`} target="_blank" rel="noreferrer" className="flex justify-between text-[12px] hover:text-[var(--cyan)]">
                <span className="mono">{s.symbol}</span>
                <span className="mono text-[var(--text-dim)]">{formatAge(s.ageSec)} \u00b7 {formatUsd(s.mcapUsd)}</span>
              </a>
            ))}
            {earlyHot.length === 0 && <p className="text-[12px] text-[var(--text-dim)]">None in current sample</p>}
          </div>
        </div>
      </div>

      <div className="card p-4">
        <div className="h-section mb-3">How scoring works</div>
        <ul className="space-y-2 text-[13px] text-[var(--text-muted)]">
          <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> Age + curve progress + mcap + real SOL reserves</li>
          <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> CRITICAL: early acceleration with elevated curve and mcap</li>
          <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> HIGH: near graduation or material early market cap</li>
          <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> Evidence, not a buy call \u2014 always verify yourself</li>
        </ul>
        <Link href="/terminal/scanner" className="arrow-link mt-4 inline-flex">Open scanner</Link>
      </div>
    </div>
  );
}
