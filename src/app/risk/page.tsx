import Link from "next/link";

export default function RiskPage() {
  return (
    <div className="min-h-screen">
      <header className="px-8 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <Link href="/terms" className="text-[11px] tracking-wider text-[var(--cyan)] hover:underline">CONTINUE →</Link>
      </header>
      <main className="max-w-2xl mx-auto px-8 py-16">
        <div className="text-[10px] tracking-[0.2em] text-[var(--amber)] mb-4">DISCLOSURE</div>
        <h1 className="text-2xl font-semibold tracking-tight mb-6">INTELLIGENCE IS NOT CERTAINTY.</h1>
        <div className="space-y-4 text-[14px] text-[var(--text-muted)] leading-relaxed mb-10">
          <p>HIDDEN CLAW is an intelligence system. It surfaces signals from on-chain activity, wallet behavior, developer history, security checks, and social attention. It does not guarantee outcomes.</p>
          <ul className="space-y-2 list-disc pl-5">
            <li>Early tokens can fail completely.</li>
            <li>Token metadata can be misleading or fabricated.</li>
            <li>Smart-money behavior can change without notice.</li>
            <li>Security checks can be incomplete or outdated.</li>
            <li>Social signals can be manipulated.</li>
            <li>Automated execution can cause rapid financial loss.</li>
            <li>Historical wallet performance does not guarantee future performance.</li>
            <li>No combination of signals guarantees profit.</li>
          </ul>
          <p>You remain solely responsible for any decisions, parameters, and capital you deploy. This environment is a simulation. It does not execute real transactions or move funds.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/terms" className="bg-[var(--cyan)] text-black text-[12px] font-semibold tracking-wider px-6 py-3 hover:opacity-90">I UNDERSTAND — CONTINUE</Link>
          <Link href="/" className="border border-[var(--border)] text-[var(--text-muted)] text-[12px] font-medium tracking-wider px-6 py-3 hover:text-[var(--text)]">BACK</Link>
        </div>
      </main>
    </div>
  );
}
