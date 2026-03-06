"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Button } from "./button";
import { InputField } from "./input-field";
import { SelectField } from "./select-field";
import { roles, locations, industries, companySizes, salaryData } from "@/data/salaries";
import { trackEvent } from "@/lib/analytics";
import { pixelLead } from "@/lib/pixels";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const fieldVariants = {
  initial: { opacity: 0, y: 8 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.04, duration: 0.4, ease },
  }),
};

export function SalaryForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [companyName, setCompanyName] = useState("");

  const step1Valid = jobTitle && currentSalary;
  const step2Valid = yearsExperience && city && industry && companySize;
  const allValid = step1Valid && step2Valid;

  const filledCount = [jobTitle, currentSalary, yearsExperience, city, industry, companySize].filter(Boolean).length;
  const totalRequired = 6;
  const progress = filledCount / totalRequired;

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1 && step1Valid) {
      trackEvent("form_step2", { jobTitle });
      setStep(2);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allValid) return;
    trackEvent("form_complete", { jobTitle, city, industry });
    pixelLead({ jobTitle, city });

    const params = new URLSearchParams({
      jobTitle,
      yearsExperience,
      city,
      industry,
      currentSalary,
      companySize,
      ...(companyName && { companyName }),
    });

    router.push(`/analysis?${params.toString()}`);
  }

  // Teaser range for step 1 — show actual role-specific range
  const selectedRole = roles.find((r) => r === jobTitle);
  const roleRange = selectedRole
    ? salaryData.find((d) => d.role === selectedRole)
    : null;
  const teaserLow = roleRange ? `$${Math.round(roleRange.entry.p25 / 1000)}K` : "$60K";
  const teaserHigh = roleRange ? `$${Math.round(roleRange.senior.p75 / 1000)}K` : "$215K";
  const showTeaser = step === 1 && selectedRole && currentSalary;

  return (
    <GlassCard
      elevated
      glow
      className="w-full max-w-xl mx-auto p-5 sm:p-7"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease }}
    >
      {/* Progress bar */}
      <motion.div
        className="flex items-center gap-3 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex-1 h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: progress === 1
                ? "linear-gradient(90deg, #34D399, #34D399)"
                : "linear-gradient(90deg, var(--color-accent), var(--color-accent-blue))",
            }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.35, ease }}
          />
        </div>
        <span className="text-[11px] text-muted/40 tabular-nums shrink-0 font-medium" aria-live="polite">
          Step {step} of 2
        </span>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            onSubmit={handleNext}
            role="form"
            aria-label="Salary analysis form - Step 1 of 2"
            className="space-y-3.5 sm:space-y-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease }}
          >
            <motion.div custom={0} variants={fieldVariants} initial="initial" animate="animate">
              <SelectField
                label="Job Title"
                value={jobTitle}
                onChange={setJobTitle}
                options={roles}
                placeholder="Select your role"
              />
            </motion.div>

            <motion.div custom={1} variants={fieldVariants} initial="initial" animate="animate">
              <InputField
                label="Current Annual Salary"
                value={currentSalary}
                onChange={setCurrentSalary}
                type="number"
                placeholder="85,000"
                prefix="$"
              />
            </motion.div>

            {/* Teaser */}
            {showTeaser && (
              <motion.div
                className="rounded-xl bg-accent/[0.04] border border-accent/[0.08] p-3.5 text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xs text-muted/60">
                  <span className="font-semibold text-foreground/80">{jobTitle}</span> salaries in the US range from{" "}
                  <span className="font-semibold text-foreground/80">{teaserLow} – {teaserHigh}</span>.
                </p>
                <p className="text-[11px] text-accent/70 mt-1 font-medium">
                  Let&apos;s narrow it down to your exact market.
                </p>
              </motion.div>
            )}

            <motion.div custom={2} variants={fieldVariants} initial="initial" animate="animate" className="pt-1">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-sm"
                disabled={!step1Valid}
                aria-label={step1Valid ? "Continue to step 2" : "Enter your role and salary to continue"}
                style={{ opacity: step1Valid ? 1 : 0.3 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {step1Valid ? (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    "Enter your role and salary"
                  )}
                </span>
              </Button>
            </motion.div>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            onSubmit={handleSubmit}
            role="form"
            aria-label="Salary analysis form - Step 2 of 2"
            className="space-y-3.5 sm:space-y-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease }}
          >
            {/* Back button */}
            <motion.button
              type="button"
              onClick={() => setStep(1)}
              aria-label="Go back to step 1"
              className="flex items-center gap-1.5 text-xs text-muted/50 hover:text-foreground/70 transition-colors cursor-pointer mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </motion.button>

            <motion.div custom={0} variants={fieldVariants} initial="initial" animate="animate">
              <InputField
                label="Company Name"
                value={companyName}
                onChange={setCompanyName}
                placeholder="e.g. Google (optional)"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <motion.div custom={1} variants={fieldVariants} initial="initial" animate="animate">
                <InputField
                  label="Years of Exp."
                  value={yearsExperience}
                  onChange={setYearsExperience}
                  type="number"
                  placeholder="e.g. 5"
                />
              </motion.div>
              <motion.div custom={2} variants={fieldVariants} initial="initial" animate="animate">
                <SelectField
                  label="Company Size"
                  value={companySize}
                  onChange={setCompanySize}
                  options={companySizes}
                  placeholder="Employees"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <motion.div custom={3} variants={fieldVariants} initial="initial" animate="animate">
                <SelectField
                  label="City"
                  value={city}
                  onChange={setCity}
                  options={locations}
                  placeholder="Select city"
                />
              </motion.div>
              <motion.div custom={4} variants={fieldVariants} initial="initial" animate="animate">
                <SelectField
                  label="Industry"
                  value={industry}
                  onChange={setIndustry}
                  options={industries}
                  placeholder="Select industry"
                />
              </motion.div>
            </div>

            <motion.div custom={5} variants={fieldVariants} initial="initial" animate="animate" className="pt-1">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-sm"
                disabled={!step2Valid}
                aria-label={step2Valid ? "Analyze my salary" : "Fill all fields to analyze your salary"}
                style={{ opacity: step2Valid ? 1 : 0.3 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {step2Valid ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Analyze My Salary
                    </>
                  ) : (
                    `Fill ${4 - [yearsExperience, city, industry, companySize].filter(Boolean).length} more field${4 - [yearsExperience, city, industry, companySize].filter(Boolean).length > 1 ? "s" : ""}`
                  )}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
