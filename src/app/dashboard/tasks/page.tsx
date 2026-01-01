import { PageHeader } from "@/components/layout";
import { CreateTaskForm, TaskCard } from "@/components/tasks";
import { prisma } from "@/lib";
import { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";

export const metadata: Metadata = {
  title: "Tasks - TaskFlow",
  description: "Your TaskFlow tasks",
};

export default async function TasksPage() {
  const session = await requireAuth();

  const [tasks, projects] = await Promise.all([
    prisma.task.findMany({
      where: { userId: session.user.id },
      include: {
        project: {
          select: { name: true, color: true },
        },
      },
      orderBy: [{ status: "asc" }, { priority: "desc" }, { createdAt: "desc" }],
    }),
    prisma.project.findMany({
      where: { userId: session.user.id, status: "ACTIVE" },
      select: { id: true, name: true, color: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div>
      <CreateTaskForm projects={projects} />
      <PageHeader title="Tasks" description="All your tasks across projects" />
      {tasks.length === 0 ? (
        <div className="text-brand-500 py-16 text-center">
          <p>No tasks yet. Create your first tasks!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
