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
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 25, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <main className="min-h-screen">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
      >
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <motion.div className="absolute inset-0 pointer-events-none" style={{ scale: orbScale }}>
          <div className="orb orb-purple w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] -top-[120px] sm:-top-[180px] left-1/2 -translate-x-1/2" />
          <div className="orb orb-blue w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] top-[35%] -left-[120px] sm:-left-[80px]" />
          <div className="orb orb-blue w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] top-[45%] -right-[120px] sm:-right-[60px]" style={{ animationDelay: "4s" }} />
          <div className="orb orb-cyan w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] bottom-[12%] left-[25%]" />
        </motion.div>

        <FloatingParticles count={12} />

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
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 glass rounded-full px-3.5 sm:px-4 py-1.5 mb-6 sm:mb-8 text-[11px] sm:text-xs font-medium text-muted/90"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
              </span>
              Real-time salary intelligence
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[2.5rem] leading-[1] sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] mb-5 sm:mb-6"
              variants={stagger}
            >
              <motion.span variants={fadeUp} className="block text-foreground/95">
                Are You
              </motion.span>
              <motion.span variants={fadeUp} className="block text-shimmer mt-1 sm:mt-2">
                UnderChozen?
              </motion.span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base md:text-lg text-muted/80 max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed"
            >
              Find out how your salary stacks up against the market — in 30 seconds. Backed by data, not guesswork.
            </motion.p>

            {/* Trust signals */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10"
            >
              {[
                { icon: Zap, label: "Instant results" },
                { icon: Shield, label: "Private & secure" },
                { icon: Clock, label: "No account needed" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-muted/50 font-medium">
                  <item.icon className="w-3 h-3 text-muted/40" />
                  {item.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <SalaryForm />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mt-6 sm:mt-8 text-[10px] sm:text-[11px] text-muted/35 px-4"
          >
            Covering 9 roles, 18 markets, and 12 industries
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-muted/25" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="glow-line" />

        <div className="max-w-5xl mx-auto pt-8 sm:pt-12">
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-accent/80 mb-3 block">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Three steps to clarity
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 relative">
            {/* Connecting line */}
            <div className="hidden sm:block absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {[
              {
                icon: Target,
                step: "01",
                title: "Enter your details",
                desc: "Your title, location, experience, and current compensation.",
              },
              {
                icon: BarChart3,
                step: "02",
                title: "We crunch the data",
                desc: "Your salary is benchmarked against adjusted market rates in real-time.",
              },
              {
                icon: TrendingUp,
                step: "03",
                title: "Get your verdict",
                desc: "See your percentile, gap, and projected lifetime impact — instantly.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GlassCard className="h-full text-center glass-hover transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-accent/[0.04] to-transparent rounded-2xl" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent/40 mb-3 sm:mb-4 block">
                      {step.step}
                    </span>
                    <div className="relative mx-auto mb-4 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-xl bg-accent/[0.08] group-hover:bg-accent/[0.14] transition-colors duration-500" />
                      <step.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-accent/80 relative z-10" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold mb-1.5">{step.title}</h3>
                    <p className="text-xs sm:text-[13px] text-muted/60 leading-relaxed">{step.desc}</p>
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
          <div className="orb orb-purple w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] top-0 right-[-120px] sm:right-[-150px] opacity-40" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 pt-8 sm:pt-12">
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-accent/80 mb-3 block">
              The Stakes
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              The cost of not knowing
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                stat: "$142K",
                label: "Avg. lifetime loss",
                desc: "When underpaid by $14K/year over a decade.",
              },
              {
                stat: "73%",
                label: "Never negotiate",
                desc: "Most professionals accept the first offer given.",
              },
              {
                stat: "87%",
                label: "Win with data",
                desc: "Success rate when negotiating with market benchmarks.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GlassCard className="text-center glass-hover transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-accent/[0.04] to-transparent rounded-2xl" />
                  <div className="relative z-10 py-2">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight stat-glow mb-2.5">
                      <AnimatedCounter value={item.stat} className="text-shimmer" />
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground/90 mb-1">{item.label}</p>
                    <p className="text-[11px] sm:text-xs text-muted/50 leading-relaxed">{item.desc}</p>
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
        <div className="max-w-xl mx-auto text-center relative z-10 pt-8 sm:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              Stop leaving money on the table
            </h2>
            <p className="text-sm sm:text-base text-muted/60 mb-6 sm:mb-8 leading-relaxed">
              30 seconds. No account. Find out where you stand.
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:brightness-110 transition-all duration-300 cursor-pointer text-sm"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
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
