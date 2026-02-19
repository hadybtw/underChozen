"use client";

import { motion } from "framer-motion";

const loadingSteps = [
  "Analyzing compensation data",
  "Comparing market benchmarks",
  "Calculating your position",
];

export function LoadingShimmer() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-purple w-[400px] h-[400px] top-[-80px] left-1/2 -translate-x-1/2" />
        <div className="orb orb-blue w-[250px] h-[250px] bottom-[25%] left-[15%]" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <motion.div
        className="w-full max-w-sm space-y-6 relative z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-5 h-5 rounded-full border-2 border-accent/60 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Cycling text */}
        <div className="text-center space-y-2">
          {loadingSteps.map((step, i) => (
            <motion.p
              key={step}
              className="text-sm text-muted/70 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.8,
                delay: i * 0.6,
                repeat: Infinity,
                repeatDelay: loadingSteps.length * 0.6 - 1.8,
              }}
            >
              {step}
            </motion.p>
          ))}
        </div>

        {/* Progress */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-[3px] rounded-full bg-white/[0.04] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-blue"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
