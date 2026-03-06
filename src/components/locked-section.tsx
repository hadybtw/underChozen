"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Check,
  ArrowRight,
  ShieldCheck,
  Target,
  Mail,
  MessageSquare,
  ShieldAlert,
  TrendingUp,
  FileText,
  Crown,
  Tag,
} from "lucide-react";
import { Button } from "./button";
import { CountdownTimer } from "./countdown-timer";
import { formatCurrency } from "@/lib/utils";
import { validateDiscount, applyDiscount, type DiscountCode } from "@/lib/discounts";

interface LockedSectionProps {
  onUnlock: (discountCode?: string) => void;
  onUnlockPremium?: (discountCode?: string) => void;
  lifetimeImpact?: number;
  gap?: number;
}

const features = [
  {
    icon: Target,
    title: "Exact raise amount",
    desc: "A specific dollar figure based on your market position",
  },
  {
    icon: Mail,
    title: "Email negotiation script",
    desc: "Copy-paste email personalized to your role and company",
  },
  {
    icon: MessageSquare,
    title: "Meeting talking points",
    desc: "Structured agenda for your salary conversation",
  },
  {
    icon: ShieldAlert,
    title: "Objection responses",
    desc: 'Replies to "no budget", "bad timing", and more',
  },
  {
    icon: TrendingUp,
    title: "3-year growth model",
    desc: "Projected earnings trajectory with compound raises",
  },
  {
    icon: FileText,
    title: "PDF report download",
    desc: "Professional document you can save and reference",
  },
];

