"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabaseBrowser } from "@/lib/supabase-client";
import { dashboardKeys } from "@/hooks/use-dashboard-stats";

export function useRealtimeDashboard() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const taskChannel = supabaseBrowser
      .channel("dashboard-tasks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Task",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: dashboardKeys.stats });
        }
      )
      .subscribe();

    const projectChannel = supabaseBrowser
      .channel("dashboard-projects")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Project",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: dashboardKeys.stats });
        }
      )
      .subscribe();

    return () => {
      supabaseBrowser.removeChannel(taskChannel);
      supabaseBrowser.removeChannel(projectChannel);
    };
  }, [queryClient]);
}
