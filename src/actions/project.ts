"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib";
import { revalidatePath } from "next/cache";

export type ActionResult =
  | { success: true; message?: string }
  | { success: false; message: string };

export async function createProject(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const color = (formData.get("color") as string) || "#6366f1";

  if (!name || name.trim().length < 2) {
    return {
      success: false,
      message: "Name must be at least 2 characters long",
    };
  }

  if (name.length > 100) {
    return {
      success: false,
      message: "Name must be at most 100 characters long",
    };
  }

  try {
    await prisma.project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
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
