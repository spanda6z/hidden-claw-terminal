import Link from "next/link";

export default function SocialPage() {
  return (
    <div className="p-5 max-w-xl space-y-4">
      <h1 className="h-title">Social signals</h1>
      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
        Social ingestion is reserved for a later release. Current intelligence is on-chain from Pump.fun.
      </p>
      <Link href="/terminal/scanner" className="arrow-link">Open scanner</Link>
    </div>
  );
}
