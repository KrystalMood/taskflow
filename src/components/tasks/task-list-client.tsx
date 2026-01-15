"use client";

import { TaskCard } from "@/components/tasks/task-card";
import { Input, Select } from "@/components/ui";
import { Search } from "lucide-react";
import { useDebounce, useRealtimeTasks, useTask } from "@/hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SortField, SortOrder } from "@/types";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Status" },
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
  { value: "CANCELLED", label: "Cancelled" },
];

const SORT_OPTIONS = [
  { value: "createdAt", label: "Date Created" },
  { value: "dueDate", label: "Due Date" },
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title" },
];
const ORDER_OPTIONS = [
  { value: "desc", label: "Newest First" },
  { value: "asc", label: "Oldest First" },
];

export function TaskListClient() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const { data: session } = useSession();

  const debouncedSearch = useDebounce(search, 500);

  useRealtimeTasks({
    userId: session?.user.id,
    enabled: !!session?.user?.id,
  });

  const {
    data: tasks,
    isLoading,
    error,
  } = useTask({
    status: status !== "ALL" ? status : undefined,
    search: debouncedSearch || undefined,
    sortBy,
    sortOrder,
  });

  return (
    <div className="space-y-4">
      <div className="text-brand-500 flex items-center gap-2 text-sm">
        <span className="relative flex h-2 w-2">
          <span className="bg-success-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
          <span className="bg-success-500 relative inline-flex h-2 w-2 rounded-full"></span>
        </span>
        Live updates enabled
      </div>
      {/* Search Bar */}
      <div className="relative">
        <Search className="text-brand-400 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Search tasks..."
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
        {tasks ? (
          <span>Showing {tasks.length} tasks</span>
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

      {error && (
        <div className="bg-danger-50 text-danger-600 rounded-lg p-4">
          Failed to load tasks: {error.message}
        </div>
      )}

      {tasks && tasks.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}

      {tasks && tasks.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-brand-500 text-lg">
            {search ? `No tasks found for "${search}"` : "No tasks yet"}
          </p>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-accent-500 mt-2 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
