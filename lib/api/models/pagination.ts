import { z } from "zod";

/** Offset pagination metadata returned on list endpoints. */
export const paginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  count: z.number().int().nonnegative(),
  hasMore: z.boolean(),
});

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

export type PaginatedList<T> = {
  items: T[];
  pagination: PaginationMeta;
};

export function paginatedListSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    pagination: paginationMetaSchema,
  });
}

/** Shared query fields for `page` / `limit` (strings from URL are coerced). */
export const offsetPaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
});

export type OffsetPaginationQuery = z.infer<typeof offsetPaginationQuerySchema>;