export function LockedSection({ onUnlock, onUnlockPremium, lifetimeImpact, gap }: LockedSectionProps) {
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [promoError, setPromoError] = useState("");

  const blueprintPrice = appliedDiscount ? applyDiscount(29, appliedDiscount) : 29;
  const premiumPrice = appliedDiscount ? applyDiscount(79, appliedDiscount) : 79;

  const handleApplyPromo = () => {
    setPromoError("");
    const result = validateDiscount(promoInput);
    if (result) {
      setAppliedDiscount(result);
    } else {
      setPromoError("Invalid or expired code");
    }
  };

  const handleUnlockWithDiscount = () => {
    onUnlock(appliedDiscount?.code);
  };

  const handleUnlockPremiumWithDiscount = () => {
    if (onUnlockPremium) {
      onUnlockPremium(appliedDiscount?.code);
    } else {
      onUnlock(appliedDiscount?.code);
    }
  };

  const gapCostRatio = gap && gap > 0 ? (blueprintPrice / gap * 100).toFixed(2) : null;

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl gradient-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-elevated rounded-2xl p-6 sm:p-8 md:p-10 relative">
        {/* Blurred preview — more visible to tease content */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04] blur-[2px] select-none p-8" aria-hidden>
            <div className="h-4 bg-white rounded w-1/3 mb-2" />
            <div className="h-6 bg-white rounded w-2/5 mb-4" />
            <div className="text-[10px] text-white/50 mb-3 leading-relaxed">
              Subject: Compensation Discussion — Based on market analysis of comparable roles...
            </div>
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-2.5 bg-white rounded"
                  style={{ width: `${50 + Math.random() * 40}%` }}
                />
              ))}
            </div>
            <div className="mt-4 h-4 bg-white rounded w-1/4" />
            <div className="mt-2 space-y-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 bg-white rounded"
                  style={{ width: `${60 + Math.random() * 30}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Frosted overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-background/50 rounded-2xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-accent/80" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight">
              Your Negotiation Blueprint
            </h3>
            <p className="text-sm text-muted/60 max-w-sm leading-relaxed">
              A personalized, data-backed action plan to close your compensation gap.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.05 }}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/[0.06] border border-accent/[0.08] flex items-center justify-center shrink-0">
                  <feature.icon className="w-3.5 h-3.5 text-accent/70" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-foreground/85 mb-0.5">
                    {feature.title}
                  </p>
                  <p className="text-xs text-muted/50 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lifetime impact callout */}
          {lifetimeImpact && lifetimeImpact > 0 && (
            <motion.div
              className="text-center mb-5 p-4 rounded-xl bg-negative/[0.04] border border-negative/[0.08]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-sm text-foreground/70 mb-1">
                Without action, you stand to lose
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-negative tracking-tight">
                ~{formatCurrency(lifetimeImpact)}
              </p>
              <p className="text-xs text-muted/50 mt-1">over the next 10 years</p>
            </motion.div>
          )}

          {/* Countdown urgency */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="text-xs font-medium text-warning/70 uppercase tracking-wider">
              Launch pricing ends in
            </span>
            <CountdownTimer />
          </div>

          {/* Pricing tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-lg mx-auto">
            {/* Blueprint tier — primary */}
            <motion.div
              className="relative rounded-xl border-2 border-accent/30 bg-accent/[0.04] p-5 text-center cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUnlockWithDiscount}
            >
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase bg-accent text-white px-3 py-0.5 rounded-full">
                Most Popular
              </div>
              <p className="text-xs font-semibold text-accent/80 mb-2 mt-1">Blueprint</p>
              <div className="flex items-baseline justify-center gap-1.5 mb-2">
                <span className="text-sm text-muted/40 line-through">{appliedDiscount ? "$29" : "$49"}</span>
                <span className="text-3xl font-bold text-foreground">${blueprintPrice}</span>
              </div>
              <span className="text-[11px] font-semibold bg-positive/10 text-positive/80 px-2.5 py-0.5 rounded-full">
                {appliedDiscount ? `SAVE ${appliedDiscount.percent}% extra` : "SAVE 40%"}
              </span>
              <p className="text-xs text-muted/50 mt-2">One-time payment</p>
              <ul className="text-left mt-3 space-y-1.5">
                {["Raise calculator", "Email script", "Talking points", "Objection handling", "PDF report"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-foreground/70">
                    <Check className="w-3 h-3 text-accent/70 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Premium tier */}
            <motion.div
              className="relative rounded-xl border border-warning/20 bg-warning/[0.02] p-5 text-center cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleUnlockPremiumWithDiscount}
            >
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Crown className="w-3.5 h-3.5 text-warning/70" />
                <p className="text-xs font-semibold text-warning/80">Premium</p>
              </div>
              <div className="flex items-baseline justify-center gap-1.5 mb-2">
                {appliedDiscount && <span className="text-sm text-muted/40 line-through">$79</span>}
                <span className="text-3xl font-bold text-foreground/80">${premiumPrice}</span>
              </div>
              <p className="text-xs text-muted/50 mt-1">One-time payment</p>
              <ul className="text-left mt-3 space-y-1.5">
                {[
                  "Everything in Blueprint",
                  "Industry benchmarks",
                  "Total comp estimate",
                  "90-day action plan",
                  "Top-paying markets",
                  "Counter-offer strategy",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-foreground/65">
                    <Check className="w-3 h-3 text-warning/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Promo code */}
          <div className="flex flex-col items-center mb-5">
            {!appliedDiscount ? (
              <>
                <button
                  onClick={() => setPromoOpen(!promoOpen)}
                  className="text-xs text-muted/50 hover:text-foreground/70 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3" />
                  Have a promo code?
                </button>
                <AnimatePresence>
                  {promoOpen && (
                    <motion.div
                      className="mt-3 flex items-center gap-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                        placeholder="Enter code"
                        className="rounded-lg bg-white/[0.03] border border-white/[0.08] px-3 py-2 text-xs text-foreground/80 placeholder:text-muted/30 focus:outline-none focus:border-accent/30 w-36 font-mono uppercase"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="text-xs font-medium px-3 py-2 rounded-lg bg-accent/[0.08] border border-accent/15 text-accent/80 hover:bg-accent/[0.14] transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {promoError && (
                  <p className="text-[11px] text-negative/70 mt-1.5">{promoError}</p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <Check className="w-3.5 h-3.5 text-positive/80" />
                <span className="text-positive/70 font-medium">
                  {appliedDiscount.code} applied — {appliedDiscount.percent}% off
                </span>
                <button
                  onClick={() => { setAppliedDiscount(null); setPromoInput(""); }}
                  className="text-muted/40 hover:text-foreground/60 transition-colors cursor-pointer ml-1 text-[10px] underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="w-full sm:w-auto flex flex-col items-center"
            >
              {gapCostRatio && (
                <p className="text-sm text-foreground/70 mb-3 text-center">
                  That&apos;s just <span className="font-bold text-accent">{gapCostRatio}%</span> of
                  your annual gap
                </p>
              )}

              <Button
                variant="primary"
                size="lg"
                onClick={handleUnlockWithDiscount}
                className="w-full sm:w-auto text-sm px-8"
              >
                <span className="flex items-center justify-center gap-2">
                  Unlock Blueprint — ${blueprintPrice}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>

              <p className="text-xs text-muted/45 mt-3">
                One-time payment. Instant access. PDF included.
              </p>
            </motion.div>

            {/* Guarantee badge */}
            <motion.div
              className="flex items-center gap-1.5 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <ShieldCheck className="w-4 h-4 text-positive/70" />
              <span className="text-xs text-positive/60 font-medium">
                30-day money-back guarantee — no questions asked
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
