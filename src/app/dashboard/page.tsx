import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Breadcrumb,
} from "@/components/ui";
import { getDashboardStats } from "@/lib/stats";
import { PageHeader } from "@/components/layout";
import { requireAuth } from "@/lib";

export const metadata: Metadata = {
  title: "Dashboard - TaskFlow",
  description: "Your TaskFlow dashboard",
};

export default async function DashboardPage() {
  const session = await requireAuth();

  const stats = await getDashboardStats(session.user.id);
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Overview", active: true }]} />
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-accent-600 text-3xl font-bold">
              {stats.projectCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warning-500 text-3xl font-bold">
              {stats.totalTasks}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-success-500 text-3xl font-bold">
              {stats.tasksByStatus.IN_PROGRESS}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-brand-500 text-3xl font-bold">
              {stats.tasksByStatus.DONE}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentTasks.length > 0 ? (
            <ul className="space-y-2">
              {stats.recentTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: task.project.color || "#6366f1",
                    }}
                  />
                  <span className="text-brand-900">{task.title}</span>
                  <span className="text-brand-500 text-sm">
                    in {task.project.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-brand-500">No recent tasks yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
