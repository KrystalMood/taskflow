import { getDashboardStats, requireAuth } from "@/lib";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await requireAuth();
    const stats = await getDashboardStats(session.user.id);
    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
