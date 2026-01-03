import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

      <PageHeader
        title="Projects"
        description="Manage and track your projects."
      />

      <div className="flex items-center gap-4">
        <div className="h-10 flex-1 animate-pulse rounded-md bg-gray-200" />
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}
