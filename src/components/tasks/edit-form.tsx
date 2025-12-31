"use client";
import { ActionResult } from "@/actions/project";
import { updateTask } from "@/actions/task";
import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  SubmitButton,
} from "@/components/ui";
import { Input, Textarea, ColorPicker, Select } from "@/components/ui";

interface EditTaskFormProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    dueDate: Date | null;
  };
}

export function EditTaskForm({ task }: EditTaskFormProps) {
  const updateWithId = updateTask.bind(null, task.id);
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    updateWithId,
    null
  );

  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.success === false && !state.fieldErrors && (
            <div className="bg-danger-50 text-danger-600 rounded-md p-3 text-sm">
              {state.message}
            </div>
          )}

          {state?.success && (
            <div className="bg-success-50 text-success-600 rounded-md p-3 text-sm">
              {state.message}
            </div>
          )}

          <Input
            name="title"
            label="Task Title"
            placeholder="What needs to be done?"
            defaultValue={task.title}
            error={
              state?.success === false
                ? state.fieldErrors?.title?.[0]
                : undefined
            }
          />

          <Textarea
            name="description"
            label="Description"
            placeholder="Add more details..."
            rows={3}
            defaultValue={task.description || ""}
            error={
              state?.success === false
                ? state.fieldErrors?.description?.[0]
                : undefined
            }
          />

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
            defaultValue={formatDateForInput(task.dueDate)}
            error={
              state?.success === false
                ? state.fieldErrors?.dueDate?.[0]
                : undefined
            }
          />

          <SubmitButton className="w-full" pendingText="Saving...">
            Save Changes
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
