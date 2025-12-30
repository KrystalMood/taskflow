"use client";

import { useActionState } from "react";
import { createProject, ActionResult } from "@/actions/project";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  SubmitButton,
} from "@/components/ui";
import { ColorPicker } from "@/components/ui/color-picker";

export function CreateProjectForm() {
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    createProject,
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state?.success === false && (
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
            name="name"
            label="Project Name *"
            placeholder="My Awesome Project"
            required
          />

          <Textarea
            name="description"
            label="Description"
            placeholder="What is this project about?"
            rows={3}
          />

          <ColorPicker name="color" label="Color" defaultValue="#6366f1" />

          <SubmitButton className="w-full" pendingText="Creating...">
            Create Project
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
