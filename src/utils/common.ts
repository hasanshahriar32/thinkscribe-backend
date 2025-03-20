import { ListQuery } from '../types/types';

export const getPagination = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const limit = size;
  const offset = (page - 1) * size;
  return { offset, limit };
};

// Reusable function to get paginated data
export async function getPaginatedData<T>(
  query: any,
  countQuery: any,
  filters: ListQuery,
  pagination: { limit: number; offset: number }
): Promise<{
  data: T[];
  pagination: {
    page: number;
    size: number;
    totalCount: number;
    totalPages: number;
  };
}> {
  // Execute the queries concurrently
  const [data, countResult]: any = await Promise.all([query, countQuery]);

  // Calculate pagination data
  const totalCount = countResult[0].count;
  const totalPages = Math.ceil(totalCount / pagination.limit);

  // Return the paginated data with pagination information
  return {
    data,
    pagination: {
      page: filters.page,
      size: filters.size,
      totalCount,
      totalPages,
    },
  };
}
