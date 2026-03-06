"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  DollarSign,
  Briefcase,
  MapPin,
  Check,
  Star,
  Zap,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { PremiumPack } from "@/lib/premium";

interface PremiumRevealProps {
  pack: PremiumPack;
}

const ease = [0.22, 1, 0.36, 1] as const;

function TrendBadge({ yoy, direction }: { yoy: number; direction: "up" | "down" | "flat" }) {
  const isUp = direction === "up";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
      isUp ? "bg-positive/[0.08] text-positive/80" : "bg-negative/[0.08] text-negative/80"
    }`}>
      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      {isUp ? "+" : ""}{yoy}% YoY
    </span>
  );
}

export function PremiumReveal({ pack }: PremiumRevealProps) {
  return (
    <div className="space-y-5">
      {/* Salary Trends */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease }}
      >
        <GlassCard elevated className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-start gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-accent/70" />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-warning/70 block mb-0.5">
                  Premium
                </span>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
                  Salary Trends
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Role trend */}
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-3.5 h-3.5 text-muted/50" />
                  <span className="text-xs font-medium text-muted/60">Role Trend</span>
                  <TrendBadge yoy={pack.salaryTrend.yoy} direction={pack.salaryTrend.direction} />
                </div>
                <p className="text-sm text-muted/55 leading-relaxed">
                  {pack.salaryTrend.insight}
                </p>
              </div>

              {/* Location trend */}
              <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-muted/50" />
                  <span className="text-xs font-medium text-muted/60">Location Trend</span>
                  <TrendBadge yoy={pack.locationTrend.yoy} direction={pack.locationTrend.direction} />
                </div>
                <p className="text-sm text-muted/55 leading-relaxed">
                  {pack.locationTrend.insight}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Industry Benchmarks */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease }}
      >
        <GlassCard className="relative overflow-hidden">
          <div className="flex items-start gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0">
              <BarChart3 className="w-4 h-4 text-accent/70" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-warning/70 block mb-0.5">
                Premium
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
                Industry Benchmarks
              </h3>
            </div>
          </div>

          <div className="space-y-2">
            {pack.industryBenchmarks.slice(0, 8).map((bench, i) => {
              const maxMedian = pack.industryBenchmarks[0].adjustedMedian;
              const barWidth = (bench.adjustedMedian / maxMedian) * 100;
              return (
                <div key={bench.industry} className="flex items-center gap-3">
                  <span className="text-xs text-muted/60 w-28 shrink-0 text-right">
                    {bench.industry}
                  </span>
                  <div className="flex-1 h-6 rounded-lg bg-white/[0.02] border border-white/[0.04] overflow-hidden relative">
                    <motion.div
                      className="h-full rounded-lg"
                      style={{
                        background: i === 0
                          ? "linear-gradient(90deg, rgba(139,108,255,0.3), rgba(91,141,239,0.3))"
                          : "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08))",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ delay: 0.3 + i * 0.04, duration: 0.6, ease }}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-medium text-foreground/70 tabular-nums">
                      {formatCurrency(bench.adjustedMedian)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      {/* Benefits Valuation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease }}
      >
        <GlassCard className="relative overflow-hidden">
          <div className="flex items-start gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 text-accent/70" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-warning/70 block mb-0.5">
                Premium
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
                Total Compensation Estimate
              </h3>
            </div>
          </div>

          <p className="text-xs text-muted/50 mb-4">
            Beyond base salary, here&apos;s what you should expect in total compensation.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50 mb-1">Equity/Stock</p>
              <p className="text-sm font-bold text-foreground/85 tabular-nums">
                {formatCurrency(pack.benefitsValuation.estimatedEquity.low)} – {formatCurrency(pack.benefitsValuation.estimatedEquity.high)}
              </p>
              <p className="text-[10px] text-muted/40 mt-0.5">annual vesting</p>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50 mb-1">Bonus</p>
              <p className="text-sm font-bold text-foreground/85 tabular-nums">
                {formatCurrency(pack.benefitsValuation.estimatedBonus.low)} – {formatCurrency(pack.benefitsValuation.estimatedBonus.high)}
              </p>
              <p className="text-[10px] text-muted/40 mt-0.5">annual target</p>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50 mb-1">Health Benefits</p>
              <p className="text-sm font-bold text-foreground/85 tabular-nums">
                ~{formatCurrency(pack.benefitsValuation.healthBenefitsValue)}
              </p>
              <p className="text-[10px] text-muted/40 mt-0.5">employer contribution</p>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50 mb-1">401k Match</p>
              <p className="text-sm font-bold text-foreground/85 tabular-nums">
                ~{formatCurrency(pack.benefitsValuation.retirementMatchValue)}
              </p>
              <p className="text-[10px] text-muted/40 mt-0.5">annual match value</p>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-accent/[0.04] border border-accent/[0.08] text-center">
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50 mb-1">Estimated Total Comp Range</p>
            <p className="text-lg sm:text-xl font-bold text-foreground stat-glow tabular-nums">
              {formatCurrency(pack.benefitsValuation.estimatedTotalComp.low)} – {formatCurrency(pack.benefitsValuation.estimatedTotalComp.high)}
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* 90-Day Action Plan */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease }}
      >
        <GlassCard className="relative overflow-hidden">
          <div className="flex items-start gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-accent/70" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-warning/70 block mb-0.5">
                Premium
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
                90-Day Action Plan
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {pack.actionPlan.map((item, i) => (
              <motion.div
                key={item.week}
                className="relative pl-8 pb-4 last:pb-0"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease }}
              >
                {/* Timeline line */}
                {i < pack.actionPlan.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-0 w-px bg-white/[0.06]" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-accent/[0.08] border border-accent/15 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-accent/70">{i + 1}</span>
                </div>

                <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent/60">
                      {item.week}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground/85 mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted/55 leading-relaxed mb-2.5">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-positive/60 shrink-0" />
                    <span className="text-[11px] text-positive/60 font-medium">
                      {item.milestone}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Top Paying Combos */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, ease }}
      >
        <GlassCard className="relative overflow-hidden">
          <div className="flex items-start gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warning/[0.07] border border-warning/12 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-warning/70" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-warning/70 block mb-0.5">
                Premium
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
                Highest-Paying Markets for Your Role
              </h3>
            </div>
          </div>

          <div className="space-y-2">
            {pack.topPayingCombos.map((combo, i) => (
              <div
                key={`${combo.city}-${combo.industry}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-muted/50">#{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground/80 truncate">
                    {combo.city} — {combo.industry}
                  </p>
                </div>
                <span className="text-sm font-bold text-foreground/85 tabular-nums shrink-0">
                  {formatCurrency(combo.estimatedMedian)}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Upgrade notice for Zap */}
      <motion.div
        className="flex items-center justify-center gap-2 py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Zap className="w-3.5 h-3.5 text-warning/60" />
        <span className="text-xs text-muted/45">
          Premium analysis complete
        </span>
      </motion.div>
    </div>
  );
}
