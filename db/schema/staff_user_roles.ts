import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { roles } from "./roles";
import { staffUsers } from "./staff_users";

export const staffUserRoles = pgTable(
  "staff_user_roles",
  {
    staffUserId: integer("staff_user_id")
      .notNull()
      .references(() => staffUsers.id, { onDelete: "cascade" }),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.staffUserId, table.roleId] }),
  }),
);

export type InsertStaffUserRole = typeof staffUserRoles.$inferInsert;
export type SelectStaffUserRole = typeof staffUserRoles.$inferSelect;
