import { PageHeader } from "@/components/layout";
import { CreateProjectForm } from "@/components/projects";
import { Breadcrumb } from "@/components/ui";
import { requireAuth } from "@/lib";

export default async function NewProjectPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Projects", href: "/dashboard/projects" },
          { label: "Create New", active: true },
        ]}
      />
      <PageHeader
        title="Create Project"
        description="Launch a new initiative."
      />
      <div className="max-w-2xl">
        <CreateProjectForm />
      </div>
    </div>
  );
}
