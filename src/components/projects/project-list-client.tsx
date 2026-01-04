"use client";

import { useDebounce, useProjects } from "@/hooks";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input, Select, Button } from "@/components/ui";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function ProjectListClient() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects(debouncedSearch, status !== "ALL" ? status : undefined);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
      </div>

      <div className="text-brand-500 text-sm">
        {projects ? (
          <span>Showing {projects.length} projects</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-brand-100 border-brand-200 h-40 animate-pulse rounded-lg border"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="bg-danger-50 text-danger-600 rounded-lg p-4">
          Failed to load projects. Please try refreshing.
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {projects && projects.length === 0 && (
        <div className="text-brand-500 py-12 text-center">
          No projects found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
