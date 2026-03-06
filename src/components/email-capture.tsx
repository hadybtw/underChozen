"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { ArrowRight, Mail } from "lucide-react";

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
}

export function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    onSubmit(email);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-xs text-muted/50 text-center mb-3">
        Enter your email to unlock your strategy pack
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/30" />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="you@email.com"
            className="w-full rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground bg-white/[0.03] border border-white/[0.08] focus:outline-none focus:border-accent/30 focus:bg-white/[0.05] transition-all duration-300 placeholder:text-muted/25"
          />
        </div>
        <Button type="submit" variant="primary" size="sm" className="shrink-0 px-4">
          <span className="flex items-center gap-1.5">
            Unlock
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Button>
      </div>
      {error && (
        <p className="text-[10px] text-negative/70 mt-1.5 text-center">{error}</p>
      )}
      <p className="text-[9px] text-muted/25 mt-2 text-center">
        We&apos;ll send your report here. No spam, ever.
      </p>
    </motion.form>
  );
}
