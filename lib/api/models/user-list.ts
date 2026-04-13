import { z } from "zod";

import { offsetPaginationQuerySchema } from "@/lib/api/models/pagination";

export const userListSortSchema = z.enum(["name", "-name", "createdAt", "-createdAt"]);

export const userListQuerySchema = offsetPaginationQuerySchema.extend({
  email: z.string().optional(),
  name: z.string().optional(),
  role: z.string().optional(),
  sort: userListSortSchema.optional(),
});

export type UserListQuery = z.infer<typeof userListQuerySchema>;
