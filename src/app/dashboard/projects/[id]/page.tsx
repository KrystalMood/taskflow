import Link from "next/link";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib";
import { EditProjectForm } from "@/components/projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

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

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/projects">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Button>
        </Link>
      </div>

      <PageHeader
        title={project.name}
        description={project.description || "No description"}
      >
        <div
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: project.color || "#6366f1" }}
        />
      </PageHeader>

      <div>
        <EditProjectForm project={project} />
      </div>
    </div>
  );
}
