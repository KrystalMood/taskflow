import { requireRole } from "@/lib";
import { PageHeader } from "@/components/layout";

export default async function AdminPage() {
  const session = await requireRole("ADMIN");

  return (
    <div className="text-brand-900 container mx-auto bg-white py-8">
      <PageHeader
        title="Admin Dashboard"
        description={`Welcome, ${session.user.name}`}
      />
    </div>
  );
}
