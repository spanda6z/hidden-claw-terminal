"use client";

const SIGNALS = [
  { name: "ACCELERATION", desc: "Milestone progression is speeding up \u2014 not just absolute market cap.", example: "$5K \u2192 $15K in 4 minutes vs the same move over an hour." },
  { name: "SMART WALLET", desc: "Wallets with evidence of early, repeated participation \u2014 not merely large balances.", example: "Historical early entries before volume expansion." },
  { name: "WHALE ACTIVITY", desc: "Capital large enough relative to the local market to move price or liquidity.", example: "Single wallet size vs token liquidity." },
  { name: "BUNDLE / COORDINATION", desc: "Potentially coordinated transaction timing or funding relationships.", example: "Multiple wallets funded then entering within seconds." },
  { name: "VOLUME EXPANSION", desc: "Unusual increase in trading activity relative to recent baseline.", example: "Transaction velocity and size spike." },
  { name: "HOLDER GROWTH", desc: "Rate of unique holders increasing \u2014 distribution, not just price.", example: "Holder count velocity." },
  { name: "DEVELOPER PATTERN", desc: "Similarity to prior launches by the same developer or related cluster.", example: "Timeline comparison across launches." },
  { name: "DORMANT REACTIVATION", desc: "Existing token with sudden activity after quiet periods.", example: "Volume after days of near-zero activity." },
];

export default function DetectionPage() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Detection engine</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
          Multi-signal intelligence. A single indicator is fragile. Combinations produce stronger context \u2014 never a guaranteed outcome.
        </p>
      </div>
      <div className="panel p-4 text-[13px] text-[var(--text-muted)]">
        <span className="text-[var(--text)] font-medium">Combinable signals. </span>
        Example: Smart wallet + acceleration + volume expansion + developer history is stronger evidence than any one alone.
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {SIGNALS.map((s) => (
          <div key={s.name} className="panel p-4">
            <div className="text-[11px] tracking-[0.1em] text-[var(--cyan)] mb-1">{s.name}</div>
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
            <p className="text-[12px] text-[var(--text-dim)] mt-2 italic">{s.example}</p>
          </div>
        ))}
      </div>
      <div className="panel p-4">
        <div className="text-[11px] tracking-[0.1em] text-[var(--text-dim)] mb-2">ACCELERATION ENGINE</div>
        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-3">Do not only measure where a token is. Measure how fast it is getting there.</p>
        <div className="mono text-[12px] text-[var(--text-dim)] space-y-1">
          <div>$2K \u2192 $5K \u00b7 time between milestones</div>
          <div>Volume velocity \u00b7 transaction velocity \u00b7 mcap velocity</div>
        </div>
      </div>
    </div>
  );
}
