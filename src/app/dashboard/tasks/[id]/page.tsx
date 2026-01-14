import { prisma, requireAuth } from "@/lib";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout";
import { Breadcrumb, Badge } from "@/components/ui";
import { EditTaskForm } from "@/components/tasks";
import { CommentList } from "@/components/comments";

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
  const session = await requireAuth();

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
      <Breadcrumb
        items={[
          { label: "Tasks", href: "/dashboard/tasks" },
          { label: task.title, active: true },
        ]}
      />
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
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EditTaskForm task={task} />
        </div>
        <div className="h-fit space-y-4">
          <CommentList taskId={task.id} />
        </div>
      </div>
    </div>
  );
}
