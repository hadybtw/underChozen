"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Mail, ArrowRight, Check } from "lucide-react";
import { Button } from "./button";
import { trackEvent } from "@/lib/analytics";
import type { SalaryAnalysis } from "@/lib/calculator";

interface EmailReportProps {
  analysis: SalaryAnalysis;
}

export function EmailReport({ analysis }: EmailReportProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setSubmitted(true);

    trackEvent("email_capture", { source: "report" });

    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "free_report",
        jobTitle: analysis.input.jobTitle,
        city: analysis.input.city,
        percentile: analysis.percentile,
      }),
    }).catch(() => {});
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="relative overflow-hidden">
        <div className="flex items-start gap-2.5 mb-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-3.5 h-3.5 text-accent/70" />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-accent/70 block mb-0.5">
              Free
            </span>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">
              Email Your Results
            </h3>
          </div>
        </div>

        <p className="text-sm text-muted/55 mb-4">
          Get a summary of your salary analysis sent to your inbox for future reference.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="you@email.com"
                className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-foreground bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-accent/30 transition-all placeholder:text-muted/30"
              />
              {error && (
                <p className="text-xs text-negative/70 mt-1.5">{error}</p>
              )}
            </div>
            <Button type="submit" variant="primary" className="text-sm shrink-0">
              <span className="flex items-center gap-2">
                Send Summary
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Button>
          </form>
        ) : (
          <motion.div
            className="flex items-center gap-2.5 p-3 rounded-xl bg-positive/[0.06] border border-positive/[0.12]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-7 h-7 rounded-lg bg-positive/[0.12] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-positive" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/85">Summary sent!</p>
              <p className="text-xs text-muted/50">Check your inbox for your salary analysis.</p>
            </div>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  );
}
