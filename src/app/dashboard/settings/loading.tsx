import { PageHeader } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
      />

      <Card>
        <CardHeader>
          <div className="bg-brand-100 h-6 w-32 animate-pulse rounded" />
          <div className="bg-brand-100 h-4 w-64 animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="bg-brand-100 h-20 w-20 animate-pulse rounded-full" />
            <div className="space-y-2">
              <div className="bg-brand-100 h-9 w-24 animate-pulse rounded" />
              <div className="bg-brand-100 h-4 w-48 animate-pulse rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
