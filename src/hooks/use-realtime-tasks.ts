"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabaseBrowser } from "@/lib/supabase-client";
import { taskKeys } from "@/hooks/use-tasks";

interface UseRealtimeTasksOptions {
  userId?: string;
  enabled?: boolean;
}

export function useRealtimeTasks(options: UseRealtimeTasksOptions = {}) {
  const { userId, enabled = true } = options;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const channelName = userId
      ? `tasks-realtime-${userId}`
      : "tasks-realtime-all";

    const channel = supabaseBrowser
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Task",
          ...(userId && { filter: `userId=eq.${userId}` }),
        },
        (payload) => {
          console.log("Realtime event:", payload.eventType, payload);
          queryClient.invalidateQueries({ queryKey: taskKeys.all });
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Unsubscribing from tasks realtime");
      supabaseBrowser.removeChannel(channel);
    };
  }, [userId, enabled, queryClient]);
}
