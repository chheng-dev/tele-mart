import { db } from "@/db";
import { permissions, rolePermissions, roles, staffUserRoles, staffUsers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function requestPermission(resource: string, action: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const [staffRow] = await db
    .select()
    .from(staffUsers)
    .where(eq(staffUsers.clerkUserId, userId))
    .limit(1);

  if (!staffRow) {
    throw new Error("Unauthorized");
  }

  const staffWithPermissions = await db
    .select()
    .from(staffUserRoles)
    .innerJoin(roles, eq(staffUserRoles.roleId, roles.id))
    .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
    .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
    .where(
      and(
        eq(staffUserRoles.staffUserId, staffRow.id),
        eq(permissions.resource, resource),
        eq(permissions.action, action),
      ),
    )
    .limit(1);

  if (staffWithPermissions.length === 0) throw new Error("Unauthorized");

  return staffRow;
}
