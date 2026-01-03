import {
  createProject as createProjectAction,
  updateProject as updateProjectAction,
  deleteProject as deleteProjectAction,
} from "@/actions/project";
import { Project } from "@/generated/prisma/client";
import { ApiResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters: string) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

type ProjectWithCount = Project & {
  _count: { tasks: number };
};

export function useProjects(search?: string) {
  return useQuery({
    queryKey: projectKeys.list(search || ""),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const res = await fetch(`/api/projects?${params.toString()}`);
      const data: ApiResponse<ProjectWithCount[]> = await res.json();

      if (!data.success) {
        throw new Error("error" in data ? data.error : "Failed");
      }

      return data.data;
    },
    staleTime: 60 * 1000,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createProjectAction(null, formData);

      if (!result.success) throw new Error(result.message);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}

export function useUpdateProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await updateProjectAction(projectId, null, formData);

      if (!result.success) throw new Error(result.message);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const result = await deleteProjectAction(projectId);

      if (!result.success) throw new Error(result.message);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
}
