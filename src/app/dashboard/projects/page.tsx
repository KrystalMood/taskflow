import { prisma, requireAuth } from "@/lib";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import { ProjectCard, CreateProjectForm } from "@/components/projects";
import { PageHeader } from "@/components/layout";

export const metadata: Metadata = {
  title: "Projects - TaskFlow",
  description: "Your TaskFlow projects",
};

export default async function ProjectsPage() {
  const session = await requireAuth();

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { tasks: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <CreateProjectForm />
      <PageHeader title="Projects" description="Your TaskFlow projects">
        <Button>New Project</Button>
      </PageHeader>

      {projects.length === 0 ? (
        <div className="text-brand-500 py-16 text-center">
          <p>No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
