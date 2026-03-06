"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { SalaryForm } from "@/components/salary-form";
import { trackEvent } from "@/lib/analytics";
import { pixelPageView } from "@/lib/pixels";
import { captureUtm } from "@/lib/utm";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

export default function LPSalaryCheck() {
  useEffect(() => {
    captureUtm();
    trackEvent("page_view", { page: "lp_salary_check" });
    pixelPageView();
  }, []);

  return (
    <main className="min-h-screen w-full">
      <section className="relative w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb orb-purple w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] -top-[100px] sm:-top-[160px] left-1/2 -translate-x-1/2" />
          <div className="orb orb-blue w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] top-[40%] -left-[100px] sm:-left-[60px]" />
          <div className="orb orb-blue w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] top-[50%] -right-[100px] sm:-right-[40px]" style={{ animationDelay: "5s" }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-[max(12vh,4rem)] pb-16 sm:pb-24">
          {/* Headline */}
          <motion.div
            className="text-center mb-8 sm:mb-10"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col items-center">
              <motion.h1 variants={stagger} className="mb-4 sm:mb-5">
                <motion.span
                  variants={fadeUp}
                  className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl heading-display text-foreground/95"
                >
                  What&apos;s your salary
                </motion.span>
                <motion.span
                  variants={fadeUp}
                  className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl heading-display"
                >
                  <span className="text-shimmer italic">actually worth</span>
                  <span className="text-foreground/95">?</span>
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg md:text-xl text-muted/60 max-w-lg mx-auto leading-relaxed font-light"
              >
                Compare against real market data from 18 cities and 13 industries. Takes 30 seconds.
              </motion.p>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
            className="flex items-center justify-center gap-2 mb-8 sm:mb-10"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
            </span>
            <span className="text-sm text-muted/55">
              Used by <span className="font-semibold text-foreground/80">10,000+</span> professionals
            </span>
          </motion.div>

          {/* Form */}
          <SalaryForm />

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-x-5 text-xs text-muted/45"
          >
            {["Free", "No signup", "Instant results"].map((item, i) => (
              <span key={item} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-white/[0.08] mr-1 sm:mr-3 hidden sm:inline">|</span>}
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                </span>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
