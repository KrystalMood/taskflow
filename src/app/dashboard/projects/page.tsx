import { auth } from "@/auth";
import { prisma } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";
import { ProjectCard } from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects - TaskFlow",
  description: "Your TaskFlow projects",
};

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

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
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-brand-900 text-2xl font-bold">Projects</h1>
        <Button>New Project</Button>
      </div>

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
