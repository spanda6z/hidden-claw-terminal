import Link from "next/link";

const STEPS = [
  { n: "01", t: "TRACK", d: "Follow wallets and launches, not just charts. Creator history and early flow build context around every new token." },
  { n: "02", t: "DETECT", d: "Score age, curve progress, market cap, and reserves. Surface CRITICAL / HIGH only when multiple conditions align." },
  { n: "03", t: "EXPLAIN", d: "Every signal carries a reason. You see why something was flagged \u2014 not a blind buy prompt." },
  { n: "04", t: "DECIDE", d: "Investigate, verify, then act. Execution is optional and separate from intelligence." },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 md:px-10 py-4 border-b border-[var(--border)] flex items-center justify-between sticky top-0 bg-[var(--bg-deep)]/90 backdrop-blur-md z-10">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <div className="flex items-center gap-4">
          <Link href="/terminal" className="text-[11px] tracking-wider text-[var(--text-muted)] hover:text-[var(--text)]">TERMINAL</Link>
          <Link href="/risk" className="btn-primary !py-2 !px-4 text-[11px]">ENTER SYSTEM \u2192</Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className="label mb-4" style={{ color: "var(--cyan)" }}>HOW IT WORKS</div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-tight">
          We don&apos;t chase the hype.<br />
          <span className="text-[var(--text-muted)]">We track the behavior behind it.</span>
        </h1>
        <div className="space-y-4 text-[15px] text-[var(--text-muted)] leading-relaxed mb-12">
          <p>
            New tokens launch constantly. Most people notice after the market has already moved. HIDDEN CLAW watches the first seconds and minutes: who launched, how the curve is filling, and whether activity looks unusual.
          </p>
          <p className="text-[var(--text)] font-medium">
            Identify unusual behavior early. Filter weak setups. Act only when enough signals align \u2014 and you still decide.
          </p>
        </div>

        <div className="card p-4 mono text-[11px] text-center tracking-wider text-[var(--text-muted)] mb-12">
          WATCH \u2192 DETECT \u2192 EXPLAIN \u2192 DECIDE
        </div>

        <div className="space-y-4 mb-14">
          {STEPS.map((s) => (
            <div key={s.n} className="card p-5 flex gap-4">
              <div className="mono text-[var(--cyan)] text-[12px] font-semibold pt-0.5">{s.n}</div>
              <div>
                <div className="text-[14px] font-semibold tracking-wide mb-1">{s.t}</div>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-5 mb-10">
          <div className="h-section mb-3">What is live today</div>
          <ul className="space-y-2 text-[13px] text-[var(--text-muted)]">
            {["Pump.fun launch & trade streams", "SOL price in the header", "Curve progress from reserves", "Creator wallets in the live sample", "Signal tiers with plain-language reasons"].map((x) => (
              <li key={x} className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> {x}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/terminal" className="btn-primary">OPEN TERMINAL \u2192</Link>
          <Link href="/risk" className="btn-ghost">ENTER SYSTEM</Link>
          <Link href="/" className="btn-ghost">HOME</Link>
        </div>
      </main>
    </div>
  );
}
