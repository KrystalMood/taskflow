"use client";

import { ActionResult, updateProject } from "@/actions/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  Input,
  Textarea,
  ColorPicker,
  Select,
  SubmitButton,
} from "@/components/ui";
import { useActionState } from "react";

interface EditProjectFormProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    color: string | null;
    status: string;
  };
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const updateWithId = updateProject.bind(null, project.id);
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    updateWithId,
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
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
            name="name"
            label="Project Name"
            placeholder="My Awesome Project"
            defaultValue={project.name}
            error={
              state?.success === false
                ? state.fieldErrors?.name?.[0]
                : undefined
            }
          />

          <Textarea
            name="description"
            label="Description"
            placeholder="What is this project about?"
            rows={3}
            defaultValue={project.description || ""}
            error={
              state?.success === false
                ? state.fieldErrors?.description?.[0]
                : undefined
            }
          />

          <ColorPicker
            name="color"
            label="Color"
            defaultValue={project.color || "#6366f1"}
          />

          <Select
            name="status"
            label="Status"
            defaultValue={project.status}
            options={[
              { value: "ACTIVE", label: "Active" },
              { value: "COMPLETED", label: "Completed" },
              { value: "ARCHIVED", label: "Archived" },
            ]}
          />

          <SubmitButton className="w-full" pendingText="Saving...">
            Save Changes
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
