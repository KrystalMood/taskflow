"use client";

import { Button } from "@/components/ui";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-danger-50 text-danger-600 max-w-md rounded-lg p-8 text-center">
        <h2 className="mb-2 text-xl font-bold">Something went wrong!</h2>
        <p className="mb-4 text-sm">
          {error.message || "An unexpected error occurred"}
        </p>
        <Button onClick={reset} variant="danger">
          Try Again
        </Button>
      </div>
    </div>
  );
}
