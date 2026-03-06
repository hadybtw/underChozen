"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Session-based: 2-hour window from first visit
    const DURATION_MS = 2 * 60 * 60 * 1000;
    const storageKey = "uc_offer_start";

    let startTime = parseInt(sessionStorage.getItem(storageKey) || "0", 10);
    if (!startTime) {
      startTime = Date.now();
      sessionStorage.setItem(storageKey, String(startTime));
    }

    function getTimeLeft() {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, DURATION_MS - elapsed);
      return {
        hours: Math.floor(remaining / 3600000),
        minutes: Math.floor((remaining % 3600000) / 60000),
        seconds: Math.floor((remaining % 60000) / 1000),
      };
    }

    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-1 tabular-nums text-xs font-mono font-semibold text-warning/90">
      <span className="bg-warning/[0.1] px-2 py-0.5 rounded">{pad(timeLeft.hours)}</span>
      <span className="text-warning/50">:</span>
      <span className="bg-warning/[0.1] px-2 py-0.5 rounded">{pad(timeLeft.minutes)}</span>
      <span className="text-warning/50">:</span>
      <span className="bg-warning/[0.1] px-2 py-0.5 rounded">{pad(timeLeft.seconds)}</span>
    </div>
  );
}
