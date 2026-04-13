import type { AppDatabase } from "@/lib/api/crud/types";

/** Base for Drizzle-backed repositories. */
export abstract class BaseRepository {
  protected constructor(protected readonly database: AppDatabase) {}
}
