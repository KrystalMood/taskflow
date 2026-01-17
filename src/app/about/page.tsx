import type { Metadata } from "next";
import { PageHeader } from "@/components/layout";
import { ProjectStory, TechStack, CreatorProfile } from "@/components/about";

export const metadata: Metadata = {
  title: "About - Taskflow",
  description: "A showcase of modern web development capabilities.",
};

export default function AboutPage() {
  return (
    <main className="bg-brand-50 min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8 lg:py-12">
        <PageHeader
          title="Behind TaskFlow"
          description="Built to demonstrate the power of Next.js 15, Server Components, and modern UI patterns."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <ProjectStory />
            <TechStack />
          </div>

          <div className="lg:col-span-1">
            <CreatorProfile />
          </div>
        </div>
      </div>
    </main>
  );
}
