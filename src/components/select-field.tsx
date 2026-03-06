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
  id?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
  id,
}: SelectFieldProps) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={selectId} className="info-label">
        {label}
      </label>
      <div className="relative group">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className={cn(
            "w-full rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-foreground/90",
            "border border-white/[0.07]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-300",
            "appearance-none cursor-pointer pr-9",
            "group-hover:border-white/[0.12] group-hover:bg-white/[0.04]",
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
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted/45 pointer-events-none" />
      </div>
    </div>
  );
}
