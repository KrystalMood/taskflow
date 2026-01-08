"use client";

import { useDebounce, useProjects, useRealtimeProjects } from "@/hooks";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input, Select } from "@/components/ui";
import { ProjectCard } from "@/components/projects/project-card";
import { useSession } from "next-auth/react";
import { SortField, SortOrder } from "@/types";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "ON_HOLD", label: "On Hold" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const SORT_OPTIONS = [
  { value: "createdAt", label: "Date Created" },
  { value: "updatedAt", label: "Last Updated" },
  { value: "name", label: "Name" },
];

const ORDER_OPTIONS = [
  { value: "desc", label: "Newest First" },
  { value: "asc", label: "Oldest First" },
];

export function ProjectListClient() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const { data: session } = useSession();

  const debouncedSearch = useDebounce(search, 500);

  useRealtimeProjects({
    userId: session?.user?.id,
    enabled: true,
  });

  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects(
    debouncedSearch,
    status !== "ALL" ? status : undefined,
    sortBy,
    sortOrder
  );

  return (
    <div className="space-y-4">
      <div className="text-brand-500 flex items-center gap-2 text-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        Live updates enabled
      </div>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="w-full sm:w-auto sm:min-w-[160px]">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[160px]">
          <Select
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[140px]">
          <Select
            options={ORDER_OPTIONS}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
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
