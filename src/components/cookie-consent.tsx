"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "uc_cookie_consent";
const EASE = [0.22, 1, 0.36, 1] as const;

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center mb-4 px-4 pointer-events-none"
        >
          <div className="glass rounded-xl max-w-lg w-full p-4 pointer-events-auto flex items-start gap-3">
            <Cookie className="w-4 h-4 text-[var(--color-muted)] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                We use cookies to improve your experience and analyze site usage.
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleAccept}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-blue)] text-white cursor-pointer transition-opacity hover:opacity-90"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg glass text-[var(--color-muted)] cursor-pointer transition-opacity hover:opacity-80"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
