import { prisma, requireAuth } from "@/lib";
import { ProjectStatus } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await requireAuth();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const statusParam = searchParams.get("status");
    const status = statusParam as ProjectStatus | undefined;

    const projects = await prisma.project.findMany({
      where: {
        AND: [
          { userId: session.user.id },
          search
            ? {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          status ? { status } : {},
        ],
      },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects: " + error },
      { status: 500 }
    );
  }
}
