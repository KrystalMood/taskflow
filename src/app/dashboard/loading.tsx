import { PageHeader } from "@/components/layout";
import { Card, CardHeader, CardContent } from "@/components/ui";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

      <PageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-3 w-32 animate-pulse rounded bg-gray-200" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="h-40 w-full animate-pulse rounded bg-gray-200" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
