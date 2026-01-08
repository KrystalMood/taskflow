"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask as createTaskAction,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
} from "@/actions/task";
import { TaskFilter } from "@/types";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | string | null;
  project: {
    name: string;
    color: string | null;
  } | null;
}

export const taskKeys = {
  all: ["tasks"] as const,
  filtered: (filter: TaskFilter) => ["tasks", filter] as const,
  detail: (id: string) => ["tasks", id] as const,
};

async function fetchTasks(filter: TaskFilter = {}): Promise<Task[]> {
  const params = new URLSearchParams();
  if (filter.status) params.set("status", filter.status);
  if (filter.search) params.set("search", filter.search);
  if (filter.sortBy) params.set("sortBy", filter.sortBy);
  if (filter.sortOrder) params.set("sortOrder", filter.sortOrder);

  const res = await fetch(`/api/tasks?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export function useTask(filter: TaskFilter = {}) {
  return useQuery({
    queryKey: taskKeys.filtered(filter),
    queryFn: () => fetchTasks(filter),
    staleTime: 30 * 1000,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createTaskAction(null, formData);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });
    },
  });
}

export function useUpdateTask(taskId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (FormData: FormData) => {
      const result = await updateTaskAction(taskId, null, FormData);

      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(taskId),
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const result = await deleteTaskAction(taskId);
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });
    },
  });
}
