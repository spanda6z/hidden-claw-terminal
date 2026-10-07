import Link from "next/link";

export default function ClustersPage() {
  return (
    <div className="p-5 max-w-xl space-y-4">
      <h1 className="h-title">Ticker clusters</h1>
      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
        Social mention clustering is not live in this release. Use live on-chain surfaces instead.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/terminal/scanner" className="arrow-link">Scanner</Link>
        <Link href="/terminal/feed" className="arrow-link">Live feed</Link>
        <Link href="/terminal/alerts" className="arrow-link">Alerts</Link>
      </div>
    </div>
  );
}
