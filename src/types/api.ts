export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T|null;
  message?: string;
  errorCode?: string;
  pagination?: PaginationInfo;
}