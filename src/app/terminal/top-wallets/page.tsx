import Link from "next/link";

export default function TopWalletsPage() {
  return (
    <div className="p-5 max-w-xl space-y-4">
      <h1 className="h-title">Top wallets</h1>
      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
        Per-token holder ranking needs deeper RPC indexing. Use deployer and creator views from the live sample.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/terminal/wallets" className="arrow-link">Wallet creations</Link>
        <Link href="/terminal/developers" className="arrow-link">Dev reputation</Link>
        <Link href="/terminal/smart-money" className="arrow-link">Smart wallets</Link>
      </div>
    </div>
  );
}
