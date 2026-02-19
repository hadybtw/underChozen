"use client";

import { cn } from "@/lib/utils";

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
      <label className="text-xs sm:text-sm text-muted font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "glass rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-accent/50",
          "appearance-none cursor-pointer",
          !value && "text-muted"
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
    </div>
  );
}
