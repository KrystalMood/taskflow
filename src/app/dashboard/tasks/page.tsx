import { PageHeader } from "@/components/layout";
import { Metadata } from "next";
import { requireAuth } from "@/lib/auth-helpers";
import { Button } from "@/components/ui";
import Link from "next/link";
import { TaskListClient } from "@/components/tasks";
import { Breadcrumb } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tasks - TaskFlow",
  description: "Your TaskFlow tasks",
};

export default async function TasksPage() {
  const session = await requireAuth();

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Tasks", active: true }]} />
      <PageHeader
        title="Tasks"
        description="Manage and track your tasks across all projects."
      >
        <Link href="/dashboard/tasks/new">
          <Button>New Task</Button>
        </Link>
      </PageHeader>

      <TaskListClient />
    </div>
  );
}
