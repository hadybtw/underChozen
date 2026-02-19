export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20 sm:mt-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs sm:text-sm text-muted text-center sm:text-left">
          UnderChozen. Market ranges based on aggregated public compensation
          data and cost-of-living adjustments.
        </p>
        <div className="flex gap-5 sm:gap-6 text-xs sm:text-sm text-muted">
          <a href="#" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Methodology
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
