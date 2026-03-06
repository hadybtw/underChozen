"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const loadingSteps = [
  { text: "Scanning 2.4M salary records", pct: 10 },
  { text: "Cross-referencing 18 metro areas", pct: 25 },
  { text: "Calibrating for your industry", pct: 42 },
  { text: "Analyzing compensation benchmarks", pct: 58 },
  { text: "Comparing against peer cohort", pct: 74 },
  { text: "Calculating your market position", pct: 88 },
  { text: "Preparing your results", pct: 100 },
];

export function LoadingShimmer() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = loadingSteps.map((_, i) =>
      setTimeout(() => setStep(i), i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-purple w-[350px] h-[350px] top-[-60px] left-1/2 -translate-x-1/2" />
        <div className="orb orb-blue w-[200px] h-[200px] bottom-[25%] left-[15%]" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-15" />

      <motion.div
        className="w-full max-w-xs relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="w-9 h-9 rounded-full border-2 border-white/[0.06] border-t-accent/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Step text */}
        <div className="text-center h-10 flex items-center justify-center">
          <motion.p
            key={step}
            className="text-sm text-foreground/70 font-light"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {loadingSteps[step]?.text}
          </motion.p>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-[2px] rounded-full bg-white/[0.05] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-blue"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingSteps[step]?.pct ?? 0}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="flex justify-between mt-2.5">
            <span className="text-[11px] text-muted/35 tabular-nums font-medium">
              {loadingSteps[step]?.pct ?? 0}%
            </span>
            <span className="text-[11px] text-muted/30">
              Step {step + 1} of {loadingSteps.length}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
