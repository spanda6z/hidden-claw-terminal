"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "hc_watchlist";
type Item = { mint: string; symbol: string; addedAt: string };

export default function WatchlistPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [mint, setMint] = useState("");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {
      setItems([]);
    }
  }, []);

  function save(next: Item[]) {
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!mint.trim() || !symbol.trim()) return;
    if (items.some((i) => i.mint === mint.trim())) return;
    save([
      {
        mint: mint.trim(),
        symbol: symbol.trim().startsWith("$") ? symbol.trim() : `$${symbol.trim()}`,
        addedAt: new Date().toISOString(),
      },
      ...items,
    ]);
    setMint("");
    setSymbol("");
  }

  function remove(m: string) {
    save(items.filter((i) => i.mint !== m));
  }

  return (
    <div className="p-5 space-y-5 max-w-2xl">
      <div>
        <h1 className="h-title">Watchlist</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1">Local to this browser. Track mints you want to revisit.</p>
      </div>
      <form onSubmit={add} className="card p-4 flex flex-wrap gap-2">
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol"
          className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2 text-[13px] mono outline-none focus:border-[var(--cyan)]/40 w-28" />
        <input value={mint} onChange={(e) => setMint(e.target.value)} placeholder="Mint address"
          className="flex-1 min-w-[180px] bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2 text-[13px] mono outline-none focus:border-[var(--cyan)]/40" />
        <button type="submit" className="btn-primary !py-2">ADD</button>
      </form>
      <div className="space-y-2">
        {items.map((i) => (
          <div key={i.mint} className="card p-3 flex items-center justify-between gap-3">
            <div>
              <div className="mono text-[var(--cyan)]">{i.symbol}</div>
              <div className="mono text-[10px] text-[var(--text-dim)] break-all">{i.mint}</div>
            </div>
            <div className="flex items-center gap-3">
              <a href={`https://pump.fun/coin/${i.mint}`} target="_blank" rel="noreferrer" className="text-[11px] text-[var(--cyan)] hover:underline">Pump</a>
              <button type="button" onClick={() => remove(i.mint)} className="text-[11px] text-[var(--text-dim)] hover:text-[var(--red)]">Remove</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[13px] text-[var(--text-dim)]">Empty \u2014 add a mint from Scanner.</p>}
      </div>
      <Link href="/terminal/scanner" className="arrow-link">Open scanner</Link>
    </div>
  );
}
