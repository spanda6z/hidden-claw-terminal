"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/terminal", label: "Overview", icon: "\u25C6" },
  { href: "/terminal/scanner", label: "Scanner", icon: "\u25CE" },
  { href: "/terminal/launches", label: "Launches", icon: "\u25C7" },
  { href: "/terminal/pumpfun", label: "Pump.fun", icon: "\u25C9" },
  { href: "/terminal/feed", label: "Live feed", icon: "\u25A3" },
  { href: "/terminal/curves", label: "Curves", icon: "\u25D0" },
  { href: "/terminal/detection", label: "Detection", icon: "\u26A1" },
  { href: "/terminal/wallets", label: "Wallet creations", icon: "\u2B22" },
  { href: "/terminal/developers", label: "Dev reputation", icon: "\u25C8" },
  { href: "/terminal/smart-money", label: "Smart wallets", icon: "\u25C7" },
  { href: "/terminal/investigation", label: "Investigate", icon: "\u2315" },
  { href: "/terminal/watchlist", label: "Watchlist", icon: "\u2605" },
  { href: "/terminal/alerts", label: "Alerts", icon: "\u2691" },
  { href: "/terminal/execution", label: "Execution", icon: "\u25B7" },
  { href: "/terminal/settings", label: "Settings", icon: "\u2699" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="bg-[var(--bg-elevated)] border-r border-[var(--border)] flex flex-col h-full select-none">
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-md border border-[var(--cyan)]/40 flex items-center justify-center bg-[var(--cyan-dim)]">
            <span className="w-2 h-2 rounded-sm bg-[var(--cyan)]" />
          </span>
          <div>
            <div className="text-[12px] font-bold tracking-[0.12em] group-hover:text-[var(--cyan)] transition-colors">HIDDEN CLAW</div>
            <div className="text-[9px] text-[var(--text-dim)] tracking-[0.14em] font-medium">INTELLIGENCE</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto px-2 space-y-0.5">
        {NAV.map((item) => {
          const active = item.href === "/terminal" ? pathname === "/terminal" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={cn("nav-item", active && "active")}>
              <span className="text-[11px] opacity-70 w-4 text-center">{item.icon}</span>
              <span>{item.label}</span>
              {active && <span className="ml-auto text-[var(--cyan)] text-[10px]">\u203A</span>}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 border-t border-[var(--border)] space-y-2">
        <div className="text-[10px] text-[var(--text-dim)] leading-relaxed font-medium">Understand first.<br />Decide second.</div>
        <span className="live-badge">LIVE DATA</span>
        <button type="button" onClick={() => router.push("/")} className="block text-[10px] text-[var(--text-dim)] hover:text-[var(--text)] tracking-wider">Exit \u2192</button>
      </div>
    </aside>
  );
}
