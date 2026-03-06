"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  ArrowRight,
  Download,
  Crown,
} from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { trackEvent } from "@/lib/analytics";
import { pixelPurchase } from "@/lib/pixels";

const ease = [0.22, 1, 0.36, 1] as const;

const tiers: Record<string, { label: string; price: string; features: string[] }> = {
  blueprint: {
    label: "Negotiation Blueprint",
    price: "$29",
    features: [
      "Personalized negotiation email script",
      "Talking points & objection handlers",
      "3-year compensation projection",
      "Downloadable PDF report",
    ],
  },
  premium: {
    label: "Premium Career Intelligence",
    price: "$79",
    features: [
      "Everything in Blueprint",
      "Industry salary trends & forecasts",
      "Role-specific career roadmap",
      "Competitive landscape analysis",
      "Priority support",
    ],
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const tier = searchParams.get("tier") || "blueprint";
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  // Build the return URL with original analysis params
  const analysisParams = new URLSearchParams();
  searchParams.forEach((value, key) => {
    if (key !== "session_id" && key !== "tier") {
      analysisParams.set(key, value);
    }
  });
  analysisParams.set("unlocked", "true");
  analysisParams.set("tier", tier);
  if (sessionId) analysisParams.set("session_id", sessionId);
  const analysisUrl = `/analysis?${analysisParams.toString()}`;

  const tierInfo = tiers[tier] || tiers.blueprint;

  useEffect(() => {
    async function verify() {
      try {
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        setVerified(data.verified);
        if (data.verified) {
          trackEvent("payment_complete", { tier, sessionId: sessionId || "" });
          pixelPurchase(tier === "premium" ? 79 : 29, "USD");
        }
      } catch {
        setVerified(false);
      } finally {
        setVerifying(false);
      }
    }
    verify();
  }, [sessionId, tier]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#06060B" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin mx-auto mb-4" />
          <p className="text-muted text-sm">Verifying your payment...</p>
        </motion.div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#06060B" }}>
        <GlassCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-md mx-4 text-center"
        >
          <div className="w-14 h-14 rounded-full bg-negative/10 border border-negative/20 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-7 h-7 text-negative" />
          </div>
          <h1 className="heading-display text-xl mb-2">Verification failed</h1>
          <p className="text-muted text-sm mb-6">
            We could not verify your payment. Please contact support or try again.
          </p>
          <Link href="/">
            <Button variant="secondary" size="md">
              Return home
            </Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#06060B" }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-16">
        {/* Animated check */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              className="absolute inset-0 w-20 h-20 rounded-full bg-positive/20 blur-xl"
            />
            <div className="relative w-20 h-20 rounded-full bg-positive/10 border border-positive/25 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.4 }}
              >
                <Check className="w-9 h-9 text-positive" strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className="text-center mb-8"
        >
          <p className="info-label text-accent mb-3">Payment confirmed</p>
          <h1 className="heading-display text-3xl sm:text-4xl mb-3">
            You&apos;re all set
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
            Your {tierInfo.label} has been unlocked. Here&apos;s what you now have access to.
          </p>
        </motion.div>

        {/* Tier card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.5 }}
        >
          <GlassCard glow className="mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{tierInfo.label}</p>
                <p className="text-xs text-muted">{tierInfo.price} &middot; One-time purchase</p>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6">
              {tierInfo.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.6 + i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-foreground/80"
                >
                  <Check className="w-4 h-4 text-positive mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={analysisUrl} className="flex-1" onClick={() => trackEvent("cta_click", { cta: "view_results_success" })}>
                <Button size="lg" className="w-full flex items-center justify-center gap-2">
                  View Your Results
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {tier === "blueprint" && (
                <Link href={analysisUrl} className="flex-1" onClick={() => trackEvent("cta_click", { cta: "download_pdf_success" })}>
                  <Button variant="secondary" size="lg" className="w-full flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </Link>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.8 }}
        >
          <GlassCard className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 text-accent-blue" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground mb-0.5">
                30-day money-back guarantee
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Not satisfied with your insights? Contact us within 30 days for a full
                refund. No questions asked.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#06060B" }}>
          <div className="w-12 h-12 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
