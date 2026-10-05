"use client";

export default function TopWalletsPage() {
  return (
    <div className="p-5 space-y-5">
      <div>
        <h1 className="text-lg font-semibold">Top wallets</h1>
        <p className="text-[13px] text-[var(--text-muted)] mt-1 max-w-2xl">
          The most relevant wallets for a token or market event \u2014 not only addresses. Entry time, behavior, relationships, and classification when evidence exists.
        </p>
      </div>
      <div className="panel p-4">
        <div className="text-[11px] tracking-[0.1em] text-[var(--text-dim)] mb-3">WHAT WE SHOW</div>
        <ul className="grid md:grid-cols-2 gap-2 text-[13px] text-[var(--text-muted)]">
          {["Current activity on the token", "Approximate entry timing", "Previous tokens (tracked set)", "Wallet classification (evidence-based)", "Related wallet relationships", "Risk context if concentrated"].map((x) => (
            <li key={x} className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> {x}</li>
          ))}
        </ul>
      </div>
      <div className="panel p-4 text-[13px] text-[var(--text-muted)]">
        Select a token from Pump.fun feed or Scanner to load top wallets for that event.
      </div>
    </div>
  );
}
