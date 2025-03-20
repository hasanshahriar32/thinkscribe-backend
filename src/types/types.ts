export interface ExpressError extends Error {
  status?: number;
  stack?: string;
}

export interface ListQuery {
  page: number;
  size: number;
  sort?: string;
  order?: 'desc' | 'asc';
  keyword?: string;
}
