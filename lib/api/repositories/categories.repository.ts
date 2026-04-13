import { type SQL, and, asc, desc, eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { categories } from "@/db/schema/categories";
import type { AppDatabase } from "@/lib/api/crud/types";
import { selectById, selectPaginated } from "@/lib/api/repositories/base-crud.repository";
import { BaseRepository } from "@/lib/api/repositories/base.repository";

export type CategoryRow = typeof categories.$inferSelect;

function buildListWhere(searchParams: URLSearchParams): SQL | undefined {
  const parts: SQL[] = [];
  const id = searchParams.get("id")?.trim();
  if (id) {
    const n = Number.parseInt(id, 10);
    if (Number.isFinite(n)) parts.push(eq(categories.id, n));
  }
  const name = searchParams.get("name")?.trim();
  if (name) parts.push(ilike(categories.name, `%${name}%`));
  return parts.length ? and(...parts) : undefined;
}

function buildListOrderBy(searchParams: URLSearchParams): SQL | SQL[] | undefined {
  const sort = searchParams.get("sort")?.trim();
  if (sort === "name") return [asc(categories.name)];
  if (sort === "-name") return [desc(categories.name)];
  if (sort === "createdAt") return [asc(categories.createdAt)];
  if (sort === "-createdAt") return [desc(categories.createdAt)];
  return [desc(categories.createdAt)];
}

export class CategoriesRepository extends BaseRepository {
  constructor(database: AppDatabase = db) {
    super(database);
  }

  async listPaginated(
    searchParams: URLSearchParams,
    page: number,
    limit: number,
    offset: number,
  ): Promise<{ rows: CategoryRow[]; total: number }> {
    const whereClause = buildListWhere(searchParams);
    const orderByClause = buildListOrderBy(searchParams);
    const { rows, total } = await selectPaginated(this.database, categories, {
      where: whereClause,
      orderBy: orderByClause,
      limit,
      offset,
    });
    return { rows: rows as CategoryRow[], total };
  }

  async findById(id: number): Promise<CategoryRow | undefined> {
    const row = await selectById(this.database, categories, categories.id, id);
    return row as CategoryRow | undefined;
  }

  async insert(values: Record<string, unknown>): Promise<CategoryRow> {
    const inserted = await this.database
      .insert(categories)
      .values(values as never)
      .returning();
    const row = inserted[0];
    if (!row) throw new Error("Create failed");
    return row as CategoryRow;
  }

  async update(id: number, patch: Record<string, unknown>): Promise<CategoryRow | undefined> {
    const updated = await this.database
      .update(categories)
      .set(patch as never)
      .where(eq(categories.id, id))
      .returning();
    return updated[0] as CategoryRow | undefined;
  }

  async deleteById(id: number): Promise<CategoryRow | undefined> {
    const removed = await this.database.delete(categories).where(eq(categories.id, id)).returning();
    return removed[0] as CategoryRow | undefined;
  }
}
