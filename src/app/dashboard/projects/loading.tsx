export default function ProjectsLoading() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="bg-brand-200 h-8 w-32 animate-pulse rounded" />
        <div className="bg-brand-200 h-10 w-28 animate-pulse rounded-md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="bg-brand-200 h-3 w-3 shrink-0 rounded-full" />
              <div className="bg-brand-200 h-5 w-40 rounded" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-brand-200 h-4 w-8 rounded" />
                <div className="bg-brand-200 h-4 w-12 rounded" />
              </div>
              <div className="bg-brand-200 h-5 w-16 rounded-full" />
            </div>

            <div className="mt-4 flex items-center justify-end gap-1">
              <div className="bg-brand-200 h-3 w-24 rounded" />
              <div className="bg-brand-200 h-4 w-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
