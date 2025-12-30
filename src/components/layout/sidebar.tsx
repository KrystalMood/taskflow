"use client";

import { CheckSquare, Folder, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/projects", label: "Projects", icon: Folder },
  { href: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <nav className="border-brand-200 sticky top-4 rounded-lg border bg-white p-4">
        <h2 className="text-brand-900 mb-4 font-semibold">Dashboard</h2>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-accent-100 text-accent-600 font-medium"
                      : "text-brand-600 hover:bg-brand-100"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
