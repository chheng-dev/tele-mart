import { count } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";

import type { AppDatabase } from "@/lib/api/crud/types";
import { jsonError } from "@/lib/api/views/json";

export type FetchPaginatedRowsOptions = {
  where?: SQL;
  orderBy?: SQL | SQL[];
  limit: number;
  offset: number;
};

/**
 * Runs a total count and a paginated select with optional WHERE and ORDER BY.
 */
export async function fetchPaginatedRows(
  db: AppDatabase,
  table: PgTable,
  options: FetchPaginatedRowsOptions,
): Promise<{ rows: unknown[]; total: number }> {
  const { where, orderBy, limit, offset } = options;
  const orderParts = orderBy === undefined ? [] : Array.isArray(orderBy) ? orderBy : [orderBy];

  const countRows = where
    ? await db.select({ total: count() }).from(table).where(where)
    : await db.select({ total: count() }).from(table);
  const total = Number(countRows[0]?.total ?? 0);

  const rows =
    orderParts.length > 0
      ? where
        ? await db
            .select()
            .from(table)
            .where(where)
            .orderBy(...orderParts)
            .limit(limit)
            .offset(offset)
        : await db
            .select()
            .from(table)
            .orderBy(...orderParts)
            .limit(limit)
            .offset(offset)
      : where
        ? await db.select().from(table).where(where).limit(limit).offset(offset)
        : await db.select().from(table).limit(limit).offset(offset);

  return { rows, total };
}

export type ParseOffsetPaginationOptions = {
  defaultLimit: number;
  maxLimit: number;
};

/**
 * Parses `page` and `limit` from query string. Returns `Response` on validation failure.
 */
export function parseOffsetPagination(
  searchParams: URLSearchParams,
  options: ParseOffsetPaginationOptions,
): { page: number; limit: number; offset: number } | Response {
  const { defaultLimit, maxLimit } = options;

  const pageRaw = searchParams.get("page");
  const limitRaw = searchParams.get("limit");
  const page = pageRaw === null || pageRaw === "" ? 1 : Number.parseInt(pageRaw, 10);
  const limit = limitRaw === null || limitRaw === "" ? defaultLimit : Number.parseInt(limitRaw, 10);

  if (!Number.isFinite(page) || page < 1) {
    return jsonError("Invalid page", 400);
  }
  if (!Number.isFinite(limit) || limit < 1 || limit > maxLimit) {
    return jsonError(`Invalid limit (1-${maxLimit})`, 400);
  }

  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

/**
 * Applies default/max rules after Zod parse (optional `page` / `limit` on list query models).
 */
export function resolvePaginationFromParsed(
  parsed: { page?: number; limit?: number },
  options: ParseOffsetPaginationOptions,
): { page: number; limit: number; offset: number } | Response {
  const defaultLimit = options.defaultLimit;
  const maxLimit = options.maxLimit;
  const page = parsed.page ?? 1;
  const limit = parsed.limit ?? defaultLimit;

  if (!Number.isFinite(page) || page < 1) {
    return jsonError("Invalid page", 400);
  }
  if (!Number.isFinite(limit) || limit < 1 || limit > maxLimit) {
    return jsonError(`Invalid limit (1-${maxLimit})`, 400);
  }

  return { page, limit, offset: (page - 1) * limit };
}
