import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {
  Zap,
  Code2,
  Palette,
  Database,
  Cloud,
  LayoutTemplate,
} from "lucide-react";

const technologies = [
  {
    name: "Next.js 15",
    category: "Framework",
    icon: <LayoutTemplate className="h-5 w-5 text-white" />,
    color: "bg-black",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: <Code2 className="h-5 w-5 text-white" />,
    color: "bg-blue-600",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: <Palette className="h-5 w-5 text-white" />,
    color: "bg-cyan-500",
  },
  {
    name: "Prisma ORM",
    category: "Database",
    icon: <Database className="h-5 w-5 text-white" />,
    color: "bg-emerald-600",
  },
  {
    name: "Supabase",
    category: "Backend",
    icon: <Cloud className="h-5 w-5 text-white" />,
    color: "bg-green-500",
  },
  {
    name: "React Query",
    category: "State",
    icon: <Zap className="h-5 w-5 text-white" />,
    color: "bg-rose-500",
  },
];

export function TechStack() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-brand-50 hover:bg-brand-100 group flex flex-col items-center justify-center rounded-lg p-4 text-center transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg shadow-sm ${tech.color}`}
              >
                {tech.icon}
              </div>
              <span className="text-brand-900 font-medium">{tech.name}</span>
              <span className="text-brand-500 mt-1 text-xs">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
