"use client";

import { motion } from "framer-motion";

export function LoadingShimmer() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb orb-purple w-[500px] h-[500px] top-[-100px] left-1/2 -translate-x-1/2" />
        <div className="orb orb-blue w-[300px] h-[300px] bottom-[20%] left-[20%]" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <motion.div
        className="w-full max-w-2xl space-y-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Pulsing icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center"
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <div className="text-center mb-8">
          <motion.p
            className="text-lg font-medium text-foreground"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Analyzing your compensation data
          </motion.p>
          <motion.p
            className="text-sm text-muted mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            Comparing against market benchmarks...
          </motion.p>
        </div>

        {/* Shimmer cards with staggered reveal */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <div className="flex gap-4 items-start">
              <div className="shimmer h-10 w-10 rounded-xl shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="shimmer h-4 w-1/3 rounded-lg" />
                <div className="shimmer h-6 w-2/3 rounded-lg" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Progress bar */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-blue"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
