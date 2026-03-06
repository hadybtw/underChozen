"use client";

import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

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
  const clampedPosition = Math.max(4, Math.min(96, percentile));
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full">
      {/* Salary labels */}
      <div className="flex justify-between text-[11px] sm:text-xs text-muted/65 mb-2.5 tabular-nums font-medium">
        <span>{formatCurrency(marketLow)}</span>
        <span>{formatCurrency(marketMedian)}</span>
        <span>{formatCurrency(marketHigh)}</span>
      </div>

      {/* Bar */}
      <div
        className="relative h-3 sm:h-3.5 rounded-full overflow-visible bg-white/[0.03] cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        {/* Gradient fill */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(255,69,58,0.25) 0%, rgba(255,214,10,0.2) 40%, rgba(48,209,88,0.25) 100%)",
              transformOrigin: "left",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          />
        </motion.div>

        {/* Quartile markers */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/[0.06]" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.1]" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/[0.06]" />

        {/* Tooltip */}
        <motion.div
          className="absolute -top-10 sm:-top-11 -translate-x-1/2 z-20 pointer-events-none"
          style={{ left: `${clampedPosition}%` }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-foreground text-background text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg">
            {percentile}th percentile
          </div>
          <div className="w-2 h-2 bg-foreground rotate-45 mx-auto -mt-1" />
        </motion.div>

        {/* User position */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          style={{ left: `${clampedPosition}%` }}
          initial={{ left: "0%", scale: 0, opacity: 0 }}
          animate={{ left: `${clampedPosition}%`, scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 -m-2 rounded-full bg-accent/15"
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full bg-white shadow-md shadow-accent/30 border-[2px] border-accent relative"
            animate={hovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>

      {/* Percentile labels */}
      <div className="flex justify-between text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase text-muted/45 mt-1.5">
        <span>25th</span>
        <span>50th</span>
        <span>75th</span>
      </div>

      {/* Your salary callout */}
      <motion.div
        className="mt-3 sm:mt-4 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-2 h-2 rounded-full bg-accent/70" />
        <span className="text-xs text-muted/65">Your salary:</span>
        <span className="text-xs font-semibold text-foreground tabular-nums">
          {formatCurrency(currentSalary)}
        </span>
        <span className="text-[11px] text-muted/50 ml-1">
          ({percentile}th percentile)
        </span>
      </motion.div>
    </div>
  );
}
