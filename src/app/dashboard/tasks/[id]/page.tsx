import { auth } from "@/auth";
import { prisma } from "@/lib";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { PageHeader } from "@/components/layout";
import { EditTaskForm } from "@/components/tasks";

const statusConfig = {
  TODO: { label: "To Do", variant: "default" as const },
  IN_PROGRESS: { label: "In Progress", variant: "info" as const },
  DONE: { label: "Done", variant: "success" as const },
  CANCELLED: { label: "Cancelled", variant: "danger" as const },
};
export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      project: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  });

  if (!task) {
    notFound();
  }

  if (task.userId !== session.user.id) {
    redirect("/dashboard/tasks");
  }

  const status = statusConfig[task.status as keyof typeof statusConfig];

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/tasks">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Button>
        </Link>
      </div>

      <PageHeader
        title={task.title}
        description={task.description || "No description"}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: task.project.color || "#6366f1" }}
          />
          <span className="text-brand-500 text-sm">{task.project.name}</span>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </PageHeader>

      <div className="max-w-2xl">
        <EditTaskForm task={task} />
      </div>
    </div>
  );
}
