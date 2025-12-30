"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-brand-700 mb-1 block text-sm font-medium">
            {label}
          </label>
        )}
        <div className="flex items-center gap-3">
          <input
            ref={ref}
            type="color"
            className={cn(
              "h-10 w-14 cursor-pointer rounded border-0",
              className
            )}
            {...props}
          />
          <span className="text-brand-500 text-sm">Choose a color</span>
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
