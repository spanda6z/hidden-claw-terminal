import { Sidebar } from "@/components/terminal/Sidebar";
import { TopBar } from "@/components/terminal/TopBar";
import { StatusBar } from "@/components/terminal/StatusBar";
import { AuthGate } from "@/components/terminal/AuthGate";

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="h-screen flex overflow-hidden">
        <div className="hidden md:block w-[200px] shrink-0 h-full">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <div className="h-10 shrink-0">
            <TopBar />
          </div>
          <div className="md:hidden border-b border-[var(--border)] bg-[var(--bg-elevated)] px-2 py-1.5 overflow-x-auto flex gap-1">
            {[
              ["/terminal", "Overview"],
              ["/terminal/scanner", "Scanner"],
              ["/terminal/pumpfun", "Pump"],
              ["/terminal/wallets", "Wallets"],
              ["/terminal/alerts", "Alerts"],
              ["/terminal/execution", "Exec"],
              ["/terminal/investigation", "Investigate"],
            ].map(([href, label]) => (
              <a key={href} href={href}
                className="shrink-0 text-[10px] tracking-wider px-2.5 py-1.5 rounded border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--cyan)] hover:border-[var(--cyan)]/40">
                {label}
              </a>
            ))}
          </div>
          <main className="flex-1 overflow-y-auto bg-[var(--bg)]">{children}</main>
          <div className="h-7 shrink-0 hidden sm:block">
            <StatusBar />
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
