import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export function Select({
  label,
  error,
  options,
  className,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && (
        <label className="text-brand-700 mb-1.5 block text-sm font-medium">
          {label}
        </label>
      )}

      <select
        className={cn(
          "border-brand-300 text-brand-900 w-full rounded-lg border bg-white px-4 py-2.5",
          "focus:border-accent-500 focus:ring-accent-500/20 focus:ring-2",
          error && "border-danger-500",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-danger-600 mt-1 text-sm">{error}</p>}
    </div>
  );
}
