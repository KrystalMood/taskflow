export type SortField = "createdAt" | "dueDate" | "priority" | "title";
export type SortOrder = "asc" | "desc";

export interface TaskFilter {
  status?: string;
  search?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}
