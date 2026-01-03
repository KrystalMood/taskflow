import { requireAuth } from "@/lib";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
import { PageHeader } from "@/components/layout";
import { ProjectListClient } from "@/components/projects/project-list-client";

export const metadata: Metadata = {
  title: "Projects - TaskFlow",
  description: "Your TaskFlow projects",
};

export default async function ProjectsPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Projects", active: true }]} />
      <PageHeader
        title="Projects"
        description="Manage and track your projects"
      />
      <ProjectListClient />
    </div>
  );
}
