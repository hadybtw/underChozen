"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("");

  // Parse the numeric part and the prefix/suffix
  const match = value.match(/^([^0-9]*)([0-9]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numericTarget = parseInt(match?.[2] ?? "0", 10);
  const suffix = match?.[3] ?? "";

  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => {
    return `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`;
  });

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      animate(motionVal, numericTarget, {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
      });
    }
  }, [isInView, numericTarget, motionVal]);

  return (
    <span ref={ref} className={className}>
      {display || value}
    </span>
  );
}
