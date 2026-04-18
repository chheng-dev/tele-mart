import { withApiErrorHandling } from "@/lib/api/http";
import { users, usersUniqueConstraintMessages } from "@/lib/api/resources/users";

const userCrudOpts = {
  uniqueConstraintMessages: usersUniqueConstraintMessages,
};

export const GET = withApiErrorHandling(users.get, userCrudOpts);
export const PATCH = withApiErrorHandling(users.update, userCrudOpts);
export const DELETE = withApiErrorHandling(users.delete, userCrudOpts);
