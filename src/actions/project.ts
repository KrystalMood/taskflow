"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { createProjectSchema } from "@/lib/validations/project";

export type ActionResult =
  | { success: true; message?: string }
  | { success: false; message: string; fieldErrors?: Record<string, string[]> };

export async function createProject(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in" };
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
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard/projects");
    return { success: true, message: "Project created successfully" };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, message: "Failed to create project" };
  }
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in" };
  }

  const project = await prisma.project.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!project) {
    return { success: false, message: "Project not found" };
  }

  if (project.userId !== session.user.id) {
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
