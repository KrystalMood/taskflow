"use client";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Input, Textarea, Select } from "@/components/ui";
import { useUpdateTask, useDeleteTask } from "@/hooks";
import { Task } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface EditTaskFormProps {
  task: Task & {
    project: { id: string; name: string; color: string | null } | null;
  };
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const router = useRouter();
  const updateTask = useUpdateTask(task.id);
  const deleteTask = useDeleteTask();
  const [error, setError] = useState<string | null>(null);

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toISOString().split("T")[0]
    : "";

  async function handleSubmit(formData: FormData) {
    setError(null);
    updateTask.mutate(formData, {
      onSuccess: () => {
        router.push("/dashboard/tasks");
        router.refresh();
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Edit Task</CardTitle>
        <Button
          type="button"
          variant="ghost"
          className="text-danger-600 hover:text-danger-700 hover:bg-danger-50 h-8 w-8 p-0"
          onClick={() => {
            if (confirm("Delete this task?")) {
              deleteTask.mutate(task.id, {
                onSuccess: () => router.push("/dashboard/tasks"),
              });
            }
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-danger-50 text-danger-600 rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          <Input
            name="title"
            label="Task Title"
            defaultValue={task.title}
            required
          />

          <Textarea
            name="description"
            label="Description"
            defaultValue={task.description || ""}
            rows={2}
          />

          <input type="hidden" name="projectId" value={task.projectId} />
          <input type="hidden" name="priority" value={task.priority} />

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              name="status"
              label="Status"
              defaultValue={task.status}
              options={[
                { value: "TODO", label: "To Do" },
                { value: "IN_PROGRESS", label: "In Progress" },
                { value: "DONE", label: "Done" },
                { value: "CANCELLED", label: "Cancelled" },
              ]}
            />

            <Select
              name="priority"
              label="Priority"
              defaultValue={task.priority}
              options={[
                { value: "LOW", label: "Low" },
                { value: "MEDIUM", label: "Medium" },
                { value: "HIGH", label: "High" },
                { value: "URGENT", label: "Urgent" },
              ]}
            />
          </div>

          <Input
            name="dueDate"
            label="Due Date"
            type="date"
            defaultValue={formattedDate}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button className="w-full" disabled={updateTask.isPending}>
              {updateTask.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
