import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib";
import { getAuthContext } from "@/lib";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const auth = await getAuthContext();
  if (!auth.success) {
    return NextResponse.json({ error: auth.message }, { status: 401 });
  }

  const { taskId } = await params;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        taskId,
        parentId: null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            _count: {
              select: { replies: true },
            },
          },
          orderBy: { createdAt: "asc" },
        },
        _count: {
          select: { replies: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
