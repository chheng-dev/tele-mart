import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type * as schema from "@/db/schema";

import type { ApiHandler } from "@/lib/api/http";

export type AppDatabase = NodePgDatabase<typeof schema>;

export type CrudHandlers = {
  list: ApiHandler;
  get: ApiHandler;
  create: ApiHandler;
  update: ApiHandler;
  delete: ApiHandler;
};
