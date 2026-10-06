export function StatusBar() {
  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border)] flex items-center px-4 gap-4 text-[9px] mono h-full text-[var(--text-dim)] tracking-wider uppercase">
      <span>Pump.fun <span className="text-[var(--green)]">Live</span></span>
      <span className="text-[var(--border-strong)]">|</span>
      <span>Detection <span className="text-[var(--green)]">On</span></span>
      <span className="text-[var(--border-strong)]">|</span>
      <span>Execution <span className="text-[var(--amber)]">Optional</span></span>
      <span className="ml-auto normal-case tracking-normal">Evidence over prediction</span>
    </footer>
  );
}
