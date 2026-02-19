"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";

interface PercentileBarProps {
  percentile: number;
  marketLow: number;
  marketMedian: number;
  marketHigh: number;
  currentSalary: number;
}

export function PercentileBar({
  percentile,
  marketLow,
  marketMedian,
  marketHigh,
  currentSalary,
}: PercentileBarProps) {
  const clampedPosition = Math.max(3, Math.min(97, percentile));

  return (
    <div className="w-full">
      {/* Labels row */}
      <div className="flex justify-between text-xs text-muted mb-3">
        <span className="font-medium">{formatCurrency(marketLow)}</span>
        <span className="font-medium">{formatCurrency(marketMedian)}</span>
        <span className="font-medium">{formatCurrency(marketHigh)}</span>
      </div>

      {/* Bar */}
      <div className="relative h-4 rounded-full overflow-hidden bg-white/[0.03]">
        {/* Animated gradient fill */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-negative/30 via-warning/25 to-positive/30"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: "left" }}
        />

        {/* Quartile markers */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10" />
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10" />

        {/* User position indicator */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          style={{ left: `${clampedPosition}%` }}
          initial={{ left: "0%", scale: 0, opacity: 0 }}
          animate={{ left: `${clampedPosition}%`, scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute inset-0 -m-2 rounded-full bg-accent/20"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="w-5 h-5 rounded-full bg-white shadow-lg shadow-accent/40 border-2 border-accent relative" />
        </motion.div>
      </div>

      {/* Percentile labels */}
      <div className="flex justify-between text-[10px] font-medium tracking-wide uppercase text-muted/60 mt-2">
        <span>25th</span>
        <span>50th</span>
        <span>75th</span>
      </div>

      {/* Your salary callout */}
      <motion.div
        className="mt-5 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent" />
        <span className="text-sm text-muted">Your salary:</span>
        <span className="text-sm font-semibold text-foreground">
          {formatCurrency(currentSalary)}
        </span>
      </motion.div>
    </div>
  );
}
