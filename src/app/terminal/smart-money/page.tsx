"use client";

import { useEffect, useState } from "react";
import { formatUsd } from "@/lib/signals";
import Link from "next/link";

type Creator = {
  creator: string;
  count: number;
  tokens: { symbol: string; mint: string; mcap: number | null }[];
};

export default function SmartWalletsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [sample, setSample] = useState(0);

  useEffect(() => {
    fetch("/api/signals/creators")
      .then((r) => r.json())
      .then((d) => {
        setCreators((d.creators || []).filter((c: Creator) => c.count >= 1));
        setSample(d.sampleSize || 0);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="h-title">Smart wallets</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
            Live creator wallets from the current Pump.fun sample. Repeat launchers surface first. Activity evidence \u2014 not a proven smart-money label.
          </p>
        </div>
        <span className="live-badge">LIVE SAMPLE</span>
      </div>
      <div className="card p-4 text-[12px] text-[var(--text-muted)]">
        Sample size: <span className="mono text-[var(--text)]">{sample}</span> tokens \u00b7{" "}
        <Link href="/terminal/developers" className="text-[var(--cyan)] hover:underline">Dev reputation view</Link>
      </div>
      <div className="space-y-3">
        {creators.slice(0, 20).map((c) => (
          <div key={c.creator} className="card p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <a href={`https://solscan.io/account/${c.creator}`} target="_blank" rel="noreferrer" className="mono text-[13px] text-[var(--cyan)] hover:underline">
                {c.creator.slice(0, 8)}\u2026{c.creator.slice(-6)}
              </a>
              <span className="badge badge-cyan">{c.count}\u00d7 launches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {c.tokens.slice(0, 6).map((t) => (
                <a key={t.mint} href={`https://pump.fun/coin/${t.mint}`} target="_blank" rel="noreferrer"
                  className="text-[11px] border border-[var(--border)] rounded px-2 py-1 text-[var(--text-muted)] hover:text-[var(--cyan)] hover:border-[var(--cyan)]/40">
                  {t.symbol} \u00b7 {formatUsd(t.mcap)}
                </a>
              ))}
            </div>
          </div>
        ))}
        {creators.length === 0 && <p className="text-[13px] text-[var(--text-dim)]">Loading creator activity\u2026</p>}
      </div>
    </div>
  );
}
