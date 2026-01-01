"use server";

import { checkOwnership, getAuthContext, prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/lib/validations/project";

export type ActionResult =
  | { success: true; message?: string }
  | { success: false; message: string; fieldErrors?: Record<string, string[]> };

export async function createProject(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const authResult = await getAuthContext();
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }

  const rawData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    color: (formData.get("color") as string) || "#6366f1",
  };

  const result = createProjectSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { name, description, color } = result.data;

  try {
    await prisma.project.create({
      data: {
        name,
        description: description || null,
        color,
        userId: authResult.userId,
      },
    });

    revalidatePath("/dashboard/projects");
    return { success: true, message: "Project created successfully" };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, message: "Failed to create project" };
  }
}

export async function updateProject(
  id: string,
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const authResult = await getAuthContext();
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }

  const existing = await prisma.project.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!checkOwnership(existing, authResult.userId)) {
    return { success: false, message: "Project not found or access denied." };
  }

  const rawData = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    color: (formData.get("color") as string) || "#6366f1",
    status: formData.get("status") as string | undefined,
  };

  const cleanData = Object.fromEntries(
    Object.entries(rawData).filter(([, v]) => v !== undefined && v !== "")
  );

  const result = updateProjectSchema.safeParse(cleanData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.project.update({
      where: { id },
      data: result.data,
    });

    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${id}`);
    return { success: true, message: "Project updated successfully" };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, message: "Failed to update project" };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const authResult = await getAuthContext();
  if (!authResult.success) {
    return { success: false, message: authResult.message };
  }

  const project = await prisma.project.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!checkOwnership(project, authResult.userId)) {
    return { success: false, message: "You don't own this project" };
  }

  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/dashboard/projects");
    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, message: "Failed to delete project" };
  }
}
