import { cn } from "@/lib/utils";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        "flex items-center space-x-2 text-sm text-gray-500",
        className
      )}
    >
      <Link
        href={"/dashboard"}
        className="hover:text-brand-600 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-brand-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                "font-medium text-gray-900",
                item.active && "text-brand-600"
              )}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
