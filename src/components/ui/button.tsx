import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors",
          "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-accent-600 hover:bg-accent-700 focus-visible:ring-accent-500 text-white":
              variant === "primary",

            "bg-brand-100 text-brand-900 hover:bg-brand-200 focus-visible:ring-brand-500":
              variant === "secondary",

            "bg-danger-600 hover:bg-danger-500 focus-visible:ring-danger-500 text-white":
              variant === "danger",

            "text-brand-600 hover:bg-brand-100 hover:text-brand-900":
              variant === "ghost",
          },

          {
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },

          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
