import { eq } from "drizzle-orm";
import type { PgColumn, PgTable } from "drizzle-orm/pg-core";

import { fetchPaginatedRows, type FetchPaginatedRowsOptions } from "@/lib/api/crud/paginated-list";
import type { AppDatabase } from "@/lib/api/crud/types";

export type PaginatedListDbOptions = FetchPaginatedRowsOptions;

/**
 * Shared Drizzle CRUD helpers (repository layer — no HTTP types).
 */
export async function selectPaginated<TTable extends PgTable>(
  db: AppDatabase,
  table: TTable,
  options: PaginatedListDbOptions,
): Promise<{ rows: unknown[]; total: number }> {
  return fetchPaginatedRows(db, table, options);
}

export async function selectById<TId extends string | number>(
  db: AppDatabase,
  table: PgTable,
  idColumn: PgColumn,
  id: TId,
): Promise<unknown | undefined> {
  const rows = await db.select().from(table).where(eq(idColumn, id)).limit(1);
  return rows[0];
}
