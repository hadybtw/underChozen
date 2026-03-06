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
  ArrowRight,
  Info,
  RefreshCw,
  Rocket,
  Target,
} from "lucide-react";
import { analyzeSalary, type SalaryInput } from "@/lib/calculator";
import { generateNegotiationPack } from "@/lib/negotiation";
import { generatePremiumPack } from "@/lib/premium";
import { formatCurrency, ordinal } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { salaryTrends, locationTrends } from "@/data/salaries";
import { GlassCard } from "@/components/glass-card";
import { MetricCard } from "@/components/metric-card";
import { PercentileBar } from "@/components/percentile-bar";
import { LoadingShimmer } from "@/components/loading-shimmer";
import { LockedSection } from "@/components/locked-section";
import { NegotiationReveal } from "@/components/negotiation-reveal";
import { PremiumReveal } from "@/components/premium-reveal";
import { EmailReport } from "@/components/email-report";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { WhatIfSimulator } from "@/components/what-if-simulator";
import { ShareCard } from "@/components/share-card";
import { AnonymousComparison } from "@/components/anonymous-comparison";
import { ReferralCard } from "@/components/referral-card";
import { ExitIntent } from "@/components/exit-intent";
import { generatePdf } from "@/lib/pdf";

const ease = [0.22, 1, 0.36, 1] as const;

const sectionReveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

function AnalysisContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  const input: SalaryInput | null = useMemo(() => {
    const jobTitle = searchParams.get("jobTitle");
    const yearsExperience = searchParams.get("yearsExperience");
    const city = searchParams.get("city");
    const industry = searchParams.get("industry");
    const currentSalary = searchParams.get("currentSalary");
    const companySize = searchParams.get("companySize");
    const companyName = searchParams.get("companyName");

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
      ...(companyName && { companyName }),
    };
  }, [searchParams]);

  const analysis = useMemo(() => (input ? analyzeSalary(input) : null), [input]);
  const pack = useMemo(() => (analysis ? generateNegotiationPack(analysis) : null), [analysis]);
  const premiumPack = useMemo(() => (analysis ? generatePremiumPack(analysis) : null), [analysis]);

  // Check if coming back from Stripe with unlocked=true
  useEffect(() => {
    const tier = searchParams.get("tier");
    if (searchParams.get("unlocked") === "true") {
      setUnlocked(true);
      if (tier === "premium") {
        setPremiumUnlocked(true);
      }
      trackEvent("payment_complete", { tier: tier || "blueprint" });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!input) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      trackEvent("results_view", { jobTitle: input.jobTitle, city: input.city });
    }, 3500);
    return () => clearTimeout(timer);
  }, [input, router]);

  const handleUnlock = useCallback(async (tier: "blueprint" | "premium" = "blueprint", discountCode?: string) => {
    if (!input) return;

    trackEvent("unlock_click", { tier, discountCode: discountCode || "none" });

    // Build params for checkout
    const params: Record<string, string> = {
      jobTitle: input.jobTitle,
      yearsExperience: String(input.yearsExperience),
      city: input.city,
      industry: input.industry,
      currentSalary: String(input.currentSalary),
      companySize: input.companySize,
      tier,
    };
    if (input.companyName) params.companyName = input.companyName;
    if (discountCode) params.discountCode = discountCode;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ params }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setUnlocked(true);
        if (tier === "premium") setPremiumUnlocked(true);
      }
    } catch {
      setUnlocked(true);
      if (tier === "premium") setPremiumUnlocked(true);
    }
  }, [input]);

  const handleDownloadPdf = useCallback(() => {
    if (analysis && pack) {
      trackEvent("pdf_download");
      generatePdf(analysis, pack);
    }
  }, [analysis, pack]);

  if (!input || !analysis) return null;

  const absGap = Math.abs(analysis.delta);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingShimmer key="loading" />
      ) : (
        <motion.main
          key="results"
          id="main-content"
          className="min-h-screen relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="grid-pattern opacity-15 absolute inset-0" />
            <div className="orb orb-purple w-[350px] h-[350px] -top-[100px] left-1/2 -translate-x-1/2" />
            {analysis.isUnderpaid ? (
              <div
                className="orb w-[300px] h-[300px] top-[30%] -right-[60px]"
                style={{ background: "radial-gradient(circle, rgba(248,113,113,0.06) 0%, transparent 70%)" }}
              />
            ) : (
              <div className="orb orb-cyan w-[300px] h-[300px] top-[30%] -right-[60px]" />
            )}
            <div className="orb orb-blue w-[200px] h-[200px] bottom-[10%] left-[8%]" />
          </div>

          {/* Exit intent popup */}
          <ExitIntent />

          <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-8 sm:py-12">
            {/* Navigation */}
            <motion.div
              className="flex items-center justify-between mb-10 sm:mb-14"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-1.5 text-xs text-muted/60 hover:text-foreground/80 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Start over
              </button>
              <button
                onClick={() => router.push("/")}
                className="flex items-center gap-1.5 text-xs text-muted/60 hover:text-foreground/80 transition-colors cursor-pointer group"
              >
                <RefreshCw className="w-3 h-3" />
                New analysis
              </button>
            </motion.div>

            {/* Status badge */}
            <motion.div
              className="flex justify-center mb-5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              aria-live="polite"
            >
              {analysis.isUnderpaid ? (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-negative opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-negative" />
                  </span>
                  <span className="text-negative/80">Below Market Rate</span>
                </div>
              ) : analysis.isOverpaid ? (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                  </span>
                  <span className="text-positive/80">Above Market Rate</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                  </span>
                  <span className="text-positive/80">Market Aligned</span>
                </div>
              )}
            </motion.div>

            {/* Headline */}
            <motion.div
              className="text-center mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              {analysis.isUnderpaid ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] heading-display leading-[1.1]">
                  You&apos;re leaving{" "}
                  <span
                    className="text-negative block sm:inline mt-1 sm:mt-0"
                    style={{ textShadow: "0 0 30px rgba(248,113,113,0.15)" }}
                  >
                    {formatCurrency(absGap)}
                  </span>{" "}
                  <span className="block sm:inline italic">on the table.</span>
                </h1>
              ) : analysis.isOverpaid ? (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] heading-display leading-[1.1]">
                  You&apos;re paid{" "}
                  <span
                    className="text-positive"
                    style={{ textShadow: "0 0 30px rgba(52,211,153,0.15)" }}
                  >
                    {Math.round(analysis.deltaPercent)}% above market
                  </span>
                  .
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] heading-display leading-[1.1]">
                  You&apos;re{" "}
                  <span
                    className="text-positive italic"
                    style={{ textShadow: "0 0 30px rgba(52,211,153,0.15)" }}
                  >
                    aligned with market
                  </span>{" "}
                  rates.
                </h1>
              )}

              {/* Context line */}
              <motion.div
                className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-muted/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-medium text-foreground/70">{analysis.input.jobTitle}</span>
                {analysis.input.companyName && (
                  <>
                    <span className="text-white/[0.1]">|</span>
                    <span>{analysis.input.companyName}</span>
                  </>
                )}
                <span className="text-white/[0.1]">|</span>
                <span>{analysis.levelUsed}</span>
                <span className="text-white/[0.1]">|</span>
                <span>{analysis.input.city}</span>
                <span className="text-white/[0.1]">|</span>
                <span>{analysis.input.industry}</span>
              </motion.div>
            </motion.div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5" aria-live="polite" aria-label="Salary analysis results">
              <MetricCard
                label="Market Range"
                sublabel="Salary range for your role and location"
                value={`${formatCurrency(analysis.marketLow)} – ${formatCurrency(analysis.marketHigh)}`}
                icon={<BarChart3 className="w-3.5 h-3.5 text-accent/70" />}
                delay={0.15}
              />
              <MetricCard
                label="Your Percentile"
                sublabel="Where you rank among peers"
                value={ordinal(analysis.percentile)}
                icon={<Percent className="w-3.5 h-3.5 text-accent/70" />}
                delay={0.25}
              />
              <MetricCard
                label="Compensation Gap"
                sublabel={analysis.delta < 0 ? "Below market median" : "Above market median"}
                value={formatCurrency(analysis.delta)}
                numericValue={analysis.delta}
                prefix="$"
                icon={
                  analysis.delta < 0
                    ? <ArrowDownRight className="w-3.5 h-3.5 text-negative/70" />
                    : <ArrowUpRight className="w-3.5 h-3.5 text-positive/70" />
                }
                accent={analysis.delta < 0 ? "negative" : "positive"}
                delay={0.35}
              />
            </div>

            {/* Percentile Bar */}
            <motion.div
              {...sectionReveal}
              transition={{ delay: 0.4, duration: 0.5, ease }}
            >
              <GlassCard className="mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center">
                      <BarChart3 className="w-3.5 h-3.5 text-accent/70" />
                    </div>
                    <h3 className="info-label">
                      Salary Distribution
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-muted/40">
                    <Info className="w-3 h-3" />
                    <span>Hover to inspect</span>
                  </div>
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
                {...sectionReveal}
                transition={{ delay: 0.5, duration: 0.5, ease }}
              >
                <GlassCard className="mb-8 sm:mb-10 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-negative/[0.03] to-transparent rounded-2xl" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[120px] bg-negative/[0.03] rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-lg bg-negative/[0.08] flex items-center justify-center">
                        <TrendingDown className="w-3.5 h-3.5 text-negative/70" />
                      </div>
                      <p className="info-label">
                        Projected Lifetime Impact
                      </p>
                    </div>
                    <p
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-negative tracking-tight"
                      style={{ textShadow: "0 0 40px rgba(248,113,113,0.12)" }}
                    >
                      ~{formatCurrency(analysis.lifetimeImpact)}
                    </p>
                    <p className="text-xs text-muted/50 mt-3 font-light max-w-sm mx-auto leading-relaxed">
                      Estimated total earnings lost over the next 10 years
                      if your compensation stays at its current level.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* Salary Trend Insight */}
            {(() => {
              const roleTrend = salaryTrends[analysis.input.jobTitle];
              const locTrend = locationTrends[analysis.input.city];
              if (!roleTrend && !locTrend) return null;
              return (
                <motion.div
                  {...sectionReveal}
                  transition={{ delay: 0.55, duration: 0.5, ease }}
                >
                  <GlassCard className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <BarChart3 className="w-3.5 h-3.5 text-accent/70" />
                      </div>
                      <h3 className="info-label">Market Trends</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {roleTrend && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted/50">{analysis.input.jobTitle}:</span>
                          <span className={`font-semibold ${roleTrend.direction === "up" ? "text-positive" : "text-negative"}`}>
                            {roleTrend.direction === "up" ? "+" : ""}{roleTrend.yoy}% YoY
                          </span>
                        </div>
                      )}
                      {locTrend && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted/50">{analysis.input.city}:</span>
                          <span className={`font-semibold ${locTrend.direction === "up" ? "text-positive" : "text-negative"}`}>
                            {locTrend.direction === "up" ? "+" : ""}{locTrend.yoy}% YoY
                          </span>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })()}

            {/* Negotiation */}
            {analysis.isUnderpaid && (
              <div className="mt-6">
                <div className="glow-line mb-6" />
                {unlocked && pack ? (
                  <>
                    <NegotiationReveal pack={pack} onDownloadPdf={handleDownloadPdf} />
                    {/* Premium content */}
                    {premiumUnlocked && premiumPack && (
                      <div className="mt-6">
                        <div className="glow-line mb-6" />
                        <PremiumReveal pack={premiumPack} />
                      </div>
                    )}
                  </>
                ) : (
                  <LockedSection
                    onUnlock={(discountCode) => handleUnlock("blueprint", discountCode)}
                    onUnlockPremium={(discountCode) => handleUnlock("premium", discountCode)}
                    lifetimeImpact={analysis.lifetimeImpact}
                    gap={absGap}
                  />
                )}
              </div>
            )}

            {/* Overpaid / aligned — NEW: "Maximize Your Next Move" upsell */}
            {!analysis.isUnderpaid && (
              <motion.div
                {...sectionReveal}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="mt-8 sm:mt-10 space-y-5"
              >
                <GlassCard elevated className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-positive/[0.02] to-transparent rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 rounded-xl bg-positive/[0.08] border border-positive/15 flex items-center justify-center mx-auto mb-4">
                      {analysis.isOverpaid
                        ? <Rocket className="w-5 h-5 text-positive/80" />
                        : <Target className="w-5 h-5 text-positive/80" />}
                    </div>
                    <h3 className="text-xl sm:text-2xl heading-display mb-2">
                      {analysis.isOverpaid
                        ? "You're ahead of the curve"
                        : "You're right on track"}
                    </h3>
                    <p className="text-sm text-muted/60 mb-5 leading-relaxed max-w-md mx-auto">
                      {analysis.isOverpaid
                        ? "Your compensation exceeds the market median. But are you maximizing your next move? Use the simulator below to find roles where your skills command even more."
                        : "Your compensation is competitive. We recommend revisiting your position annually. Use the simulator below to explore how a role change, relocation, or industry switch could boost your earnings."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button variant="primary" onClick={() => {
                        const sim = document.getElementById("simulator");
                        sim?.scrollIntoView({ behavior: "smooth" });
                      }}>
                        <span className="flex items-center gap-2 text-sm">
                          Explore Higher-Paying Moves
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Button>
                      <Button variant="secondary" onClick={() => router.push("/")}>
                        <span className="flex items-center gap-2 text-sm">
                          <RefreshCw className="w-3.5 h-3.5" />
                          New Analysis
                        </span>
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* What-If */}
            <div className="mt-8 sm:mt-10" id="simulator">
              <div className="glow-line mb-8 sm:mb-10" />
              <WhatIfSimulator currentInput={input} currentMedian={analysis.marketMedian} />
            </div>

            {/* Anonymous Comparison */}
            <div className="mt-5">
              <AnonymousComparison analysis={analysis} />
            </div>

            {/* Email Report */}
            <div className="mt-5">
              <EmailReport analysis={analysis} />
            </div>

            {/* Share */}
            <div className="mt-5">
              <ShareCard analysis={analysis} />
            </div>

            {/* Referral */}
            <div className="mt-5">
              <ReferralCard />
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
                Want to check a different role or location?
              </p>
              <motion.button
                onClick={() => router.push("/")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-accent/15 hover:shadow-accent/30 hover:brightness-110 transition-all duration-300 cursor-pointer text-sm"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                Run New Analysis
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
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
