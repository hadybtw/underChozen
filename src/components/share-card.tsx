"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Share2, Copy, Check, Twitter, Linkedin } from "lucide-react";
import { formatCurrency, ordinal } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { SalaryAnalysis } from "@/lib/calculator";

interface ShareCardProps {
  analysis: SalaryAnalysis;
}

export function ShareCard({ analysis }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const shareText = analysis.isUnderpaid
    ? `I just found out I'm in the ${ordinal(analysis.percentile)} percentile for ${analysis.input.jobTitle} salaries. I could be earning ${formatCurrency(Math.abs(analysis.delta))} more per year. Check yours at`
    : `I'm in the ${ordinal(analysis.percentile)} percentile for ${analysis.input.jobTitle} salaries — ${analysis.isOverpaid ? "above" : "aligned with"} market rates. Check yours at`;

  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      trackEvent("share_click", { method: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  function handleTweet() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    trackEvent("share_click", { method: "twitter" });
  }

  function handleLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    trackEvent("share_click", { method: "linkedin" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="relative overflow-hidden">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
            <Share2 className="w-3.5 h-3.5 text-accent/70" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-accent/70 block mb-0.5">
              Share
            </span>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">Share Your Results</h3>
          </div>
        </div>

        {/* Preview card */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-3.5 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-blue flex items-center justify-center">
              <span className="text-white text-xs font-black">UC</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground/85">UnderChozen Analysis</p>
              <p className="text-[10px] text-muted/50">{analysis.input.jobTitle} · {analysis.input.city}</p>
            </div>
          </div>
          <p className="text-xs text-muted/65 leading-relaxed">{shareText}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3 h-3 text-positive" /> : <Copy className="w-3 h-3 text-muted/60" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={handleTweet}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-all cursor-pointer"
          >
            <Twitter className="w-3 h-3 text-muted/60" />
            Tweet
          </button>
          <button
            onClick={handleLinkedIn}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-all cursor-pointer"
          >
            <Linkedin className="w-3 h-3 text-muted/60" />
            LinkedIn
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
