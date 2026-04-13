/**
 * Legacy barrel — prefer `@/lib/api/controllers/users.controller`.
 */
export {
  usersController as users,
  getUserByEmail,
  usersUniqueConstraintMessages,
} from "@/lib/api/controllers/users.controller";
