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
            TaskFlow adalah platform task management modern yang dirancang untuk
            membantu tim bekerja lebih produktif dan efisien.
          </p>

          <h2 className="text-brand-900 mt-8 mb-4 text-2xl font-bold">
            Our Mission
          </h2>
          <p className="text-brand-600">
            Menyederhanakan cara tim mengelola proyek dan tugas, sehingga mereka
            bisa fokus pada yang paling penting.
          </p>

          <h2 className="text-brand-900 mt-8 mb-4 text-2xl font-bold">
            Features
          </h2>
          <ul className="text-brand-600 list-inside list-disc space-y-2">
            <li>Task management dengan prioritas dan status</li>
            <li>Project organization yang fleksibel</li>
            <li>Collaboration tools untuk tim</li>
            <li>Real-time updates dan notifications</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
