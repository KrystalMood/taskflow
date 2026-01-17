import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export function ProjectStory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>The Story</CardTitle>
      </CardHeader>
      <CardContent className="text-brand-600 space-y-4 leading-relaxed">
        <p>
          TaskFlow started as a simple idea: to build a task management
          application that doesn&apos;t just work, but feels{" "}
          <strong className="text-brand-900 font-semibold">alive</strong>.
        </p>
        <p>
          More than just a productivity tool, this project serves as a
          comprehensive showcase of a modern{" "}
          <strong className="text-brand-900 font-semibold">
            Full Stack &quot;Next.js&quot; Architecture
          </strong>
          . It navigates the complexities of Server Actions, optimistic UI
          updates, and real-time data synchronization.
        </p>
        <p>
          Every interaction, from drag-and-drop tasks to instant status updates,
          has been crafted to demonstrate how snappy and responsive a web
          application can be when using the latest React 19 features.
        </p>
      </CardContent>
    </Card>
  );
}
