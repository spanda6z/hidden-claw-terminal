"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatUsd } from "@/lib/signals";

type Creator = {
  creator: string;
  count: number;
  tokens: { symbol: string; mint: string; mcap: number | null }[];
};

export default function DevReputationPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [sample, setSample] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/signals/creators")
      .then((r) => r.json())
      .then((d) => {
        setCreators(d.creators || []);
        setSample(d.sampleSize || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="h-title">Developer reputation</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
            Real creator wallets from live Pump.fun launches. Frequency in this window is evidence of activity \u2014 not a moral score.
          </p>
        </div>
        <span className="live-badge">LIVE SAMPLE</span>
      </div>

      <div className="card p-4 text-[12px] text-[var(--text-muted)]">
        Sample: <span className="mono text-[var(--text)]">{sample}</span> recent tokens \u00b7 Ranked by how many appear in this batch.
      </div>

      {loading && <div className="text-[13px] text-[var(--text-dim)]">Loading creator graph from Pump.fun\u2026</div>}

      <div className="space-y-3">
        {creators.slice(0, 25).map((c) => (
          <div key={c.creator} className="card p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <a
                  href={`https://solscan.io/account/${c.creator}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mono text-[13px] text-[var(--cyan)] hover:underline"
                >
                  {c.creator.slice(0, 6)}\u2026{c.creator.slice(-6)}
                </a>
                <div className="text-[11px] text-[var(--text-dim)] mt-0.5">
                  Creator wallet \u00b7 {c.count} token{c.count > 1 ? "s" : ""} in sample
                </div>
              </div>
              <span className="badge badge-cyan">{c.count}\u00d7</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {c.tokens.slice(0, 8).map((t) => (
                <a
                  key={t.mint}
                  href={`https://pump.fun/coin/${t.mint}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] border border-[var(--border)] rounded px-2 py-1 text-[var(--text-muted)] hover:border-[var(--cyan)]/40 hover:text-[var(--cyan)]"
                >
                  {t.symbol} \u00b7 {formatUsd(t.mcap)}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!loading && creators.length === 0 && (
        <p className="text-[13px] text-[var(--text-dim)]">No creator data yet \u2014 check API status.</p>
      )}

      <p className="text-[11px] text-[var(--text-dim)]">
        Source: Pump.fun public API \u00b7{" "}
        <Link href="/api/signals/creators" className="text-[var(--cyan)] hover:underline">/api/signals/creators</Link>
      </p>
    </div>
  );
}
