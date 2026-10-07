import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <div className="text-[12px] tracking-[0.2em] text-[var(--text-dim)]">404</div>
      <h1 className="h-title">Page not found</h1>
      <div className="flex gap-4">
        <Link href="/" className="arrow-link">Home</Link>
        <Link href="/terminal" className="arrow-link">Terminal</Link>
      </div>
    </div>
  );
}
