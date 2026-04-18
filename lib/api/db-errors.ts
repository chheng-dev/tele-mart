function walkPgString(err: unknown, key: "code" | "constraint"): string | undefined {
  if (typeof err !== "object" || err === null) return undefined;
  const o = err as Record<string, unknown>;
  const v = o[key];
  if (typeof v === "string") return v;
  if (o.cause !== undefined) return walkPgString(o.cause, key);
  return undefined;
}

export function isUniqueViolation(err: unknown): boolean {
  return walkPgString(err, "code") === "23505";
}

export function getPostgresConstraintName(err: unknown): string | undefined {
  return walkPgString(err, "constraint");
}

/** Postgres SQLSTATE -> short API message (readable in Postman). */
const PG_CODE_MESSAGES: Record<string, string> = {
  "23505": "This value already exists",
  "23503": "Related record is missing or invalid",
  "23502": "A required value is missing",
  "23514": "Value does not meet the requirements",
  "22P02": "Invalid data format",
  "42P01": "Database error",
  "42703": "Database error",
  "57014": "Request took too long",
  "08006": "Database connection failed",
};

/**
 * If the error chain includes a Postgres error, return a short friendly message.
 * Otherwise undefined (caller may handle raw Error.message).
 */
export function friendlyPostgresMessage(err: unknown): string | undefined {
  const code = walkPgString(err, "code");
  if (!code) return undefined;
  return PG_CODE_MESSAGES[code] ?? "Database error";
}
