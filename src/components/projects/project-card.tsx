"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    color: string | null;
    status: string;
    _count: {
      tasks: number;
    };
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusConfig = {
    ACTIVE: { label: "Active", className: "bg-success-50 text-success-600" },
    ARCHIVED: { label: "Archived", className: "bg-brand-100 text-brand-600" },
    COMPLETED: {
      label: "Completed",
      className: "bg-accent-100 text-accent-600",
    },
  };

  const status =
    statusConfig[project.status as keyof typeof statusConfig] ||
    statusConfig.ACTIVE;

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{ backgroundColor: project.color || "#6366f1" }}
          />
          <CardTitle className="truncate">{project.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {isExpanded && project.description && (
          <p className="text-brand-500 mb-4 text-sm">{project.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="text-brand-600 flex items-center gap-2 text-sm">
            <span className="font-medium">{project._count.tasks}</span>
            <span className="text-brand-400">tasks</span>
          </div>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        <div className="text-brand-400 mt-4 flex items-center justify-end gap-1">
          <p className="text-xs">
            {isExpanded ? "Click to collapse" : "Click to expand"}
          </p>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
