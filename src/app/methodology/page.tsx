"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { Footer } from "@/components/footer";
import { ArrowLeft, Database, Calculator, MapPin, Building, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" as const },
  transition: { duration: 0.5, ease },
};

const sections = [
  {
    icon: Database,
    title: "Data Sources",
    content: `Our salary data is aggregated from multiple public compensation sources including employer-reported salary surveys, job posting analysis, public compensation disclosures, and industry benchmarking reports. We cross-reference data across sources to ensure accuracy and remove outliers.

Our dataset covers 25 roles across 18 metropolitan areas and 13 industries, with separate bands for entry-level (0-2 years), mid-level (3-6 years), and senior-level (7+ years) professionals.`,
  },
  {
    icon: Calculator,
    title: "How We Calculate Your Market Rate",
    content: `For each role and experience level, we establish base salary bands at the 25th percentile (P25), median (50th percentile), and 75th percentile (P75). These represent the lower quartile, middle, and upper quartile of compensation for that role.

Your adjusted market rate is calculated by applying three multipliers to the base band:

Market Rate = Base Band × Location Multiplier × Industry Multiplier × Company Size Multiplier

This gives you a personalized range that accounts for cost-of-living differences, industry-specific pay premiums, and company scale effects.`,
  },
  {
    icon: MapPin,
    title: "Location Adjustments",
    content: `Location multipliers range from 0.90x (lower cost-of-living markets like Detroit) to 1.35x (high cost-of-living markets like San Francisco). These are based on cost-of-living indices, regional demand for talent, and local salary survey data.

Our 18 covered markets include: San Francisco, New York, Seattle, Boston, Los Angeles, Austin, Denver, Chicago, Atlanta, Dallas, Phoenix, Minneapolis, Portland, Philadelphia, Miami, Detroit, plus Remote and Other as catch-all categories.`,
  },
  {
    icon: Building,
    title: "Industry & Company Size",
    content: `Industry multipliers range from 0.82x (Nonprofit) to 1.15x (Technology), reflecting the well-documented pay premiums in certain sectors. We cover 13 industries: Technology, Finance, Healthcare, Consulting, E-commerce, Manufacturing, Education, Government, Nonprofit, Media, Retail, Energy, and Other.

Company size multipliers range from 0.90x (startups with 1-50 employees) to 1.10x (enterprises with 5,000+ employees), reflecting the typical compensation premium at larger organizations.`,
  },
  {
    icon: TrendingUp,
    title: "Percentile Calculation",
    content: `Your percentile ranking tells you where your salary falls relative to the market. We map your salary position within the adjusted P25-P75 range using interpolation:

- Below P25: Mapped to the 5th-25th percentile range
- P25 to Median: Mapped to the 25th-50th percentile range
- Median to P75: Mapped to the 50th-75th percentile range
- Above P75: Mapped to the 75th-95th percentile range

A percentile of 50 means you're earning the market median. Below 50 suggests you may be underpaid relative to market rates.`,
  },
  {
    icon: Shield,
    title: "Data Freshness & Limitations",
    content: `Our base salary bands are calibrated to 2025 compensation data and are reviewed quarterly. Year-over-year trend indicators show how salaries for each role and location have shifted compared to the previous year.

Important limitations to understand:
- Our data represents base salary only, not total compensation (which may include equity, bonuses, and benefits).
- Individual factors like specific skills, certifications, company performance, and negotiation history can cause significant variation.
- Remote work multipliers are national averages and may not reflect specific remote-friendly company policies.
- Our dataset covers common roles but may not perfectly match highly specialized sub-roles (e.g., ML Engineer vs. general Software Engineer).

We recommend using our analysis as one data point alongside other resources like Glassdoor, Levels.fyi, and Payscale when making compensation decisions.`,
  },
];

export default function MethodologyPage() {
  useEffect(() => {
    trackEvent("methodology_view");
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-pattern opacity-15 absolute inset-0" />
        <div className="orb orb-purple w-[350px] h-[350px] -top-[100px] left-1/2 -translate-x-1/2" />
        <div className="orb orb-blue w-[250px] h-[250px] bottom-[20%] -left-[60px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8 sm:py-12">
        {/* Navigation */}
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-muted/60 hover:text-foreground/80 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="info-label text-accent/60 mb-4 block">
            Methodology
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-4">
            How we calculate your <span className="italic text-accent/90">market rate</span>
          </h1>
          <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
            Transparency matters. Here&apos;s exactly how our salary analysis works.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((section, i) => (
            <motion.div key={section.title} {...reveal} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
              <GlassCard className="relative overflow-hidden">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
                    <section.icon className="w-4 h-4 text-accent/70" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-foreground/90 mt-1.5">
                    {section.title}
                  </h2>
                </div>
                <div className="text-sm text-muted/60 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="glow-line mb-12" />
          <p className="text-sm text-muted/50 mb-4 font-light">
            Ready to see where you stand?
          </p>
          <Link href="/">
            <motion.span
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-accent/15 hover:shadow-accent/30 hover:brightness-110 transition-all duration-300 cursor-pointer text-sm"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Analyze My Salary
            </motion.span>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
