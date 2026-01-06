import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui";
import { PageHeader } from "@/components/layout";
import { requireAuth } from "@/lib";
import { DashboardStats } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard - TaskFlow",
  description: "Your TaskFlow dashboard",
};

export default async function DashboardPage() {
  await requireAuth();
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Overview", active: true }]} />
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening."
      />
      <DashboardStats />
    </div>
  );
}
