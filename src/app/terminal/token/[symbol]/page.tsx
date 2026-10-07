"use client";

import Link from "next/link";
import { use } from "react";

export default function TokenPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params);
  return (
    <div className="p-5 max-w-xl space-y-4">
      <h1 className="h-title mono">{decodeURIComponent(symbol)}</h1>
      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
        Dedicated token pages will expand with holder graphs. Use Investigate and Scanner for live Pump.fun context.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/terminal/investigation" className="arrow-link">Investigate</Link>
        <Link href="/terminal/scanner" className="arrow-link">Scanner</Link>
        <a href="https://pump.fun" target="_blank" rel="noreferrer" className="arrow-link">Pump.fun</a>
      </div>
    </div>
  );
}
