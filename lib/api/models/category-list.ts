import { z } from "zod";

import { offsetPaginationQuerySchema } from "@/lib/api/models/pagination";

export const categoryListSortSchema = z.enum(["name", "-name", "createdAt", "-createdAt"]);

export const categoryListQuerySchema = offsetPaginationQuerySchema.extend({
  id: z.coerce.number().int().positive().optional(),
  name: z.string().optional(),
  sort: categoryListSortSchema.optional(),
});

export type CategoryListQuery = z.infer<typeof categoryListQuerySchema>;
