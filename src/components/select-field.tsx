"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
}: SelectFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 sm:gap-2", className)}>
      <label className="text-[11px] sm:text-xs text-muted/80 font-medium tracking-wide uppercase">
        {label}
      </label>
      <div className="relative group">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-foreground",
            "bg-white/[0.03] border border-white/[0.08]",
            "focus:outline-none focus:bg-white/[0.05] transition-all duration-300",
            "appearance-none cursor-pointer pr-9",
            "group-hover:border-white/12 group-hover:bg-white/[0.04]",
            !value && "text-muted/40"
          )}
        >
          <option value="" disabled className="bg-background text-muted">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-background text-foreground">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40 pointer-events-none" />
      </div>
    </div>
  );
}
