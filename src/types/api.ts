export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string>;
}
