import { withApiErrorHandling } from "@/lib/api/http";
import { users, usersUniqueConstraintMessages } from "@/lib/api/resources/users";

const userCrudOpts = {
  uniqueConstraintMessages: usersUniqueConstraintMessages,
};

export const GET = withApiErrorHandling(users.list, userCrudOpts);
export const POST = withApiErrorHandling(users.create, userCrudOpts);
