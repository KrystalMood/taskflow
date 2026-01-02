import { PageHeader } from "@/components/layout";
import { Button } from "@/components/ui";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

      <div className="flex items-center justify-between">
        <PageHeader
          title="Projects"
          description="Manage and track your projects."
        />
        <Button disabled>New Project</Button>
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
