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
  id?: string;
}

export function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
  className,
  id,
}: InputFieldProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={inputId} className="info-label">
        {label}
      </label>
      <div className="relative group">
        {prefix && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/50 text-sm font-medium" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={label}
          className={cn(
            "w-full rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-foreground/90",
            "border border-white/[0.07]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 transition-all duration-300",
            "placeholder:text-muted/35",
            "group-hover:border-white/[0.12] group-hover:bg-white/[0.04]",
            prefix && "pl-7 sm:pl-8"
          )}
        />
      </div>
    </div>
  );
}
