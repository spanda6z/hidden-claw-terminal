import { Sidebar } from "@/components/terminal/Sidebar";
import { TopBar } from "@/components/terminal/TopBar";
import { StatusBar } from "@/components/terminal/StatusBar";

export default function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen grid grid-cols-[200px_1fr] grid-rows-[36px_1fr_28px] overflow-hidden">
      <div className="row-span-3">
        <Sidebar />
      </div>
      <TopBar />
      <main className="overflow-y-auto bg-[var(--bg)]">{children}</main>
      <StatusBar />
    </div>
  );
}
