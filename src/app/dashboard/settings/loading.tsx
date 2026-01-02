import { Card, CardContent, CardHeader } from "@/components/ui";
import { PageHeader } from "@/components/layout";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader className="space-y-2">
            <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 animate-pulse rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-9 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
