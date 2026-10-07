"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatAge, formatUsd } from "@/lib/signals";

type WalletEvent = {
  creator: string;
  firstSeenAt: number;
  ageSec: number;
  launchCount: number;
  tokens: { symbol: string; mint: string; mcap: number | null; createdAt: number; signal: string }[];
  latestSymbol: string;
  latestMint: string;
};

export default function WalletCreationsPage() {
  const [wallets, setWallets] = useState<WalletEvent[]>([]);
  const [sample, setSample] = useState(0);
  const [note, setNote] = useState("");
  const [mode, setMode] = useState("loading");

  useEffect(() => {
    const load = () =>
      fetch("/api/signals/wallets")
        .then((r) => r.json())
        .then((d) => {
          setWallets(d.wallets || []);
          setSample(d.sampleSize || 0);
          setNote(d.note || "");
          setMode(d.mode || "live");
        })
        .catch(() => setMode("degraded"));
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  const multi = wallets.filter((w) => w.launchCount > 1);
  const fresh = wallets.filter((w) => w.ageSec < 900);

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="h-title">Wallet creations</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
            Deployer wallets appearing with new Pump.fun launches. Track first-seen activity and repeat launchers in the live window.
          </p>
        </div>
        <span className={mode === "live" ? "live-badge" : "sim-badge"}>
          {mode === "live" ? "LIVE" : mode.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Deployers", value: String(wallets.length) },
          { label: "Sample tokens", value: String(sample) },
          { label: "Repeat launchers", value: String(multi.length) },
          { label: "Fresh <15m", value: String(fresh.length) },
        ].map((k) => (
          <div key={k.label} className="kpi">
            <div className="label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
          </div>
        ))}
      </div>

      {note && <div className="card p-3 text-[11px] text-[var(--text-dim)] leading-relaxed">{note}</div>}

      <div className="card overflow-x-auto">
        <table className="data-table min-w-[720px]">
          <thead>
            <tr>
              <th>First seen</th>
              <th>Wallet</th>
              <th className="!text-right">Launches</th>
              <th>Latest token</th>
              <th>Tokens</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {wallets.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-[var(--text-dim)] py-8">Loading deployer wallets\u2026</td>
              </tr>
            )}
            {wallets.map((w) => (
              <tr key={w.creator}>
                <td className="mono text-[var(--text-dim)]">{formatAge(w.ageSec)}</td>
                <td>
                  <a href={`https://solscan.io/account/${w.creator}`} target="_blank" rel="noreferrer" className="mono text-[12px] text-[var(--cyan)] hover:underline">
                    {w.creator.slice(0, 6)}\u2026{w.creator.slice(-4)}
                  </a>
                </td>
                <td className="text-right mono font-semibold">{w.launchCount}</td>
                <td className="mono text-[var(--text)]">{w.latestSymbol}</td>
                <td>
                  <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {w.tokens.slice(0, 4).map((t) => (
                      <span key={t.mint} className="text-[10px] border border-[var(--border)] rounded px-1.5 py-0.5 text-[var(--text-dim)]">
                        {t.symbol} {formatUsd(t.mcap)}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <a href={`https://pump.fun/coin/${w.latestMint}`} target="_blank" rel="noreferrer" className="text-[var(--cyan)] text-[12px] hover:underline">\u2192</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 text-[12px]">
        <Link href="/terminal/developers" className="arrow-link">Dev reputation</Link>
        <Link href="/terminal/smart-money" className="arrow-link">Smart wallets</Link>
        <Link href="/terminal/execution" className="arrow-link">Execution strategy</Link>
      </div>
    </div>
  );
}
