import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export const metadata: Metadata = {
  title: "Dashboard - TaskFlow",
  description: "Your TaskFlow dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-brand-900 mb-6 text-2xl font-bold">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-accent-600 text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warning-500 text-3xl font-bold">8</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-success-500 text-3xl font-bold">16</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-brand-500">No recent activity yet.</p>
        </CardContent>
      </Card>
    </div>
  );
}
