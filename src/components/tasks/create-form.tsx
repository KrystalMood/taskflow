"use client";

import { ActionResult, createTask } from "@/actions/task";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Select,
  SubmitButton,
} from "@/components/ui";
import { useActionState } from "react";

interface CreateTaskFormProps {
  projects: { id: string; name: string; color: string | null }[];
}

export function CreateTaskForm({ projects }: CreateTaskFormProps) {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    createTask,
    null
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.success === false && !state.fieldErrors && (
            <div className="bg-danger-50 text-danger-600 rounded-md p-3 text-sm">
              {state.message}
            </div>
          )}

          {state?.success === true && (
            <div className="bg-success-50 text-success-600 rounded-md p-3 text-sm">
              {state.message}
            </div>
          )}

          <Input
            name="title"
            label="Task Title"
            placeholder="What needs to be done?"
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
            rows={2}
            error={
              state?.success === false
                ? state.fieldErrors?.description?.[0]
                : undefined
            }
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              name="projectId"
              label="Project"
              options={projects.map((p) => ({
                value: p.id,
                label: p.name,
              }))}
              error={
                state?.success === false
                  ? state.fieldErrors?.projectId?.[0]
                  : undefined
              }
            />

            <Select
              name="priority"
              label="Priority"
              defaultValue="MEDIUM"
              options={[
                { value: "LOW", label: "low" },
                { value: "MEDIUM", label: "medium" },
                { value: "HIGH", label: "high" },
                { value: "URGENT", label: "urgent" },
              ]}
            />
          </div>

          <Input
            name="dueDate"
            label="Due Date"
            type="date"
            error={
              state?.success === false
                ? state.fieldErrors?.dueDate?.[0]
                : undefined
            }
          />

          <SubmitButton className="w-full" pendingText="Creating...">
            Create Task
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
