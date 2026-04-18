import type { PaginatedList } from "@/lib/api/models/pagination";

/**
 * Builds the list payload shape used by CRUD list endpoints (`jsonOk` body).
 * Uses `items` (not `data`) so the envelope is `data: { items, pagination }`, not `data.data`.
 */
export function buildPaginatedListBody<T>(
  rows: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedList<T> {
  const offset = (page - 1) * limit;
  const hasMore = offset + rows.length < total;
  return {
    items: rows,
    pagination: {
      page,
      limit,
      count: total,
      hasMore,
    },
  };
}
