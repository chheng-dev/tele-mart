import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { permissions } from "./permissions";
import { roles } from "./roles";

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: integer("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
  }),
);

export type InsertRolePermission = typeof rolePermissions.$inferInsert;
export type SelectRolePermission = typeof rolePermissions.$inferSelect;
