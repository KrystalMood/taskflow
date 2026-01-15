"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Calendar, ExternalLink, Trash2 } from "lucide-react";
import { useDeleteTask } from "@/hooks";
import Link from "next/link";
import { useToast } from "@/components/providers";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: Date | string | null;
    project: {
      name: string;
      color: string | null;
    } | null;
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
  const toast = useToast();
  const deleteTask = useDeleteTask();

  const status =
    statusConfig[task.status as keyof typeof statusConfig] || statusConfig.TODO;

  const priority =
    priorityConfig[task.priority as keyof typeof priorityConfig] ||
    priorityConfig.MEDIUM;

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Delete task?")) {
      deleteTask.mutate(task.id, {
        onSuccess: () => {
          toast.success("Task deleted!", "Your task has been deleted");
        },
      });
    }
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
              style={{ backgroundColor: task.project?.color || "#6366f1" }}
            />
            <span className="text-brand-500 text-xs">{task.project?.name}</span>
          </div>
          <CardTitle className="text-base">{task.title}</CardTitle>
        </div>
        <div>
          <Link href={`/dashboard/tasks/${task.id}`}>
            <Button variant="ghost" title="View Task" className="h-8 w-8 p-0">
              <ExternalLink className="text-brand-400 hover:text-brand-600 h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={deleteTask.isPending}
            title="Delete Task"
            className="hover:bg-danger-50 h-8 w-8 p-0"
          >
            <Trash2 className="text-brand-400 hover:text-danger-500 h-4 w-4" />
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
