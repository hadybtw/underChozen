"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  glow?: boolean;
  elevated?: boolean;
  role?: string;
  "aria-label"?: string;
}

export function GlassCard({
  className,
  glow,
  elevated,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-5 sm:p-6 card-3d",
        elevated ? "glass-elevated" : "glass",
        glow && "glow-accent",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
