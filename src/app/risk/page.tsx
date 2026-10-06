import Link from "next/link";

export default function RiskPage() {
  return (
    <div className="min-h-screen">
      <header className="px-6 md:px-10 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <Link href="/terms" className="text-[11px] tracking-wider text-[var(--cyan)] hover:underline">CONTINUE \u2192</Link>
      </header>
      <main className="max-w-2xl mx-auto px-6 md:px-8 py-14">
        <div className="label mb-3" style={{ color: "var(--amber)" }}>DISCLOSURE</div>
        <h1 className="h-title text-2xl md:text-3xl mb-6">Intelligence is not certainty.</h1>
        <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed mb-10">
          <p>
            HIDDEN CLAW surfaces signals from on-chain activity: launches, curve progress, creator wallets, and related metrics. It does not guarantee outcomes.
          </p>
          <div className="card p-5">
            <ul className="space-y-2.5 text-[13px]">
              {[
                "Early tokens can fail completely.",
                "Metadata can be misleading or fabricated.",
                "Wallet behavior can change without notice.",
                "Signal scoring is heuristic, not oracle truth.",
                "Social and on-chain data can be manipulated.",
                "You are solely responsible for any decisions you make.",
              ].map((x) => (
                <li key={x} className="flex gap-2">
                  <span className="text-[var(--amber)]">\u2022</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[var(--text)] font-medium">Understand the evidence. Then decide for yourself.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/terms" className="btn-primary">I UNDERSTAND \u2014 CONTINUE</Link>
          <Link href="/" className="btn-ghost">BACK</Link>
          <Link href="/terminal" className="btn-ghost">SKIP TO TERMINAL</Link>
        </div>
      </main>
    </div>
  );
}
