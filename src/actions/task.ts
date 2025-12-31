"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { createTaskSchema, updateTaskSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export type ActionResult =
  | { success: true; message?: string }
  | { success: false; message: string; fieldErrors?: Record<string, string[]> };

export async function createTask(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in" };
  }

  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    projectId: formData.get("projectId") as string,
    priority: formData.get("priority") as string,
    dueDate: formData.get("dueDate") as string,
  };

  const result = createTaskSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Invalid input",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { title, description, projectId, priority, dueDate } = result.data;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: session.user.id,
    },
  });

  if (!project) {
    return {
      success: false,
      message: "Project not found or access denied.",
    };
  }

  try {
    await prisma.task.create({
      data: {
        title,
        description: description || null,
        projectId,
        userId: session.user.id,
        priority: priority as "LOW" | "MEDIUM" | "HIGH" | "URGENT",
        dueDate: dueDate || null,
      },
    });

    revalidatePath("/dashboard/tasks");
    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath("/dashboard");
    return { success: true, message: "Task created successfully" };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, message: "Failed to create task" };
  }
}

export async function updateTask(
  id: string,
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in" };
  }

  const existing = await prisma.task.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!existing) {
    return {
      success: false,
      message: "Task not found or access denied.",
    };
  }

  const rawData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    projectId: formData.get("projectId") as string,
    priority: formData.get("priority") as string,
    dueDate: formData.get("dueDate") as string,
  };

  const cleanData = Object.fromEntries(
    Object.entries(rawData).filter(([_, v]) => v !== undefined && v !== "")
  );

  const result = updateTaskSchema.safeParse(cleanData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.task.update({
      where: { id },
      data: result.data,
    });

    revalidatePath("/dashboard/tasks");
    revalidatePath(`/dashboard/tasks/${id}`);
    revalidatePath(`/dashboard/projects/${existing.projectId}`);
    revalidatePath("/dashboard");
    return { success: true, message: "Task updated successfully" };
  } catch (error) {
    console.error("Failed to update task:", error);
    return { success: false, message: "Failed to update task" };
  }
}

export async function deleteTask(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in" };
  }

  const task = await prisma.task.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!task) {
    return { success: false, message: "Task not found" };
  }

  try {
    await prisma.task.delete({ where: { id } });

    revalidatePath("/dashboard/tasks");
    revalidatePath(`/dashboard/projects/${task.projectId}`);
    revalidatePath("/dashboard");
    return { success: true, message: "Task deleted successfully" };
  } catch (error) {
    console.error("Failed to delete task:", error);
    return { success: false, message: "Failed to delete task" };
  }
}
