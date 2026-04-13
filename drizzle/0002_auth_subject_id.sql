ALTER TABLE "staff_users" RENAME COLUMN "clerk_user_id" TO "auth_subject_id";--> statement-breakpoint
ALTER TABLE "staff_users" RENAME CONSTRAINT "staff_users_clerk_user_id_unique" TO "staff_users_auth_subject_id_unique";
