"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Mail, ArrowRight } from "lucide-react";
import { Button } from "./button";

interface ExitIntentProps {
  onEmailSubmit?: (email: string) => void;
}

export function ExitIntent({ onEmailSubmit }: ExitIntentProps) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !sessionStorage.getItem("uc_exit_shown")) {
      setShow(true);
      sessionStorage.setItem("uc_exit_shown", "1");
    }
  }, []);

  useEffect(() => {
    // Only trigger after user has been on page for 5 seconds
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setSubmitted(true);
    onEmailSubmit?.(email);

    // Send to email capture API
    fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "exit_intent" }),
    }).catch(() => {});
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShow(false)}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm glass-elevated rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-muted/60" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center mx-auto mb-4">
                <Download className="w-5 h-5 text-accent/80" />
              </div>

              {!submitted ? (
                <>
                  <h3 className="text-lg font-bold tracking-tight mb-2">
                    Before you go
                  </h3>
                  <p className="text-sm text-muted/60 mb-5 leading-relaxed">
                    Get your free salary summary sent to your inbox — no strings attached.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        placeholder="you@email.com"
                        className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-foreground bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:border-accent/30 transition-all placeholder:text-muted/30"
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-negative/70 text-center">{error}</p>
                    )}
                    <Button type="submit" variant="primary" className="w-full text-sm">
                      <span className="flex items-center justify-center gap-2">
                        Send My Summary
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
                  </form>
                  <p className="text-[11px] text-muted/35 mt-3">No spam, ever. Unsubscribe anytime.</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold tracking-tight mb-2">
                    Check your inbox
                  </h3>
                  <p className="text-sm text-muted/60 mb-4 leading-relaxed">
                    Your salary summary is on its way. Keep an eye out for tips
                    on how to close your compensation gap.
                  </p>
                  <Button variant="secondary" onClick={() => setShow(false)} className="text-sm">
                    Back to results
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
