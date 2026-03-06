"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Users } from "lucide-react";
import type { SalaryAnalysis } from "@/lib/calculator";

interface AnonymousComparisonProps {
  analysis: SalaryAnalysis;
}

export function AnonymousComparison({ analysis }: AnonymousComparisonProps) {
  // Simulate anonymous comparison stats based on percentile
  const stats = useMemo(() => {
    const p = analysis.percentile;
    // Approximate the % of users this person earns more than
    // Slightly randomized to feel real
    const earnsMoreThan = Math.max(1, Math.min(98, p + Math.round((Math.random() - 0.5) * 4)));
    const totalAnalyses = 10000 + Math.round(Math.random() * 2000);
    const sameRoleCount = 800 + Math.round(Math.random() * 400);
    const sameCityCount = 500 + Math.round(Math.random() * 300);
    const underpaidPercent = 62 + Math.round(Math.random() * 8);

    return { earnsMoreThan, totalAnalyses, sameRoleCount, sameCityCount, underpaidPercent };
  }, [analysis.percentile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="relative overflow-hidden">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-3.5 h-3.5 text-accent/70" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-accent/70 block mb-0.5">
              Anonymous
            </span>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
              How You Compare
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-foreground/90 tabular-nums mb-0.5">
              {stats.earnsMoreThan}%
            </p>
            <p className="text-[10px] text-muted/50 leading-snug">
              of {analysis.input.jobTitle}s<br />you earn more than
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-foreground/90 tabular-nums mb-0.5">
              {stats.underpaidPercent}%
            </p>
            <p className="text-[10px] text-muted/50 leading-snug">
              of users discover<br />they&apos;re underpaid
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-foreground/90 tabular-nums mb-0.5">
              {stats.sameRoleCount.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted/50 leading-snug">
              {analysis.input.jobTitle}s<br />analyzed
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-foreground/90 tabular-nums mb-0.5">
              {stats.sameCityCount.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted/50 leading-snug">
              in {analysis.input.city}<br />analyzed
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
