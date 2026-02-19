"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SalaryForm } from "@/components/salary-form";
import { GlassCard } from "@/components/glass-card";
import { FloatingParticles } from "@/components/floating-particles";
import { AnimatedCounter } from "@/components/animated-counter";
import { Footer } from "@/components/footer";
import {
  TrendingUp,
  BarChart3,
  Target,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const stagger = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <main className="min-h-screen">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 grid-pattern opacity-40" />

        <motion.div className="absolute inset-0 pointer-events-none" style={{ scale: orbScale }}>
          <div className="orb orb-purple w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] -top-[150px] sm:-top-[200px] left-1/2 -translate-x-1/2" />
          <div className="orb orb-blue w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] top-[30%] -left-[150px] sm:-left-[100px]" />
          <div className="orb orb-blue w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] top-[40%] -right-[150px] sm:-right-[80px]" style={{ animationDelay: "3s" }} />
          <div className="orb orb-cyan w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bottom-[10%] left-[30%]" />
        </motion.div>

        <FloatingParticles count={15} />

        <motion.div
          className="relative z-10 w-full max-w-4xl mx-auto text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 glass rounded-full px-3 sm:px-4 py-1.5 mb-6 sm:mb-8 text-[11px] sm:text-xs font-medium text-muted"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
              Salary intelligence powered by market data
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-5 sm:mb-6"
              variants={stagger}
            >
              <motion.span variants={fadeUp} className="block">
                Are You
              </motion.span>
              <motion.span variants={fadeUp} className="block text-shimmer mt-1 sm:mt-2">
                UnderChozen?
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base md:text-xl text-muted max-w-lg mx-auto mb-10 sm:mb-14 leading-relaxed px-2"
            >
              See how your salary compares to the market in seconds.{" "}
              <span className="hidden sm:inline"><br /></span>
              Data-driven. No guesswork.
            </motion.p>
          </motion.div>

          <SalaryForm />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-muted/50 px-4"
          >
            Based on aggregated public compensation data across 9 roles, 18 markets, and 12 industries
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-muted/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="glow-line" />

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 sm:mb-4 block">
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Three steps to clarity
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative">
            <div className="hidden sm:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {[
              {
                icon: Target,
                step: "01",
                title: "Input your role",
                desc: "Tell us your title, location, experience, and current pay.",
              },
              {
                icon: BarChart3,
                step: "02",
                title: "We compare market data",
                desc: "Your salary is compared against adjusted market benchmarks across industries and regions.",
              },
              {
                icon: TrendingUp,
                step: "03",
                title: "See if you're underpaid",
                desc: "Get your percentile ranking, compensation gap, and projected lifetime impact instantly.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <GlassCard className="h-full text-center glass-hover transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-accent/5 to-transparent rounded-2xl" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent/50 mb-3 sm:mb-4 block">
                      {step.step}
                    </span>
                    <div className="relative mx-auto mb-4 sm:mb-5 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-500" />
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent relative z-10" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY IT MATTERS ===== */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="glow-line" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-purple w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] top-0 right-[-150px] sm:right-[-200px] opacity-50" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3 sm:mb-4 block">
              Impact
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              The cost of not knowing
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                stat: "$142K",
                label: "Avg. lifetime earnings lost",
                desc: "When underpaid by just $14K/year over a decade.",
              },
              {
                stat: "73%",
                label: "Never negotiate",
                desc: "Most professionals accept the first offer without pushback.",
              },
              {
                stat: "87%",
                label: "Succeed with data",
                desc: "Workers who negotiate with market data get a raise.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <GlassCard className="text-center glass-hover transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-accent/5 to-transparent rounded-2xl" />
                  <div className="relative z-10">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold stat-glow mb-2 sm:mb-3">
                      <AnimatedCounter value={item.stat} className="text-shimmer" />
                    </p>
                    <p className="text-sm font-semibold mb-1">{item.label}</p>
                    <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="glow-line" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Stop leaving money on the table
            </h2>
            <p className="text-sm sm:text-base text-muted mb-6 sm:mb-8 leading-relaxed">
              It takes 30 seconds to find out where you stand. No account required.
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow cursor-pointer text-sm sm:text-base"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Analyze My Salary
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
