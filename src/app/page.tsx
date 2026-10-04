import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b border-[var(--border)] sticky top-0 bg-[var(--bg)]/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full border border-[var(--cyan)] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
          </span>
          <div>
            <div className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</div>
            <div className="text-[9px] text-[var(--text-dim)] tracking-[0.1em]">PRIVATE SOLANA INTELLIGENCE</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/how-it-works" className="text-[11px] tracking-wider text-[var(--text-muted)] hover:text-[var(--text)]">HOW IT WORKS</Link>
          <div className="flex items-center gap-2 text-[10px] tracking-wider text-[var(--text-dim)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            PRIVATE SYSTEM / SIMULATION
          </div>
        </div>
      </header>

      <section className="flex flex-col justify-center px-8 md:px-16 max-w-5xl mx-auto w-full py-24 md:py-32">
        <div className="text-[10px] tracking-[0.2em] text-[var(--cyan)] mb-6 font-medium">SIGNAL ACQUISITION / 001</div>
        <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] mb-8">
          <span className="text-[var(--text)]">THE MARKET</span><br />
          <span className="text-[var(--text-muted)]">LEAVES</span><br />
          <span className="text-[var(--text-muted)]">FOOTPRINTS.</span><br />
          <span className="text-[var(--cyan)]">WE FOLLOW THEM.</span>
        </h1>
        <p className="max-w-lg text-[14px] text-[var(--text-muted)] leading-relaxed mb-10 border-l border-[var(--border)] pl-4">
          HIDDEN CLAW is a private Solana intelligence terminal built to detect emerging tokens, track proven wallets, investigate developers, measure market attention and execute within rules you control.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/risk" className="bg-[var(--cyan)] text-black text-[12px] font-semibold tracking-wider px-6 py-3 hover:opacity-90 transition-opacity">ENTER SYSTEM →</Link>
          <Link href="/how-it-works" className="border border-[var(--border)] text-[var(--text-muted)] text-[12px] font-medium tracking-wider px-6 py-3 hover:border-[var(--text-dim)] hover:text-[var(--text)] transition-colors">HOW IT WORKS</Link>
        </div>
      </section>

      <section className="border-t border-[var(--border)] px-8 md:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-[10px] tracking-[0.2em] text-[var(--cyan)] mb-4">HOW IT WORKS</div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 leading-tight">
            We don&apos;t chase the hype.<br />
            <span className="text-[var(--text-muted)]">We track the behavior behind it.</span>
          </h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed mb-12">
            <p>New tokens launch every second. Most traders only notice them after the market has already started moving.</p>
            <p className="text-[var(--text)]">HIDDEN CLAW starts earlier.</p>
            <p>We track the wallets behind launches, study their previous behavior, monitor bundled activity and early allocations, and watch what happens in the first seconds and minutes after a token goes live.</p>
            <p className="text-[var(--text)] font-medium">Identify unusual behavior early. Filter out weak opportunities. Act only when enough signals align.</p>
          </div>

          <div className="border border-[var(--border)] rounded p-4 mono text-[11px] text-center tracking-wider text-[var(--text-muted)] mb-12">
            FROM WALLET → SIGNAL → ENTRY → PROFIT
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { num: "01", title: "TRACK", desc: "Follow the wallets, not just the tokens. Monitor developer wallets and groups for patterns in how they create, bundle, buy, hold, and distribute." },
              { num: "02", title: "DETECT", desc: "Catch the market while it is still forming. Early transaction flow, bundled allocations, volume, liquidity, holder growth, concentration." },
              { num: "03", title: "FILTER", desc: "Most launches never make it through. Weak liquidity, insufficient volume, excessive concentration, suspicious developers — rejected." },
              { num: "04", title: "EXECUTE", desc: "When the signal is ready: Qualified → Entry → Verify → Position tracking. Not simply Signal → Buy." },
            ].map((s) => (
              <div key={s.num} className="border-l border-[var(--border)] pl-4">
                <div className="text-[11px] tracking-[0.12em] text-[var(--cyan)] mb-1">{s.num} / {s.title}</div>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-[var(--border)] rounded-lg p-6 mb-12">
            <div className="text-[11px] tracking-[0.15em] text-[var(--amber)] mb-2">THE 2× PROFIT PROTECTION</div>
            <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mb-4">
              Take the initial risk off the table. When a position reaches 2×, recover the initial capital. The remaining tokens become the potential moon bag.
            </p>
            <div className="mono text-[11px] tracking-wider text-[var(--text-dim)]">
              $100 ENTRY → $200 → RECOVER $100 → REMAINING POSITION STAYS OPEN
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-3">SO HOW ARE YOU ALWAYS SO EARLY?</h3>
            <p className="text-[14px] text-[var(--text-muted)] leading-relaxed mb-4">
              The answer isn&apos;t luck. HIDDEN CLAW isn&apos;t waiting for a token to trend. It&apos;s watching the behavior that happens before the trend.
            </p>
            <p className="text-[14px] text-[var(--text)] font-medium">WE&apos;RE WATCHING FOR THE SIGNAL BEFORE THE HYPE.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/how-it-works" className="border border-[var(--border)] text-[var(--text-muted)] text-[12px] font-medium tracking-wider px-6 py-3 hover:text-[var(--text)] hover:border-[var(--text-dim)]">READ THE FULL SYSTEM →</Link>
            <Link href="/risk" className="bg-[var(--cyan)] text-black text-[12px] font-semibold tracking-wider px-6 py-3 hover:opacity-90">ENTER SYSTEM →</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-8 py-3 flex items-center justify-between text-[10px] tracking-wider text-[var(--text-dim)]">
        <div className="flex gap-6">
          <span>01 / PRIVATE ACCESS</span>
          <span>02 / REAL-TIME INTELLIGENCE</span>
          <span>03 / OWNER CONTROLLED</span>
        </div>
        <span>SIMULATION ENVIRONMENT</span>
      </footer>
    </div>
  );
}
