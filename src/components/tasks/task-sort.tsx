import { Select } from "@/components/ui";

interface TaskSortProps {
  sortBy: string;
  sortOrder: string;
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

export function TaskSort({ sortBy, sortOrder, onSortChange }: TaskSortProps) {
  return (
    <div className="flex gap-2">
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value, sortOrder)}
        options={[
          { value: "createdAt", label: "Created At" },
          { value: "dueDate", label: "Due Date" },
          { value: "priority", label: "Priority" },
          { value: "title", label: "Title" },
        ]}
      />
      <Select
        value={sortOrder}
        onChange={(e) => onSortChange(sortBy, e.target.value)}
        options={[
          { value: "desc", label: "Newest" },
          { value: "asc", label: "Oldest" },
        ]}
      />
    </div>
  );
}
