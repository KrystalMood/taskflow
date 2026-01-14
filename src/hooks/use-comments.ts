"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, updateComment, deleteComment } from "@/actions";

export interface CommentUser {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  taskId: string;
  parentId: string | null;
  user: CommentUser;
  replies?: Comment[];
  _count: {
    replies: number;
  };
}

async function fetchComments(taskId: string): Promise<Comment[]> {
  const response = await fetch(`/api/tasks/${taskId}/comments`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
}

export function useComments(taskId: string) {
  return useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => fetchComments(taskId),
    enabled: !!taskId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      content: string;
      taskId: string;
      parentId?: string;
    }) => {
      const formData = new FormData();
      formData.append("content", data.content);
      formData.append("taskId", data.taskId);
      if (data.parentId) {
        formData.append("parentId", data.parentId);
      }
      return createComment(formData);
    },
    onSuccess: (result, variables) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ["comments", variables.taskId],
        });
      }
    },
  });
}

export function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      content,
      taskId,
    }: {
      commentId: string;
      content: string;
      taskId: string;
    }) => {
      const formData = new FormData();
      formData.append("content", content);
      return updateComment(commentId, formData);
    },
    onSuccess: (result, variables) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ["comments", variables.taskId],
        });
      }
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commentId,
      taskId,
    }: {
      commentId: string;
      taskId: string;
    }) => {
      return deleteComment(commentId);
    },
    onSuccess: (result, variables) => {
      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: ["comments", variables.taskId],
        });
      }
    },
  });
}
