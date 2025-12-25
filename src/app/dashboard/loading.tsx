export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-brand-200 mb-6 h-8 w-1/4 rounded" />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-brand-200 rounded-lg border bg-white p-6"
          >
            <div className="bg-brand-200 mb-4 h-4 w-1/2 rounded" />
            <div className="bg-brand-200 h-8 w-1/3 rounded" />
          </div>
        ))}
      </div>

      <div className="border-brand-200 rounded-lg border bg-white p-6">
        <div className="bg-brand-200 mb-4 h-4 w-1/4 rounded" />
        <div className="bg-brand-200 h-4 w-3/4 rounded" />
      </div>
    </div>
  );
}
