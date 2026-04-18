import { withApiErrorHandling } from "@/lib/api/http";
import { getUserByEmail } from "@/lib/api/resources/users";

export const GET = withApiErrorHandling(getUserByEmail);
