/**
 * Creates or promotes a user to SUPER_ADMIN.
 *
 * Required env: DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET,
 * SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD.
 * Optional: SUPERADMIN_NAME (default "Super Admin").
 *
 * Run: npm run create-superadmin
 */
import "dotenv/config";

import { eq } from "drizzle-orm";

import { APIError } from "better-auth";

import { auth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";
import { db } from "@/db";
import { user as userTable } from "@/db/schema/better-auth";

const SUPER_ADMIN = "SUPER_ADMIN" satisfies UserRole;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (v === undefined || v.trim() === "") {
    throw new Error(`${name} must be set`);
  }
  return v.trim();
}

async function main() {
  requireEnv("DATABASE_URL");
  requireEnv("BETTER_AUTH_URL");
  requireEnv("BETTER_AUTH_SECRET");

  const email = requireEnv("SUPERADMIN_EMAIL");
  const password = requireEnv("SUPERADMIN_PASSWORD");
  const name = process.env.SUPERADMIN_NAME?.trim() || "Super Admin";

  const existing = await db
    .select({ id: userTable.id })
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);

  if (existing.length === 0) {
    try {
      await auth.api.signUpEmail({
        body: { name, email, password },
      });
      console.log(`Created account for ${email}`);
    } catch (e) {
      if (e instanceof APIError) {
        console.error(`signUpEmail failed: ${e.message} (status ${e.status})`);
        process.exit(1);
      }
      throw e;
    }
  } else {
    console.log(`User already exists for ${email}; setting role to SUPER_ADMIN only`);
  }

  await db
    .update(userTable)
    .set({ role: SUPER_ADMIN, updatedAt: new Date() })
    .where(eq(userTable.email, email));

  const [row] = await db
    .select({ id: userTable.id, role: userTable.role })
    .from(userTable)
    .where(eq(userTable.email, email))
    .limit(1);

  if (!row) {
    throw new Error("User row missing after upsert");
  }

  console.log(`Superadmin ready: id=${row.id} email=${email} role=${row.role}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
