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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative font-medium rounded-xl transition-all duration-200 cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-accent/50",
        variant === "primary" &&
          "bg-gradient-to-r from-accent to-accent-blue text-white shadow-lg shadow-accent/20 hover:shadow-accent/30",
        variant === "secondary" &&
          "glass glass-hover text-foreground",
        variant === "ghost" &&
          "bg-transparent text-muted hover:text-foreground",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
