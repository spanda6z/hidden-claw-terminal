export function StatusBar() {
  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border)] flex items-center px-4 gap-5 text-[10px] mono h-full text-[var(--text-dim)]">
      <span>SOLANA <span className="text-[var(--green)]">ONLINE</span></span>
      <span>INGESTION <span className="text-[var(--green)]">ONLINE</span></span>
      <span>SLOT <span className="text-[var(--text-muted)]">312,984,221</span></span>
      <span>WS <span className="text-[var(--green)]">HEALTHY</span></span>
      <span>SMART MONEY <span className="text-[var(--green)]">ACTIVE</span></span>
      <span>DEVELOPER <span className="text-[var(--green)]">ACTIVE</span></span>
      <span>SECURITY <span className="text-[var(--green)]">ACTIVE</span></span>
      <span>SOCIAL <span className="text-[var(--green)]">ACTIVE</span></span>
      <span>EXECUTION <span className="text-[var(--amber)]">STANDBY</span></span>
      <span className="ml-auto sim-badge">SIMULATION / DEMO DATA</span>
    </footer>
  );
}
