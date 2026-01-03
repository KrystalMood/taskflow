"use client";

import {
  Input,
  Textarea,
  ColorPicker,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Project } from "@/generated/prisma/client";
import { useDeleteProject, useUpdateProject } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface EditProjectFormProps {
  project: Project;
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const router = useRouter();
  const updateProject = useUpdateProject(project.id);
  const deleteProject = useDeleteProject();

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    updateProject.mutate(formData, {
      onSuccess: () => {
        router.push("/dashboard/projects");
        router.refresh();
      },
      onError: (err) => setError(err.message),
    });
  }

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this project? ALL TASKS WILL BE DELETED!"
      )
    ) {
      deleteProject.mutate(project.id, {
        onSuccess: () => {
          router.push("/dashboard/projects");
          router.refresh();
        },
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Edit Project</CardTitle>
        <Button
          type="button"
          variant="ghost"
          className="text-danger-600 hover:text-danger-700 hover:bg-danger-50 h-8 w-8 p-0"
          onClick={handleDelete}
          disabled={deleteProject.isPending}
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
            id="name"
            name="name"
            label="Project Name"
            defaultValue={project.name}
            placeholder="e.g. Website Redesign"
            required
          />
          <Textarea
            id="description"
            name="description"
            label="Description"
            defaultValue={project.description || ""}
            placeholder="Describe your project..."
            rows={4}
          />
          <ColorPicker name="color" value={project.color || "#6366f1"} />
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              disabled={updateProject.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateProject.isPending}>
              {updateProject.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
