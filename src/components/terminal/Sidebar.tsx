"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { clearSession } from "@/lib/auth";

const NAV = [
  { href: "/terminal", label: "Overview" },
  { href: "/terminal/scanner", label: "Scanner" },
  { href: "/terminal/detection", label: "Detection" },
  { href: "/terminal/pumpfun", label: "Pump.fun" },
  { href: "/terminal/smart-money", label: "Smart Wallets" },
  { href: "/terminal/top-wallets", label: "Top Wallets" },
  { href: "/terminal/developers", label: "Dev Reputation" },
  { href: "/terminal/investigation", label: "Investigate" },
  { href: "/terminal/alerts", label: "Alerts" },
  { href: "/terminal/execution", label: "Execution" },
  { href: "/terminal/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  function signOut() {
    clearSession();
    router.replace("/signup");
  }

  return (
    <aside className="bg-[var(--bg-elevated)] border-r border-[var(--border)] flex flex-col h-full">
      <div className="px-4 py-4 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md border border-[var(--cyan)]/40 flex items-center justify-center">
            <span className="w-2 h-2 rounded-sm bg-[var(--cyan)]" />
          </span>
          <div>
            <div className="text-[12px] font-semibold tracking-[0.1em]">HIDDEN CLAW</div>
            <div className="text-[9px] text-[var(--text-dim)] tracking-wider">INTELLIGENCE</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto px-2">
        {NAV.map((item) => {
          const active = item.href === "/terminal" ? pathname === "/terminal" : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={cn("block px-3 py-2 text-[12px] font-medium rounded-md transition-colors mb-0.5", active ? "bg-[var(--cyan-dim)] text-[var(--cyan)]" : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-hover)]")}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 border-t border-[var(--border)] space-y-2">
        <div className="text-[10px] text-[var(--text-dim)] leading-relaxed">Understand first.<br />Decide second.</div>
        <span className="live-badge">LIVE SIGNALS</span>
        <button type="button" onClick={signOut} className="block text-[10px] text-[var(--text-dim)] hover:text-[var(--text)] tracking-wider mt-1">
          Sign out
        </button>
      </div>
    </aside>
  );
}
