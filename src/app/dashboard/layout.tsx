import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <nav className="border-brand-200 rounded-lg border bg-white p-4">
              <h2 className="text-brand-900 mb-4 font-semibold">Dashboard</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-brand-600 hover:bg-brand-100 block rounded-md px-3 py-2"
                  >
                    Overview
                  </Link>
                  <Link
                    href="/dashboard/projects"
                    className="text-brand-600 hover:bg-brand-100 block rounded-md px-3 py-2"
                  >
                    Projects
                  </Link>
                  <Link
                    href="/dashboard/tasks"
                    className="text-brand-600 hover:bg-brand-100 block rounded-md px-3 py-2"
                  >
                    Tasks
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
