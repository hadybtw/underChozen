"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Gift, Copy, Check, Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ReferralCard() {
  const [copied, setCopied] = useState(false);

  const referralCode = useMemo(() => {
    if (typeof window === "undefined") return "UNDERCHOZEN";
    // Generate a simple referral code from session
    const stored = sessionStorage.getItem("uc_referral_code");
    if (stored) return stored;
    const code = `UC${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    sessionStorage.setItem("uc_referral_code", code);
    return code;
  }, []);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}?ref=${referralCode}`
    : "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackEvent("share_click", { method: "referral" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warning/[0.02] to-transparent rounded-2xl" />
        <div className="relative z-10">
          <div className="flex items-start gap-2.5 mb-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-warning/[0.07] border border-warning/12 flex items-center justify-center shrink-0 mt-0.5">
              <Gift className="w-3.5 h-3.5 text-warning/70" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-warning/70 block mb-0.5">
                Refer a Friend
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
                Share & Save
              </h3>
            </div>
          </div>

          <p className="text-sm text-muted/55 mb-4">
            Share your referral link with friends. They can use code <span className="font-mono font-semibold text-warning/80">REFER10</span> for 10% off the Blueprint.
            When 3 friends join, you also get $10 off.
          </p>

          {/* Progress */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background bg-white/[0.04] flex items-center justify-center"
                >
                  <Users className="w-3.5 h-3.5 text-muted/30" />
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full w-0 rounded-full bg-gradient-to-r from-warning/40 to-warning/60" />
              </div>
              <p className="text-[10px] text-muted/40 mt-1">0 of 3 friends joined</p>
            </div>
          </div>

          {/* Referral link */}
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2.5 text-xs text-muted/60 truncate font-mono">
              {shareUrl}
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2.5 rounded-lg bg-warning/[0.08] border border-warning/15 text-warning/80 hover:bg-warning/[0.12] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
