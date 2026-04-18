import { ApiError } from "@/lib/api/contracts/api-error";
import {
  parseOffsetPagination,
  type ParseOffsetPaginationOptions,
} from "@/lib/api/crud/paginated-list";
import type { PaginatedList } from "@/lib/api/models/pagination";
import { buildPaginatedListBody } from "@/lib/api/mvc/list-response";

/** Default `page` / `limit` rules for offset-based list endpoints (matches prior CRUD defaults). */
export const DEFAULT_OFFSET_LIST_OPTIONS: ParseOffsetPaginationOptions = {
  defaultLimit: 20,
  maxLimit: 100,
};

export abstract class BaseService {
  /**
   * Offset list from `request.url`: validates pagination, then loads rows via `fetchPage`.
   */
  protected async paginatedListFromRequest<T>(
    request: Request,
    fetchPage: (
      searchParams: URLSearchParams,
      page: number,
      limit: number,
      offset: number,
    ) => Promise<{ rows: T[]; total: number }>,
    paginationOptions: ParseOffsetPaginationOptions = DEFAULT_OFFSET_LIST_OPTIONS,
  ): Promise<PaginatedList<T> | Response> {
    const { searchParams } = new URL(request.url);
    const pagination = parseOffsetPagination(searchParams, paginationOptions);
    if (pagination instanceof Response) return pagination;

    const { page, limit, offset } = pagination;
    const { rows, total } = await fetchPage(searchParams, page, limit, offset);
    return buildPaginatedListBody(rows, page, limit, total);
  }

  /** Returns `row` or throws `ApiError.notFound` when missing. */
  protected requireRow<T>(row: T | undefined, message = "Not found"): T {
    if (row === undefined) {
      throw ApiError.notFound(message);
    }
    return row;
  }
}
