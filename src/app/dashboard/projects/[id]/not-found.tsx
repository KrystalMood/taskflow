import Link from "next/link";
import { Button } from "@/components/ui";

export default function ProjectNotFound() {
  return (
    <div className="border-brand-200 flex min-h-40 flex-col items-center justify-center rounded-lg border p-6 text-center">
      <h2 className="text-brand-900 mb-2 text-2xl font-bold">
        Project Not Found
      </h2>
      <p className="text-brand-500 mb-6">
        The project you are trying to access does not exist or you do not have
        access to it.
      </p>
      <Link href="/dashboard/projects">
        <Button className="cursor-pointer">Back to Projects</Button>
      </Link>
    </div>
  );
}
