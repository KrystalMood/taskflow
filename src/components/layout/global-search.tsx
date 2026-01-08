"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2, Layout, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui";
import { useDebounce, useProjects, useTask } from "@/hooks";
import { useRouter } from "next/navigation";

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: projects, isLoading: loadProjects } = useProjects(
    debouncedSearch,
    undefined,
    "updatedAt",
    "desc"
  );

  const { data: tasks, isLoading: loadTasks } = useTask({
    search: debouncedSearch,
  });

  const isLoading = loadProjects || loadTasks;
  const hasResults = (projects?.length || 0) > 0 || (tasks?.length || 0) > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (path: string) => {
    setIsOpen(false);
    setSearch("");
    router.push(path);
  };

  return (
    <div ref={wrapperRef} className="relative hidden w-full max-w-sm lg:block">
      <div className="relative">
        <Search className="text-brand-400 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search everywhere..."
          className="bg-brand-50 border-brand-200 placeholder:text-brand-400 pl-9 transition-colors focus:bg-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.trim().length > 0) setIsOpen(true);
          }}
          onFocus={() => {
            if (search.trim().length > 0) setIsOpen(true);
          }}
        />
        {isLoading && (
          <Loader2 className="text-brand-400 absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {isOpen && search.trim().length > 0 && (
        <div className="border-brand-100 animate-in fade-in zoom-in-95 absolute top-full z-50 mt-2 w-full rounded-lg border bg-white p-2 shadow-xl duration-200">
          {!hasResults && !isLoading ? (
            <div className="text-brand-500 p-4 text-center text-sm">
              No results found for {`"${search}"`}
            </div>
          ) : (
            <div className="max-h-[60vh] space-y-4 overflow-y-auto p-1">
              {/* Projects */}
              {projects && projects.length > 0 && (
                <div>
                  <h3 className="text-brand-400 mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
                    Projects
                  </h3>
                  <div className="space-y-1">
                    {projects.slice(0, 3).map((project) => (
                      <button
                        key={project.id}
                        onClick={() =>
                          handleSelect(`/dashboard/projects/${project.id}`)
                        }
                        className="hover:bg-brand-50 group flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left transition-colors"
                      >
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
                          style={{
                            backgroundColor: `${project.color || "#64748b"}20`,
                            color: project.color || "#64748b",
                          }}
                        >
                          <Layout className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-brand-900 group-hover:text-brand-700 text-sm font-medium">
                            {project.name}
                          </p>
                          <p className="text-brand-500 line-clamp-1 text-xs">
                            {project.description || "No description"}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {tasks && tasks.length > 0 && (
                <div>
                  <h3 className="text-brand-400 mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
                    Tasks
                  </h3>
                  <div className="space-y-1">
                    {tasks.slice(0, 3).map((task) => (
                      <button
                        key={task.id}
                        onClick={() =>
                          handleSelect(`/dashboard/tasks/${task.id}`)
                        }
                        className="hover:bg-brand-50 group flex w-full cursor-pointer items-center gap-3 rounded-md p-2 text-left transition-colors"
                      >
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
                          style={{
                            backgroundColor: `${task.project?.color || "#64748b"}20`,
                            color: task.project?.color || "#64748b",
                          }}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-brand-900 group-hover:text-brand-700 text-sm font-medium">
                            {task.title}
                          </p>
                          <p className="text-brand-500 line-clamp-1 text-xs">
                            {task.description || "No description"}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
