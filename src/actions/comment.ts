"use server";

import { prisma } from "@/lib";
import { getAuthContext } from "@/lib";
import { createCommentSchema, updateCommentSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export type CommentActionResult =
  | { success: true; message?: string }
  | { success: false; message: string };

export async function createComment(
  formData: FormData
): Promise<CommentActionResult> {
  const auth = await getAuthContext();
  if (!auth.success) {
    return { success: false, message: auth.message };
  }

  const rawData = {
    content: formData.get("content"),
    taskId: formData.get("taskId"),
    parentId: formData.get("parentId") || undefined,
  };

  const result = createCommentSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message || "Validation failed",
    };
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: result.data.taskId },
      select: { userId: true },
    });

    if (!task) {
      return {
        success: false,
        message: "Task not found",
      };
    }

    await prisma.comment.create({
      data: {
        content: result.data.content,
        taskId: result.data.taskId,
        userId: auth.userId,
        parentId: result.data.parentId,
      },
    });

    revalidatePath(`/dashboard/tasks/${result.data.taskId}`);
    return { success: true, message: "Comment created successfully" };
  } catch (error) {
    console.error("Failed to create comment:", error);
    return { success: false, message: "Failed to create comment" };
  }
}

export async function updateComment(
  commentId: string,
  formData: FormData
): Promise<CommentActionResult> {
  const auth = await getAuthContext();
  if (!auth.success) {
    return { success: false, message: auth.message };
  }

  const rawData = {
    content: formData.get("content"),
  };

  const result = updateCommentSchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message || "Validation failed",
    };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, taskId: true },
    });

    if (!comment) {
      return {
        success: false,
        message: "Comment not found",
      };
    }

    if (comment.userId !== auth.userId) {
      return { success: false, message: "Not authorized to edit this comment" };
    }

    await prisma.comment.update({
      where: { id: commentId },
      data: { content: result.data.content },
    });

    revalidatePath(`/dashboard/tasks/${comment.taskId}`);
    return { success: true, message: "Comment updated successfully" };
  } catch (error) {
    console.error("Failed to update comment:", error);
    return { success: false, message: "Failed to update comment" };
  }
}

export async function deleteComment(
  commentId: string
): Promise<CommentActionResult> {
  const auth = await getAuthContext();
  if (!auth.success) {
    return { success: false, message: auth.message };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true, taskId: true },
    });

    if (!comment) {
      return {
        success: false,
        message: "Comment not found",
      };
    }

    if (comment.userId !== auth.userId) {
      return {
        success: false,
        message: "Not authorized to delete this comment",
      };
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/dashboard/tasks/${comment.taskId}`);
    return { success: true, message: "Comment deleted successfully" };
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return { success: false, message: "Failed to delete comment" };
  }
}
