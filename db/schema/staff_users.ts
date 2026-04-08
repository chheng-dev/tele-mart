import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const staffUsers = pgTable("staff_users", {
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // SUPER_ADMIN | ADMIN | STAFF
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertStaffUser = typeof staffUsers.$inferInsert;
export type SelectStaffUser = typeof staffUsers.$inferSelect;
