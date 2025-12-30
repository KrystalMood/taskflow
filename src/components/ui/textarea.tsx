"use client";

import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-brand-700 mb-1 block text-sm font-medium"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "border-brand-300 text-brand-900 w-full rounded-md border px-3 py-2",
            "focus:ring-accent-500 focus:ring-2 focus:outline-none",
            "placeholder:text-brand-400",
            "disabled:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50",
            "min-h-[80px] resize-y",
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

Textarea.displayName = "Textarea";
