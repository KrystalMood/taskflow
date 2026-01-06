"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabaseBrowser } from "@/lib/supabase-client";
import { projectKeys } from "@/hooks/use-projects";

interface UseRealtimeProjectsOptions {
  userId?: string;
  enabled?: boolean;
}

export function useRealtimeProjects(options: UseRealtimeProjectsOptions = {}) {
  const { userId, enabled = true } = options;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const channelName = userId
      ? `projects-realtime-${userId}`
      : `projects-realtime-all`;

    const channel = supabaseBrowser.channel(channelName).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Project",
        ...(userId && { filter: `userId=eq.${userId}` }),
      },
      (payload) => {
        console.log("Project event:", payload.eventType, payload);
        queryClient.invalidateQueries({ queryKey: projectKeys.all });
      }
    )
    .subscribe((status) => {
      console.log("Subscription status:", status);
    });

    return () => {
      console.log("Unsubscribing from projects realtime");
      supabaseBrowser.removeChannel(channel);
    };
  }, [userId, enabled, queryClient]);
}
