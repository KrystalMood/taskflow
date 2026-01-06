"use client";

import { useQuery } from "@tanstack/react-query";

export const dashboardKeys = {
  stats: ["dashboard", "stats"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats,
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      return data.data;
    },
    staleTime: 30 * 1000,
  });
}
