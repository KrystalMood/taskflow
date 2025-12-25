import { Button } from "@/components/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";

import { Task, TaskStatus, TaskPriority } from "@/types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Learn TypeScript",
    description: "Complete Module 03 of Next.js Mastery PBL",
    status: "completed",
    priority: "high",
    projectId: "project-1",
  },
  {
    id: "2",
    title: "Master Tailwind CSS",
    description: "Complete Module 04 styling exercises",
    status: "in-progress",
    priority: "high",
    projectId: "project-1",
  },
  {
    id: "3",
    title: "Build TaskFlow MVP",
    description: "Create the initial version of TaskFlow",
    status: "todo",
    priority: "medium",
    projectId: "project-1",
  },
];

function getStatusStyles(status: TaskStatus) {
  const styles: Record<TaskStatus, string> = {
    todo: "bg-brand-100 text-brand-800",
    "in-progress": "bg-accent-100 text-accent-800",
    completed: "bg-success-50 text-success-600",
  };

  return styles[status];
}

function getPriorityStyles(priority: TaskPriority) {
  const styles: Record<TaskPriority, string> = {
    low: "bg-brand-100 text-brand-600",
    medium: "bg-warning-50 text-warning-600",
    high: "bg-danger-50 text-danger-600",
  };
  return styles[priority];
}

export default function Home() {
  return (
    <main className="bg-brand-50 min-h-screen">
      {/* Hero Section */}
      <section className="border-brand-200 border-b bg-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-brand-900 text-4xl font-bold md:text-5xl">
            Task<span className="text-accent-600">Flow</span>
          </h1>
          <p className="text-brand-600 mx-auto mt-4 max-w-2xl text-lg">
            Task Management SaaS untuk tim modern. Kelola proyek dan tugas
            dengan efisien.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="secondary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Task Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-brand-900 mb-8 text-2xl font-bold">Task Preview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{task.title}</CardTitle>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${getPriorityStyles(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
                <CardDescription>{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${getStatusStyles(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
