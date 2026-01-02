import { PageHeader } from "@/components/layout";
import { CreateTaskForm } from "@/components/tasks";
import { prisma, requireAuth } from "@/lib";
import { Breadcrumb } from "@/components/ui";

export default async function NewTaskPage() {
  const session = await requireAuth();

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id, status: "ACTIVE" },
    select: { id: true, name: true, color: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Tasks", href: "/dashboard/tasks" },
          { label: "Create New", active: true },
        ]}
      />
      <PageHeader
        title="Create Task"
        description="Add a new task to your list."
      />
      <div className="max-w-2xl">
        <CreateTaskForm projects={projects} />
      </div>
    </div>
  );
}
