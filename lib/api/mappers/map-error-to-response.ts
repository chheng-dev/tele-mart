import { ZodError } from "zod";

import { getPostgresConstraintName, isUniqueViolation } from "@/lib/api/db-errors";
import { ApiError } from "@/lib/api/contracts/api-error";
import {
  jsonConflict,
  jsonError,
  jsonInternalError,
  jsonValidationError,
} from "@/lib/api/views/json";

const DEFAULT_UNIQUE_MESSAGE = "A record with this value already exists.";

function uniqueConflictResponse(
  err: unknown,
  uniqueConstraintMessages: Partial<Record<string, string>> | undefined,
): Response {
  const name = getPostgresConstraintName(err);
  const message = (name && uniqueConstraintMessages?.[name]) ?? DEFAULT_UNIQUE_MESSAGE;
  return jsonConflict(message);
}

/**
 * Maps thrown values from services / DB to JSON `Response` (controller boundary).
 */
export function mapErrorToResponse(
  err: unknown,
  options?: {
    uniqueConstraintMessages?: Partial<Record<string, string>>;
  },
): Response {
  if (err instanceof ApiError) {
    return jsonError(err.message, err.status);
  }
  if (err instanceof ZodError) {
    return jsonValidationError(err);
  }
  if (isUniqueViolation(err)) {
    return uniqueConflictResponse(err, options?.uniqueConstraintMessages);
  }
  return jsonInternalError(err);
}
