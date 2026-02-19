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
      <label className="text-[11px] sm:text-xs text-muted/80 font-medium tracking-wide uppercase">
        {label}
      </label>
      <div className="relative group">
        {prefix && (
          <span className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-muted/60 text-sm font-medium">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-foreground",
            "bg-white/[0.03] border border-white/[0.08]",
            "focus:outline-none focus:bg-white/[0.05] transition-all duration-300",
            "placeholder:text-muted/30",
            "group-hover:border-white/12 group-hover:bg-white/[0.04]",
            prefix && "pl-7 sm:pl-8"
          )}
        />
      </div>
    </div>
  );
}
