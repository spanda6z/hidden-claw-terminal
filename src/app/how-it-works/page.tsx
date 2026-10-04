import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <header className="px-8 py-4 border-b border-[var(--border)] flex items-center justify-between sticky top-0 bg-[var(--bg)]/95 backdrop-blur z-10">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <Link href="/risk" className="text-[11px] tracking-wider text-[var(--cyan)] hover:underline">ENTER SYSTEM →</Link>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-[10px] tracking-[0.2em] text-[var(--cyan)] mb-4">HOW IT WORKS</div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6 leading-tight">
          We don't chase the hype.<br />
          <span className="text-[var(--text-muted)]">We track the behavior behind it.</span>
        </h1>
        <div className="space-y-4 text-[15px] text-[var(--text-muted)] leading-relaxed mb-16">
          <p>New tokens launch every second. Most traders only notice them after the market has already started moving.</p>
          <p className="text-[var(--text)]">HIDDEN CLAW starts earlier.</p>
          <p>We track the wallets behind launches, study their previous behavior, monitor bundled activity and early allocations, and watch what happens in the first seconds and minutes after a token goes live.</p>
          <p>Then we combine that intelligence with real-time volume, liquidity, holder growth, wallet concentration, developer activity, and safety signals.</p>
          <p className="text-[var(--text)] font-medium">Identify unusual behavior early. Filter out weak opportunities. Act only when enough signals align.</p>
        </div>

        <div className="border border-[var(--border)] rounded p-5 mb-16 mono text-[12px] text-center tracking-wider text-[var(--text-muted)]">
          FROM WALLET → SIGNAL → ENTRY → PROFIT
        </div>

        <section className="mb-16">
          <div className="text-[11px] tracking-[0.15em] text-[var(--cyan)] mb-2">01 / TRACK</div>
          <h2 className="text-xl font-semibold mb-4">Follow the wallets, not just the tokens.</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p>Every launch has a story behind it.</p>
            <p>HIDDEN CLAW monitors developer wallets and wallet groups associated with repeated launches, looking for patterns in how they create, bundle, buy, hold, and distribute tokens.</p>
            <p className="text-[var(--text-dim)]">The system asks:</p>
            <ul className="space-y-1.5 pl-1">
              {["Who launched it?", "What have these wallets done before?", "Are they repeating a recognizable pattern?", "What are they doing right now?"].map((q) => (
                <li key={q} className="flex gap-2"><span className="text-[var(--cyan)]">→</span>{q}</li>
              ))}
            </ul>
            <p>Instead of treating every new token as a random opportunity, HIDDEN CLAW builds context around the wallets behind the launch.</p>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-[11px] tracking-[0.15em] text-[var(--cyan)] mb-2">02 / DETECT</div>
          <h2 className="text-xl font-semibold mb-4">Catch the market while it is still forming.</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p>Once a token launches, the first seconds and minutes can reveal important information.</p>
            <p>HIDDEN CLAW continuously monitors:</p>
            <ul className="grid grid-cols-2 gap-1.5 text-[13px]">
              {["Early transaction flow", "Bundled allocations", "Initial buying behavior", "Trading volume", "Liquidity", "Holder growth", "Developer allocation", "Wallet concentration", "Market-cap movement"].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-[var(--text-dim)]">·</span>{item}</li>
              ))}
            </ul>
            <p>Unusually strong early volume can be an important signal. A token generating tens of thousands of dollars in early volume is not automatically a winner.</p>
            <p>But when that activity appears alongside the right wallet behavior, liquidity, holder growth, and safety conditions, the signal becomes much more meaningful.</p>
            <p className="text-[var(--text)] font-medium">We're not looking for the loudest token. We're looking for the strongest combination of signals.</p>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-[11px] tracking-[0.15em] text-[var(--cyan)] mb-2">03 / FILTER</div>
          <h2 className="text-xl font-semibold mb-4">Most launches never make it through.</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p>Thousands of tokens can launch. HIDDEN CLAW doesn't need to trade thousands of them.</p>
            <p>Every candidate must pass multiple conditions before it becomes actionable.</p>
            <div className="border border-[var(--border)] rounded p-4 mono text-[11px] tracking-wider text-center text-[var(--text-dim)] my-6">
              MARKET → LIQUIDITY → VOLUME → AGE → HOLDERS → CONCENTRATION → DEVELOPER → SAFETY
            </div>
            <ul className="space-y-2">
              {[["Weak liquidity?", "Rejected."], ["Insufficient volume?", "Rejected."], ["Excessive concentration?", "Rejected."], ["Suspicious developer behavior?", "Rejected."], ["Missing or unreliable data?", "Rejected."]].map(([q, a]) => (
                <li key={q} className="flex gap-3"><span>{q}</span><span className="text-[var(--red)] tracking-wider text-[12px]">{a}</span></li>
              ))}
            </ul>
            <p>Only candidates that satisfy the required conditions move forward. The objective isn't to predict every coin. It's to eliminate as many weak opportunities as possible before capital is exposed.</p>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-[11px] tracking-[0.15em] text-[var(--cyan)] mb-2">04 / EXECUTE</div>
          <h2 className="text-xl font-semibold mb-4">When the signal is ready, the decision is simple.</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p>Once a token passes the required conditions, the strategy moves from research to execution.</p>
            <div className="border border-[var(--border)] rounded p-4 mono text-[11px] tracking-wider text-center text-[var(--text-dim)] my-6">
              QUALIFIED → ENTRY → VERIFY → POSITION TRACKING
            </div>
            <p>A transaction being submitted isn't enough. The actual on-chain result matters.</p>
            <p>HIDDEN CLAW verifies the transaction, confirms the position, records the entry, and begins monitoring the trade.</p>
            <p className="text-[var(--text)]">Signal → Execution → Verification → Position</p>
            <p className="text-[var(--text-dim)]">Not simply: Signal → Buy</p>
          </div>
        </section>

        <section className="mb-16 border border-[var(--border)] rounded-lg p-6">
          <div className="text-[11px] tracking-[0.15em] text-[var(--amber)] mb-2">THE 2× PROFIT PROTECTION</div>
          <h2 className="text-xl font-semibold mb-4">Take the initial risk off the table.</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p>The strategy can use a predefined 2× milestone to recover the initial capital.</p>
            <div className="mono text-[12px] text-center space-y-1 py-4 text-[var(--text)]">
              <div>$100 ENTRY</div><div className="text-[var(--text-dim)]">↓</div>
              <div>POSITION REACHES $200</div><div className="text-[var(--text-dim)]">↓</div>
              <div className="text-[var(--green)]">RECOVER THE INITIAL $100</div><div className="text-[var(--text-dim)]">↓</div>
              <div>REMAINING POSITION STAYS OPEN</div>
            </div>
            <p>The remaining tokens become the potential moon bag. If the token continues higher, you maintain exposure. If it reverses afterward, the original capital has already been removed from the position.</p>
            <p className="text-[var(--text-dim)] text-[13px]">Actual execution can account for fees, slippage, liquidity, and available token balance. This isn't about perfectly selling the top. It's about turning a winning move into a more disciplined position.</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">Why the strategy can be selective</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p className="text-[var(--text)] font-medium">The edge isn't one signal. It's the combination.</p>
            <p>A strategy built around a single indicator can be fragile. HIDDEN CLAW combines multiple layers of information:</p>
            <ul className="grid grid-cols-2 gap-1.5 text-[13px]">
              {["Developer behavior", "Wallet history", "Launch activity", "Bundle patterns", "Early volume", "Liquidity", "Holder growth", "Supply concentration", "Safety checks", "Position management"].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-[var(--cyan)]">·</span>{item}</li>
              ))}
            </ul>
            <p>The more independent conditions that align, the more selective the setup becomes. That is where the potential for a high profitability rate comes from.</p>
            <p className="text-[var(--text-dim)]">Not from guessing. Not from buying everything. Not from assuming every token will pump. From being selective about what qualifies.</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">The 90% benchmark</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p className="text-[var(--text)] font-medium">A 90% win rate isn't assumed. It has to be earned.</p>
            <p>The goal isn't to claim that every trade will be profitable. The goal is to build a system whose results can be measured.</p>
            <p>If historical testing demonstrates that 90 out of 100 properly qualified setups reach the defined profitable outcome before the defined loss condition, then a 90% profitability figure becomes a measurable performance statistic.</p>
            <p className="text-[var(--amber)]">Until the data proves that number, 90% remains a target—not a guarantee.</p>
            <p>HIDDEN CLAW shouldn't ask users to simply believe a number. It should show the rules. Show the qualifying conditions. Show the risk management. And ultimately: show the results.</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-4">The real advantage</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p className="text-[var(--text)] font-medium">Most traders watch the market. HIDDEN CLAW watches the behavior behind it.</p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="border border-[var(--border)] rounded p-4">
                <div className="text-[10px] tracking-wider text-[var(--text-dim)] mb-2">A TRADER MIGHT SEE</div>
                <p className="text-[13px]">“New token is pumping.”</p>
              </div>
              <div className="border border-[var(--cyan)]/30 rounded p-4">
                <div className="text-[10px] tracking-wider text-[var(--cyan)] mb-2">HIDDEN CLAW LOOKS DEEPER</div>
                <p className="text-[13px] leading-relaxed">This wallet launched it. Associated wallets accumulated early. Recognizable allocation pattern. Volume accelerated. Liquidity meets requirement. Holder growth increasing. Concentration within limits. Safety checks passed.</p>
              </div>
            </div>
            <p>That's a fundamentally different way of looking at the market. You're not simply following the crowd. You're trying to understand why the crowd is arriving.</p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6">From chaos to a system</h2>
          <div className="border border-[var(--border)] rounded p-6 mono text-[11px] tracking-wider text-center space-y-1 text-[var(--text-muted)]">
            {["THOUSANDS OF LAUNCHES", "TRACK THE WALLETS", "IDENTIFY LAUNCH BEHAVIOR", "DETECT EARLY ACTIVITY", "MEASURE VOLUME + LIQUIDITY", "ANALYZE HOLDERS + CONCENTRATION", "CHECK DEVELOPER BEHAVIOR", "RUN SAFETY FILTERS", "QUALIFIED OPPORTUNITY", "EXECUTE", "VERIFY ON-CHAIN", "MANAGE POSITION", "2× → RECOVER INITIAL CAPITAL", "LET THE REMAINING POSITION RUN"].map((step, i, arr) => (
              <div key={step}>
                <div className={i === arr.length - 1 || i === 8 ? "text-[var(--cyan)]" : ""}>{step}</div>
                {i < arr.length - 1 && <div className="text-[var(--text-dim)]">↓</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            FOLLOW THE BEHAVIOR.<br />
            <span className="text-[var(--text-muted)]">NOT THE HYPE.</span>
          </h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p>The market moves fast.</p>
            <p>The advantage isn't knowing the future. It's having the infrastructure to recognize important behavior early, filter information intelligently, execute according to predefined rules, and manage positions without emotion.</p>
            <p className="text-[var(--text)] font-medium">You don't need to catch every token. You need to recognize the right ones.</p>
          </div>
        </section>

        <section className="mb-16 border-t border-[var(--border)] pt-12">
          <div className="text-[10px] tracking-[0.2em] text-[var(--cyan)] mb-4">THE QUESTION</div>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">SO HOW ARE YOU ALWAYS SO EARLY?</h2>
          <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed">
            <p>That's the question everyone asks.</p>
            <ul className="space-y-1 text-[var(--text-dim)] italic">
              <li>“How did you find this coin so early?”</li>
              <li>“Why are you already in before everyone else?”</li>
              <li>“How do you keep finding these launches before they start moving?”</li>
            </ul>
            <p className="text-[var(--text)] font-medium">The answer isn't luck.</p>
            <p>HIDDEN CLAW isn't waiting for a token to trend. It's watching the behavior that happens before the trend.</p>
            <p>While most traders are looking at charts, social media, and trending lists, HIDDEN CLAW is already monitoring the wallets behind new launches, their previous behavior, early allocations, bundled activity, volume, liquidity, holder growth, and other on-chain signals.</p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="border border-[var(--border)] rounded p-4">
                <div className="text-[10px] tracking-wider text-[var(--text-dim)] mb-2">BY THE TIME EVERYONE ELSE SEES</div>
                <p className="text-[13px]">“This coin is pumping.”</p>
              </div>
              <div className="border border-[var(--cyan)]/30 rounded p-4">
                <div className="text-[10px] tracking-wider text-[var(--cyan)] mb-2">HIDDEN CLAW MAY HAVE ALREADY SEEN</div>
                <p className="text-[13px]">“Something is happening here.”</p>
              </div>
            </div>
            <p>That's the difference. You see the movement. HIDDEN CLAW watches what happens before the movement.</p>
            <p>The goal isn't to predict the future. It's to recognize the setup early enough to act before the opportunity becomes obvious to everyone else.</p>
            <p className="text-[var(--text)] font-medium pt-4">
              Because we aren't chasing the signal after it becomes popular.<br />
              <span className="text-[var(--cyan)]">WE'RE WATCHING FOR THE SIGNAL BEFORE THE HYPE.</span>
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link href="/risk" className="bg-[var(--cyan)] text-black text-[12px] font-semibold tracking-wider px-6 py-3 hover:opacity-90">ENTER SYSTEM →</Link>
          <Link href="/" className="border border-[var(--border)] text-[var(--text-muted)] text-[12px] font-medium tracking-wider px-6 py-3 hover:text-[var(--text)]">BACK</Link>
        </div>
      </main>
    </div>
  );
}
