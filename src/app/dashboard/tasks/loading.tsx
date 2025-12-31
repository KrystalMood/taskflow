import { Card, CardContent, CardHeader } from "@/components/ui";

export default function TasksLoading() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="bg-brand-200 h-6 w-40 animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-brand-100 h-10 animate-pulse rounded" />
          <div className="bg-brand-100 h-20 animate-pulse rounded" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-brand-100 h-10 animate-pulse rounded" />
            <div className="bg-brand-100 h-10 animate-pulse rounded" />
          </div>
        </CardContent>
      </Card>

      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="bg-brand-200 h-8 w-32 animate-pulse rounded" />
        <div className="bg-brand-100 h-4 w-64 animate-pulse rounded" />
      </div>

      {/* Task Cards Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="bg-brand-100 h-4 w-20 animate-pulse rounded" />
              <div className="bg-brand-200 h-5 w-40 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="bg-brand-100 h-8 animate-pulse rounded" />
              <div className="mt-3 flex gap-2">
                <div className="bg-brand-100 h-5 w-16 animate-pulse rounded-full" />
                <div className="bg-brand-100 h-5 w-16 animate-pulse rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
