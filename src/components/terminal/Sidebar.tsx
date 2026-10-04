"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/terminal", label: "OVERVIEW" },
  { href: "/terminal/feed", label: "LIVE FEED" },
  { href: "/terminal/launches", label: "LAUNCHES" },
  { href: "/terminal/pumpfun", label: "PUMP.FUN" },
  { href: "/terminal/smart-money", label: "SMART MONEY" },
  { href: "/terminal/wallets", label: "WALLETS" },
  { href: "/terminal/developers", label: "DEVELOPERS" },
  { href: "/terminal/scanner", label: "TOKEN SCANNER" },
  { href: "/terminal/social", label: "SOCIAL INTEL" },
  { href: "/terminal/clusters", label: "TICKER CLUSTERS" },
  { href: "/terminal/curves", label: "BONDING CURVES" },
  { href: "/terminal/watchlist", label: "WATCHLIST" },
  { href: "/terminal/execution", label: "EXECUTION" },
  { href: "/terminal/settings", label: "SETTINGS" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-[var(--bg-elevated)] border-r border-[var(--border)] flex flex-col h-full">
      <div className="px-4 py-3 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full border border-[var(--text-muted)] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text)]" />
          </span>
          <div>
            <div className="text-[11px] font-semibold tracking-[0.12em]">HIDDEN CLAW</div>
            <div className="text-[9px] text-[var(--text-dim)] tracking-wider">INTELLIGENCE</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV.map((item) => {
          const active = item.href === "/terminal" ? pathname === "/terminal" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={cn("block px-4 py-[7px] text-[11px] tracking-[0.06em] font-medium transition-colors", active ? "bg-[var(--bg-hover)] text-[var(--text)] border-l-2 border-[var(--cyan)]" : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)] border-l-2 border-transparent")}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-2 border-t border-[var(--border)]">
        <span className="sim-badge">SIMULATION / DEMO</span>
      </div>
    </aside>
  );
}
