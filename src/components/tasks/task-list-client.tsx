"use client";

import { TaskCard } from "@/components/tasks/task-card";
import { Input, Select } from "@/components/ui";
import { Search } from "lucide-react";
import { useDebounce, useRealtimeTasks, useTask } from "@/hooks";
import { useState } from "react";
import { useSession } from "next-auth/react";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Status" },
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function TaskListClient() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
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
  });

  return (
    <div className="space-y-4">
      <div className="text-brand-500 flex items-center gap-2 text-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>
        Live updates enabled
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search tasks..."
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
        <div className="text-brand-500 py-12 text-center">
          No tasks found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
