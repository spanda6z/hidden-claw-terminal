import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full border border-[var(--cyan)] flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
          </span>
          <div>
            <div className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</div>
            <div className="text-[9px] text-[var(--text-dim)] tracking-[0.1em]">PRIVATE SOLANA INTELLIGENCE</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-wider text-[var(--text-dim)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
          PRIVATE SYSTEM / SIMULATION
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-center px-8 md:px-16 max-w-5xl mx-auto w-full py-20">
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
      </main>
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
