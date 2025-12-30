"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-brand-700 mb-1 block text-sm font-medium"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "border-brand-300 text-brand-900 w-full rounded-md border px-3 py-2",
            "focus:ring-accent-500 focus:ring-2 focus:outline-none",
            "placeholder:text-brand-400",
            "disabled:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-danger-500 focus:ring-danger-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-danger-500 mt-1 text-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
