import { requireAuth } from "@/lib";
import { Metadata } from "next";
import { Breadcrumb, Button } from "@/components/ui";
import { PageHeader } from "@/components/layout";
import { ProjectListClient } from "@/components/projects/project-list-client";
import Link from "next/link";

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
        description="Manage and track your projects."
      >
        <Link href="/dashboard/projects/new">
          <Button>New Project</Button>
        </Link>
      </PageHeader>

      <ProjectListClient />
    </div>
  );
}
