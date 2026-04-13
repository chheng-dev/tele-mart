import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

/** Admin accounts (dashboard access). */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  authSubjectId: varchar("auth_subject_id", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(), // SUPER_ADMIN | ADMIN | STAFF
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
