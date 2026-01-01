import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session;
}

export async function requireRole(role: string) {
  const session = await requireAuth();

  if (session.user.role !== role) {
    redirect("/dashboard");
  }

  return session;
}

export async function getSession() {
  return await auth();
}

export function checkOwnership<T extends { userId: string }>(
  resource: T | null,
  userId: string
): boolean {
  if (!resource) return false;

  return resource.userId === userId;
}

export type AuthResult =
  | { success: true; userId: string; role: string }
  | { success: false; message: string };

export async function getAuthContext(): Promise<AuthResult> {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "You must be logged in" };
  }

  return {
    success: true,
    userId: session.user.id,
    role: session.user.role || "USER",
  };
}
