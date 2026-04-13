import type { z } from "zod";

import { mapErrorToResponse } from "@/lib/api/mappers/map-error-to-response";

/** Parse JSON body and validate with Zod (use in controllers). */
export async function parseJsonBody<T extends z.ZodType>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  const raw: unknown = await request.json();
  return schema.parse(raw);
}

/** Next.js App Router handler type for a single method. */
export type ApiHandler = (
  request: Request,
  context: { params: Promise<Record<string, string>> },
) => Promise<Response>;

export type WithApiErrorHandlingOptions = {
  /** Postgres unique constraint name -> API message for HTTP 409. */
  uniqueConstraintMessages?: Partial<Record<string, string>>;
};

/**
 * Wraps a route handler: maps `ApiError`, Zod validation, unique violations, and falls back to 500.
 */
export function withApiErrorHandling(
  handler: ApiHandler,
  options?: WithApiErrorHandlingOptions,
): ApiHandler {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (e) {
      return mapErrorToResponse(e, options);
    }
  };
}
