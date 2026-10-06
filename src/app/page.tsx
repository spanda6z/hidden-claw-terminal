"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LaunchSignal } from "@/lib/signals";
import { formatAge, formatUsd } from "@/lib/signals";

export default function Home() {
  const [live, setLive] = useState<LaunchSignal[]>([]);
  const [sol, setSol] = useState<{ usd: number | null; change24h: number | null }>({
    usd: null,
    change24h: null,
  });

  useEffect(() => {
    fetch("/api/signals/pumpfun?limit=6")
      .then((r) => r.json())
      .then((d) => setLive(d.signals || []))
      .catch(() => {});
    fetch("/api/signals/sol")
      .then((r) => r.json())
      .then((d) => setSol({ usd: d.usd ?? null, change24h: d.change24h ?? null }))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[var(--border)] sticky top-0 bg-[var(--bg-deep)]/90 backdrop-blur-md z-20">
        <Link href="/" className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-md border border-[var(--cyan)]/50 flex items-center justify-center bg-[var(--cyan-dim)]">
            <span className="w-2 h-2 rounded-sm bg-[var(--cyan)]" />
          </span>
          <div>
            <div className="text-[12px] font-bold tracking-[0.14em]">HIDDEN CLAW</div>
            <div className="text-[9px] text-[var(--text-dim)] tracking-[0.12em]">MARKET INTELLIGENCE</div>
          </div>
        </Link>
        <nav className="flex items-center gap-5">
          <Link href="/how-it-works" className="text-[11px] tracking-wider text-[var(--text-muted)] hover:text-[var(--text)] hidden sm:inline">HOW IT WORKS</Link>
          <div className="flex items-center gap-2 text-[10px] mono text-[var(--text-dim)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
            {sol.usd != null ? (
              <span>
                SOL ${sol.usd.toFixed(2)}
                {sol.change24h != null && (
                  <span className={sol.change24h >= 0 ? " text-[var(--green)]" : " text-[var(--red)]"}>
                    {" "}{sol.change24h >= 0 ? "+" : ""}{sol.change24h.toFixed(1)}%
                  </span>
                )}
              </span>
            ) : (
              <span>LIVE</span>
            )}
          </div>
          <Link href="/terminal" className="btn-primary !py-2 !px-4 text-[11px]">OPEN TERMINAL</Link>
        </nav>
      </header>

      <section className="relative px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-20 grid-bg overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="label mb-5" style={{ color: "var(--cyan)" }}>BEFORE THE CROWD</div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05] tracking-[-0.03em] mb-6 max-w-3xl">
            The market leaves footprints.<br />
            <span className="text-[var(--cyan)]">We follow them.</span>
          </h1>
          <p className="max-w-xl text-[15px] text-[var(--text-muted)] leading-relaxed mb-10">
            HIDDEN CLAW is a Solana intelligence terminal. Watch launches, wallet behavior, and developer patterns in real time \u2014 then decide with context, not hype.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/risk" className="btn-primary">ENTER SYSTEM \u2192</Link>
            <Link href="/terminal" className="btn-ghost">SKIP TO TERMINAL</Link>
            <Link href="/how-it-works" className="btn-ghost">HOW IT WORKS</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--bg-elevated)]/50">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-4 flex items-center gap-4 overflow-x-auto">
          <span className="live-badge shrink-0">LIVE</span>
          <span className="text-[10px] tracking-wider text-[var(--text-dim)] shrink-0 uppercase">Pump.fun launches</span>
          {live.length === 0 && <span className="text-[12px] text-[var(--text-dim)]">Connecting stream\u2026</span>}
          {live.map((s) => (
            <a key={s.id} href={`https://pump.fun/coin/${s.mint}`} target="_blank" rel="noreferrer"
              className="shrink-0 flex items-center gap-2 text-[12px] border border-[var(--border)] rounded-md px-3 py-1.5 hover:border-[var(--cyan)]/40 transition-colors">
              <span className="mono text-[var(--cyan)] font-medium">{s.symbol}</span>
              <span className="text-[var(--text-dim)] mono text-[11px]">{formatAge(s.ageSec)}</span>
              <span className="text-[var(--text-muted)] mono text-[11px]">{formatUsd(s.mcapUsd)}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="label mb-3">PROCESS</div>
          <h2 className="h-title text-2xl md:text-3xl mb-3">
            We don&apos;t chase the hype.
            <span className="text-[var(--text-muted)]"> We track the behavior behind it.</span>
          </h2>
          <p className="text-[14px] text-[var(--text-muted)] max-w-2xl mb-10 leading-relaxed">
            New tokens launch constantly. Most people notice after the move. HIDDEN CLAW watches wallets, early flow, and curve dynamics while the setup is still forming.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
            {[
              { n: "01", t: "WATCH", d: "Launches, reserves, early trades" },
              { n: "02", t: "DETECT", d: "Acceleration, curve, concentration" },
              { n: "03", t: "EXPLAIN", d: "Why it matters \u2014 with evidence" },
              { n: "04", t: "DECIDE", d: "You act. Execution stays optional." },
            ].map((x) => (
              <div key={x.n} className="card p-4">
                <div className="text-[10px] mono text-[var(--cyan)] mb-2">{x.n}</div>
                <div className="text-[13px] font-semibold tracking-wide mb-1">{x.t}</div>
                <div className="text-[12px] text-[var(--text-muted)] leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>
          <div className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-[13px] font-semibold mb-1">Intelligence first. Execution second.</div>
              <p className="text-[12px] text-[var(--text-muted)] max-w-lg">Surface unusual activity with context. Filter noise. Never present a buy call as a fact.</p>
            </div>
            <Link href="/terminal" className="arrow-link shrink-0">Open terminal</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] px-6 md:px-10 py-16 bg-[var(--bg-elevated)]/30">
        <div className="max-w-5xl mx-auto">
          <div className="label mb-3">TERMINAL</div>
          <h2 className="h-title text-xl mb-8">What you get inside</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { t: "Scanner", d: "Live Pump.fun launches with age, mcap, curve, signal tier" },
              { t: "Live feed", d: "Most recently traded tokens, continuously refreshed" },
              { t: "Curves", d: "Bonding curve progress from real reserve data" },
              { t: "Dev reputation", d: "Creator wallets ranked by activity in the live sample" },
              { t: "Detection", d: "Multi-signal framing \u2014 acceleration, not just price" },
              { t: "Investigate", d: "Full story workspace before you act" },
            ].map((m) => (
              <div key={m.t} className="card p-4">
                <div className="text-[13px] font-semibold mb-1.5">{m.t}</div>
                <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] px-6 md:px-10 py-8 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between gap-4 text-[11px] text-[var(--text-dim)]">
          <span className="tracking-[0.12em] font-medium">HIDDEN CLAW</span>
          <div className="flex gap-6">
            <Link href="/how-it-works" className="hover:text-[var(--text)]">How it works</Link>
            <Link href="/risk" className="hover:text-[var(--text)]">Risk</Link>
            <Link href="/terminal" className="hover:text-[var(--text)]">Terminal</Link>
            <a href="https://x.com/chainpulseoffi?s=11" target="_blank" rel="noreferrer" className="hover:text-[var(--text)]">X / contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
