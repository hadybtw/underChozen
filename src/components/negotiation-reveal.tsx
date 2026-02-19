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
  initial: { opacity: 0, y: 25, filter: "blur(8px)" },
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
    <div className="flex items-start gap-2.5 sm:gap-3 mb-4 sm:mb-5">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
      </div>
      <div>
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-accent block mb-0.5">
          {label}
        </span>
        <h3 className="text-base sm:text-lg font-bold">{title}</h3>
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
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Divider label */}
      <motion.div
        className="text-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="glow-line" />
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mt-4 block">
          Your Compensation Blueprint
        </span>
      </motion.div>

      {/* Raise Range */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard glow className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] to-transparent rounded-2xl" />
          <div className="relative z-10">
            <SectionHeader icon={DollarSign} label="Recommendation" title="Recommended Raise Request" />
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mt-4 sm:mt-6">
              <div className="py-2 sm:py-3">
                <p className="text-[9px] sm:text-[10px] font-medium tracking-wide uppercase text-muted mb-1.5 sm:mb-2">Conservative</p>
                <p className="text-base sm:text-xl font-bold">{formatCurrency(pack.raiseRange.low)}</p>
              </div>
              <div className="py-2 sm:py-3 relative">
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-accent/5 border border-accent/10" />
                <div className="relative">
                  <p className="text-[9px] sm:text-[10px] font-medium tracking-wide uppercase text-accent mb-1.5 sm:mb-2">Target</p>
                  <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-accent stat-glow">
                    {formatCurrency(pack.raiseRange.target)}
                  </p>
                </div>
              </div>
              <div className="py-2 sm:py-3">
                <p className="text-[9px] sm:text-[10px] font-medium tracking-wide uppercase text-muted mb-1.5 sm:mb-2">Stretch</p>
                <p className="text-base sm:text-xl font-bold">{formatCurrency(pack.raiseRange.high)}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Risk of Staying Score */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-warning/[0.02] to-transparent rounded-2xl" />
          <div className="relative z-10">
            <SectionHeader icon={AlertTriangle} label="Risk Assessment" title="Risk of Staying Score" />
            <div className="flex items-center gap-5 mt-4">
              <div className="relative flex-1 h-3 rounded-full bg-white/[0.03] overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-positive via-warning to-negative"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pack.riskOfStayingScore * 10}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <span className="text-3xl font-extrabold min-w-[3.5ch] text-right tabular-nums">
                {pack.riskOfStayingScore}<span className="text-lg text-muted font-medium">/10</span>
              </span>
            </div>
            <p className="text-xs text-muted mt-3 leading-relaxed">
              {pack.riskOfStayingScore >= 7
                ? "High risk. Staying at your current salary has a significant cost over time."
                : pack.riskOfStayingScore >= 4
                  ? "Moderate risk. There is meaningful compensation upside available to you."
                  : "Low risk. Your salary is close to market rates."}
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Email Script */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <SectionHeader icon={Mail} label="Template" title="Negotiation Email Script" />
          <div className="mt-2 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5 p-3 sm:p-5">
            <pre className="text-xs sm:text-sm text-muted/90 whitespace-pre-wrap leading-relaxed font-sans">
              {pack.emailScript}
            </pre>
          </div>
        </GlassCard>
      </motion.div>

      {/* Talking Points */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <SectionHeader icon={MessageSquare} label="Preparation" title="Manager Meeting Talking Points" />
          <ol className="space-y-4 mt-2">
            {pack.talkingPoints.map((point, i) => (
              <motion.li
                key={i}
                className="flex gap-3 text-sm text-muted/90 leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-xs font-bold shrink-0 mt-0.5">
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
          <SectionHeader icon={ShieldAlert} label="Defense" title="Objection Handling Responses" />
          <div className="space-y-6 mt-2">
            {pack.objectionHandling.map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-1 h-1 rounded-full bg-negative/60 mt-2 shrink-0" />
                  <p className="text-sm font-semibold text-negative/80">
                    &ldquo;{item.objection}&rdquo;
                  </p>
                </div>
                <div className="ml-4 pl-3 border-l border-accent/20">
                  <p className="text-sm text-muted/90 leading-relaxed">{item.response}</p>
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
          <ul className="space-y-3 mt-2">
            {pack.ifDeniedStrategy.map((step, i) => (
              <motion.li
                key={i}
                className="flex gap-3 text-sm text-muted/90 leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-1.5 shrink-0" />
                <span>{step}</span>
              </motion.li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>

      {/* 3-Year Model */}
      <motion.div {...sectionFade} transition={{ duration: 0.6 }}>
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-positive/[0.02] to-transparent rounded-2xl" />
          <div className="relative z-10">
            <SectionHeader icon={TrendingUp} label="Projection" title="3-Year Compensation Growth Model" />
            <div className="mt-4 space-y-0">
              {pack.threeYearModel.map((row, i) => (
                <motion.div
                  key={row.year}
                  className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-sm text-muted font-medium">Year {row.year}</span>
                  <span className="text-base sm:text-xl font-bold tabular-nums">
                    {formatCurrency(row.projected)}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-positive tabular-nums">
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
        className="text-center pt-6 pb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="secondary" size="lg" onClick={onDownloadPdf} className="group">
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4 text-muted group-hover:text-foreground transition-colors" />
            Download PDF Report
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
}
