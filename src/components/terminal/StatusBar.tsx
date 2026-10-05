export function StatusBar() {
  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border)] flex items-center px-4 gap-4 text-[9px] mono h-full text-[var(--text-dim)] tracking-wider uppercase">
      <span>Scanner <span className="text-[var(--green)]">Active</span></span>
      <span className="text-[var(--border-strong)]">|</span>
      <span>Detection <span className="text-[var(--green)]">Active</span></span>
      <span className="text-[var(--border-strong)]">|</span>
      <span>Execution <span className="text-[var(--amber)]">Optional</span></span>
      <span className="ml-auto normal-case tracking-normal">Evidence over prediction \u00b7 3 SOL access unlocked</span>
    </footer>
  );
}
