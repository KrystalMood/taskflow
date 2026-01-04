import { PageHeader } from "@/components/layout";
import { notFound, redirect } from "next/navigation";
import { prisma, requireAuth } from "@/lib";
import { Breadcrumb, Badge } from "@/components/ui";
import { EditProjectForm } from "@/components/projects";

const statusConfig = {
  ACTIVE: { label: "Active", variant: "success" as const },
  ON_HOLD: { label: "On Hold", variant: "warning" as const },
  COMPLETED: { label: "Completed", variant: "info" as const },
  CANCELLED: { label: "Cancelled", variant: "danger" as const },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAuth();

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      _count: {
        select: { tasks: true },
      },
      tasks: {
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          status: true,
          priority: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  if (project.userId !== session.user.id) {
    redirect("/dashboard/projects");
  }

  const status = statusConfig[project.status as keyof typeof statusConfig];

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Projects", href: "/dashboard/projects" },
          { label: project.name, active: true },
        ]}
      />

      <PageHeader
        title={project.name}
        description={project.description || "No description"}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: project.color || "#6366f1" }}
          />
          <span className="text-brand-500 text-sm">
            {project._count.tasks} tasks
          </span>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </PageHeader>

      <div className="max-w-2xl">
        <EditProjectForm project={project} />
      </div>
    </div>
  );
}
