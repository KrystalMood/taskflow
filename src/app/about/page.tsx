import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Taskflow",
  description: "Learn more about TaskFlow and our mission.",
};

export default function AboutPage() {
  return (
    <main className="bg-brand-50 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-brand-900 mb-6 text-4xl font-bold">
          About TaskFlow
        </h1>
        <div className="prose prose-lg max-w-3xl">
          <p className="text-brand-600 text-lg">
            TaskFlow is a modern task management platform designed to help teams
            work more productively and efficiently.
          </p>

          <h2 className="text-brand-900 mt-8 mb-4 text-2xl font-bold">
            Our Mission
          </h2>
          <p className="text-brand-600">
            Simplify how teams manage projects and tasks, so they can focus on
            what matters most.
          </p>

          <h2 className="text-brand-900 mt-8 mb-4 text-2xl font-bold">
            Features
          </h2>
          <ul className="text-brand-600 list-inside list-disc space-y-2">
            <li>Task management with priorities and statuses</li>
            <li>Flexible project organization</li>
            <li>Team collaboration tools</li>
            <li>Real-time updates and notifications</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
