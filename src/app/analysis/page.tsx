"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Percent,
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";
import { analyzeSalary, type SalaryInput } from "@/lib/calculator";
import { generateNegotiationPack } from "@/lib/negotiation";
import { formatCurrency, ordinal } from "@/lib/utils";
import { GlassCard } from "@/components/glass-card";
import { MetricCard } from "@/components/metric-card";
import { PercentileBar } from "@/components/percentile-bar";
import { LoadingShimmer } from "@/components/loading-shimmer";
import { LockedSection } from "@/components/locked-section";
import { NegotiationReveal } from "@/components/negotiation-reveal";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { generatePdf } from "@/lib/pdf";

function AnalysisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  const input: SalaryInput | null = useMemo(() => {
    const jobTitle = searchParams.get("jobTitle");
    const yearsExperience = searchParams.get("yearsExperience");
    const city = searchParams.get("city");
    const industry = searchParams.get("industry");
    const currentSalary = searchParams.get("currentSalary");
    const companySize = searchParams.get("companySize");

    if (!jobTitle || !yearsExperience || !city || !industry || !currentSalary || !companySize) {
      return null;
    }

    return {
      jobTitle,
      yearsExperience: parseInt(yearsExperience, 10),
      city,
      industry,
      currentSalary: parseInt(currentSalary, 10),
      companySize,
    };
  }, [searchParams]);

  const analysis = useMemo(() => (input ? analyzeSalary(input) : null), [input]);
  const pack = useMemo(() => (analysis ? generateNegotiationPack(analysis) : null), [analysis]);

  useEffect(() => {
    if (!input) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, [input, router]);

  const handleUnlock = useCallback(async () => {
    setUnlocked(true);
  }, []);

  const handleDownloadPdf = useCallback(() => {
    if (analysis && pack) {
      generatePdf(analysis, pack);
    }
  }, [analysis, pack]);

  if (!input || !analysis) return null;

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingShimmer key="loading" />
      ) : (
        <motion.main
          key="results"
          className="min-h-screen relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="grid-pattern opacity-20 absolute inset-0" />
            <div className="orb orb-purple w-[400px] h-[400px] -top-[120px] left-1/2 -translate-x-1/2" />
            {analysis.isUnderpaid ? (
              <div className="orb w-[350px] h-[350px] top-[30%] -right-[80px]"
                style={{ background: "radial-gradient(circle, rgba(255,69,58,0.1) 0%, transparent 70%)" }} />
            ) : (
              <div className="orb orb-cyan w-[350px] h-[350px] top-[30%] -right-[80px]" />
            )}
            <div className="orb orb-blue w-[250px] h-[250px] bottom-[10%] left-[8%]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8 sm:py-12">
            {/* Back button */}
            <motion.button
              onClick={() => router.push("/")}
              className="flex items-center gap-1.5 text-xs text-muted/60 hover:text-foreground/80 transition-colors mb-8 sm:mb-12 cursor-pointer group"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              New analysis
            </motion.button>

            {/* Status badge */}
            <motion.div
              className="flex justify-center mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            >
              {analysis.isUnderpaid ? (
                <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[11px] font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-negative opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-negative" />
                  </span>
                  <span className="text-negative/80">Below Market</span>
                </div>
              ) : analysis.isOverpaid ? (
                <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[11px] font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                  </span>
                  <span className="text-positive/80">Above Market</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[11px] font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                  </span>
                  <span className="text-positive/80">Market Aligned</span>
                </div>
              )}
            </motion.div>

            {/* Headline */}
            <motion.div
              className="text-center mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {analysis.isUnderpaid ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1]">
                  You&apos;re likely underpaid by{" "}
                  <span className="text-negative block sm:inline mt-1 sm:mt-0" style={{ textShadow: "0 0 40px rgba(255,69,58,0.25)" }}>
                    {formatCurrency(Math.abs(analysis.delta))}
                  </span>{" "}
                  <span className="block sm:inline">per year.</span>
                </h1>
              ) : analysis.isOverpaid ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1]">
                  You&apos;re paid{" "}
                  <span className="text-positive" style={{ textShadow: "0 0 40px rgba(48,209,88,0.25)" }}>
                    {Math.round(analysis.deltaPercent)}% above market
                  </span>
                  .
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.1]">
                  You&apos;re{" "}
                  <span className="text-positive" style={{ textShadow: "0 0 40px rgba(48,209,88,0.25)" }}>
                    aligned with market
                  </span>{" "}
                  rates.
                </h1>
              )}
              <motion.p
                className="text-muted/50 mt-3 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {analysis.input.jobTitle} · {analysis.levelUsed} ·{" "}
                {analysis.input.city} · {analysis.input.industry}
              </motion.p>
            </motion.div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 sm:mb-6">
              <MetricCard
                label="Market Range"
                value={`${formatCurrency(analysis.marketLow)} – ${formatCurrency(analysis.marketHigh)}`}
                icon={<BarChart3 className="w-3 h-3 text-accent/70" />}
                delay={0.2}
              />
              <MetricCard
                label="Your Percentile"
                value={ordinal(analysis.percentile)}
                icon={<Percent className="w-3 h-3 text-accent/70" />}
                delay={0.3}
              />
              <MetricCard
                label="Compensation Gap"
                value={formatCurrency(analysis.delta)}
                numericValue={analysis.delta}
                prefix="$"
                icon={
                  analysis.delta < 0
                    ? <ArrowDownRight className="w-3 h-3 text-negative/70" />
                    : <ArrowUpRight className="w-3 h-3 text-positive/70" />
                }
                accent={analysis.delta < 0 ? "negative" : "positive"}
                delay={0.4}
              />
            </div>

            {/* Percentile Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center">
                    <BarChart3 className="w-3 h-3 text-accent/70" />
                  </div>
                  <h3 className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase text-muted/50">
                    Percentile Distribution
                  </h3>
                </div>
                <PercentileBar
                  percentile={analysis.percentile}
                  marketLow={analysis.marketLow}
                  marketMedian={analysis.marketMedian}
                  marketHigh={analysis.marketHigh}
                  currentSalary={analysis.input.currentSalary}
                />
              </GlassCard>
            </motion.div>

            {/* Lifetime Impact */}
            {analysis.isUnderpaid && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard className="mb-8 sm:mb-10 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-negative/[0.03] to-transparent rounded-2xl" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[150px] bg-negative/[0.04] rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-negative/[0.08] flex items-center justify-center">
                        <TrendingDown className="w-3 h-3 text-negative/70" />
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase text-muted/50">
                        Projected Lifetime Impact
                      </p>
                    </div>
                    <p
                      className="text-3xl sm:text-4xl md:text-5xl font-black text-negative tracking-tight"
                      style={{ textShadow: "0 0 50px rgba(255,69,58,0.2)" }}
                    >
                      ~{formatCurrency(analysis.lifetimeImpact)}
                    </p>
                    <p className="text-[11px] text-muted/40 mt-2.5">
                      Estimated lost earnings over 10 years if unchanged.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Negotiation Section */}
            {analysis.isUnderpaid && (
              <div className="mt-6">
                {unlocked && pack ? (
                  <NegotiationReveal
                    pack={pack}
                    onDownloadPdf={handleDownloadPdf}
                  />
                ) : (
                  <LockedSection onUnlock={handleUnlock} />
                )}
              </div>
            )}

            {/* Overpaid / aligned */}
            {!analysis.isUnderpaid && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-center mt-10"
              >
                <GlassCard className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-positive/[0.02] to-transparent rounded-2xl" />
                  <div className="relative z-10">
                    <p className="text-sm text-muted/60 mb-4 leading-relaxed">
                      {analysis.isOverpaid
                        ? "Your compensation exceeds the market median. Keep performing to maintain your edge."
                        : "Your compensation is competitive. Continue tracking market rates annually."}
                    </p>
                    <Button variant="secondary" onClick={() => router.push("/")}>
                      Run Another Analysis
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </div>

          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={<LoadingShimmer />}>
      <AnalysisContent />
    </Suspense>
  );
}
