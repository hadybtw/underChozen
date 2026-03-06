"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { trackEvent, trackScrollDepth, trackSectionViews, trackTimeOnPage } from "@/lib/analytics";
import { pixelPageView } from "@/lib/pixels";
import { captureUtm } from "@/lib/utm";
import { SalaryForm } from "@/components/salary-form";
import { GlassCard } from "@/components/glass-card";
import { AnimatedCounter } from "@/components/animated-counter";
import { Footer } from "@/components/footer";
import { Testimonials } from "@/components/testimonials";
import { LiveCounter } from "@/components/live-counter";
import {
  ArrowRight,
  ChevronUp,
  Check,
  Target,
  Mail,
  MessageSquare,
  ShieldAlert,
  TrendingUp,
  FileText,
  Zap,
  BarChart3,
  Users,
  Crown,
} from "lucide-react";

/* ===== ANIMATION PRESETS ===== */
const ease = [0.22, 1, 0.36, 1] as const;

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease },
};

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

/* ===== DATA ===== */
const blueprintFeatures = [
  {
    icon: Target,
    title: "Exact raise amount",
    desc: "A calculated number based on your market data — not a guess.",
  },
  {
    icon: Mail,
    title: "Ready-to-send email",
    desc: "Copy-paste negotiation script personalized to your role.",
  },
  {
    icon: MessageSquare,
    title: "Meeting talking points",
    desc: "Structured agenda for your salary conversation with your manager.",
  },
  {
    icon: ShieldAlert,
    title: "Objection handling",
    desc: 'Pre-built responses for "no budget", "not the right time", and more.',
  },
  {
    icon: TrendingUp,
    title: "3-year growth model",
    desc: "A projection of your earnings trajectory with compound raises.",
  },
  {
    icon: FileText,
    title: "PDF report",
    desc: "Download everything as a professional document to reference anytime.",
  },
];

const faqs = [
  {
    q: "How accurate is the salary data?",
    a: "We aggregate from public compensation surveys, job postings, and industry reports across 25 roles, 18 markets, and 13 industries. Data is adjusted for location, company size, experience level, and industry. See our methodology page for full details.",
  },
  {
    q: "What exactly do I get for $29?",
    a: "A personalized negotiation blueprint including: your exact recommended raise amount, a ready-to-send email script, manager meeting talking points, objection handling responses, a 3-year compensation growth model, and a downloadable PDF report.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Enter your details, see your free analysis, and unlock your blueprint — all in one session. No account, no password, no tracking.",
  },
  {
    q: "What if the blueprint doesn't work?",
    a: "We offer a 30-day money-back guarantee, no questions asked. If you don't get value from it, we'll refund you completely.",
  },
];

/* ===== COMPONENTS ===== */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4, ease }}
    >
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300">
        <button
          onClick={() => {
            const next = !open;
            setOpen(next);
            trackEvent("faq_toggle", { question: q, action: next ? "open" : "close" });
          }}
          className="flex items-center justify-between w-full text-left px-5 py-4 sm:py-5 cursor-pointer"
        >
          <span className="text-sm font-medium text-foreground/90 pr-4 group-hover:text-foreground transition-colors">
            {q}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease }}
            className="shrink-0 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
          >
            <ChevronUp className="w-3.5 h-3.5 text-muted/50" />
          </motion.div>
        </button>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25, ease }}
          className="overflow-hidden"
        >
          <p className="text-sm text-muted/60 leading-relaxed px-5 pb-5">
            {a}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ===== MAIN PAGE ===== */
