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
            <div className="grid-pattern opacity-30 absolute inset-0" />
            <div className="orb orb-purple w-[500px] h-[500px] -top-[150px] left-1/2 -translate-x-1/2" />
            {analysis.isUnderpaid && (
              <div className="orb w-[400px] h-[400px] top-[30%] -right-[100px]"
                style={{ background: "radial-gradient(circle, rgba(255,69,58,0.12) 0%, transparent 70%)" }} />
            )}
            {!analysis.isUnderpaid && (
              <div className="orb orb-cyan w-[400px] h-[400px] top-[30%] -right-[100px]" />
            )}
            <div className="orb orb-blue w-[300px] h-[300px] bottom-[10%] left-[10%]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8 sm:py-12">
            {/* Back button */}
            <motion.button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors mb-8 sm:mb-12 cursor-pointer group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              New analysis
            </motion.button>

            {/* Status badge */}
            <motion.div
              className="flex justify-center mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            >
              {analysis.isUnderpaid ? (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium border-negative/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-negative animate-pulse" />
                  <span className="text-negative/80">Below Market</span>
                </div>
              ) : analysis.isOverpaid ? (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium border-positive/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
                  <span className="text-positive/80">Above Market</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
                  <span className="text-positive/80">Market Aligned</span>
                </div>
              )}
            </motion.div>

            {/* Headline Result */}
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {analysis.isUnderpaid ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  You&apos;re likely underpaid by{" "}
                  <span className="text-negative block sm:inline mt-1 sm:mt-0" style={{ textShadow: "0 0 40px rgba(255,69,58,0.3)" }}>
                    {formatCurrency(Math.abs(analysis.delta))}
                  </span>{" "}
                  <span className="block sm:inline">per year.</span>
                </h1>
              ) : analysis.isOverpaid ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  You&apos;re paid{" "}
                  <span className="text-positive" style={{ textShadow: "0 0 40px rgba(48,209,88,0.3)" }}>
                    {Math.round(analysis.deltaPercent)}% above market
                  </span>
                  .
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  You&apos;re{" "}
                  <span className="text-positive" style={{ textShadow: "0 0 40px rgba(48,209,88,0.3)" }}>
                    aligned with market
                  </span>{" "}
                  rates.
                </h1>
              )}
              <motion.p
                className="text-muted mt-3 sm:mt-4 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {analysis.input.jobTitle} &middot; {analysis.levelUsed} &middot;{" "}
                {analysis.input.city} &middot; {analysis.input.industry}
              </motion.p>
            </motion.div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <MetricCard
                label="Market Range"
                value={`${formatCurrency(analysis.marketLow)} – ${formatCurrency(analysis.marketHigh)}`}
                icon={<BarChart3 className="w-3.5 h-3.5 text-accent" />}
                delay={0.2}
              />
              <MetricCard
                label="Your Percentile"
                value={ordinal(analysis.percentile)}
                icon={<Percent className="w-3.5 h-3.5 text-accent" />}
                delay={0.3}
              />
              <MetricCard
                label="Compensation Gap"
                value={formatCurrency(analysis.delta)}
                numericValue={analysis.delta}
                prefix="$"
                icon={
                  analysis.delta < 0
                    ? <ArrowDownRight className="w-3.5 h-3.5 text-negative" />
                    : <ArrowUpRight className="w-3.5 h-3.5 text-positive" />
                }
                accent={analysis.delta < 0 ? "negative" : "positive"}
                delay={0.4}
              />
            </div>

            {/* Percentile Bar */}
            <motion.div
              initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <GlassCard className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <BarChart3 className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <h3 className="text-xs font-medium tracking-wide uppercase text-muted">
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
                initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.65, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <GlassCard className="mb-8 sm:mb-10 text-center relative overflow-hidden">
                  {/* Red ambient glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-negative/[0.04] to-transparent rounded-2xl" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-negative/5 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-negative/10 flex items-center justify-center">
                        <TrendingDown className="w-3.5 h-3.5 text-negative" />
                      </div>
                      <p className="text-xs font-medium tracking-wide uppercase text-muted">
                        Projected Lifetime Impact
                      </p>
                    </div>
                    <p
                      className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-negative"
                      style={{ textShadow: "0 0 60px rgba(255,69,58,0.25)" }}
                    >
                      ~{formatCurrency(analysis.lifetimeImpact)}
                    </p>
                    <p className="text-xs text-muted mt-3">
                      Estimated lost earnings over 10 years if unchanged.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Negotiation Section */}
            {analysis.isUnderpaid && (
              <div className="mt-8">
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

            {/* For overpaid / aligned users */}
            {!analysis.isUnderpaid && (
              <motion.div
                initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-center mt-10"
              >
                <GlassCard className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-positive/[0.03] to-transparent rounded-2xl" />
                  <div className="relative z-10">
                    <p className="text-sm text-muted mb-4 leading-relaxed">
                      {analysis.isOverpaid
                        ? "Your compensation is above the market median. Keep performing to maintain your position."
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
