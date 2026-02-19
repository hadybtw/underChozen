"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Button } from "./button";
import { InputField } from "./input-field";
import { SelectField } from "./select-field";
import { roles, locations, industries, companySizes } from "@/data/salaries";
import { ArrowRight } from "lucide-react";

const fieldVariants = {
  initial: { opacity: 0, y: 15, filter: "blur(5px)" },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.4 + i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function SalaryForm() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [city, setCity] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [companySize, setCompanySize] = useState("");

  const isValid =
    jobTitle && yearsExperience && city && industry && currentSalary && companySize;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const params = new URLSearchParams({
      jobTitle,
      yearsExperience,
      city,
      industry,
      currentSalary,
      companySize,
    });

    router.push(`/analysis?${params.toString()}`);
  }

  return (
    <GlassCard
      glow
      className="w-full max-w-xl mx-auto backdrop-blur-2xl p-4 sm:p-6"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <motion.div custom={0} variants={fieldVariants} initial="initial" animate="animate">
          <SelectField
            label="Job Title"
            value={jobTitle}
            onChange={setJobTitle}
            options={roles}
            placeholder="Select your role"
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <motion.div custom={1} variants={fieldVariants} initial="initial" animate="animate">
            <InputField
              label="Years of Experience"
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

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
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

        <motion.div custom={5} variants={fieldVariants} initial="initial" animate="animate">
          <InputField
            label="Current Annual Salary"
            value={currentSalary}
            onChange={setCurrentSalary}
            type="number"
            placeholder="85,000"
            prefix="$"
          />
        </motion.div>

        <motion.div
          custom={6}
          variants={fieldVariants}
          initial="initial"
          animate="animate"
          className="pt-1 sm:pt-2"
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-sm sm:text-base"
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.4 }}
          >
            <span className="flex items-center justify-center gap-2">
              Analyze My Salary
              <motion.span
                animate={isValid ? { x: [0, 4, 0] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </span>
          </Button>
        </motion.div>
      </form>
    </GlassCard>
  );
}
