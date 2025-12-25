import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Learn TypeScript",
    description: "Complete Module 03",
    status: "completed",
    priority: "high",
    projectId: "project-1",
  },
  {
    id: "2",
    title: "Master Tailwind CSS",
    description: "Complete Module 04",
    status: "in-progress",
    priority: "high",
    projectId: "project-1",
  },
];

// GET /api/tasks
export async function GET() {
  return NextResponse.json({ data: mockTasks });
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  const body = await request.json();

  const newTask: Task = {
    id: Date.now().toString(),
    ...body,
  };

  mockTasks.push(newTask);

  return NextResponse.json({ data: newTask }, { status: 201 });
}
