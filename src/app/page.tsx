import { Task, TaskStatus, TaskPriority } from "@/types";

const mockTask: Task = {
  id: "1",
  title: "Learn TypeScript",
  description: "Complete Module 03 of Next.js Mastery PBL",
  status: "in-progress",
  priority: "high",
  projectId: "project-1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

function getStatusColor(status: TaskStatus): string {
  const colors: Record<TaskStatus, string> = {
    todo: "text-gray-600",
    "in-progress": "text-blue-600",
    completed: "text-green-600",
  };

  return colors[status];
}

function getPriorityBadge(priority: TaskPriority): string {
  const badges: Record<TaskPriority, string> = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return badges[priority];
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">TaskFlow</h1>
      <p className="mt-4 text-gray-600">Task Management SaaS - Coming Soon</p>

      {/* Demo */}
      <div className="mt-8 max-w-md rounded-lg border p-4">
        <h2 className="font-semibold">{mockTask.title}</h2>
        <p className="text-sm text-gray-500">{mockTask.description}</p>
        <div className="mt-2 flex gap-2">
          <span className={`text-sm ${getStatusColor(mockTask.status)}`}>
            {mockTask.status}
          </span>
          <span
            className={`rounded px-2 py-1 text-xs ${getPriorityBadge(mockTask.priority)}`}
          >
            {mockTask.priority}
          </span>
        </div>
      </div>
    </main>
  );
}
