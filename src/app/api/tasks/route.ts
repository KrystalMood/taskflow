import { prisma, requireAuth } from "@/lib";
import { TaskStatus } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        ...(status && status !== "ALL" ? { status: status as TaskStatus } : {}),
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: {
        project: {
          select: {
            name: true,
            color: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch tasks: " + error },
      { status: 500 }
    );
  }
}
