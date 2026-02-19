"use client";

import { motion } from "framer-motion";
import { Lock, Check, ArrowRight } from "lucide-react";
import { Button } from "./button";

interface LockedSectionProps {
  onUnlock: () => void;
}

const features = [
  "Exact raise number to request",
  "Email script ready to send",
  "Manager meeting talking points",
  "Objection handling responses",
  "3-year growth model",
  "Risk of Staying score",
];

export function LockedSection({ onUnlock }: LockedSectionProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Outer glow */}
      <div className="absolute -inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-b from-accent/20 via-accent-blue/10 to-transparent" />

      <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 relative">
        {/* Background blurred content for depth */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04] blur-sm select-none p-8" aria-hidden>
            <div className="h-6 bg-white rounded w-2/3 mb-4" />
            <div className="h-10 bg-white rounded w-1/2 mb-6" />
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 bg-white rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Overlay with blur */}
        <div className="absolute inset-0 backdrop-blur-sm bg-background/40 rounded-2xl sm:rounded-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Lock icon with glow */}
          <motion.div
            className="relative mb-5 sm:mb-6"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 -m-3 rounded-2xl bg-accent/15 blur-xl" />
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center relative">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
          </motion.div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            Unlock Your Negotiation Strategy
          </h3>
          <p className="text-xs sm:text-sm text-muted mb-6 sm:mb-8 max-w-md">
            Get a personalized, data-backed blueprint to close your compensation gap.
          </p>

          {/* Feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8 w-full max-w-md text-left">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-2 text-xs sm:text-sm text-muted/80"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.06 }}
              >
                <div className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-accent" />
                </div>
                {feature}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onUnlock}
              className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Unlock Compensation Blueprint — $29</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
            </Button>
          </motion.div>

          <motion.p
            className="text-[10px] sm:text-[11px] text-muted/40 mt-3 sm:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            One-time payment. Instant access. PDF download included.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
