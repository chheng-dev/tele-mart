-- Shopper / Telegram accounts (frees table name "users" for admins)
ALTER TABLE "users" RENAME TO "customers";--> statement-breakpoint
ALTER TABLE "customers" RENAME CONSTRAINT "users_telegram_id_unique" TO "customers_telegram_id_unique";--> statement-breakpoint
-- Orders: point to customers with explicit column name
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "orders" RENAME COLUMN "user_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
-- Admin accounts
ALTER TABLE "staff_users" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" RENAME CONSTRAINT "staff_users_auth_subject_id_unique" TO "users_auth_subject_id_unique";--> statement-breakpoint
-- Admin role junction
ALTER TABLE "staff_user_roles" RENAME TO "user_roles";--> statement-breakpoint
ALTER TABLE "user_roles" RENAME COLUMN "staff_user_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "user_roles" RENAME CONSTRAINT "staff_user_roles_staff_user_id_role_id_pk" TO "user_roles_user_id_role_id_pk";--> statement-breakpoint
ALTER TABLE "user_roles" RENAME CONSTRAINT "staff_user_roles_staff_user_id_staff_users_id_fk" TO "user_roles_user_id_users_id_fk";--> statement-breakpoint
ALTER TABLE "user_roles" RENAME CONSTRAINT "staff_user_roles_role_id_roles_id_fk" TO "user_roles_role_id_roles_id_fk";
