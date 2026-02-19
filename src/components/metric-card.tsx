"use client";

import { cn } from "@/lib/utils";
import { GlassCard } from "./glass-card";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  icon?: ReactNode;
  accent?: "default" | "negative" | "positive";
  delay?: number;
  className?: string;
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => {
    const abs = Math.abs(Math.round(v));
    const formatted = abs.toLocaleString("en-US");
    const sign = v < 0 ? "-" : "";
    return `${sign}${prefix}${formatted}${suffix}`;
  });
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    const controls = animate(motionVal, value, {
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    return () => {
      unsub();
      controls.stop();
    };
  }, [value, motionVal, rounded]);

  return <span>{display}</span>;
}

export function MetricCard({
  label,
  value,
  numericValue,
  prefix,
  suffix,
  icon,
  accent = "default",
  delay = 0,
  className,
}: MetricCardProps) {
  return (
    <GlassCard
      className={cn(
        "group relative overflow-hidden transition-all duration-500",
        className
      )}
      initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Hover glow */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl",
          accent === "negative" && "bg-gradient-to-b from-negative/5 to-transparent",
          accent === "positive" && "bg-gradient-to-b from-positive/5 to-transparent",
          accent === "default" && "bg-gradient-to-b from-accent/5 to-transparent"
        )}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          {icon && (
            <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
              {icon}
            </div>
          )}
          <p className="text-xs font-medium tracking-wide uppercase text-muted">
            {label}
          </p>
        </div>
        <p
          className={cn(
            "text-2xl md:text-3xl font-bold tracking-tight",
            accent === "negative" && "text-negative",
            accent === "positive" && "text-positive"
          )}
        >
          {numericValue !== undefined ? (
            <AnimatedNumber
              value={numericValue}
              prefix={prefix}
              suffix={suffix}
            />
          ) : (
            value
          )}
        </p>
      </div>
    </GlassCard>
  );
}
