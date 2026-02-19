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
      className="relative overflow-hidden rounded-2xl gradient-border"
      initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-elevated rounded-2xl p-6 sm:p-8 md:p-10 relative">
        {/* Blurred preview content */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03] blur-sm select-none p-8" aria-hidden>
            <div className="h-5 bg-white rounded w-2/3 mb-3" />
            <div className="h-8 bg-white rounded w-1/2 mb-5" />
            <div className="space-y-2.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-2.5 bg-white rounded" style={{ width: `${55 + Math.random() * 35}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Frosted overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-background/50 rounded-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Lock icon */}
          <motion.div
            className="relative mb-5"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 -m-3 rounded-2xl bg-accent/10 blur-xl" />
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center relative">
              <Lock className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-accent/80" />
            </div>
          </motion.div>

          <h3 className="text-lg sm:text-xl font-bold mb-1.5 tracking-tight">
            Unlock Your Negotiation Strategy
          </h3>
          <p className="text-xs sm:text-sm text-muted/50 mb-6 max-w-sm">
            A personalized, data-backed blueprint to close your compensation gap.
          </p>

          {/* Feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-6 w-full max-w-sm text-left">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                className="flex items-center gap-2 text-xs text-muted/60"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.05 }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-accent/[0.08] flex items-center justify-center shrink-0">
                  <Check className="w-2 h-2 text-accent/70" />
                </div>
                {feature}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onUnlock}
              className="w-full sm:w-auto text-sm px-6 sm:px-8"
            >
              <span className="flex items-center justify-center gap-2">
                <span>Unlock Blueprint — $29</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
            </Button>
          </motion.div>

          <motion.p
            className="text-[10px] text-muted/30 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            One-time payment · Instant access · PDF included
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
