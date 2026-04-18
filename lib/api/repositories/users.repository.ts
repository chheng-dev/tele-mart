import { type SQL, and, asc, desc, eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { user } from "@/db/schema/better-auth";
import type { AppDatabase } from "@/lib/api/crud/types";
import { selectById, selectPaginated } from "@/lib/api/repositories/base-crud.repository";
import { BaseRepository } from "@/lib/api/repositories/base.repository";

/** Inferred row type from Drizzle `user` table. */
export type UserRow = typeof user.$inferSelect;

function buildListWhere(searchParams: URLSearchParams): SQL | undefined {
  const parts: SQL[] = [];
  const email = searchParams.get("email")?.trim();
  if (email) parts.push(ilike(user.email, `%${email}%`));
  const name = searchParams.get("name")?.trim();
  if (name) parts.push(ilike(user.name, `%${name}%`));
  const role = searchParams.get("role")?.trim();
  if (role) parts.push(eq(user.role, role));
  return parts.length ? and(...parts) : undefined;
}

function buildListOrderBy(searchParams: URLSearchParams): SQL | SQL[] | undefined {
  const sort = searchParams.get("sort")?.trim();
  if (sort === "name") return [asc(user.name)];
  if (sort === "-name") return [desc(user.name)];
  if (sort === "createdAt") return [asc(user.createdAt)];
  if (sort === "-createdAt") return [desc(user.createdAt)];
  return [desc(user.createdAt)];
}

export class UsersRepository extends BaseRepository {
  constructor(database: AppDatabase = db) {
    super(database);
  }

  async listPaginated(
    searchParams: URLSearchParams,
    page: number,
    limit: number,
    offset: number,
  ): Promise<{ rows: UserRow[]; total: number }> {
    const whereClause = buildListWhere(searchParams);
    const orderByClause = buildListOrderBy(searchParams);
    const { rows, total } = await selectPaginated(this.database, user, {
      where: whereClause,
      orderBy: orderByClause,
      limit,
      offset,
    });
    return { rows: rows as UserRow[], total };
  }

  async findById(id: string): Promise<UserRow | undefined> {
    const row = await selectById(this.database, user, user.id, id);
    return row as UserRow | undefined;
  }

  async findByEmail(email: string): Promise<UserRow | undefined> {
    const rows = await this.database.select().from(user).where(eq(user.email, email)).limit(1);
    return rows[0] as UserRow | undefined;
  }

  async insert(values: Record<string, unknown>): Promise<UserRow> {
    const inserted = await this.database
      .insert(user)
      .values(values as never)
      .returning();
    const row = inserted[0];
    if (!row) throw new Error("Create failed");
    return row as UserRow;
  }

  async update(id: string, patch: Record<string, unknown>): Promise<UserRow | undefined> {
    const updated = await this.database
      .update(user)
      .set(patch as never)
      .where(eq(user.id, id))
      .returning();
    return updated[0] as UserRow | undefined;
  }

  async deleteById(id: string): Promise<UserRow | undefined> {
    const removed = await this.database.delete(user).where(eq(user.id, id)).returning();
    return removed[0] as UserRow | undefined;
  }
}
