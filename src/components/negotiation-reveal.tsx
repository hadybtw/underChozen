"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Button } from "./button";
import type { NegotiationPack } from "@/lib/negotiation";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  Mail,
  MessageSquare,
  ShieldAlert,
  Route,
  TrendingUp,
  Download,
  AlertTriangle,
} from "lucide-react";

interface NegotiationRevealProps {
  pack: NegotiationPack;
  onDownloadPdf: () => void;
}

const sectionFade = {
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-40px" as const },
};

function SectionHeader({
  icon: Icon,
  label,
  title,
}: {
  icon: React.ElementType;
  label: string;
  title: string;
}) {
  return (
    <div className="flex items-start gap-2.5 mb-4">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-accent/70" />
      </div>
      <div>
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-accent/60 block mb-0.5">
          {label}
        </span>
        <h3 className="text-sm sm:text-base font-bold tracking-tight">{title}</h3>
      </div>
    </div>
  );
}

export function NegotiationReveal({
  pack,
  onDownloadPdf,
}: NegotiationRevealProps) {
  return (
    <motion.div
      className="space-y-4 sm:space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Divider */}
      <motion.div
        className="text-center py-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="glow-line" />
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-accent/60 mt-4 block">
          Your Compensation Blueprint
        </span>
      </motion.div>

      {/* Raise Range */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard glow className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent rounded-2xl" />
          <div className="relative z-10">
            <SectionHeader icon={DollarSign} label="Recommendation" title="Recommended Raise Request" />
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center mt-4">
              <div className="py-2">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase text-muted/40 mb-1.5">Conservative</p>
                <p className="text-sm sm:text-lg font-bold tabular-nums">{formatCurrency(pack.raiseRange.low)}</p>
              </div>
              <div className="py-2 relative">
                <div className="absolute inset-0 rounded-lg bg-accent/[0.04] border border-accent/[0.08]" />
                <div className="relative">
                  <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase text-accent/70 mb-1.5">Target</p>
                  <p className="text-lg sm:text-2xl font-black text-accent stat-glow tabular-nums">
                    {formatCurrency(pack.raiseRange.target)}
                  </p>
                </div>
              </div>
              <div className="py-2">
                <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase text-muted/40 mb-1.5">Stretch</p>
                <p className="text-sm sm:text-lg font-bold tabular-nums">{formatCurrency(pack.raiseRange.high)}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Risk of Staying */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-warning/[0.015] to-transparent rounded-2xl" />
          <div className="relative z-10">
            <SectionHeader icon={AlertTriangle} label="Risk Assessment" title="Risk of Staying Score" />
            <div className="flex items-center gap-4 mt-3">
              <div className="relative flex-1 h-2.5 rounded-full bg-white/[0.03] overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-positive via-warning to-negative"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pack.riskOfStayingScore * 10}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="text-2xl font-black min-w-[3ch] text-right tabular-nums">
                {pack.riskOfStayingScore}<span className="text-sm text-muted/40 font-medium">/10</span>
              </span>
            </div>
            <p className="text-[11px] text-muted/40 mt-2.5 leading-relaxed">
              {pack.riskOfStayingScore >= 7
                ? "High risk — staying at your current salary has significant cost over time."
                : pack.riskOfStayingScore >= 4
                  ? "Moderate risk — there is meaningful compensation upside available."
                  : "Low risk — your salary is close to market rates."}
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Email Script */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <SectionHeader icon={Mail} label="Template" title="Negotiation Email Script" />
          <div className="mt-1 rounded-xl bg-white/[0.02] border border-white/[0.04] p-3.5 sm:p-5">
            <pre className="text-[11px] sm:text-xs text-muted/70 whitespace-pre-wrap leading-[1.7] font-sans">
              {pack.emailScript}
            </pre>
          </div>
        </GlassCard>
      </motion.div>

      {/* Talking Points */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <SectionHeader icon={MessageSquare} label="Preparation" title="Manager Meeting Talking Points" />
          <ol className="space-y-3 mt-1">
            {pack.talkingPoints.map((point, i) => (
              <motion.li
                key={i}
                className="flex gap-2.5 text-xs sm:text-[13px] text-muted/70 leading-relaxed"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <span className="w-5 h-5 rounded-md bg-accent/[0.07] flex items-center justify-center text-accent/70 text-[10px] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ol>
        </GlassCard>
      </motion.div>

      {/* Objection Handling */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <SectionHeader icon={ShieldAlert} label="Defense" title="Objection Handling" />
          <div className="space-y-5 mt-1">
            {pack.objectionHandling.map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-start gap-2 mb-1.5">
                  <div className="w-1 h-1 rounded-full bg-negative/50 mt-1.5 shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-negative/70">
                    &ldquo;{item.objection}&rdquo;
                  </p>
                </div>
                <div className="ml-3 pl-3 border-l border-accent/15">
                  <p className="text-xs text-muted/60 leading-relaxed">{item.response}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* If Denied */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <SectionHeader icon={Route} label="Contingency" title="If Denied: Next Steps" />
          <ul className="space-y-2.5 mt-1">
            {pack.ifDeniedStrategy.map((step, i) => (
              <motion.li
                key={i}
                className="flex gap-2.5 text-xs sm:text-[13px] text-muted/70 leading-relaxed"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="w-1 h-1 rounded-full bg-accent/30 mt-1.5 shrink-0" />
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>

      {/* 3-Year Model */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-positive/[0.015] to-transparent rounded-2xl" />
          <div className="relative z-10">
            <SectionHeader icon={TrendingUp} label="Projection" title="3-Year Growth Model" />
            <div className="mt-3">
              {pack.threeYearModel.map((row, i) => (
                <motion.div
                  key={row.year}
                  className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="text-xs text-muted/50 font-medium">Year {row.year}</span>
                  <span className="text-sm sm:text-lg font-bold tabular-nums">
                    {formatCurrency(row.projected)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-positive/80 tabular-nums">
                    +{row.growth}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Download */}
      <motion.div
        className="text-center pt-4 pb-2"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="secondary" size="md" onClick={onDownloadPdf} className="group">
          <span className="flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-muted/60 group-hover:text-foreground/80 transition-colors" />
            Download PDF Report
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
