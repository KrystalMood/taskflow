"use client";
import { useDebounce, useProjects } from "@/hooks";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button, Input } from "@/components/ui";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";

export function ProjectListClient() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data: projects, isLoading, isError } = useProjects(debouncedSearch);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="text-brand-500 absolute top-1/2 left-3 h-4 w-4 translate-y-1/2" />
          <Input
            placeholder="Search projects by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-brand-200 bg-brand-100 h-48 animate-pulse rounded-xl border"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-danger-50 text-danger-900 border-danger-200 rounded-lg border p-4">
          Failed to load projects. Please try refreshing.
        </div>
      )}

      {!isLoading && projects?.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
          <h3 className="text-brand-900 text-lg font-medium">
            No projects found
          </h3>
          <p className="text-brand-500 mb-4 text-sm">
            {search
              ? "Try adjusting your search query."
              : "Start by creating your first project."}
          </p>
          {!search && (
            <Link href="/dashboard/projects/new">
              <Button variant="ghost">Create Project</Button>
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
