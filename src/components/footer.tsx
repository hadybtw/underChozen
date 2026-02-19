export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-20 sm:mt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-sm font-bold tracking-tight text-foreground/90">UnderChozen</span>
          <span className="text-muted/30">·</span>
          <p className="text-[11px] sm:text-xs text-muted/60">
            Market data from aggregated public compensation sources.
          </p>
        </div>
        <div className="flex gap-5 sm:gap-6 text-[11px] sm:text-xs text-muted/50">
          <a href="#" className="hover:text-foreground/80 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-foreground/80 transition-colors">
            Methodology
          </a>
          <a href="#" className="hover:text-foreground/80 transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground/80 transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
