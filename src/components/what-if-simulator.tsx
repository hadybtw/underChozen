"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { SelectField } from "./select-field";
import { analyzeSalary, type SalaryInput } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import { locations, industries, roles } from "@/data/salaries";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Sparkles } from "lucide-react";

interface WhatIfSimulatorProps {
  currentInput: SalaryInput;
  currentMedian: number;
}

export function WhatIfSimulator({ currentInput, currentMedian }: WhatIfSimulatorProps) {
  const [simCity, setSimCity] = useState(currentInput.city);
  const [simRole, setSimRole] = useState(currentInput.jobTitle);
  const [simIndustry, setSimIndustry] = useState(currentInput.industry);

  const simAnalysis = useMemo(() => {
    return analyzeSalary({
      ...currentInput,
      city: simCity,
      jobTitle: simRole,
      industry: simIndustry,
    });
  }, [currentInput, simCity, simRole, simIndustry]);

  const hasChanges = simCity !== currentInput.city || simRole !== currentInput.jobTitle || simIndustry !== currentInput.industry;

  // Track when user engages with simulator
  const trackedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!hasChanges) return;
    const key = `${simRole}_${simCity}_${simIndustry}`;
    if (trackedRef.current.has(key)) return;
    trackedRef.current.add(key);
    trackEvent("whatif_used", { simRole, simCity, simIndustry });
  }, [hasChanges, simRole, simCity, simIndustry]);

  const medianDiff = simAnalysis.marketMedian - currentMedian;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] to-transparent rounded-2xl" />
        <div className="relative z-10">
          <div className="flex items-start gap-2.5 mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/[0.07] border border-accent/12 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5 text-accent/70" />
            </div>
            <div>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-accent/70 block mb-0.5">
                Explore
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground/90">What If Simulator</h3>
            </div>
          </div>

          <p className="text-sm text-muted/55 mb-4">
            See how your market value changes with different roles, cities, or industries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <SelectField
              label="Role"
              value={simRole}
              onChange={setSimRole}
              options={roles}
              placeholder="Role"
            />
            <SelectField
              label="City"
              value={simCity}
              onChange={setSimCity}
              options={locations}
              placeholder="City"
            />
            <SelectField
              label="Industry"
              value={simIndustry}
              onChange={setSimIndustry}
              options={industries}
              placeholder="Industry"
            />
          </div>

          {/* Results */}
          {hasChanges && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50 mb-0.5">Current Market</p>
                  <p className="text-sm font-bold tabular-nums text-foreground/90">{formatCurrency(currentMedian)}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted/40" />
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-muted/50 mb-0.5">New Market</p>
                  <p className="text-sm font-bold tabular-nums text-foreground/90">{formatCurrency(simAnalysis.marketMedian)}</p>
                </div>
              </div>
              <div className="sm:ml-auto">
                <span className={`text-sm font-bold tabular-nums ${medianDiff >= 0 ? "text-positive" : "text-negative"}`}>
                  {medianDiff >= 0 ? "+" : ""}{formatCurrency(medianDiff)}
                </span>
                <p className="text-[10px] text-muted/50">market difference</p>
              </div>
            </motion.div>
          )}

          {!hasChanges && (
            <p className="text-sm text-muted/40 text-center py-2">
              Change a field above to see how your market value shifts.
            </p>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
