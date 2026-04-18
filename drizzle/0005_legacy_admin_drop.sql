-- Admin RBAC now uses Better Auth `user.role`; legacy `users` + `user_roles` removed.
DROP TABLE IF EXISTS "user_roles" CASCADE;--> statement-breakpoint
DROP TABLE IF EXISTS "users" CASCADE;
