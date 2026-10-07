"use client";

import Link from "next/link";
import { use } from "react";

export default function WalletDetailPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  const decoded = decodeURIComponent(address);
  return (
    <div className="p-5 max-w-xl space-y-4">
      <h1 className="h-title">Wallet</h1>
      <p className="mono text-[13px] text-[var(--cyan)] break-all">{decoded}</p>
      <p className="text-[13px] text-[var(--text-muted)]">
        Open on Solscan for full history. In-app graph history ships with indexer support.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href={`https://solscan.io/account/${decoded}`} target="_blank" rel="noreferrer" className="arrow-link">Solscan</a>
        <Link href="/terminal/wallets" className="arrow-link">Wallet creations</Link>
      </div>
    </div>
  );
}
