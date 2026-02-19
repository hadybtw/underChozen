"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative font-semibold rounded-xl transition-all duration-300 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background",
        variant === "primary" &&
          "bg-gradient-to-r from-accent to-accent-blue text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:brightness-110",
        variant === "secondary" &&
          "glass glass-hover text-foreground hover:border-white/15",
        variant === "ghost" &&
          "bg-transparent text-muted hover:text-foreground hover:bg-white/5",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-3.5 text-base",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
