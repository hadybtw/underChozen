import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] mt-20 sm:mt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center gap-5 sm:gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-center sm:text-left">
          <span className="text-sm font-semibold tracking-tight text-foreground/90 font-serif italic">
            UnderChozen
          </span>
          <span className="text-muted/30 hidden sm:inline">&middot;</span>
          <p className="text-xs text-muted/50 font-light">
            Market data from aggregated public compensation sources.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link
            href="/methodology"
            className="text-xs text-muted/45 hover:text-foreground/70 transition-colors"
          >
            Methodology
          </Link>
          <Link
            href="/terms"
            className="text-xs text-muted/45 hover:text-foreground/70 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-xs text-muted/45 hover:text-foreground/70 transition-colors"
          >
            Privacy
          </Link>
          <span className="text-xs text-muted/45 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
            </span>
            10,000+ users
          </span>
        </div>
      </div>
    </footer>
  );
}
