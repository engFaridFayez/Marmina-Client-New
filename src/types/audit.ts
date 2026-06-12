export interface ActivityLog {
  id: number;
  actor_name: string;
  target_name?: string | null;
  action: string;
  message: string;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
