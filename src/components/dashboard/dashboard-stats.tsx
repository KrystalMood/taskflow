"use client";
import { useDashboardStats, useRealtimeDashboard } from "@/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

interface RecentTask {
  id: string;
  title: string;
  project: {
    name: string;
    color: string | null;
  };
}

export function DashboardStats() {
  useRealtimeDashboard();
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-brand-100 h-24 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-danger-500">Failed to load stats</div>;
  }

  return (
    <>
      <div className="text-brand-500 mb-4 flex items-center gap-2 text-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        Live updates enabled
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warning-500 text-3xl font-bold">
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
          {" "}
          {stats.recentTasks.length > 0 ? (
            <ul className="space-y-2">
              {stats.recentTasks.map((task: RecentTask) => (
                <li key={task.id} className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: task.project.color || "#6366f1" }}
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
    </>
  );
}