export default function Home() {
  useEffect(() => {
    captureUtm();
    trackEvent("page_view", { page: "home" });
    pixelPageView();

    const cleanupScroll = trackScrollDepth();
    const cleanupTime = trackTimeOnPage();
    const cleanupSections = trackSectionViews({
      "#section-hero": "hero",
      "#section-social-proof": "social_proof",
      "#section-preview": "preview",
      "#section-how-it-works": "how_it_works",
      "#section-pricing": "pricing",
      "#section-testimonials": "testimonials",
      "#section-faq": "faq",
      "#section-cta": "cta",
    });

    return () => {
      cleanupScroll();
      cleanupTime();
      cleanupSections();
    };
  }, []);

  return (
    <main id="main-content" className="min-h-screen w-full">
      {/* ========================================= */}
      {/* HERO                                      */}
      {/* ========================================= */}
      <section id="section-hero" className="relative w-full overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="orb orb-purple w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] -top-[100px] sm:-top-[160px] left-1/2 -translate-x-1/2" />
          <div className="orb orb-blue w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] top-[40%] -left-[100px] sm:-left-[60px]" />
          <div className="orb orb-blue w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] top-[50%] -right-[100px] sm:-right-[40px]" style={{ animationDelay: "5s" }} />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-[max(10vh,3rem)] pb-16 sm:pb-24">
          {/* Headline */}
          <motion.div
            className="text-center mb-8 sm:mb-10"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col items-center">
              {/* Eyebrow */}
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2.5 glass rounded-full px-4 py-1.5 mb-6 sm:mb-8"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                </span>
                <span className="text-xs font-medium text-muted/70 tracking-wide">
                  Real-time salary intelligence
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={stagger} className="mb-4 sm:mb-5">
                <motion.span
                  variants={fadeUp}
                  className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl heading-display text-foreground/95"
                >
                  Are you being
                </motion.span>
                <motion.span
                  variants={fadeUp}
                  className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl heading-display"
                >
                  <span className="text-shimmer italic">underpaid</span>
                  <span className="text-foreground/95">?</span>
                </motion.span>
              </motion.h1>

              {/* Subline */}
              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg md:text-xl text-muted/60 max-w-md mx-auto leading-relaxed font-light"
              >
                Find out in 30 seconds. Compare your salary against real market data
                from 18 cities and 13 industries.
              </motion.p>
            </div>
          </motion.div>

          {/* Form */}
          <SalaryForm />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-x-5 text-xs text-muted/45"
          >
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
              </span>
              10,000+ professionals
            </span>
            <span className="text-white/[0.08] hidden sm:inline">|</span>
            <span>No account required</span>
            <span className="text-white/[0.08] hidden sm:inline">|</span>
            <span>Free analysis</span>
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* LIVE COUNTER                              */}
      {/* ========================================= */}
      <section className="relative py-6 sm:py-8 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <LiveCounter />
        </div>
      </section>

      {/* ========================================= */}
      {/* SOCIAL PROOF STRIP                        */}
      {/* ========================================= */}
      <section id="section-social-proof" className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
        <div className="glow-line" />
        <motion.div
          className="max-w-4xl mx-auto pt-10 sm:pt-14"
          {...reveal}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
            {[
              { value: "$142K", label: "Average lifetime loss from underpay", icon: TrendingUp },
              { value: "73%", label: "Of workers never negotiate their salary", icon: Users },
              { value: "$18K", label: "Average raise secured with a data-backed ask", icon: BarChart3 },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-9 h-9 rounded-xl glass flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-accent/60" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight stat-glow mb-1.5">
                  <AnimatedCounter value={stat.value} className="text-shimmer" />
                </p>
                <p className="text-xs text-muted/50 max-w-[180px] mx-auto leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* SAMPLE ANALYSIS PREVIEW                   */}
      {/* ========================================= */}
      <section id="section-preview" className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-8 sm:mb-10" {...reveal}>
            <span className="info-label text-accent/60 mb-4 block">
              Preview
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-3">
              See what you <span className="italic text-accent/90">get</span>
            </h2>
            <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
              Here&apos;s a sample analysis for a Product Manager in San Francisco.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            className="relative"
          >
            <GlassCard className="relative overflow-hidden">
              {/* Blurred overlay to indicate sample */}
              <div className="absolute top-3 right-3 z-20 text-[10px] font-bold tracking-wider uppercase bg-accent/10 text-accent/80 px-3 py-1 rounded-full">
                Sample
              </div>

              <div className="space-y-4">
                {/* Status */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-negative opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-negative" />
                  </span>
                  <span className="text-xs font-medium text-negative/80">Below Market Rate</span>
                </div>

                {/* Headline */}
                <h3 className="text-xl sm:text-2xl heading-display">
                  Underpaid by{" "}
                  <span className="text-negative" style={{ textShadow: "0 0 20px rgba(248,113,113,0.1)" }}>
                    $28,400
                  </span>{" "}
                  <span className="italic">per year</span>
                </h3>

                <p className="text-xs text-muted/50">
                  Product Manager | Senior Level | San Francisco | Technology
                </p>

                {/* Mock metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-2.5 sm:p-3">
                    <p className="text-[9px] sm:text-[11px] text-muted/50 font-medium uppercase tracking-wider mb-1">Market Range</p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground/90">$158K – $234K</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-2.5 sm:p-3">
                    <p className="text-[9px] sm:text-[11px] text-muted/50 font-medium uppercase tracking-wider mb-1">Percentile</p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground/90">34th</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-2.5 sm:p-3">
                    <p className="text-[9px] sm:text-[11px] text-muted/50 font-medium uppercase tracking-wider mb-1">Gap</p>
                    <p className="text-xs sm:text-sm font-semibold text-negative">-$28,400</p>
                  </div>
                </div>

                {/* Gradient bar mock */}
                <div className="h-3 rounded-full overflow-hidden bg-white/[0.03]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "100%",
                      background: "linear-gradient(90deg, rgba(255,69,58,0.25) 0%, rgba(255,214,10,0.2) 40%, rgba(48,209,88,0.25) 100%)",
                    }}
                  />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* HOW IT WORKS                              */}
      {/* ========================================= */}
      <section id="section-how-it-works" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10 sm:mb-14" {...reveal}>
            <span className="info-label text-accent/60 mb-4 block">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-3">
              Three steps to <span className="italic text-accent/90">clarity</span>
            </h2>
            <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
              No signup. No waiting. Get your salary position in under a minute.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                step: "01",
                title: "Enter your details",
                desc: "Job title, location, experience, and current pay. Takes about 30 seconds.",
                icon: Zap,
              },
              {
                step: "02",
                title: "We analyze the market",
                desc: "Your salary is benchmarked against adjusted market rates from real data sources.",
                icon: BarChart3,
              },
              {
                step: "03",
                title: "See your position",
                desc: "Get your percentile, compensation gap, and projected lifetime impact — instantly.",
                icon: Target,
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
              >
                <GlassCard className="h-full glass-hover transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-b from-accent/[0.03] to-transparent rounded-2xl" />
                  <div className="relative z-10 py-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl glass flex items-center justify-center shrink-0">
                        <step.icon className="w-4 h-4 text-accent/70" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-accent/40">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold mb-2 tracking-tight text-foreground/90">{step.title}</h3>
                    <p className="text-sm text-muted/55 leading-relaxed">{step.desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* WHAT YOU GET (FREE vs PAID)               */}
      {/* ========================================= */}
      <section id="section-pricing" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="glow-line" />

        <div className="max-w-4xl mx-auto relative z-10 pt-10 sm:pt-14">
          <motion.div className="text-center mb-10 sm:mb-14" {...reveal}>
            <span className="info-label text-accent/60 mb-4 block">
              What You Get
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-4">
              Free analysis, <span className="italic text-accent/90">paid strategy</span>
            </h2>
            <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
              Everyone gets the data. The blueprint shows you exactly what to do with it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* FREE tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <GlassCard className="h-full relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-[11px] font-bold tracking-[0.2em] uppercase bg-white/[0.06] text-foreground/70 px-2.5 py-1 rounded-lg">
                      Free
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-1 text-foreground/90">Salary Analysis</h3>
                  <p className="text-sm text-muted/55 mb-5">See where you stand — no account needed.</p>
                  <ul className="space-y-3">
                    {[
                      "Your percentile ranking",
                      "Market salary range for your role",
                      "Compensation gap calculation",
                      "Projected lifetime earnings impact",
                      "What-if scenario simulator",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/75">
                        <div className="w-4.5 h-4.5 rounded-full bg-positive/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-positive/80" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </motion.div>

            {/* BLUEPRINT tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <GlassCard elevated className="h-full relative overflow-hidden gradient-border">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-[11px] font-bold tracking-[0.2em] uppercase bg-accent/10 text-accent/80 px-2.5 py-1 rounded-lg">
                      Blueprint
                    </div>
                    <span className="text-[11px] font-semibold bg-positive/10 text-positive/80 px-2.5 py-0.5 rounded-full ml-auto">
                      SAVE 40%
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-1 text-foreground/90">Negotiation Blueprint</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-muted/45 line-through">$49</span>
                    <span className="text-2xl font-bold tracking-tight">$29</span>
                    <span className="text-xs text-muted/50">one-time</span>
                  </div>
                  <p className="text-xs text-accent/60 font-medium mb-4">Launch pricing</p>
                  <ul className="space-y-3">
                    {blueprintFeatures.map((f) => (
                      <li key={f.title} className="flex items-start gap-2.5 text-sm text-foreground/75">
                        <div className="w-4.5 h-4.5 rounded-full bg-accent/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent/80" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground/85">{f.title}</span>
                          <span className="text-muted/50"> — {f.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.05] text-xs text-muted/45">
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-positive/60" /> Instant access</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-positive/60" /> 30-day guarantee</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* PREMIUM tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease }}
            >
              <GlassCard className="h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-warning/[0.03] to-transparent rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="text-[11px] font-bold tracking-[0.2em] uppercase bg-warning/10 text-warning/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      Premium
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-1 text-foreground/90">Full Strategy Suite</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold tracking-tight">$79</span>
                    <span className="text-xs text-muted/50">one-time</span>
                  </div>
                  <p className="text-xs text-warning/60 font-medium mb-4">Everything in Blueprint, plus:</p>
                  <ul className="space-y-3">
                    {[
                      { title: "Industry benchmarks", desc: "Compare pay across all 13 industries." },
                      { title: "Total comp estimate", desc: "Equity, bonus, and benefits valuation." },
                      { title: "90-day action plan", desc: "Week-by-week negotiation roadmap." },
                      { title: "Salary trend insights", desc: "YoY trends for your role and city." },
                      { title: "Top-paying markets", desc: "Highest-paying combos for your role." },
                      { title: "Counter-offer strategy", desc: "How to handle and leverage competing offers." },
                    ].map((f) => (
                      <li key={f.title} className="flex items-start gap-2.5 text-sm text-foreground/75">
                        <div className="w-4.5 h-4.5 rounded-full bg-warning/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-warning/80" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground/85">{f.title}</span>
                          <span className="text-muted/50"> — {f.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/[0.05] text-xs text-muted/45">
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-positive/60" /> Instant access</span>
                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-positive/60" /> 30-day guarantee</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* TESTIMONIALS                              */}
      {/* ========================================= */}
      <section id="section-testimonials" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="glow-line" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-cyan w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] top-[30%] right-[-80px] opacity-25" />
        </div>

        <div className="max-w-5xl mx-auto pt-10 sm:pt-14 relative z-10">
          <motion.div className="text-center mb-10 sm:mb-14" {...reveal}>
            <span className="info-label text-accent/60 mb-4 block">
              Results
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-3">
              Real people, real <span className="italic text-accent/90">raises</span>
            </h2>
            <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
              See how others used their blueprint to close the gap.
            </p>
          </motion.div>
          <Testimonials />
        </div>
      </section>

      {/* ========================================= */}
      {/* FAQ                                       */}
      {/* ========================================= */}
      <section id="section-faq" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="glow-line" />

        <div className="max-w-2xl mx-auto relative z-10 pt-10 sm:pt-14">
          <motion.div className="text-center mb-10 sm:mb-14" {...reveal}>
            <span className="info-label text-accent/60 mb-4 block">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-3">
              Common <span className="italic text-accent/90">questions</span>
            </h2>
            <p className="text-sm sm:text-base text-muted/55 max-w-md mx-auto leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* CTA                                       */}
      {/* ========================================= */}
      <section id="section-cta" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="glow-line" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb orb-purple w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] top-[-80px] left-1/2 -translate-x-1/2 opacity-15" />
        </div>

        <div className="max-w-xl mx-auto text-center relative z-10 pt-10 sm:pt-14">
          <motion.div {...reveal}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-display mb-4 sm:mb-5">
              Stop leaving money
              <br />
              <span className="italic text-accent/90">on the table</span>
            </h2>
            <p className="text-base text-muted/55 mb-8 leading-relaxed font-light">
              30 seconds. No account. Find out where you stand.
            </p>
            <motion.button
              onClick={() => {
                trackEvent("cta_click", { cta: "bottom_analyze_salary" });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-accent to-accent-blue text-white font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/35 hover:brightness-110 transition-all duration-300 cursor-pointer text-sm"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Analyze My Salary
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-xs text-muted/45">
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                </span>
                10,000+ professionals
              </span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-positive" />
                </span>
                Results in seconds
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
