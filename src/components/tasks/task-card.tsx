"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { useTransition } from "react";
import { Calendar, ExternalLink, Trash2 } from "lucide-react";
import { deleteTask } from "@/actions/task";
import Link from "next/link";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: Date | null;
    project: {
      name: string;
      color: string | null;
    };
  };
}

const statusConfig = {
  TODO: { label: "To Do", variant: "default" as const },
  IN_PROGRESS: { label: "In Progress", variant: "info" as const },
  DONE: { label: "Done", variant: "success" as const },
  CANCELLED: { label: "Cancelled", variant: "danger" as const },
};

const priorityConfig = {
  LOW: { label: "Low", variant: "default" as const },
  MEDIUM: { label: "Medium", variant: "info" as const },
  HIGH: { label: "High", variant: "warning" as const },
  URGENT: { label: "Urgent", variant: "danger" as const },
};

export function TaskCard({ task }: TaskCardProps) {
  const [isPending, startTransition] = useTransition();

  const status =
    statusConfig[task.status as keyof typeof statusConfig] || statusConfig.TODO;

  const priority =
    priorityConfig[task.priority as keyof typeof priorityConfig] ||
    priorityConfig.MEDIUM;

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    startTransition(async () => {
      const result = await deleteTask(task.id);
      if (!result.success) {
        alert(result.message);
      }
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: task.project.color || "#6366f1" }}
            />
            <span className="text-brand-500 text-xs">{task.project.name}</span>
          </div>
          <CardTitle className="text-base">{task.title}</CardTitle>
        </div>
        <div>
          <Link href={`/dashboard/tasks/${task.id}`}>
            <Button variant="ghost" title="View Task" className="h-8 w-8 p-0">
              <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={isPending}
            title="Delete Task"
            className="h-8 w-8 p-0 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {task.description && (
          <p className="text-brand-500 mb-3 line-clamp-2 text-sm">
            {task.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant={priority.variant}>{priority.label}</Badge>
          </div>
          {task.dueDate && (
            <div className="text-brand-500 flex items-center gap-1 text-xs">
              <Calendar />
              {formatDate(new Date(task.dueDate))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
