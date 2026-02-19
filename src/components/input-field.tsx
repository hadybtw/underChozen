"use client";

import { cn } from "@/lib/utils";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
  className?: string;
}

export function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
  className,
}: InputFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 sm:gap-2", className)}>
      <label className="text-xs sm:text-sm text-muted font-medium">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full glass rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-foreground bg-transparent",
            "focus:outline-none focus:ring-2 focus:ring-accent/50",
            "placeholder:text-muted/50",
            prefix && "pl-7 sm:pl-8"
          )}
        />
      </div>
    </div>
  );
}
