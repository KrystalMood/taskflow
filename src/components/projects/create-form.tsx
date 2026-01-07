"use client";

import { useCreateProject } from "@/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Textarea,
  Button,
} from "@/components/ui";
import { ColorPicker } from "@/components/ui/color-picker";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/providers";

export function CreateProjectForm() {
  const router = useRouter();
  const toast = useToast();
  const createProject = useCreateProject();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    createProject.mutate(formData, {
      onSuccess: () => {
        toast.success("Project created!", "Your new project has been added");
        router.push("/dashboard/projects");
      },
      onError: (err) => {
        toast.error("Failed to create project", err.message);
        setError(err.message);
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-danger-50 text-danger-600 rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          <Input
            name="name"
            label="Project Name"
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

          <Button className="w-full" disabled={createProject.isPending}>
            {createProject.isPending ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
