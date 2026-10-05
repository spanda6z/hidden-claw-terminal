"use client";

import Link from "next/link";

const DEVS = [
  { id: "cluster-a", label: "Launch cluster A", launches: 7, sellEvents: 2, relatedWallets: 3, pattern: "Early launch \u2192 related wallet activity \u2192 volume \u2192 occasional associated selling", tone: "Recurring structure \u2014 investigate each event." },
  { id: "cluster-b", label: "Launch cluster B", launches: 4, sellEvents: 3, relatedWallets: 5, pattern: "Short time between launches \u00b7 higher sell-event frequency in sample", tone: "Elevated sell-event rate \u2014 not a moral label." },
  { id: "cluster-c", label: "Sparse history", launches: 2, sellEvents: 0, relatedWallets: 1, pattern: "Insufficient history for strong pattern claims", tone: "Low sample size \u2014 avoid over-interpretation." },
];

export default function DevReputationPage() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Developer reputation</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">How does this developer operate? History, related wallets, selling patterns \u2014 careful attribution.</p>
      </div>
      <div className="panel p-4 text-[12px] text-[var(--text-muted)]">
        Never state a wallet &quot;definitely belongs&quot; to a developer without evidence. Prefer: related \u00b7 potentially connected \u00b7 behavioral relationship.
      </div>
      <div className="space-y-3">
        {DEVS.map((d) => (
          <div key={d.id} className="panel p-4">
            <div className="flex justify-between mb-3">
              <div>
                <div className="text-[14px] font-semibold">{d.label}</div>
                <div className="text-[11px] text-[var(--text-dim)] mono">{d.id}</div>
              </div>
              <Link href={`/terminal/developers/${d.id}`} className="text-[11px] text-[var(--cyan)] hover:underline">Open profile \u2192</Link>
            </div>
            <div className="grid grid-cols-3 gap-4 text-[12px] mb-3">
              <div><div className="text-[10px] text-[var(--text-dim)]">LAUNCHES</div><div className="mono font-medium">{d.launches}</div></div>
              <div><div className="text-[10px] text-[var(--text-dim)]">SELL EVENTS</div><div className="mono font-medium">{d.sellEvents}</div></div>
              <div><div className="text-[10px] text-[var(--text-dim)]">RELATED WALLETS</div><div className="mono font-medium">{d.relatedWallets}</div></div>
            </div>
            <div className="text-[12px] text-[var(--text-muted)]">{d.pattern}</div>
            <div className="text-[12px] text-[var(--text-dim)] mt-1">{d.tone}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
