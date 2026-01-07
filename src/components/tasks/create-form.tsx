"use client";

import { useCreateTask } from "@/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Select,
  Button,
} from "@/components/ui";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/providers";

interface CreateTaskFormProps {
  projects: { id: string; name: string; color: string | null }[];
}

export function CreateTaskForm({ projects }: CreateTaskFormProps) {
  const router = useRouter();
  const toast = useToast();
  const createTask = useCreateTask();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    createTask.mutate(formData, {
      onSuccess: () => {
        toast.success("Task created!", "Your new task has been added");
        router.push("/dashboard/tasks");
      },
      onError: (error) => {
        toast.error("Failed to create task", error.message);
        setError(error.message);
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
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
            placeholder="What needs to be done?"
            required
          />

          <Textarea
            name="description"
            label="Description"
            placeholder="Add more details..."
            rows={2}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              name="projectId"
              label="Project"
              options={projects.map((p) => ({
                value: p.id,
                label: p.name,
              }))}
            />

            <Select
              name="priority"
              label="Priority"
              defaultValue="MEDIUM"
              options={[
                { value: "LOW", label: "Low" },
                { value: "MEDIUM", label: "Medium" },
                { value: "HIGH", label: "High" },
                { value: "URGENT", label: "Urgent" },
              ]}
            />
          </div>

          <Input name="dueDate" label="Due Date" type="date" />

          <Button className="w-full" disabled={createTask.isPending}>
            {createTask.isPending ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
